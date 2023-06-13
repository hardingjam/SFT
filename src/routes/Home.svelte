<script>
    import SftTile from "../components/SftTile.svelte";
    import SftList from "../components/SftList.svelte";
    import {
        activeNetwork,
        ethersData,
        sftInfo,
        tokens, transactionError, transactionInProgress, transactionInProgressShow, transactionSuccess,
        vault
    } from "../scripts/store.js";
    import {IPFS_APIS, MAGIC_NUMBERS} from '../scripts/consts.js';
    import axios from 'axios';
    import {
        cborEncode,
        encodeCBOR, getContract,
        getSubgraphData,
        showPrompt,
        showPromptSFTCreate
    } from '../scripts/helpers.js';
    import {arrayify} from 'ethers/lib/utils.js';
    import {RECEIPT_VAULT_INFORMATION_QUERY} from '../scripts/queries.js';
    import contractAbi from '../contract/OffchainAssetVaultAbi.json';

    let username;
    let password;
    let view = "tile";

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
        // error = ""

        let savedUsername = localStorage.getItem('ipfsUsername');
        let savedPassword = localStorage.getItem('ipfsPassword');
        if (!savedPassword || !savedUsername) {
            // showAuth = true;
            // await waitForCredentials()
            console.log("no creds")
        } else {
            username = savedUsername;
            password = savedPassword
        }

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
    };


    // async function waitForCredentials() {
    //     const confirm = document.getElementById("ok-button")
    //
    //     promise = new Promise((resolve) => {
    //         confirm.addEventListener('click', resolve)
    //     })
    //     return await promise.then(() => {
    //             showAuth = false;
    //         }
    //     )
    // }

</script>
<div class="flex flex-col w-full items-center home-container">
  <div class="views flex justify-end w-full space-x-6 pr-20 pt-5">
    <div class="cursor-pointer" on:click={()=>{view = "tile"}}>
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M1 2C1 1.44772 1.44772 1 2 1H6C6.55228 1 7 1.44772 7 2V6C7 6.55228 6.55228 7 6 7H2C1.44772 7 1 6.55228 1 6V2Z"
          stroke="#9D9D9D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path
          d="M1 2C1 1.44772 1.44772 1 2 1H6C6.55228 1 7 1.44772 7 2V6C7 6.55228 6.55228 7 6 7H2C1.44772 7 1 6.55228 1 6V2Z"
          stroke="black" stroke-opacity="0.2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path
          d="M1 12C1 11.4477 1.44772 11 2 11H6C6.55228 11 7 11.4477 7 12V16C7 16.5523 6.55228 17 6 17H2C1.44772 17 1 16.5523 1 16V12Z"
          stroke="#9D9D9D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path
          d="M1 12C1 11.4477 1.44772 11 2 11H6C6.55228 11 7 11.4477 7 12V16C7 16.5523 6.55228 17 6 17H2C1.44772 17 1 16.5523 1 16V12Z"
          stroke="black" stroke-opacity="0.2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path
          d="M11 2C11 1.44772 11.4477 1 12 1H16C16.5523 1 17 1.44772 17 2V6C17 6.55228 16.5523 7 16 7H12C11.4477 7 11 6.55228 11 6V2Z"
          stroke="#9D9D9D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path
          d="M11 2C11 1.44772 11.4477 1 12 1H16C16.5523 1 17 1.44772 17 2V6C17 6.55228 16.5523 7 16 7H12C11.4477 7 11 6.55228 11 6V2Z"
          stroke="black" stroke-opacity="0.2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path
          d="M11 12C11 11.4477 11.4477 11 12 11H16C16.5523 11 17 11.4477 17 12V16C17 16.5523 16.5523 17 16 17H12C11.4477 17 11 16.5523 11 16V12Z"
          stroke="#9D9D9D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path
          d="M11 12C11 11.4477 11.4477 11 12 11H16C16.5523 11 17 11.4477 17 12V16C17 16.5523 16.5523 17 16 17H12C11.4477 17 11 16.5523 11 16V12Z"
          stroke="black" stroke-opacity="0.2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </div>
    <div class="cursor-pointer" on:click={()=>{view = "list"}}>
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M1 6V2C1 1.44772 1.44772 1 2 1H16C16.5523 1 17 1.44772 17 2V6M1 6H17M1 6V12M17 6V12M17 12V16C17 16.5523 16.5523 17 16 17H2C1.44772 17 1 16.5523 1 16V12M17 12H1"
          stroke="#9D9D9D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path
          d="M1 6V2C1 1.44772 1.44772 1 2 1H16C16.5523 1 17 1.44772 17 2V6M1 6H17M1 6V12M17 6V12M17 12V16C17 16.5523 16.5523 17 16 17H2C1.44772 17 1 16.5523 1 16V12M17 12H1"
          stroke="black" stroke-opacity="0.2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </div>
  </div>
  <div class={$sftInfo? "content mt-5 w-full" : "content mt-5 w-8/12" }>
    {#if (view === "tile")}
      <div class="grid grid-cols-2 gap-5">
        {#each $tokens as sft }
          <SftTile sft={sft} on:fileDrop={deployImage}></SftTile>
        {/each}
      </div>
    {/if}
    {#if (view === "list")}
      <table class="w-full leading-7 text-center token-list-table">
        <thead>
        <tr class="text-white text-bold">
          <th></th>
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
          <SftList {sft}></SftList>
        {/each}
        </tbody>
      </table>

    {/if}
  </div>
</div>
<style>
    .home-container {
        padding-top: 3.5rem;
    }

    .token-list-table thead tr {
        background-color: #9196C5;
    }

    .token-list-table thead tr:first-child th:first-child {
        border-top-left-radius: 10px;
    }

    .token-list-table thead tr:first-child th:last-child {
        border-top-right-radius: 10px;
    }
</style>


