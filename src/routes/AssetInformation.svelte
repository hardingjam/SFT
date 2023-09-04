<script>

    import {
        selectedReceipt,
        data,
        pageTitle,
        vault,
        activeNetwork, transactionInProgressShow, transactionInProgress
    } from "../scripts/store.js";
    import ReceiptData from '../components/ReceiptData.svelte';
    import {cborDecode, getSubgraphData, navigate, showPrompt, timeStampToDate, downloadIpfsHashes} from '../scripts/helpers.js';
    import {ethers} from 'ethers';
    import {RECEIPT_INFORMATION_QUERY, RECEIPT_INFORMATIONS_QUERY} from '../scripts/queries.js';
    import axios from 'axios';
    import {IPFS_GETWAY, MAGIC_NUMBERS} from '../scripts/consts.js';
    import {navigateTo, router} from 'yrv';

    let loading = false

    let revisionNumber = 1;

    let schemaName = ''

    let revision;

    let variables;

    let isCurrentRevision = false;


    $:$activeNetwork && getRevision()

    async function getRevision(revisionId) {
        if (!revisionId)
            revisionId = $router.params.id

        await showPrompt(null, {topText: "Loading, please wait", noBottomText: true})

        let receiptId = revisionId.split("-")[1] + '-' + revisionId.split('-')[2]// $vault.address + "-" + window.location.hash.split("/")[1]
        variables = {id: receiptId}
        await getSchema(revisionId)

        let resp = await getSubgraphData($activeNetwork, variables, RECEIPT_INFORMATIONS_QUERY, 'receipt')
        let informationIndex = 0;
        if (resp && resp.data && resp.data.receipt && resp.data.receipt.id &&
            resp.data.receipt.receiptInformations.length) {

            selectedReceipt.set(resp.data)
            if (revisionId) {
                revision = resp.data.receipt.receiptInformations.find(r => r.id === revisionId)
            } else {
                revision = resp.data.receipt.receiptInformations[0]
            }
            isCurrentRevision = revision.id === resp.data.receipt.receiptInformations[0].id
            pageTitle.set(`Asset information - ${isCurrentRevision ? 'current revision' : 'specific revision'}`)

            informationIndex = resp.data.receipt.receiptInformations
                .findIndex(inf => inf.id === revision.id)
            revisionNumber = resp.data.receipt.receiptInformations.length - informationIndex
            console.log(resp.data)
        }
        transactionInProgressShow.set(false)
        transactionInProgress.set(false)
    }

    async function getSchema(revisionId) {
        let resp = await getSubgraphData($activeNetwork, {id: revisionId}, RECEIPT_INFORMATION_QUERY, 'receiptInformation')
        if (resp) {
            let information = resp.data.receiptInformation.information;
            let decoded = cborDecode(information.slice(18))
            let schemaHash = decoded ? decoded[0].get(MAGIC_NUMBERS.OA_SCHEMA) : null
            if (schemaHash) {
                let res = await axios.get(`${IPFS_GETWAY}${schemaHash}`)
                if (res) {
                    schemaName = res.data.displayName
                }
            }
        }
    }

    async function setCurrentRevision() {
        navigateTo(`#asset-information/${$selectedReceipt.receipt.receiptId}/${$selectedReceipt?.receipt.receiptInformations[0].id}`)
        await getRevision($selectedReceipt?.receipt.receiptInformations[0].id)
    }

    function downloadHashes(){
        let hashes = $selectedReceipt.receipt.offchainAssetReceiptVault.hashes.map(h=>h.hash)
        downloadIpfsHashes(hashes)
    }

</script>
<div class="asset-information">
  <div class="card-header justify-end pr-10">
    <button class="default-btn" on:click={()=>{downloadHashes()}}>download IPFS pin list</button>
    {#if ($vault.address === $selectedReceipt?.receipt?.offchainAssetReceiptVault?.address)}
      <button class="default-btn" on:click={()=>navigate(`#new-revision/${$selectedReceipt.receipt.receiptId}`)}>New
        revision
      </button>
      <button class="default-btn" on:click={()=>navigate(`#asset-history/${$selectedReceipt.receipt.receiptId}`)}>
        Asset history
      </button>
    {/if}
  </div>

  <div class="card-content">
    {#if !isCurrentRevision}
      <div class="mb-5">This is not the current revision. <span
        class="brown underline cursor-pointer ml-1" on:click={()=>setCurrentRevision()}>Current revision</span></div>
    {/if}
    <div class="display-flex justify-between font-bold mb-8 text-left">
      <span>{$selectedReceipt?.receipt?.offchainAssetReceiptVault?.name}</span>
      <span>
       Revision date:
        {revision ?
            timeStampToDate(revision.timestamp, "yy-mm-dd tt:tt") :
            0}
      </span>
    </div>
    <div class="flex items-start flex-col mb-8">
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
    <div class="display-flex justify-between font-bold mt-20 text-left">
      <span class="w-2/3">Total token amount:</span>
      <span class="w-1/3">{$data.offchainAssetReceiptVault ?
          ethers.utils.formatUnits($data.offchainAssetReceiptVault.totalShares, 18) :
          0}</span>
    </div>
  </div>
</div>


<style>

    .asset-information {
        border-radius: 10px;
        background: #ffffff;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

</style>