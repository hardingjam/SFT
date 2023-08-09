<script>
    import {ethers} from 'ethers';
    import {icons} from '../scripts/assets.js';
    import {activeNetwork} from '../scripts/store.js';
    import {router} from 'yrv';
    import {navigate} from '../scripts/helpers.js';
    import SftLoader from './SftLoader.svelte';

    export let sftsData = []
    export let loading = false
    let address = $router.params.address

</script>
<table class="sft-table">
  <thead>
  <tr>
    <th class="w-1/12"></th>
    <th>SFT name</th>
    <th>Balance</th>
  </tr>
  </thead>
  <tbody>
  {#if sftsData.length}
    {#each sftsData as sft}
      <tr>
        <td class="w-1/12">
          <a href={`${$activeNetwork?.blockExplorer}/address/${sft.address}`} target="_blank">
            <img class="link-icon" src={icons[$activeNetwork.blockExplorerIcon]} alt={$activeNetwork.blockExplorerIcon}>
          </a>
        </td>
        <td><span on:click={()=>{navigate(`#token-overview/${sft.address}`)}} class="brown underline cursor-pointer">{sft.name}</span></td>
        <td>{ethers.utils.formatUnits(sft.totalShares, 18)}</td>
      </tr>
    {/each}
  {/if}
  {#if !sftsData.length}
    <tr>
      <td colspan="3">
        {#if (!loading)}
          No data available
        {/if}
        {#if (loading)}
          <SftLoader width="50"></SftLoader>
        {/if}
      </td>
    </tr>
  {/if}
  </tbody>
</table>
