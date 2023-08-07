<script>
    import {ethers} from 'ethers';
    import {toIsoDate, formatAddress} from '../scripts/helpers.js';
    import {icons} from '../scripts/assets.js';
    import {activeNetwork} from '../scripts/store.js';

    export let certificationsData = []

</script>
<table class="sft-table">
  <thead>
  <tr>
    <th></th>
    <th>Total amount</th>
    <th>Certified on</th>
    <th>Certified by</th>
  </tr>
  </thead>
  <tbody>
  {#if certificationsData.length}
    {#each certificationsData as cert}
      <tr>
        <td>
          <a href={`${$activeNetwork?.blockExplorer}/tx/${cert.transaction.id}`} target="_blank">
            <img class="link-icon" src={icons[$activeNetwork.blockExplorerIcon]} alt={$activeNetwork.blockExplorerIcon}>
          </a>
        </td>
        <td>{ethers.utils.formatUnits(cert.totalShares, 18)}</td>
        <td>{toIsoDate(cert.timestamp)}</td>
        <td>{formatAddress(cert.emitter.address)}</td>
      </tr>
    {/each}
  {/if}
  </tbody>
</table>
