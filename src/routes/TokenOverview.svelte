<script>
    import DefaultFrame from '../components/DefaultFrame.svelte';
    import {sftInfo, data} from '../scripts/store.js';
    import TokenOverviewTable from '../components/TokenOverviewTable.svelte';

    $:$data && setToken()

    let token = {}
    function setToken() {
        token = $data.offchainAssetReceiptVault
    }
</script>
<div class="{$sftInfo ? '' : 'left-margin'} w-full token-overview-container">
  <DefaultFrame>
    <div slot="content">
      <div class="">
        <TokenOverviewTable {token}/>
      </div>
    </div>
  </DefaultFrame>
</div>
<style>

    .left-margin {
        margin-left: 223px;
    }

    .token-overview-container {
        background: #FFFFFF;
        /*height: calc(100vh - 200px);*/
        border-radius: 20px 20px 0 0;
        margin-top: 103px;
        margin-right: 102px;
    }
</style>