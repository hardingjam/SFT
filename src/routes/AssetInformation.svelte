<script>

    import DefaultFrame from "../components/DefaultFrame.svelte";
    import {selectedReceipt} from "../scripts/store.js";
    import ReceiptData from '../components/ReceiptData.svelte';

    let receipt = $selectedReceipt.receipt;
    let loading = false

</script>
<DefaultFrame header={`Asset information`}>
  <div slot="content" class="info-container">
    <ReceiptData receipt={receipt}/>
    <div class="error">
    </div>
  </div>
</DefaultFrame>

<style>
    .info-container {
        width: 470px;
    }
</style>