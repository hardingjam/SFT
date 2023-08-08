<script>
    import {ethers} from 'ethers';
    import {toIsoDate, formatAddress} from '../scripts/helpers.js';
    import {icons} from '../scripts/assets.js';
    import {activeNetwork} from '../scripts/store.js';

    export let confiscations = []

</script>
<table class="sft-table">
  <thead>
  <tr>
    <th class="w-1/12"></th>
    <th>SFT</th>
    <th>Amount</th>
    <th>Confiscated from</th>
    <th>Date</th>
  </tr>
  </thead>
  <tbody>
  {#if confiscations.length}
    {#each confiscations as confiscation}
      <tr>
        <td class="w-1/12">
          <a href={`${$activeNetwork?.blockExplorer}/tx/${confiscation.transaction.id}`} target="_blank">
            <img class="link-icon" src={icons[$activeNetwork.blockExplorerIcon]} alt={$activeNetwork.blockExplorerIcon}>
          </a>
        </td>
        <td>{ethers.utils.formatUnits(confiscation.confiscated, 18)}</td>
        <td>{confiscation.offchainAssetReceiptVault.name}</td>
        <td>{formatAddress(confiscation.confiscator.address)}</td>
        <td>{toIsoDate(confiscation.timestamp)}</td>
      </tr>
    {/each}
  {/if}
  </tbody>
</table>
