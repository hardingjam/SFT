<script>

    import DefaultFrame from "../components/DefaultFrame.svelte";
    import {selectedReceipt, tokenName, data} from "../scripts/store.js";
    import ReceiptData from '../components/ReceiptData.svelte';
    import {timeStampToDate} from '../scripts/helpers.js';
    import {ethers} from 'ethers';

    let receipt = $selectedReceipt.receipt;
    let loading = false

</script>
<DefaultFrame header={`Asset information`}>
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