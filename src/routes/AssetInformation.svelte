<script>

    import DefaultFrame from "../components/DefaultFrame.svelte";
    import {selectedReceipt, tokenName, data, pageTitle} from "../scripts/store.js";
    import ReceiptData from '../components/ReceiptData.svelte';
    import {navigate, timeStampToDate} from '../scripts/helpers.js';
    import {ethers} from 'ethers';
    import {icons} from '../scripts/assets.js';

    let receipt = $selectedReceipt.receipt;
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
    <div class="display-flex justify-between font-bold mb-5">
      <span>{$tokenName}</span>
      <span>{$data.offchainAssetReceiptVault ? timeStampToDate($data.offchainAssetReceiptVault.deployTimestamp): 0}</span>
    </div>
    <ReceiptData receipt={receipt}/>
    <div class="display-flex justify-between font-bold mt-5">
      <span>Total token amount:</span>
      <span>{$data.offchainAssetReceiptVault ? ethers.utils.formatUnits($data.offchainAssetReceiptVault.totalShares, 18): 0}</span>
    </div>
  </div>
</DefaultFrame>

<style>
    .info-container {
        width: 470px;
    }
</style>