<script>
    import logo from "../../src/assets/sft_logo.svg"
    import {formatAddress, timeStampToDate} from '../scripts/helpers';
    import {ethers} from 'ethers';
    import {onMount} from 'svelte';
    import {activeNetwork} from '../scripts/store.js';

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

<div class="w-full bg-white pt-5 pb-8 px-10 flex flex-row-reverse rounded-xl justify-between relative ">
  <div class="img-container">
    <img src="{logo}" alt="sft logo"/>
    <div class="absolute top-2 right-2 cursor-pointer">
      <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M14 10.3999L19 5.1999M19 5.1999L19 10.3999M19 5.1999L14 5.1999" stroke="#9D9D9D" stroke-width="2"
              stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M14 10.3999L19 5.1999M19 5.1999L19 10.3999M19 5.1999L14 5.1999" stroke="black" stroke-opacity="0.2"
              stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M10 14.5601L5 19.7601M5 19.7601L5 14.5601M5 19.7601H10" stroke="#9D9D9D" stroke-width="2"
              stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M10 14.5601L5 19.7601M5 19.7601L5 14.5601M5 19.7601H10" stroke="black" stroke-opacity="0.2"
              stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </div>
  </div>
  <table class="w-8/12 leading-8 text-left">
    <tr>
      <td class="font-bold">Token name</td>
      <td class="sft-name">{sft.name}</td>
    </tr>
    <tr>
      <td class="font-bold">Token symbol</td>
      <td class="sft-info">{sft.symbol}</td>
    </tr>
    <tr>
      <td class="font-bold">Creation date</td>
      <td class="sft-info">{timeStampToDate(sft.deployTimestamp)}</td>
    </tr>
    <tr>
      <td class="font-bold">Number of holders</td>
      <td class="sft-info">{issuers.length}</td>
    </tr>
    <tr>
      <td class="font-bold">Token supply</td>
      <td class="sft-info">{sft?.totalShares ? ethers.utils.formatUnits(sft?.totalShares, 18) : 0}</td>
    </tr>
    <tr>
      <td class="font-bold align-text-top">Name of auditor(s)</td>
      <td class="sft-info ">
        {#if !auditors.length}
          <div>N/A</div>
        {/if}
        {#each auditors as auditor}
          <div class="underline">
            <a href={`${$activeNetwork.blockExplorer}/address/${auditor}`} target="_blank">{formatAddress(auditor)}</a>
          </div>
        {/each}
      </td>

    </tr>
    <tr>
      <td class="font-bold">Name of issuer</td>
      <td class="sft-info ">
        {#if !issuers.length}
          <div>N/A</div>
        {/if}
        {#each issuers as issuer}
          <div class="underline">
            <a href={`${$activeNetwork.blockExplorer}/address/${issuer}`} target="_blank">{formatAddress(issuer)}</a>
          </div>
        {/each}
      </td>
    </tr>
  </table>
</div>

<style>
    .sft-name {
        color: #9D7334;
    }

    .sft-info {
        color: #575757
    }

    .img-container {
        width: 88px;
        height: 88px;
    }
</style>