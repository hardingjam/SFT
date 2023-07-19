<script>

    import DefaultFrame from "../components/DefaultFrame.svelte";
    import {selectedReceipt, tokenName, data, pageTitle} from "../scripts/store.js";
    import ReceiptData from '../components/ReceiptData.svelte';
    import {navigate, timeStampToDate} from '../scripts/helpers.js';
    import {ethers} from 'ethers';
    import {icons} from '../scripts/assets.js';

    let loading = false

    pageTitle.set("Asset information")
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
      <div class="default-btn">New revision</div>
      <div class="default-btn">History</div>
    </div>
    <div class="display-flex justify-between font-bold mb-5 text-left">
      <span>{$tokenName}</span>
      <span>
       Revision date:
        {$selectedReceipt.receipt ?
            timeStampToDate($selectedReceipt.receipt.deposits[0].timestamp, "yy-mm-dd tt:tt") :
            0}
      </span>
    </div>
    <ReceiptData receipt={$selectedReceipt.receipt}/>
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