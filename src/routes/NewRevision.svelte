<script>
    import DefaultFrame from '../components/DefaultFrame.svelte';
    import {icons} from '../scripts/assets.js';
    import {getSubgraphData, navigate} from '../scripts/helpers.js';
    import {activeNetwork, pageTitle, selectedReceipt, vault} from '../scripts/store.js';
    import axios from 'axios';
    import {IPFS_GETWAY} from '../scripts/consts.js';
    import Schema from '../components/Schema.svelte';
    import jQuery from 'jquery';
    import {ethers} from 'ethers';
    import {RECEIPT_INFORMATION_QUERY} from '../scripts/queries.js';

    pageTitle.set("New revision")

    let loading = false;
    let fileHashes = []
    let schema = {}

    $:$selectedReceipt && getSchema()
    $:$activeNetwork && getReceiptData()

    async function getSchema() {
        console.log($selectedReceipt);
        let selectedSchemaHash = localStorage.getItem("selectedReceiptSchema")
        let res = await axios.get(`${IPFS_GETWAY}${selectedSchemaHash}`)
        if (res) {
            schema = res.data
        }
    }

    async function createNewRevision() {

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

    async function getReceiptData() {
        let variables
        if (!$selectedReceipt.receipt) {
            let receiptId = $vault.address + "-" + window.location.hash.split("/")[1]
            variables = {id: receiptId}
        } else {
            variables = {id: $selectedReceipt.receipt.id}
        }
        loading = true;
        let resp = await getSubgraphData($activeNetwork, variables, RECEIPT_INFORMATION_QUERY, 'receipt')
        if (resp && resp.data && resp.data.receipt) {
            selectedReceipt.set(resp.data)
        }
    }


</script>

<div class="new-revision">
  <DefaultFrame>
    <div slot="back_button" class="display-flex">
      <button class="btn-hover mr-3"
              on:click={()=>{navigate(`#asset-information/${$selectedReceipt.receipt.receiptId}`)}}>
        <img src={icons.back} alt="back">
      </button>
    </div>
    <div slot="content" class="info-container">
      <div class="flex justify-between w-full mb-6 items-end">
        <span class="f-weight-700">Asset class</span>
        <div class="asset-class"> {schema.displayName}</div>
      </div>
      <div class="text-left schema-container">
        <Schema schema={schema}></Schema>
      </div>
      <div class="flex justify-between w-full mb-6 items-center mt-6">
        <span class="f-weight-700">Amount</span>
        <div class="asset-class"> {$selectedReceipt && $selectedReceipt.receipt ?
            ethers.utils.formatUnits($selectedReceipt?.receipt.deposits[0].amount, 18) :
            0}</div>
      </div>
      <div class="default-btn float-right mt-6">Upload</div>
    </div>
  </DefaultFrame>
  <div class="footer">
    <div class="info f-weight-700 mb-5">Changed to the asset are permanent on IPFS and Blockchain</div>
    <div class="btn-solid w-full ok-btn">OK</div>
  </div>
</div>

<style>
    .info-container {
        width: 570px;
    }

    .new-revision {
        min-height: 500px;
        border-radius: 20px;
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
