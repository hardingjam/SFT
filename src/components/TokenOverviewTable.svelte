<script>
    import {formatAddress, navigate, toIsoDate} from '../scripts/helpers.js';
    import {ethers} from 'ethers';
    import {pageTitle} from '../scripts/store.js';

    let auditors = []
    let issuers = []

    export let token;
    pageTitle.set("Token overview")

    $: token && getSftData()

    function getSftData() {
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
<div class="container-main">
  <div class="row">
    <div class="font-bold label">
      Token name
    </div>
    <div class="sft-name value">{token?.name || ""}</div>
  </div>
  <div class="row">
    <div class="font-bold label">
      Token symbol
    </div>
    <div class="value">{token?.symbol || ""}</div>
  </div>
  <div class="row">
    <div class="font-bold label">
      Creation date
    </div>
    <div class="value">{token?.deployTimestamp ? toIsoDate(token?.deployTimestamp) : ""}</div>

  </div>
  <div class="row">
    <div class="font-bold label">
      Number of holders
    </div>
    <div class="value">{token?.tokenHolders ? token?.tokenHolders?.filter(h => h.balance !== "0").length : 0}</div>
  </div>
  <div class="row">
    <div class="font-bold label">
      Token supply
    </div>
    <div class="value">{token?.totalShares ? ethers.utils.formatUnits(token?.totalShares, 18) : "0.0"}</div>
  </div>
  <div class="row">
    <div class="font-bold label">
      Name of auditor(s)
    </div>
    <div class="sft-info value">
      {#if !auditors.length}
        <div >N/A</div>
      {/if}
      {#each auditors as auditor}
        <div class="underline brown cursor-pointer ">
          <span on:click={()=>{navigate(`#address-overview/${auditor}`)}}>{formatAddress(auditor)}</span>
        </div>
      {/each}
    </div>
  </div>
  <div class="row mt-2">
    <div class="font-bold label">
      Name of issuer
    </div>
    <div class="sft-info value">
      {#if !issuers.length}
        <div >N/A</div>
      {/if}
      {#each issuers as issuer}
        <div class="underline brown cursor-pointer">
          <span on:click={()=>{navigate(`#address-overview/${issuer}`)}}>{formatAddress(issuer)}</span>
        </div>
      {/each}
    </div>
  </div>
  <div class="row">

  <div class="font-bold label">About</div>
  </div>
</div>

<style>

    .row {
        line-height: 37px;
        display: flex;
        align-items: flex-start;
        text-align: left;
        gap: 45px
    }

    .label{
        width: 50%;
        white-space: nowrap;
    }
    .value{
        width: 50%;
        white-space: nowrap;
    }

</style>