<script>

    import DefaultFrame from "../components/DefaultFrame.svelte";
    import {
        selectedReceipt,
        tokenName,
        data,
        pageTitle,
        vault,
        activeNetwork, transactionInProgressShow, transactionInProgress,
    } from "../scripts/store.js";
    import ReceiptData from '../components/ReceiptData.svelte';
    import {getSubgraphData, navigate, showPrompt, timeStampToDate} from '../scripts/helpers.js';
    import {ethers} from 'ethers';
    import {icons} from '../scripts/assets.js';
    import {RECEIPT_INFORMATIONS_QUERY} from '../scripts/queries.js';
    import axios from 'axios';
    import {IPFS_GETWAY} from '../scripts/consts.js';
    import {router} from 'yrv';

    let loading = false

    let revisionNumber = 1;

    let schemaName = ''

    let revision;

    let variables;

    let isCurrentRevision = false;

    router.subscribe(async e => {
        if (!e.initial) {
            await getRevision(e.params.id)
        }
    })

    async function getRevision(revisionId) {
        await getSchema()
        let receiptId = $vault.address + "-" + window.location.hash.split("/")[1]
        variables = {id: receiptId}
        await showPrompt(null, {topText: "Loading, please wait", noBottomText: true})

        let resp = await getSubgraphData($activeNetwork, variables, RECEIPT_INFORMATIONS_QUERY, 'receipt')
        let informationIndex = 0;
        if (resp && resp.data && resp.data.receipt && resp.data.receipt.id &&
            resp.data.receipt.receiptInformations.length) {
            selectedReceipt.set(resp.data.receipt)
            if (revisionId) {
                revision = resp.data.receipt.receiptInformations.find(r => r.id === revisionId)
            } else {
                revision = resp.data.receipt.receiptInformations[0]
            }

            informationIndex = resp.data.receipt.receiptInformations
                .findIndex(inf => inf.id ===
                    `ReceiptInformation-${resp.data.receipt.id}-${revision.transaction.id}`)
            revisionNumber = resp.data.receipt.receiptInformations.length - informationIndex

            isCurrentRevision = revision.id === resp.data.receipt.receiptInformations[0].id
            pageTitle.set(`Asset information - ${isCurrentRevision ? 'current revision' : 'specific revision time'}`)
        }
        transactionInProgressShow.set(false)
        transactionInProgress.set(false)
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

    async function setCurrentRevision() {
        navigate(`#asset-information/${$selectedReceipt.receipt.receiptId}/${$selectedReceipt?.receipt.receiptInformations[0].id}`)
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
    {#if !isCurrentRevision}
      <div class="mb-5">This is not the current revision. <span
        class="brown underline cursor-pointer ml-1" on:click={()=>setCurrentRevision()}>Current revision</span></div>
    {/if}
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
    <ReceiptData receipt={$selectedReceipt?.receipt} revisionId={revision?.id}/>
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