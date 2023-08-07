<script>
    import {sftInfo} from '../scripts/store.js';
    import SftLoader from '../components/SftLoader.svelte';
    import {router} from 'yrv';

    let loading = false;

    // let address=router
    let address = $router.params.address

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
        <div class="sft-table-container">
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

            <tr>
              <td>s</td>
              <td>s</td>
              <td>s</td>
              <td>s</td>
              <td>s</td>
            </tr>

            </tbody>
          </table>
        </div>
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
        left: 420px;
        top: 238px;
        background: #FFFFFF;
        border-top-left-radius: 20px;
        border-top-right-radius: 20px;
        display: flex;
        flex-direction: column;
        text-align: left;
        width: 100%;
        height: 100vh;
    }

    .card-header {
        gap: 13px;
        padding: 13px 24px;
        color: #575757;
    }

    .address-overview-table{
        box-sizing: border-box;
        border-radius: 10px;
        padding: 24px 45px 50px 60px;
    }
</style>
