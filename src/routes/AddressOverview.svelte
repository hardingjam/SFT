<script>
    import {activeNetwork, sftInfo} from '../scripts/store.js';
    import SftLoader from '../components/SftLoader.svelte';
    import {router} from 'yrv';
    import {getSubgraphData, toIsoDate} from '../scripts/helpers.js';
    import {ADDRESS_OVERVIEW_QUERY} from '../scripts/queries.js';
    import {ethers} from 'ethers';

    let loading = false;
    let mint_redeems = []

    let address = $router.params.address

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
            console.log(11111111, resp)
            //Sort by timestamp (desc)
            mint_redeems = resp.sort((a, b) => parseInt(b.timestamp) - parseInt(a.timestamp))
        }
        // loading = false
    }

    function getActionName(id) {
        // console.log(111, id)
        return id.split('-')[0] === 'DepositWithReceipt' ? 'Mint' : 'Redeem'
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
      <div class="address-overview-table">
        <table class="sft-table">
          <thead>
          <tr>
            <th>Action</th>
            <th>Vault</th>
            <th>Amount</th>
            <th>Receipt ID</th>
            <th>Revision ID</th>
            <th>Date</th>
          </tr>
          </thead>
          <tbody>
          {#if mint_redeems.length}
            {#each mint_redeems as mr, i}
              <tr>
                <td>{getActionName(mr.id)}</td>
                <td>{mr.offchainAssetReceiptVault.name}</td>
                <td>{ethers.utils.formatUnits(mr.amount, 18)}</td>
                <td>{mr.receipt.receiptId}</td>
                <td>s</td>
                <td>{toIsoDate(mr.timestamp)}</td>
              </tr>
            {/each}
          {/if}
          </tbody>
        </table>
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
    }

    .card-header {
        gap: 13px;
        padding: 13px 24px;
        color: #575757;
    }

    .address-overview-table {
        box-sizing: border-box;
        border-radius: 10px;
        padding: 24px 45px 50px 60px;
    }
</style>
