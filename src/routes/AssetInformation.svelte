<script>

    import DefaultFrame from "../components/DefaultFrame.svelte";
    import {
        selectedReceipt,
        tokenName,
        data,
        pageTitle,
        vault,
        activeNetwork,
        selectedReceiptInformation
    } from "../scripts/store.js";
    import ReceiptData from '../components/ReceiptData.svelte';
    import {getSubgraphData, navigate, timeStampToDate} from '../scripts/helpers.js';
    import {ethers} from 'ethers';
    import {icons} from '../scripts/assets.js';
    import {RECEIPT_INFORMATIONS_QUERY} from '../scripts/queries.js';
    import axios from 'axios';
    import {IPFS_GETWAY} from '../scripts/consts.js';

    let loading = false

    let revisionNumber = 1;

    let schemaName = ''

    let revision;


    pageTitle.set("Asset information - current revision")
    $: $selectedReceipt && getRevision()

    async function getRevision(receipt) {

        await getSchema()
        let variables
        if (!receipt) {
            let receiptId = $vault.address + "-" + window.location.hash.split("/")[1]
            variables = {id: receiptId}
        } else {
            variables = {id: receipt.id}
        }
        loading = true;
        let resp = await getSubgraphData($activeNetwork, variables, RECEIPT_INFORMATIONS_QUERY, 'receipt')
        let informationIndex = 0;
        if (resp && resp.data && resp.data.receipt && resp.data.receipt.id &&
            resp.data.receipt.receiptInformations.length) {

            if ($selectedReceiptInformation) {
                revision = resp.data.receipt.receiptInformations.find(r => r.id === $selectedReceiptInformation)
            } else {
                revision = resp.data.receipt.receiptInformations.find(r => r.id ===
                    localStorage.getItem("selectedReceiptInformation"))
            }

            informationIndex = resp.data.receipt.receiptInformations
                .findIndex(inf => inf.id ===
                    `ReceiptInformation-${resp.data.receipt.id}-${revision.transaction.id}`)
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
  <div slot="header_buttons" class="display-flex">
    <div class="buttons">
      <button class="default-btn" disabled>download IPFS pin list</button>
      <button class="default-btn" on:click={()=>navigate(`#new-revision/${$selectedReceipt.receipt.receiptId}`)}>New
        revision
      </button>
      <button class="default-btn mr-5" on:click={()=>navigate(`#asset-history/${$selectedReceipt.receipt.receiptId}`)}>
        Asset history
      </button>
    </div>
  </div>
  <div slot="content" class="info-container">

    <div class="display-flex justify-between font-bold mb-5 text-left">
      <span>{$tokenName}</span>
      <span>
       Revision date:
        {revision ?
            timeStampToDate(revision.timestamp, "yy-mm-dd tt:tt") :
            0}
      </span>
    </div>
    <div class="flex items-start flex-col mb-6">
      <div class="flex justify-between font-bold text-left w-full">
        <span class="f-weight-700 w-2/3 whitespace-nowrap flex pr-3">Asset class <span class="dots"></span></span>
        <span class="f-weight-700 w-1/3">{schemaName}</span>
      </div>
      <div class="flex justify-between font-bold text-left w-full">
        <span class="f-weight-700 w-2/3 whitespace-nowrap flex pr-3">Current revision <span class="dots"></span></span>
        <span class="f-weight-400 w-1/3">{revisionNumber}</span>
      </div>
      <div class="flex justify-between font-bold text-left w-full">
        <span class="f-weight-700 w-2/3 whitespace-nowrap flex pr-3">Receipt ID <span class="dots"></span></span>
        <span class="f-weight-400 w-1/3">{$selectedReceipt?.receipt?.receiptId || 0}</span>
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
    }

</style>