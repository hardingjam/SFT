<script>
    import {
        bytesToMeta,
        cborDecode,
        cborEncode,
        encodeCBORStructure,
        getContract,
        getSubgraphData,
        hasRole,
        navigate,
        showPrompt, showPromptSFTCreate, toSentenceCase
    } from '../scripts/helpers.js';
    import {
        activeNetwork,
        pageTitle,
        selectedReceipt, tokenName, transactionInProgress,
        transactionInProgressShow,
        vault, data, ethersData, account, transactionSuccess, transactionError, fileDropped, schemas
    } from '../scripts/store.js';
    import axios from 'axios';
    import {IPFS_APIS, IPFS_GETWAY, MAGIC_NUMBERS} from '../scripts/consts.js';
    import Schema from '../components/Schema.svelte';
    import jQuery from 'jquery';
    import {ethers} from 'ethers';
    import {
        RECEIPT_INFORMATIONS_QUERY
    } from '../scripts/queries.js';
    import receiptContractAbi from '../contract/ReceiptContractAbi.json';
    import {arrayify} from 'ethers/lib/utils.js';
    import {mock} from '../test/mock.js';
    import Connect from '../components/Connect.svelte';

    pageTitle.set("New revision")

    let loading = false;
    let fileHashes = []
    let schema = {}
    let username = '';
    let password = '';
    let error;
    let uploadedData;
    let structure;
    let currentStructure;

    let {signer} = $ethersData;

    $:$selectedReceipt && getSchema()
    $:$activeNetwork && getReceiptData()

    async function getSchema() {

        let schemaHash = localStorage.getItem("selectedReceiptSchema")
        let assetClass = !!window.Cypress ?
            mock.schemas.find(s => s.hash === schemaHash.toString()) :
            $schemas.find(s => s.hash === schemaHash.toString())
        schema = {...assetClass, hash: schemaHash}
    }

    function setFormInputs(values) {
        // Get all input elements inside the form with the class "svelte-schema-form"
        const formInputs = document.querySelectorAll('.svelte-schema-form input');
        // Iterate over the input elements and reset their values
        formInputs.forEach(input => {
            if (input.type === 'text' || input.type === 'email' || input.type === 'password' || input.type === 'date' ||
                input.type === 'number') {

                if (!values) {
                    input.value = '';
                } else {
                    input.value = values[input.id];
                }
            } else if (input.type === 'file') {

                if (values) {
                    fileHashes = [...fileHashes, {prop: input.id, hash: values[input.id]}]
                    const linkURL = values[input.id] ? IPFS_GETWAY + values[input.id] : null;

                    // Create the link (<a>) element
                    if (linkURL) {
                        const linkElement = document.createElement('a');
                        linkElement.href = linkURL;
                        linkElement.target = '_blank';
                        linkElement.classList.add('display-flex');
                        linkElement.classList.add('absolute');
                        linkElement.classList.add('right-0');
                        linkElement.classList.add('file-link');
                        linkElement.innerHTML = 'original&nbsp;'

                        // Create the image (<img>) element
                        const spanElement = document.createElement('span');
                        spanElement.textContent = toSentenceCase(input.id)//+ toSentenceCase(input.id)
                        spanElement.classList.add('underline');


                        // Append the image element to the link element
                        linkElement.appendChild(spanElement);

                        // Append the link element to the container
                        input.parentNode.appendChild(linkElement);
                    }

                } else {
                    const fileLinks = document.getElementsByClassName('file-link')
                    for (let i = 0; i < fileLinks.length; i++) {
                        fileLinks[i].classList.add('hide');
                    }
                }

            }
        });
    }

    async function createNewRevision() {
        let receiptContractAddress = $data.offchainAssetReceiptVault.receiptContractAddress
        let receiptContract = await getContract($activeNetwork, receiptContractAddress, receiptContractAbi, $ethersData.signerOrProvider)

        const hasRoleDepositor = await hasRole($vault, $account, "DEPOSITOR")
        if (!hasRoleDepositor.error) {
            if (uploadedData) {

                let fileHashesList = fileHashes.map(f => f.hash)
                let encodedStructure = encodeCBORStructure(structure, schema.hash)

                try {
                    let encodedHashList = cborEncode([...fileHashesList,
                        uploadedData?.Hash].toString(), MAGIC_NUMBERS.OA_HASH_LIST)
                    const meta = "0x" + MAGIC_NUMBERS.RAIN_META_DOCUMENT.toString(16).toLowerCase() +
                        encodedStructure + encodedHashList

                    const tx = await receiptContract
                        .connect(signer).receiptInformation($selectedReceipt.receipt.receiptId, arrayify(meta));
                    await showPromptSFTCreate(tx)
                    let wait = await tx.wait()
                    if (wait.status === 1) {
                        let interval = setInterval(async () => {
                            let resp = await getSubgraphData($activeNetwork, {id: $selectedReceipt.receipt.id.toLowerCase()}, RECEIPT_INFORMATIONS_QUERY, 'receipt')
                            let receiptInformations;
                            if (resp && resp.data) {
                                receiptInformations = resp.data.receipt.receiptInformations
                            }
                            if (receiptInformations && receiptInformations.length) {
                                let blockNumbers = receiptInformations.map(r => r.transaction.blockNumber)
                                if (blockNumbers.indexOf(wait.blockNumber.toString()) !== -1) {
                                    transactionSuccess.set(true)
                                    transactionInProgress.set(false)
                                    clearInterval(interval)
                                    setFormInputs()

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


    }

    const upload = async () => {
        structure = await getFormData()
        error = ""
        let savedUsername = localStorage.getItem('ipfsUsername');
        let savedPassword = localStorage.getItem('ipfsPassword');
        if (!savedPassword || !savedUsername) {
            navigate("#ipfs")
        } else {
            username = savedUsername;
            password = savedPassword

            let formData = new FormData();

            formData.append('file', structure)

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
            if (!resolvedPromise) {
                error = "Something went wrong"
            }
            username = ""
            password = ""
            transactionInProgressShow.set(false)
            transactionInProgress.set(false)

            uploadedData = resolvedPromise?.value.data
        }
    };


    async function getFormData() {
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

    async function getReceiptData() {
        let variables
        if (!$selectedReceipt.receipt) {
            let receiptId = $vault.address + "-" + window.location.hash.split("/")[1]
            variables = {id: receiptId}
        } else {
            variables = {id: $selectedReceipt.receipt.id}
        }
        loading = true;
        let resp = await getSubgraphData($activeNetwork, variables, RECEIPT_INFORMATIONS_QUERY, 'receipt')
        if (resp && resp.data && resp.data.receipt) {
            selectedReceipt.set(resp.data)

            let cborDecodedInformation = cborDecode($selectedReceipt.receipt.receiptInformations[0].information.slice(18))
            currentStructure = bytesToMeta(cborDecodedInformation[0].get(0), "json")
            setFormInputs(currentStructure)
        }
    }

    function handleFileUpload(event) {
        fileHashes = event.detail.fileHashes
    }


</script>

<div class="new-revision min-w-[40rem] min-h-[30rem]">
  <div class="card-header f-weight-700">
    {$tokenName}
  </div>
  {#if $account}
    <div class="info-container card-content">
      <div class="flex justify-between w-full mb-6 items-end">
        <span class="f-weight-700">Asset class</span>
        <div class="asset-class"> {schema.displayName}</div>
      </div>
      <div class="text-left schema-container">
        <Schema schema={schema} on:fileUpload={handleFileUpload}></Schema>
      </div>
      <div class="flex justify-between w-full mb-6 items-center mt-6">
        <span class="f-weight-700">Amount</span>
        <div class="asset-class"> {$selectedReceipt && $selectedReceipt.receipt ?
            ethers.utils.formatUnits($selectedReceipt?.receipt.deposits[0].amount, 18) :
            0}</div>
      </div>
      <div class="default-btn self-end" on:click={()=>{upload()}}>Upload</div>
    </div>
    <div class="footer">
      <div class="info f-weight-700 mb-5">Changes to the asset are permanent on IPFS and Blockchain</div>
      <button class="btn-solid w-full ok-btn" on:click={()=>{createNewRevision()}} disabled="{!uploadedData}">OK
      </button>
    </div>
  {:else}
    <Connect action="create new revision" className="pt-20"></Connect>
  {/if}
</div>

<style>
    .info-container {
        min-width: 700px;
    }

    .new-revision {
        min-height: 500px;
        border-radius: 10px;
        background: #FFF;
    }

    .asset-class {
        border: 2px solid #ECECEC;
        border-radius: 5px;
        color: #000000;
        background: #ECECEC;
        width: 360px;
        height: 27px;
        margin-top: 8px;
        padding: 0 5px;
        text-align: left;
    }

    .footer {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        margin-bottom: 30px;
    }

    .info {
        font-size: 12px;
    }

    .ok-btn {
        width: calc(100% - 160px)
    }
</style>
