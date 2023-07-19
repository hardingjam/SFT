<script>
    import DefaultFrame from '../components/DefaultFrame.svelte';
    import {icons} from '../scripts/assets.js';
    import {navigate} from '../scripts/helpers.js';
    import {pageTitle, selectedReceipt} from '../scripts/store.js';
    import axios from 'axios';
    import {IPFS_GETWAY} from '../scripts/consts.js';

    pageTitle.set("New revision")

    let loading = false;
    let schema = {}

    $:$selectedReceipt && getSchema()

    async function getSchema() {
        let selectedSchemaHash = localStorage.getItem("selectedReceiptSchema")
            let res = await axios.get(`${IPFS_GETWAY}${selectedSchemaHash}`)
            if (res) {
                schema = res.data
            }
            console.log(schema)
    }

</script>

<div>
  <DefaultFrame>
    <div slot="back_button" class="display-flex">
      <button class="btn-hover mr-3"
              on:click={()=>{navigate(`#asset-information/${$selectedReceipt.receipt.receiptId}`)}}>
        <img src={icons.back} alt="back">
      </button>
    </div>
    <div slot="content" class="info-container">
    </div>
  </DefaultFrame>

</div>

<style>
    .info-container {
        width: 570px;
    }
</style>
