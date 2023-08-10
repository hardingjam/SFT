<script>
    import {toIsoDate} from '../scripts/helpers.js';
    import {ethers} from 'ethers';
    import {pageTitle} from '../scripts/store.js';

    export let token;
    pageTitle.set("Token overview")

</script>
<div class="container-main">
  <div class="labels">
    <div class="font-bold">Token name</div>
    <div class="font-bold">Token symbol</div>
    <div class="font-bold">Creation date</div>
    <div class="font-bold">Number of holders</div>
    <div class="font-bold">Token supply</div>
    <div class="font-bold">About</div>
  </div>
  <div class="data">
    <div class="sft-name">{token?.name || ""}</div>
    <div class="">{token?.symbol || ""}</div>
    <div class="">{token?.deployTimestamp ? toIsoDate(token?.deployTimestamp) : ""}</div>
    <div class="">{token?.tokenHolders ? token?.tokenHolders?.filter(h => h.balance !== "0").length : 0}</div>
    <div class="">{token?.totalShares ? ethers.utils.formatUnits(token?.totalShares, 18) : "0.0"}</div>
  </div>
</div>

<style>
  .container-main{
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
  }

  .labels{
      display: flex;
      align-items: flex-start;
      flex-direction: column;
      gap: 7px;
  }

  .data{
      display: flex;
      align-items: flex-start;
      flex-direction: column;
      gap: 7px;
  }
</style>