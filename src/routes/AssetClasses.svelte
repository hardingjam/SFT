<script>

    import DefaultFrame from "../components/DefaultFrame.svelte";
    import SftLoader from "../components/SftLoader.svelte";
    import {activeNetwork, schemas, vault, deposits} from "../scripts/store.js";
    import {getSchemas, getSubgraphData, timeStampToDate} from "../scripts/helpers";
    import {DEPOSITS_QUERY} from "../scripts/queries.js";
    import {onMount} from "svelte";

    let ipfsLoading = false;

    function handleSchemasSelect(schema) {
        console.log(schema)
    }

    onMount(async () => {
        if (!$schemas.length) {
            await getDeposits()
            schemas.set(await getSchemas($activeNetwork, $vault, $deposits))
        }
    })

    async function getDeposits() {
        let variables = {id: $vault.address.toLowerCase()}

        getSubgraphData($activeNetwork, variables, DEPOSITS_QUERY, 'offchainAssetReceiptVault').then((res) => {
            deposits.set(res.data.offchainAssetReceiptVault.deposits)
        })
    }


</script>

<DefaultFrame header="Asset class list">
  <div slot="content">
    <div class="schemas">
      <table class="w-100">
        <tr class="f-weight-700">
          <th>Asset class label</th>
          <th>Date created</th>
          <th>Asset count</th>
        </tr>
        {#if ($schemas.length)}
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
        min-width: 435px;
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