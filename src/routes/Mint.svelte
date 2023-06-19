<script>
    import {ethers} from "ethers";
    import {
        vault,
        fileHash,
        fileDropped,
        uploadBtnLoading,
        activeNetwork,
        schemas,
        schemaError,
        transactionError, transactionSuccess, transactionInProgress, auditHistory, accountRoles, tokenName
    } from "../scripts/store.js";
    import {account} from "../scripts/store.js";
    import {navigateTo} from "yrv";
    import axios from "axios";
    import Select from "../components/Select.svelte";
    import {icons} from "../scripts/assets.js";
    import {
        IPFS_APIS,
        MAGIC_NUMBERS,
        ONE,
    } from "../scripts/consts.js";
    import SchemaForm from "../components/SchemaForm.svelte"
    import {
        cborDecode,
        cborEncode,
        encodeCBORStructure,
        getIpfsGetWay,
        getSubgraphData,
        hasRole, showPromptSFTCreate,
    } from "../scripts/helpers";
    import jQuery from 'jquery';
    import SftLoader from "../components/SftLoader.svelte";
    import {beforeUpdate, onMount} from "svelte";
    import {
        AUDIT_HISTORY_DATA_QUERY,
        DEPOSITS_QUERY,
        VAULT_INFORMATION_QUERY
    } from "../scripts/queries.js";
    import {arrayify} from "ethers/lib/utils.js";
    import {navigate} from '../scripts/helpers.js';
    import MintInput from '../components/MintInput.svelte';

    let image = {}

    let error = ""
    let ipfsLoading = false;

    let loveToSchemas = [
        {
            "displayName": 'Love To',
            "schema": {
                "type": "object",
                "required": [
                    "name",
                    "wallet",
                    "title"
                ],
                "properties": {
                    "name": {
                        "type": "string",
                        "title": "Name"
                    },
                    "wallet": {
                        "type": "string",
                        "title": "Wallet"
                    },
                    "title": {
                        "type": "string",
                        "title": "Title"
                    }
                }
            }
        }
    ]

    let selectedSchema = {}
    export let ethersData;
    let {signer} = ethersData;

    let amount;
    let shouldDisable = !$schemas.length
    let showAuth = false;
    let username = "";
    let password = "";
    let promise;
    let fileHashes = [];

    beforeUpdate(() => {
        fileDropped.set({})
    })

    onMount(async () => {
        if ($vault.address && ((Object.keys($accountRoles).length && !$accountRoles.DEPOSITOR))) {
            navigateTo('#');
        }
        await getSchemas()

    })

    async function getSchemas() {
        let variables = {id: $vault?.address?.toLowerCase()}
        if ($vault.address) {
            try {
                let resp = await getSubgraphData($activeNetwork, variables, VAULT_INFORMATION_QUERY, 'offchainAssetReceiptVault')
                let receiptVaultInformations = ""
                let tempSchema = []

                if (resp && resp.data && resp.data.offchainAssetReceiptVault) {
                    ipfsLoading = true
                    receiptVaultInformations = resp.data.offchainAssetReceiptVault.receiptVaultInformations

                    if (receiptVaultInformations.length) {
                        receiptVaultInformations.map(async data => {
                            let cborDecodedInformation = cborDecode(data.information.slice(18))
                            if (cborDecodedInformation[0].get(1) === MAGIC_NUMBERS.OA_SCHEMA) {
                                let schemaHash = cborDecodedInformation[1].get(0)
                                if (schemaHash && !schemaHash.includes(',')) {
                                    let url = await getIpfsGetWay(schemaHash)
                                    try {
                                        if (url) {
                                            let res = await axios.get(url)
                                            if (res) {
                                                tempSchema.push({
                                                    ...res.data,
                                                    timestamp: data.timestamp,
                                                    id: data.id,
                                                    hash: schemaHash
                                                })
                                                tempSchema = tempSchema.filter(d => d.displayName)
                                                schemas.set(tempSchema)
                                                ipfsLoading = false;
                                            }
                                        }
                                    } catch (err) {
                                        // console.log(err)
                                    }
                                }
                            }

                        })
                    }
                }

            } catch (err) {
                console.log(err)
            }
        }
    }

    async function mint() {
        try {
            error = ""

            if (!parseFloat(amount)) {
                error = "Zero amount"
                return;
            }
            const hasRoleDepositor = await hasRole($vault, $account, "DEPOSITOR")
            if (!hasRoleDepositor.error) {
                let structure = await submitForm()
                if (structure) {

                    let fileHashesList = fileHashes.map(f => f.hash)
                    let encodedStructure = encodeCBORStructure(structure, selectedSchema.hash)

                    let shareRatio = ONE
                    const shares = ethers.utils.parseEther(amount.toString());


                    try {
                        let structureIpfs = await upload(structure)
                        let encodedHashList = cborEncode([...fileHashesList,
                            structureIpfs?.Hash].toString(), MAGIC_NUMBERS.OA_HASH_LIST)
                        const meta = "0x" + MAGIC_NUMBERS.RAIN_META_DOCUMENT.toString(16).toLowerCase() +
                            encodedStructure + encodedHashList
                        const tx = await $vault
                            .connect(signer)
                            ["mint(uint256,address,uint256,bytes)"](shares, $account, shareRatio, arrayify(meta));
                        await showPromptSFTCreate(tx, {errorText: "Mint failed", successText: "Mint successful!"})
                        let wait = await tx.wait()
                        if (wait.status === 1) {
                            let interval = setInterval(async () => {
                                let deposits = await getSubgraphData($activeNetwork, {id: $vault.address.toLowerCase()}, DEPOSITS_QUERY, 'offchainAssetReceiptVault')
                                deposits = deposits?.data?.offchainAssetReceiptVault.deposits

                                if (deposits && deposits.length) {
                                    if (wait.blockNumber.toString() === deposits[0].transaction.blockNumber) {
                                        let data = await getSubgraphData($activeNetwork, {id: $vault.address.toLowerCase()}, AUDIT_HISTORY_DATA_QUERY, 'offchainAssetReceiptVault')
                                        if (auditHistory) {
                                            let temp = data.data.offchainAssetReceiptVault
                                            auditHistory.set(temp)
                                        } else {
                                            auditHistory.set({})
                                        }
                                        transactionSuccess.set(true)
                                        transactionInProgress.set(false)
                                        clearInterval(interval)
                                        amount = 0;
                                    }
                                }
                            }, 2000)
                        } else {
                            transactionError.set(true)
                        }
                        fileDropped.set({})
                    } catch (err) {
                        console.log(err)
                    }
                }
            } else {
                error = hasRoleDepositor.error
            }

        } catch (er) {
            error = "Something Went Wrong"
            console.log(er.reason || er.message || er)
        }
        shouldDisable = false;
    }


    const upload = async (data, type) => {
        error = ""
        uploadBtnLoading.set(true)

        let savedUsername = localStorage.getItem('ipfsUsername');
        let savedPassword = localStorage.getItem('ipfsPassword');
        if (!savedPassword || !savedUsername) {
            showAuth = true;
            await waitForCredentials()
        } else {
            username = savedUsername;
            password = savedPassword
        }


        let formData = new FormData();

        type === "file" ? formData.append('file', data.file) : formData.append('file', data)

        const requestArr = IPFS_APIS.map((url) => {
            return axios.request({
                url,
                auth: {
                    username,
                    password
                },
                method: 'post',
                headers: {
                    "Content-Type": `multipart/form-data;`,
                },
                data: formData,
                onUploadProgress: ((p) => {
                    console.log(`Uploading...  ${p.loaded} / ${p.total}`);
                }),
                withCredentials: true,
            })
        });

        let respAll = await Promise.allSettled(requestArr)

        respAll.map(response => {
            if (response.status === "rejected") {
                reportError(response.reason)
            } else return response
        })

        let resolvedPromise = respAll.find(r => r.status === "fulfilled")
        if (resolvedPromise) {

            localStorage.setItem('ipfsUsername', username);
            localStorage.setItem('ipfsPassword', password);
            if (type === "file" && data.file.size) {
                fileHashes = [...fileHashes, {prop: data.prop, hash: resolvedPromise.value.data.Hash}]//.set(resolvedPromise.value.data.Hash)
            }
        } else {
            error = "Something went wrong"
        }
        uploadBtnLoading.set(false)
        username = ""
        password = ""
        return resolvedPromise?.value.data
    };

    $: ($fileDropped.file && $fileDropped.file.size) && upload($fileDropped, "file");
    $: $activeNetwork.chainId && getSchemas()

    // $: $fileHash && getCertificateUrl($fileHash);

    async function handleSchemaSelect(event) {
        selectedSchema = event.detail.selected
        const form = document.querySelector('.svelte-schema-form'); // select the form element
        if (form) {
            form.reset();
        }
    }

    let certificateUrl = ''

    async function getCertificateUrl() {
        certificateUrl = await getIpfsGetWay($fileHash)
    }

    async function submitForm() {
        //get form data
        let formDataArr = jQuery(".svelte-schema-form").serializeArray()
        const json = {};
        formDataArr.map(a => {
            json[a.name] = a.value
        })
        if (fileHashes.length) {
            fileHashes.map(data => {
                json[data.prop] = data.hash
            })
        }
        let formFields = Object.keys(json)

        let formNotEmpty = formFields.some(f => json[f] !== "")
        let response = null;
        if (formNotEmpty) {
            response = JSON.stringify(json)
        }

        return response
    }

    async function waitForCredentials() {
        const confirm = document.getElementById("ok-button")

        promise = new Promise((resolve) => {
            confirm.addEventListener('click', resolve)
        })
        return await promise.then(() => {
                showAuth = false;
            }
        )
    }

</script>

<div class="mint-container relative">
  <div class="header-buttons">
    <button type="button" class="default-btn mr-2" on:click={()=>{navigate('#new-asset-class')}}>
      New asset class
    </button>
    <button type="button" class="default-btn mr-2" disabled={!$schemas.length}
            on:click={()=>{navigate('#asset-classes')}}>
      Asset class list
    </button>
    <button class="default-btn" on:click={()=>{navigate('#audit-history')}}>
      Audit history
    </button>
  </div>
  {#if (!showAuth)}

    <div class="audit-info-container basic-frame-parent">
      <div class="form-frame basic-frame">
        <label class="f-weight-700 text-center mb-3">{$tokenName || ""}</label>
        <MintInput bind:amount={amount} amountLabel={"Mint amount"} />
        {#if $schemas.length}
          <div class="schema">
            <div class="schema-dropdown flex justify-between mb-6">
              <label class="f-weight-700 custom-col">Asset class</label>
              <Select options={$schemas}

                      on:select={handleSchemaSelect}
                      label={'Choose'} className={"inputSelect"} expandIcon={icons.expand_black}></Select>

            </div>
            {#if selectedSchema?.displayName}
              <span class="title f-weight-700">Asset info.</span>

              <SchemaForm schema={selectedSchema.schema}></SchemaForm>
              <div class="error">{$schemaError}</div>
              {#if $fileHash}
                <div class="file-uploaded">
                  <span class="file-load-success">Pie Certificate loaded successfully</span>
                  <div class="link-to-file underline">
                    <span>To Link</span>
                    <a href={certificateUrl} target="_blank">
                      <img src="{icons.show}" alt="view file" class="btn-hover">
                    </a>
                    <!--                  <img src="{icons.delete_icon}" alt="remove file" class="btn-hover">-->
                  </div>
                </div>
              {/if}
              {#if $uploadBtnLoading}
                <div class="sf-upload-spinner">
                  <SftLoader width="50"></SftLoader>
                </div>
              {/if}
            {/if}

          </div>
        {/if}
        {#if !$schemas.length}
          <div class="empty-schemas">
            <span>Please create a new asset class to mint </span>
          </div>
        {/if}

      </div>

    </div>

    <div class="error">{error}</div>
    <div class="info-text f-weight-700">After minting an amount you receive 2 things: ERC1155 token (NFT) and an ERC20
      (FT)
    </div>

    <button class="mint-btn btn-solid" on:click={() => mint()}
            disabled="{!selectedSchema.hash || !parseFloat(amount)}">
      Mint
    </button>
  {/if}
  <!--{#if showAuth}-->
  <div class={showAuth  ? 'auth show' : 'auth hide'}>
    <div class="display-flex space-between">
      <label>Username:</label>
      <input class="default-input" type="text" bind:value={username} autofocus/>
    </div>
    <div class="display-flex space-between">
      <label>Password:</label>
      <input class="default-input" type="password" bind:value={password}/>
    </div>
    <button id="ok-button" class="default-btn" disabled={!password || !username}>OK</button>
  </div>
  <!--{/if}-->
</div>

<style>
    .mint-container {
        padding-top: 17px;
        display: flex;
        flex-direction: column;
        align-items: center;
        height: 100%;
    }

    .header-buttons {
        margin-bottom: 15px;
        display: flex;
        width: 100%;
        justify-content: right;
        padding: 0 12px 0 12px;
    }

    .form-frame {
        padding: 20px;
        display: flex;
        text-align: left;
        flex-direction: column;
        font-weight: 400;
        font-size: 16px;
        line-height: 27px;
        min-height: 325px;
    }

    .form-frame .title {
        text-align: center;
    }

    .info-text {
        font-size: 12px;
        line-height: 20px;
    }

    .mint-btn {
        width: 413px;
        margin-top: 30px;
    }

    .empty-schemas button {
        margin-top: 5px;
    }

    .schema table {
        width: 100%;
    }

    .schema table td:nth-child(2) {
        text-align: right;
    }

    .file-load-success {
        color: #1EA51B
    }

    .file-uploaded {
        display: flex;
        justify-content: space-between;
    }

    .custom-col {
        margin-right: 25px;
    }

    .auth {
        background: #FFFFFF;
        box-shadow: 0 1px 4px rgba(0, 0, 0, 0.25);
        border-radius: 10px;
        display: flex;
        flex-direction: column;
        justify-content: left;
        padding: 40px;
        width: calc(100% - 80px);
    }

    .default-input {
        width: 250px;
    }

    .show {
        display: flex;
    }

    .hide {
        display: none;
    }

    .empty-schemas {
        color: #DD1212;
        text-align: center;
    }

    .schema-dropdown {
        align-items: center;
    }

</style>

