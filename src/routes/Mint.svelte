<script>
    import MintInput from "../components/MintInput.svelte";
    import {ethers} from "ethers";
    import {
        vault,
        fileHash,
        fileDropped,
        uploadBtnLoading,
        activeNetwork,
        schemas,
        schemaError,
        transactionError,
        transactionSuccess,
        transactionHash,
        transactionInProgressShow,
        transactionInProgress
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
        TRANSACTION_IN_PROGRESS_TEXT,
        VIEW_ON_EXPLORER_TEXT
    } from "../scripts/consts.js";
    import SchemaForm from "../components/SchemaForm.svelte"
    import {
        cborDecode,
        cborEncode,
        encodeCBORStructure,
        getIpfsGetWay,
        getSubgraphData,
        hasRole, sanitizeJson, showPrompt,
    } from "../scripts/helpers";
    import jQuery from 'jquery';
    import SftLoader from "../components/SftLoader.svelte";
    import {beforeUpdate, onMount} from "svelte";
    import {VAULT_INFORMATION_QUERY} from "../scripts/queries.js";
    import {arrayify} from "ethers/lib/utils.js";

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
                            let schemaHash = cborDecodedInformation[1].get(0)
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
                    let sanitizedStructure = sanitizeJson(structure);
                    let encodedStructure = encodeCBORStructure(sanitizedStructure, selectedSchema.hash)

                    let shareRatio = ONE
                    const shares = ethers.utils.parseEther(amount.toString());


                    try {
                        let structureIpfs = await upload(sanitizedStructure)
                        let encodedHashList = cborEncode([...fileHashesList, structureIpfs?.Hash].toString(), MAGIC_NUMBERS.OA_HASH_LIST)
                        const meta = "0x" + MAGIC_NUMBERS.RAIN_META_DOCUMENT.toString(16).toLowerCase() + encodedStructure + encodedHashList
                        const tx = await $vault
                            .connect(signer)
                            ["mint(uint256,address,uint256,bytes)"](shares, $account, shareRatio, arrayify(meta));
                        await showPrompt(tx)
                        amount = 0;
                        fileDropped.set({})
                    } catch (err) {
                        transactionError.set(true)
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

<div class="mint-container">
  <div class="header-buttons">
    <button type="button" class="default-btn mr-2" disabled={!$schemas.length}
            on:click={()=>{navigateTo('#asset-classes')}}>
      Asset classes
    </button>
    <button type="button" class="default-btn mr-2" on:click={()=>{navigateTo('#new-asset-class')}}>
      New asset class
    </button>
    <button class="default-btn" on:click={()=>{navigateTo('#audit-history')}}>
      Audit history
    </button>
  </div>
  {#if (!showAuth)}

    <MintInput bind:amount={amount} amountLabel={"Mint amount"}/>
    <div class="audit-info-container basic-frame-parent">
      <div class="audit-info basic-frame">
        {#if $schemas.length}
          <div class="schema">
            <div class="schema-dropdown">
              <label class="f-weight-700 custom-col">Asset class:</label>
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
                  <div class="link-to-file">
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
    <div class="info-text f-weight-700">After Minting an amount you receive 2 things: ERC1155 token (NFT) and an ERC20
      (FT)
    </div>
    <button class="mint-btn btn-solid" on:click={() => mint()} disabled="{!selectedSchema.hash || !parseFloat(amount)}">
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
    }

    .header-buttons {
        margin-bottom: 15px;
        display: flex;
        width: 100%;
        justify-content: right;
        padding: 0 12px 0 12px;
    }

    .audit-info {
        padding: 20px 60px;
        display: flex;
        text-align: left;
        flex-direction: column;
        font-weight: 400;
        font-size: 16px;
        line-height: 27px;
        min-height: 142px;
    }

    .audit-info .title {
        text-align: center;
    }

    .info-text {
        font-size: 12px;
        line-height: 20px;
    }

    .mint-btn {
        width: calc(100% - 70px);
        margin-top: 10px;
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
        width: 100%;
        display: flex;
    }

</style>

