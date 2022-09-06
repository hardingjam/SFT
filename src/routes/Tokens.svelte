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
<div class="sft-tokens-container">
  <div class="tokens-header">
    <span>SFT Lists</span>
  </div>
  <div class="tokens-container">
    <div class="tokens f-weight-700">
      {#each $tokens as token }
        <div class="token btn-hover" on:click={()=>{handleTokenSelect(token)}}>{token.name}</div>
      {/each}
    </div>
  </div>
</div>
<style>
    .sft-tokens-container {
        width: 475px;
        background: rgba(44, 44, 84, 0.33);
        border-radius: 20px;
        padding: 12px;
        color: #ffffff;
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
        font-size: 16px;
        line-height: 27px;
    }

</style>