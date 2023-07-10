<script>

    import DefaultFrame from "../components/DefaultFrame.svelte";
    import SftLoader from "../components/SftLoader.svelte";
    import {activeNetwork, schemas, vault, deposits, accountRoles, tokenName} from "../scripts/store.js";
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


</script>

<DefaultFrame header={`${$tokenName} asset class list`}>
  <div slot="header-buttons" class="display-flex">
    <button class="header-btn btn-hover" on:click={()=>{navigate("#mint")}}>Mint</button>
    <button class="header-btn btn-hover" on:click={()=>{navigate("#new-asset-class")}}>New asset class</button>
  </div>
  <div slot="content">
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
              <td>{schema?.displayName}</td>
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
</DefaultFrame>

<style>
    .schemas {
        overflow: auto;
        min-height: 200px;
        text-align: left;
        width: 100%;
        min-width: 670px;
        justify-content: space-between;
        line-height: 27px;
    }

    .schema:hover {
        text-decoration: underline;
        cursor: pointer;
    }

    table td, table th {
        padding: 5px 15px;
    }

    table th {
        /*top: 0;*/
        /*position: sticky;*/
        /*z-index: 20;*/
    }

</style>