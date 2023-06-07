<script>
    import logo from "../assets/sft_logo.svg"
    import {ethers} from 'ethers';
    import {onMount} from 'svelte';
    import {activeNetwork} from '../scripts/store.js';
    import {formatAddress, timeStampToDate} from '../scripts/helpers.js';

    export let sft = {}
    let auditors = []
    let issuers = []

    onMount(() => {
        getAuditors()
        getIssuers()
    })

    function getAuditors() {
        if (sft.address) {
            let tempAuditors = sft.roleHolders.filter(rh => rh.role.roleName === 'CERTIFIER')
            auditors = tempAuditors.map(a => a.account.address)
        }
    }

    function getIssuers() {
        if (sft.address) {
            let tempAuditors = sft.roleHolders.filter(rh => rh.role.roleName === 'DEPOSITOR')
            issuers = tempAuditors.map(a => a.account.address)
        }
    }
</script>

<tr>
  <td class="flex justify-center w-10">
    <img class="w-5 h-5 mt-1" src={logo} alt="sft logo"/>
  </td>
  <td class="sft-name">{sft.name}</td>
  <td class="sft-info">{sft.symbol}</td>
  <td class="sft-info">{timeStampToDate(sft.deployTimestamp)}</td>
  <td class="sft-info">{sft.holders || 0}</td>
  <td class="sft-info">{sft?.totalShares ? ethers.utils.formatUnits(sft?.totalShares, 18) : 0}</td>
  <td class="sft-info">
    {#each auditors as auditor}
      <div class="underline">
        <a href={`${$activeNetwork.blockExplorer}/address/${auditor}`} target="_blank">{formatAddress(auditor)}</a>
      </div>
    {/each}
  </td>
  <td class="sft-info">
    {#each issuers as issuer}
      <div class="underline">
        <a href={`${$activeNetwork.blockExplorer}/address/${issuer}`} target="_blank">{formatAddress(issuer)}</a>
      </div>
    {/each}
  </td>
</tr>
<style>
    .sft-name {
        color: #9D7334;
    }

    .sft-info {
        color: #575757
    }

    tr:nth-child(even) {
        background-color: #F0EFF1;
    }

    tr:nth-child(odd) {
        background-color: #FFFFFF;
    }

</style>