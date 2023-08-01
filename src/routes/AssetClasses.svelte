<script>

    import DefaultFrame from "../components/DefaultFrame.svelte";
    import SftLoader from "../components/SftLoader.svelte";
    import {activeNetwork, schemas, vault, deposits, accountRoles, tokenName, pageTitle} from "../scripts/store.js";
    import {getSchemas, getSubgraphData, navigate, timeStampToDate} from "../scripts/helpers";
    import {DEPOSITS_QUERY} from "../scripts/queries.js";
    import {onMount} from "svelte";
    import {navigateTo} from 'yrv';

    let ipfsLoading = false;

    function handleSchemasSelect(schema) {
        console.log(schema)
    }

    onMount(async () => {
        // if ($vault.address && ((Object.keys($accountRoles).length && !$accountRoles.DEPOSITOR))) {
        //     navigateTo('#set-vault');
        // } else {
        await getData()
        // }
    })

    $: $activeNetwork.chainId && getData()

    async function getData() {
        if ($activeNetwork.chainId && !$schemas.length) {
            await getDeposits()
            let tempSchemas = await getSchemas($activeNetwork, $vault, $deposits)
            if (tempSchemas) {
                schemas.set(tempSchemas)
            }
        }
    }

    async function getDeposits() {
        let variables = {id: $vault.address.toLowerCase()}

        getSubgraphData($activeNetwork, variables, DEPOSITS_QUERY, 'offchainAssetReceiptVault').then((res) => {
            deposits.set(res.data.offchainAssetReceiptVault.deposits)
        })
    }

    pageTitle.set(`${$tokenName} asset class list`)

</script>
<div class="asset-classes-container">
  <div class="header">
    <div class="title">{`${$tokenName} asset class list`}</div>
    <div class="buttons">
      <button class="default-btn" on:click={()=>{navigate("#mint")}}>Mint</button>
      <button class="default-btn" on:click={()=>{navigate("#new-asset-class")}}>New asset class</button>
    </div>

  </div>
  <div class="schemas">
    <table class="w-100">
      <tr class="f-weight-700">
        <th>Asset class label</th>
        <th>Date created</th>
        <th>Asset count</th>
      </tr>
      {#if ($schemas?.length)}
        {#each $schemas as schema }
          <tr class="schema" on:click={()=>{handleSchemasSelect(schema)}}>
            <td class="underline">{schema?.displayName}</td>
            <td>{timeStampToDate(schema?.timestamp)}</td>
            <td>{schema?.assetCount || 0}</td>
          </tr>
        {/each}
      {/if}

    </table>
    {#if ipfsLoading}
      <SftLoader width="50"></SftLoader>
    {/if}
  </div>
</div>


<style>

    .asset-classes-container{
        border-radius: 10px;
        background: #ffffff;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .schemas {
        overflow: auto;
        text-align: left;
        width: 100%;
        min-width: 670px;
        justify-content: space-between;
        line-height: 27px;
        display: flex;
        flex-direction: column;
        min-height: 300px;
        padding: 16px 45px 60px 45px
    }

    table td, table th {
        padding: 5px 15px;
    }

    .header {
        position: relative;
        display: flex;
        align-items: center;
        border-bottom-width: 1px;
        width: 100%;
        justify-content: space-between;
        padding: 16px 60px;

    }

    .buttons{
        display: flex;
        gap: 20px;
        justify-content: space-between;
    }

</style>