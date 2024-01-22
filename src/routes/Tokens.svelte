<script>
    import {
        account,
        accountRoles,
        activeNetwork,
        auditHistory,
        ethersData, pageTitle, roles,
        schemas, tokenName,
        tokens, transactionInProgress, transactionInProgressShow,
        vault
    } from "../scripts/store.js";
    import {
        formatAddress,
        getContract,
        getSubgraphData,
        navigate,
        setAccountRoles, showPrompt,
        timeStampToDate
    } from "../scripts/helpers.js";
    import contractAbi from "../contract/OffchainAssetVaultAbi.json";
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
        await showPrompt(null, {topText: "SFT loading, please wait", noBottomText: true})
        let contract = await getContract($activeNetwork, token.address, contractAbi, $ethersData.signerOrProvider)
        if (contract) {
            vault.set(contract)
            schemas.set([])
            localStorage.setItem("vaultAddress", token.address)
            let auditHistoryData = await getAuditHistoryData(token.address)
            auditHistory.set(auditHistoryData)
            accountRoles.set(await setAccountRoles($roles, $account));
            transactionInProgressShow.set(false)
            transactionInProgress.set(false)
            navigate("#roles", {clear: true})
        }
    }

    async function getAuditHistoryData(token) {
        let data = await getSubgraphData($activeNetwork, {id: token.toLowerCase()}, AUDIT_HISTORY_DATA_QUERY, 'offchainAssetReceiptVault')
        if (data) {
            return data.data.offchainAssetReceiptVault
        } else return {}
    }
    pageTitle.set("SFT list")


</script>
<DefaultFrame>
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
            <tr
              class="{token?.address?.toLowerCase() === $vault?.address?.toLowerCase() ? 'active-token' : ''} token tb-row"
              on:click={()=>{handleTokenSelect(token)}}>
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
        background: #625e91;
    }

    .active-token {
        background: rgba(26, 92, 142, 0.3);
    }

</style>