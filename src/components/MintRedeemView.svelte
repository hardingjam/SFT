<script>
    import {ethers} from 'ethers';
    import {toIsoDate} from '../scripts/helpers.js';
    import {icons} from '../scripts/assets.js';
    import {activeNetwork} from '../scripts/store.js';

    export let mintRedeemData = []

    function getActionName(id) {
        // console.log(111, id)
        return id.split('-')[0] === 'DepositWithReceipt' ? 'Mint' : 'Redeem'
    }
</script>
<table class="sft-table">
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
    {#each mintRedeemData as mr, i}
      <tr>
        <td class="w-1/12">
          <a href={`${$activeNetwork?.blockExplorer}/tx/${mr.transaction.id}`} target="_blank">
            <img class="link-icon" src={icons[$activeNetwork.blockExplorerIcon]} alt={$activeNetwork.blockExplorerIcon}>
          </a>
        </td>
        <td>{getActionName(mr.id)}</td>
        <td>{mr.offchainAssetReceiptVault.name}</td>
        <td>{ethers.utils.formatUnits(mr.amount, 18)}</td>
        <td class="brown underline cursor-pointer">{mr.receipt.receiptId}</td>
        <td></td>
        <td>{toIsoDate(mr.timestamp)}</td>
      </tr>
    {/each}
  {/if}
  </tbody>
</table>

