<script>
    import { activeNetwork, sftInfo} from '../scripts/store.js';
    import {router} from 'yrv';
    import {getSubgraphData} from '../scripts/helpers.js';
    import {ADDRESS_OVERVIEW_QUERY, VAULTS_BY_DEPLOYER_QUERY} from '../scripts/queries.js';
    import MintRedeemView from '../components/MintRedeemView.svelte';
    import CertificationsView from '../components/CertificationsView.svelte';
    import AccountSftsView from '../components/AccountSftsView.svelte';
    import Erc20ConfiscationsView from '../components/Erc20ConfiscationsView.svelte';
    import Erc1155ConfiscationsView from '../components/Erc1155ConfiscationsView.svelte';
    import {icons} from '../scripts/assets.js';

    let loading = false;
    let mint_redeems = []
    let certifications = []
    let shareConfiscations = []
    let receiptConfiscations = []
    let sfts = []

    let address = $router.params.address

    let active = localStorage.getItem('activeView') || 'mint'

    $:$activeNetwork && getData()

    async function getData() {
        await getAccountData()
        await getAccountSFTs()
    }
    async function getAccountData() {
        loading = true
        let resp = await getSubgraphData($activeNetwork, {address}, ADDRESS_OVERVIEW_QUERY, 'offchainAssetReceiptVaults')
        if (resp && resp.data && resp.data.offchainAssetReceiptVaults) {
            //set mint/redeems
            //filter data if there is no deposits and withdraws
            mint_redeems = resp.data.offchainAssetReceiptVaults.filter(mr => mr.deposits.length ||
                mr.withdraws.length)
            //concatenate deposits and withdraws in one array
            mint_redeems = mint_redeems.map(mr => [...mr.deposits, ...mr.withdraws])

            //concat all data in one array
            mint_redeems = mint_redeems.flat()
            //Sort by timestamp (desc)
            mint_redeems = mint_redeems.sort((a, b) => parseInt(b.timestamp) - parseInt(a.timestamp))

            //set Certifications
            //filter data if there is no certifications
            certifications = resp.data.offchainAssetReceiptVaults.filter(cert => cert.certifications.length)
            certifications = certifications.map(c => c.certifications)
            certifications = certifications.flat()

            //set ShareConfiscations
            //filter data if there is no ShareConfiscations
            shareConfiscations = resp.data.offchainAssetReceiptVaults.filter(sc => sc.shareConfiscations.length)
            shareConfiscations = shareConfiscations.map(c => c.shareConfiscations)
            shareConfiscations = shareConfiscations.flat()

            //set ReceiptConfiscations
            //filter data if there is no ReceiptConfiscations
            receiptConfiscations = resp.data.offchainAssetReceiptVaults.filter(rc => rc.receiptConfiscations.length)
            receiptConfiscations = receiptConfiscations.map(c => c.receiptConfiscations)
            receiptConfiscations = receiptConfiscations.flat()

        }
        loading = false
    }
    async function getAccountSFTs() {
        let resp = await getSubgraphData($activeNetwork, {address}, VAULTS_BY_DEPLOYER_QUERY, 'offchainAssetReceiptVaults')
        if (resp && resp.data && resp.data.offchainAssetReceiptVaults) {
            //set Sfts
            //filter data if there is no certifications
            sfts = resp.data.offchainAssetReceiptVaults
        }
    }

    function setActive(page) {
        active = page
        localStorage.setItem('activeView', page)
    }


</script>

<div class="{$sftInfo ? 'w-full' : 'left-margin'} address-overview">
  <div class="address-overview-container">
    <div class="card-header justify-between">
      <div class=""><b>Address</b> {address}</div>
      <a href={`${$activeNetwork?.blockExplorer}/address/${address}`} target="_blank">
        <img class="link-icon" src={icons[$activeNetwork.blockExplorerIcon]} alt={$activeNetwork.blockExplorerIcon}>
      </a>
    </div>


    <div class="address-overview-table-container">
      <div class="buttons">
        <div class="left">
          <button class="default-btn {active === 'mint'? 'active': ''}" on:click={()=>setActive('mint')}>Mint/
            Redeems
          </button>
          <button class="default-btn {active === 'certifications'? 'active': ''}"
                  on:click={()=>setActive('certifications')}>Certifications
          </button>
          <button class="default-btn {active === 'sfts'? 'active': ''}" on:click={()=>setActive('sfts')}>SFTs</button>
          <button class="default-btn {active === 'erc20'? 'active': ''}" on:click={()=>setActive('erc20')}>ERC20
            confiscations
          </button>
          <button class="default-btn {active === 'erc1155'? 'active': ''}" on:click={()=>setActive('erc1155')}>
            ECRC1155 confiscations
          </button>
        </div>
        <div class="right">
          <button class="default-btn" disabled>Download pins</button>
        </div>
      </div>
      {#if (active === 'mint')}
        <MintRedeemView mintRedeemData={mint_redeems} {loading}/>
      {/if}
      {#if (active === 'certifications')}
        <CertificationsView certificationsData={certifications} {loading}/>
      {/if}
      {#if (active === 'sfts')}
        <AccountSftsView sftsData={sfts} {loading}/>
      {/if}
      {#if (active === 'erc20')}
        <Erc20ConfiscationsView confiscations={shareConfiscations} {loading}/>
      {/if}
      {#if (active === 'erc1155')}
        <Erc1155ConfiscationsView confiscations={receiptConfiscations} {loading}/>
      {/if}
    </div>
  </div>
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
        padding: 13px 40px 13px 40px;
        color: #575757;
    }

    .address-overview-table-container {
        box-sizing: border-box;
        border-radius: 10px;
        padding: 15px 40px 50px 40px;
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
        display: flex;
        align-items: center;
        gap: 14px;
        flex-wrap: wrap;
        white-space: nowrap;
    }

    .right{
        white-space: nowrap;
    }

    .default-btn.active {
        background: #CAE6FF;
    }
</style>
