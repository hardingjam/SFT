<script>
    import {formatAddress, timeStampToDate} from '../scripts/helpers.js';
    import {ethers} from 'ethers';
    import {activeNetwork, pageTitle} from '../scripts/store.js';

    export let token;
    pageTitle.set("Token overview")
    let auditors = [];
    let issuers = [];

    $:$activeNetwork && getData()
    function getData(){
        getAuditors()
        getIssuers()
    }

    function getAuditors() {
        if (token.address) {
            let tempAuditors = token.roleHolders.filter(rh => rh.role.roleName === 'CERTIFIER')
            auditors = tempAuditors.map(a => a.account.address)
        }
    }

    function getIssuers() {
        if (token.address) {
            let tempAuditors = token.roleHolders.filter(rh => rh.role.roleName === 'DEPOSITOR')
            issuers = tempAuditors.map(a => a.account.address)
        }
    }

</script>
<table class="leading-8 w-full text-left">
  <tr>
    <td class="font-bold">Token name</td>
    <td class="sft-name">{token?.name || ""}</td>
  </tr>
  <tr>
    <td class="font-bold">Token symbol</td>
    <td class="">{token?.symbol || ""}</td>
  </tr>
  <tr>
    <td class="font-bold">Creation date</td>
    <td class="">{token?.deployTimestamp ? timeStampToDate(token?.deployTimestamp) : ""}</td>
  </tr>
  <tr>
    <td class="font-bold">Number of holders</td>
    <td class="">{token?.tokenHolders ? token?.tokenHolders?.filter(h => h.balance !== "0").length : 0}</td>
  </tr>
  <tr>
    <td class="font-bold">Token supply</td>
    <td class="">{token?.totalShares ? ethers.utils.formatUnits(token?.totalShares, 18) : "0.0"}</td>
  </tr>
  <tr>
    <td class="font-bold align-text-top">Name of auditor(s)</td>
    <td class="sft-info ">
      {#if !auditors.length}
        <div>N/A</div>
      {/if}
      {#each auditors as auditor}
        <div class="underline brown">
          <a href={`${$activeNetwork.blockExplorer}/address/${auditor}`}
             target="_blank">{formatAddress(auditor)}</a>
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
        <div class="underline brown">
          <a href={`${$activeNetwork.blockExplorer}/address/${issuer}`}
             target="_blank">{formatAddress(issuer)}</a>
        </div>
      {/each}
    </td>
  </tr>
  <tr>
    <td class="font-bold">About</td>
    <td class=""></td>
  </tr>
</table>