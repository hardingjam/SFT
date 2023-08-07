<script>
    import {activeNetwork, sftInfo} from '../scripts/store.js';
    import SftLoader from '../components/SftLoader.svelte';
    import {router} from 'yrv';
    import {getSubgraphData} from '../scripts/helpers.js';
    import {ADDRESS_OVERVIEW_QUERY} from '../scripts/queries.js';
    import MintRedeemView from '../components/MintRedeemView.svelte';

    let loading = false;
    let mint_redeems = []

    let address = $router.params.address

    let active = 'mint'

    $:$activeNetwork && getAccountData()

    async function getAccountData() {
        // loading = true
        let resp = await getSubgraphData($activeNetwork, {address}, ADDRESS_OVERVIEW_QUERY, 'offchainAssetReceiptVaults')
        if (resp && resp.data && resp.data.offchainAssetReceiptVaults) {
            //filter data if there is no deposits and withdraws
            resp = resp.data.offchainAssetReceiptVaults.filter(mr => mr.deposits.length ||
                mr.withdraws.length)

            //concatenate deposits and withdraws in one array
            resp = resp.map(mr => [...mr.deposits, ...mr.withdraws])

            //concat all data in one array
            resp = resp.flat()
            //Sort by timestamp (desc)
            mint_redeems = resp.sort((a, b) => parseInt(b.timestamp) - parseInt(a.timestamp))
        }
        // loading = false
    }


</script>

<div class="{$sftInfo ? 'w-full' : 'left-margin'} address-overview">
  {#if loading}
    <SftLoader/>
  {/if}
  {#if !loading }

    <div class="address-overview-container">
      <div class="card-header justify-start">
        <div class=""><b>Address</b> {address}</div>
      </div>


      <div class="address-overview-table-container">
        <div class="buttons">
          <div class="left">
            <button class="default-btn {active === 'mint'? 'active': ''}" on:click={()=>{active = 'mint'}}>Mint/ Redeems</button>
            <button class="default-btn {active === 'certifications'? 'active': ''}" on:click={()=>{active = 'certifications'}}>Certifications</button>
            <button class="default-btn {active === 'sfts'? 'active': ''}" on:click={()=>{active = 'sfts'}}>SFTs</button>
            <button class="default-btn {active === 'erc20'? 'active': ''}" on:click={()=>{active = 'erc20'}}>ERC20 confiscations</button>
            <button class="default-btn {active === 'erc1155'? 'active': ''}" on:click={()=>{active = 'erc1155'}}>ECRC1155 confiscations</button>
          </div>
          <div class="right">
            <button class="default-btn">Download pins</button>
          </div>
        </div>
        {#if (active === 'mint')}
          <MintRedeemView mintRedeemData={mint_redeems}></MintRedeemView>
        {/if}
      </div>
    </div>


  {/if}
</div>
<style>
    .left-margin {
        margin-left: 223px;
    }

    .address-overview {
        width: 100%;
        margin-right: 20px;
        margin-top: 102px;
    }

    .address-overview-container {
        background: #FFFFFF;
        border-top-left-radius: 20px;
        border-top-right-radius: 20px;
        display: flex;
        flex-direction: column;
        text-align: left;
        width: 100%;
        min-height: 100vh;
    }

    .card-header {
        gap: 13px;
        padding: 13px 24px;
        color: #575757;
    }

    .address-overview-table-container {
        box-sizing: border-box;
        border-radius: 10px;
        padding: 15px 45px 50px 60px;
        display: flex;
        flex-direction: column;
        gap: 35px;
    }

    .buttons {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
    }

    .left {
        margin-left: 3rem;
        display: flex;
        align-items: center;
        gap: 14px;
    }

    .default-btn.active{
        background: #CAE6FF;
    }
</style>
