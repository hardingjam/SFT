<script>
    import {sftInfo} from '../scripts/store.js';
    import SftLoader from '../components/SftLoader.svelte';

    let loading = false;

</script>

<div class="{$sftInfo ? 'w-full' : 'left-margin'} address-overview">
  {#if loading}
    <SftLoader/>
  {/if}
  {#if !loading }
    <div class="sft-table-container">
      <table class="sft-table">
        <thead>
        <tr>
          <th>Token name</th>
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
</style>
