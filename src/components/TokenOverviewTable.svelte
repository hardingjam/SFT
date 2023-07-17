<script>
    import {timeStampToDate} from '../scripts/helpers.js';
    import {ethers} from 'ethers';
    import {pageTitle} from '../scripts/store.js';

    export let token;
    pageTitle.set("Token overview")
</script>
<table class="leading-8 w-full text-left">
  <tr>
    <td class="font-bold">Token name</td>
    <td class="sft-name">{token?.name}</td>
  </tr>
  <tr>
    <td class="font-bold">Token symbol</td>
    <td class="">{token?.symbol}</td>
  </tr>
  <tr>
    <td class="font-bold">Creation date</td>
    <td class="">{timeStampToDate(token?.deployTimestamp)}</td>
  </tr>
  <tr>
    <td class="font-bold">Number of holders</td>
    <td class="">{token?.tokenHolders.filter(h => h.balance !== "0").length}</td>
  </tr>
  <tr>
    <td class="font-bold">Token supply</td>
    <td class="">{token?.totalShares ? ethers.utils.formatUnits(token?.totalShares, 18) : 0}</td>
  </tr>
  <tr>
    <td class="font-bold">About</td>
    <td class=""></td>
  </tr>
</table>