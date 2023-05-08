<script>
    import {activeNetwork, auditHistory, ethersData, schemas, tokens, vault} from "../scripts/store.js";
    import {formatAddress, getContract, getSubgraphData, timeStampToDate} from "../scripts/helpers.js";
    import contractAbi from "../contract/OffchainAssetVaultAbi.json";
    import {navigateTo} from "yrv";
    import {AUDIT_HISTORY_DATA_QUERY} from "../scripts/queries.js";
    import DefaultFrame from "../components/DefaultFrame.svelte";
    import SftLoader from "../components/SftLoader.svelte";
    import {onDestroy} from "svelte";

    let loading = false;
    let interval;

    onDestroy(() => {
        clearInterval(interval);
    });

    async function handleTokenSelect(token) {
        let contract = await getContract($activeNetwork, token.address, contractAbi, $ethersData.signerOrProvider)
        if (contract) {
            vault.set(contract)
            schemas.set([])
            localStorage.setItem("vaultAddress", token.address)
            let auditHistoryData = await getAuditHistoryData(token.address)
            auditHistory.set(auditHistoryData)
            navigateTo("/roles")

        }
    }

    async function getAuditHistoryData(token) {
        let data = await getSubgraphData($activeNetwork, {id: token.toLowerCase()}, AUDIT_HISTORY_DATA_QUERY, 'offchainAssetReceiptVault')
        if (data) {
            return data.data.offchainAssetReceiptVault
        } else return {}
    }


</script>
<DefaultFrame header="SFT list">
  <div slot="content">
    <div class="tokens">
      <table>
        <tr class="f-weight-700">
          <th style="width: 25%">Name</th>
          <th style="width: 25%">Symbol</th>
          <th style="width: 25%">Deployer</th>
          <th style="width: 25%">Date created</th>
        </tr>
        {#if $tokens.length}
          {#each $tokens as token }
            <tr class="token tb-row" on:click={()=>{handleTokenSelect(token)}}>
              <td>{token.name}</td>
              <td>{token.symbol}</td>
              <td>{formatAddress(token.deployer)}</td>
              <td>{timeStampToDate(token.deployTimestamp)}</td>
            </tr>
          {/each}
        {/if}

      </table>
      {#if !$tokens.length}
        <SftLoader width="50"></SftLoader>
      {/if}
    </div>
  </div>
</DefaultFrame>

<style>
    .tokens {
        overflow: auto;
        min-height: 200px;
        text-align: left;
        width: 100%;
        min-width: 550px;
        justify-content: space-between;
        line-height: 27px;
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