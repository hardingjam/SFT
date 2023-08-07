<script>
import {ethers} from 'ethers';
import {toIsoDate} from '../scripts/helpers.js';

export let mintRedeemData = []

function getActionName(id) {
    // console.log(111, id)
    return id.split('-')[0] === 'DepositWithReceipt' ? 'Mint' : 'Redeem'
}
</script>
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
  {#if mintRedeemData.length}
    {#each mintRedeemData as mr, i}
      <tr>
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
