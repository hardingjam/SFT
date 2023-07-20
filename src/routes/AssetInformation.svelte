<script>

    import DefaultFrame from "../components/DefaultFrame.svelte";
    import {selectedReceipt, tokenName, data, pageTitle, vault, activeNetwork} from "../scripts/store.js";
    import ReceiptData from '../components/ReceiptData.svelte';
    import {getSubgraphData, navigate, timeStampToDate} from '../scripts/helpers.js';
    import {ethers} from 'ethers';
    import {icons} from '../scripts/assets.js';
    import {RECEIPT_INFORMATION_QUERY} from '../scripts/queries.js';
    import axios from 'axios';
    import {IPFS_GETWAY} from '../scripts/consts.js';

    let loading = false

    let revisionNumber = 1;

    let schemaName = ''

    pageTitle.set("Asset information - current revision")
    $: $selectedReceipt && getRevisionNumber()

    async function getRevisionNumber(receipt) {
        await getSchema()
        let variables
        if (!receipt) {
            let receiptId = $vault.address + "-" + window.location.hash.split("/")[1]
            variables = {id: receiptId}
        } else {
            variables = {id: receipt.id}
        }
        loading = true;
        let resp = await getSubgraphData($activeNetwork, variables, RECEIPT_INFORMATION_QUERY, 'receipt')
        let informationIndex = 0;
        if (resp && resp.data && resp.data.receipt && resp.data.receipt.id &&
            resp.data.receipt.receiptInformations.length) {
            informationIndex = resp.data.receipt.receiptInformations.findIndex(inf => inf.id === "ReceiptInformation-" +
                resp.data.receipt.id)
            revisionNumber = resp.data.receipt.receiptInformations.length - informationIndex
        }
    }

    async function getSchema() {
        let selectedSchemaHash = localStorage.getItem("selectedReceiptSchema")
        if (selectedSchemaHash) {
            let res = await axios.get(`${IPFS_GETWAY}${selectedSchemaHash}`)
            if (res) {
                schemaName = res.data.displayName
            }
        }
    }

</script>
<DefaultFrame>
  <div slot="back_button" class="display-flex">
    <button class="btn-hover mr-3" on:click={()=>{navigate("#asset-register")}}>
      <img src={icons.back} alt="back">
    </button>
  </div>
  <div slot="content" class="info-container">
    <div class="buttons">
      <div class="default-btn">download IPFS pin list</div>
      <div class="default-btn" on:click={()=>navigate("#new-revision")}>New revision</div>
      <div class="default-btn">History</div>
    </div>
    <div class="display-flex justify-between font-bold mb-5 text-left">
      <span>{$tokenName}</span>
      <span>
       Revision date:
        {$selectedReceipt.receipt ?
            timeStampToDate($selectedReceipt?.receipt?.deposits[0].timestamp, "yy-mm-dd tt:tt") :
            0}
      </span>
    </div>
    <div class="flex items-start flex-col mb-6">
      <span class="f-weight-700">{schemaName}</span>
      <div class="">
        <span class="f-weight-700">Current revision</span>
        <span class="f-weight-400">{revisionNumber}</span>
      </div>
      <div>
        <span class="f-weight-700">Receipt ID</span>
        <span class="f-weight-400">{$selectedReceipt?.receipt?.receiptId || 0}</span>
      </div>
    </div>
    <ReceiptData receipt={$selectedReceipt?.receipt}/>
    <div class="display-flex justify-between font-bold mt-5 text-left">
      <span class="w-2/3">Total token amount:</span>
      <span class="w-1/3">{$data.offchainAssetReceiptVault ?
          ethers.utils.formatUnits($data.offchainAssetReceiptVault.totalShares, 18) :
          0}</span>
    </div>
  </div>
</DefaultFrame>

<style>
    .info-container {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: 630px;
        min-height: 300px;
    }

    .buttons {
        display: flex;
        justify-content: flex-end;
        gap: 20px;
        margin-bottom: 16px;
    }
</style>