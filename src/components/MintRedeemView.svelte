<script>
    import {ethers} from 'ethers';
    import {navigate, toIsoDate} from '../scripts/helpers.js';
    import {icons} from '../scripts/assets.js';
    import {activeNetwork} from '../scripts/store.js';
    import Pagination from './Pagination.svelte';

    export let mintRedeemData = []
    export let perPage = 10
    let currentPage = 1;
    let filteredData = []

    $: mintRedeemData && handlePageChange()

    function getActionName(id) {
        return id.split('-')[0] === 'DepositWithReceipt' ? 'Mint' : 'Redeem'
    }
    async function handlePageChange(event) {
        currentPage = event?.detail.currentPage || 1
        let skip = (perPage * (currentPage - 1)) - 1
        filteredData = mintRedeemData.filter((r, index) => index > skip && index < perPage * currentPage)
    }
</script>
<table class="sft-table relative">
  <thead>
  <tr>
    <th class="w-1/12"></th>
    <th>Action</th>
    <th>Vault</th>
    <th>Amount</th>
    <th>Receipt ID</th>
    <th>Revision ID</th>
    <th>Date</th>
  </tr>
  </thead>
  <tbody>
  {#if mintRedeemData.length}
    {#each filteredData as mr, i}
      <tr>
        <td class="w-1/12">
          <a href={`${$activeNetwork?.blockExplorer}/tx/${mr.transaction.id}`} target="_blank">
            <img class="link-icon" src={icons[$activeNetwork.blockExplorerIcon]} alt={$activeNetwork.blockExplorerIcon}>
          </a>
        </td>
        <td>{getActionName(mr.id)}</td>
        <td>{mr.offchainAssetReceiptVault.name}</td>
        <td>{ethers.utils.formatUnits(mr.amount, 18)}</td>
        <td>
          <span class="brown underline cursor-pointer" on:click={()=>{ console.log(mr.receipt);navigate(`#asset-information/${mr.receipt.receiptId}/${mr.receipt.receiptInformations[0].id}`)}}>
            {mr.receipt.receiptId}
          </span>
        </td>
        <td></td>
        <td>{toIsoDate(mr.timestamp)}</td>
      </tr>
    {/each}
  {/if}
  {#if !mintRedeemData.length}
    <tr>
      <td colspan="7">No data available</td>
    </tr>
  {/if}
  </tbody>
  {#if mintRedeemData.length}

  <Pagination dataLength={mintRedeemData.length} {perPage} on:pageChange={handlePageChange}/>
  {/if}

</table>
