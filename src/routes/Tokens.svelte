<script>
    import {activeNetwork, ethersData, tokens, vault} from "../scripts/store.js";
    import {getContract} from "../scripts/helpers.js";
    import contractAbi from "../contract/OffchainAssetVaultAbi.json";
    import {navigateTo} from "yrv";

    async function handleTokenSelect(token) {
        let contract = await getContract($activeNetwork, token.address, contractAbi, $ethersData.signerOrProvider)
        if (contract) {
            vault.set(contract)
            localStorage.setItem("vaultAddress", token.address)
            navigateTo("#admin")
        }
    }

</script>
<div class="sft-tokens-container default-frame">
  <div class="tokens-header">
    <span>SFT Lists</span>
  </div>
  <div class="tokens-container">
    <div class="tokens">
      <table>
        <tr class="f-weight-700">
          <th>Name</th>
          <th>Symbol</th>
          <th>URL</th>
        </tr>
        {#each $tokens as token }
          <tr class="token btn-hover" on:click={()=>{handleTokenSelect(token)}}>
            <td>{token.name}</td>
            <td>{token.symbol}</td>
            <td>{token.uri}</td>
          </tr>
        {/each}
      </table>
    </div>
  </div>
</div>
<style>
    .sft-tokens-container {
        min-width: 550px;
    }

    .tokens-header {
        color: #ffffff;
        display: flex;
        justify-content: space-between;
        padding: 5px 25px 10px 35px;
    }

    .tokens-container {
        background: #FFFFFF;
        border-radius: 10px;
        color: #000000;
        display: flex;
        flex-direction: column;
        overflow: hidden;

    }

    .tokens {
        overflow: auto;
        height: calc(100vh - 280px);
        text-align: left;
        width: 100%;
        justify-content: space-between;
        margin-top: 15px;
        padding-left: 50px;
        padding-right: 50px;
        font-size: 16px;
        line-height: 27px;
    }

    table tr {
        border-top: 1px solid #625e91;
    }

    table tr:hover {
        background: #625e91;
        color: #ffffff
    }

    table tr:first-child {
        background: #625e91;
        color: #ffffff;
    }

    table td, table th {
        padding: 5px 15px;
    }

    table th {
        top: 0;
        position: sticky;
        z-index: 20;
        background: #625e91;
    }

</style>