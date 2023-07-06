<script>
    import SftTile from "../components/SftTile.svelte";
    import SftList from "../components/SftList.svelte";
    import SftLoader from "../components/SftLoader.svelte";

    import {
        account,
        accountRoles,
        activeNetwork, auditHistory,
        ethersData, roles, schemas,
        sftInfo,
        tokens, transactionError, transactionInProgress, transactionInProgressShow, transactionSuccess,
        vault
    } from "../scripts/store.js";
    import {IPFS_APIS, MAGIC_NUMBERS} from '../scripts/consts.js';
    import axios from 'axios';
    import {
        cborEncode,
        encodeCBOR, getContract,
        getSubgraphData, navigate, setAccountRoles,
        showPrompt,
        showPromptSFTCreate
    } from '../scripts/helpers.js';
    import {arrayify} from 'ethers/lib/utils.js';
    import {AUDIT_HISTORY_DATA_QUERY, RECEIPT_VAULT_INFORMATION_QUERY, VAULTS_QUERY} from '../scripts/queries.js';
    import contractAbi from '../contract/OffchainAssetVaultAbi.json';
    import {icons} from '../scripts/assets.js';
    import CredentialLinksEditor from '../components/CredentialLinksEditor.svelte';
    import TileView from '../components/TileView.svelte';

    let username;
    let password;
    let view = "tile";
    let credentialLinks = {}
    let isEditorOpen = false;

    async function deployImage(event) {
        let file = event.detail.file
        let vault = await getContract($activeNetwork, event.detail.vault.address, contractAbi, $ethersData.signerOrProvider)
        try {
            try {
                let uploadResult = await upload(file)

                let fileHash = {
                    hash: uploadResult.Hash.toString()
                }

                let encodedFile = encodeCBOR(fileHash, MAGIC_NUMBERS.OA_TOKEN_IMAGE)

                let encodedHashList = cborEncode(
                    [uploadResult?.Hash].toString(),
                    MAGIC_NUMBERS.OA_HASH_LIST
                );
                const meta = "0x" + MAGIC_NUMBERS.RAIN_META_DOCUMENT.toString(16).toLowerCase() + encodedFile +
                    encodedHashList

                let transaction = await vault.connect($ethersData.signer).receiptVaultInformation(arrayify(meta))
                await showPromptSFTCreate(transaction)

                let wait = await transaction.wait()
                if (wait.status === 1) {
                    let interval = setInterval(async () => {
                        let informationResp = await getSubgraphData($activeNetwork, {}, RECEIPT_VAULT_INFORMATION_QUERY, 'receiptVaultInformations')
                        informationResp = informationResp?.data?.receiptVaultInformations
                        if (informationResp && informationResp.length) {
                            if (wait.blockNumber.toString() === informationResp[0].transaction.blockNumber) {
                                // schemas.set(await getSchemas($activeNetwork, $vault, $deposits))
                                transactionSuccess.set(true)
                                transactionInProgress.set(false)
                                clearInterval(interval)
                                //set image
                                await getTokens()
                            }
                        }
                    }, 2000)

                } else {
                    transactionError.set(true)
                }

            } catch (err) {
                console.log(err)
            }
        } catch (e) {
            console.log(e.message)
        }

    }

    const upload = async (data) => {
        let savedUsername = localStorage.getItem('ipfsUsername');
        let savedPassword = localStorage.getItem('ipfsPassword');
        if (!savedPassword || !savedUsername) {
            navigate("#ipfs");
            console.log("no creds")
        } else {
            username = savedUsername;
            password = savedPassword

            let formData = new FormData();

            formData.append('file', data)


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
                    onUploadProgress: (async (p) => {
                        await showPrompt(null, {topText: "Uploading to IPFS, please wait", noBottomText: true})
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

            } else {
                console.log("Something went wrong")
            }
            username = ""
            password = ""
            transactionInProgressShow.set(false)
            transactionInProgress.set(false)

            return resolvedPromise?.value.data
        }


    };

    async function getTokens() {
        getSubgraphData($activeNetwork, {}, VAULTS_QUERY, "offchainAssetReceiptVaults").then((res) => {
            if ($activeNetwork) {
                let temp = res.data.offchainAssetReceiptVaults;
                tokens.set(temp);
            } else {
                tokens.set([])
            }
        });
    }

    async function handleTokenSelect(event) {
        let token = event.detail.token
        if (token.address === $vault.address) {
            return
        }
        await showPrompt(null, {topText: "SFT loading, please wait", noBottomText: true})
        let contract = await getContract($activeNetwork, token.address, contractAbi, $ethersData.signerOrProvider)
        if (contract) {
            vault.set(contract)
            schemas.set([])
            localStorage.setItem("vaultAddress", token.address)
            let auditHistoryData = await getAuditHistoryData(token.address)
            auditHistory.set(auditHistoryData)
            accountRoles.set(await setAccountRoles($roles, $account));
            transactionInProgressShow.set(false)
            transactionInProgress.set(false)
            navigate("#roles", {clear: true})
        }
    }

    async function getAuditHistoryData(token) {
        let data = await getSubgraphData($activeNetwork, {id: token.toLowerCase()}, AUDIT_HISTORY_DATA_QUERY, 'offchainAssetReceiptVault')
        if (data) {
            return data.data.offchainAssetReceiptVault
        } else return {}
    }

    function handleInputs(event) {
        credentialLinks = event.detail
        console.log(1111,credentialLinks)
    }

</script>
<div class="flex flex-col w-full items-center home-container relative">
  <div class="views flex justify-end w-full space-x-3 pr-5 pt-5">
    <div class="cursor-pointer" on:click={()=>{view = "tile"}}>
      <img src={icons.tile_view} alt="tiles">
    </div>
    <div class="cursor-pointer" on:click={()=>{view = "list"}}>
      <img src={icons.list_view} alt="tiles">
    </div>
  </div>
  {#if !$tokens.length}
    <div class="loader">
      <SftLoader></SftLoader>
    </div>
  {/if}
  {#if $tokens.length}
    <div class="{$sftInfo ? 'w-full' : view === 'list' ? 'list-view': 'w-8/12'} content mt-5 mr-5">
      {#if (view === "tile")}
        <TileView tokens={$tokens} on:tokenSelect={handleTokenSelect}
                  on:inputValueChange={handleInputs} on:fileDrop={deployImage}/>
      {/if}
      {#if (view === "list")}
        {#if !isEditorOpen}
          <table class="w-full leading-7 text-center token-list-table">
            <thead>
            <tr class="text-white text-bold">
              <th style="width: 99px"></th>
              <th>Token name</th>
              <th>Token symbol</th>
              <th>Creation date</th>
              <th>Number of holders</th>
              <th>Token supply</th>
              <th>Auditor(s)</th>
              <th>Name of issuer</th>
            </tr>
            </thead>
            <tbody>
            {#each $tokens as sft }
              <SftList {sft} on:fileDrop={deployImage} on:tokenSelect={handleTokenSelect}
                       on:editClick={()=>{isEditorOpen = true}} {isEditorOpen}></SftList>
            {/each}
            </tbody>
          </table>
        {/if}
        {#if isEditorOpen}
          <div class="editor bg-amber-200">
            <CredentialLinksEditor on:inputValueChange={handleInputs} {sft}/>
          </div>
        {/if}

      {/if}
      <div class="note">
        <span class="py-2">Note: token creation is permissionless and so all the data on this site could be malicious/ scam, please do your own research before downloading any files or buying any tokens. </span>
      </div>
    </div>
  {/if}
</div>
<style>
    .home-container {
        padding-top: 3.5rem;
    }

    .token-list-table thead th {
        background-color: #9196C5;
    }

    .token-list-table thead tr:first-child th:first-child {
        border-top-left-radius: 10px;
    }

    .token-list-table thead tr:first-child th:last-child {
        border-top-right-radius: 10px;
    }

    .loader {
        margin-left: 203px;
    }

    .list-view {
        align-self: end;
        width: calc(100% - 243px);
        margin-right: 20px;
    }

    .note {
        color: #575757;
        position: sticky;
        bottom: 0;
        font-size: 14px;
        text-align: center;
        background: #DCDBDD;
        padding: 0.5rem 0;
    }

</style>


