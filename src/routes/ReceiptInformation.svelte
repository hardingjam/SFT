<script>
    import {createEventDispatcher, onMount} from "svelte";
    import {activeNetwork, vault} from "../scripts/store.js";
    import {
        getReceiptBalance,
    } from "../scripts/helpers.js";
    import {ethers} from "ethers";
    import ReceiptData from '../components/ReceiptData.svelte';

    export let receipt = {}
    let receiptBalance = null
    let receiptInformations = {}


    onMount(async () => {
        receiptBalance = await getReceiptBalance($activeNetwork, $vault, receipt.receiptId);
    })


    const dispatch = createEventDispatcher();

    function backButtonClicked() {
        dispatch('back', {
            showReceiptInfo: false
        });
    }

</script>
<div class="receipt-info-container">
  <div class="header-buttons">
    <button class="default-btn back-to-receipts" on:click={()=>{backButtonClicked()}}> back</button>
  </div>
  <div class="basic-frame-parent">
    <div class="basic-frame receipt-info">
      <div class="receipt-row-header">
        <span class="f-weight-700">Receipt ID (NFT): {receipt.receiptId}</span>
        <div class="date"></div>
      </div>
      <div class="receipt-row">
        <span class="f-weight-700">Sft amount </span>
        <div class="date f-weight-700">{receiptBalance ? ethers.utils.formatUnits(receiptBalance) : ''}</div>
      </div>
      <ReceiptData receipt={receipt}></ReceiptData>
    </div>
  </div>
</div>

<style>
    .receipt-info-container {
        padding-top: 10px;
    }

    .header-buttons {
        display: flex;
        width: 100%;
        justify-content: right;
        padding: 0 12px 0 12px;
    }

    .back-to-receipts {

    }

    .receipt-info {
        min-height: 250px;
        padding: 10px 20px;
    }

    .receipt-row-header {
        display: flex;
        justify-content: space-between;
    }

    .receipt-row {
        padding: 2px 0;
        display: flex;
        justify-content: space-between;
    }
</style>