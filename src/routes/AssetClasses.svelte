<script>

    import DefaultFrame from "../components/DefaultFrame.svelte";
    import SftLoader from "../components/SftLoader.svelte";
    import {activeNetwork, schemas, vault} from "../scripts/store.js";
    import {cborDecode, getIpfsGetWay, getSubgraphData, timeStampToDate} from "../scripts/helpers";
    import {VAULT_INFORMATION_QUERY} from "../scripts/queries.js";
    import axios from "axios";
    import {onMount} from "svelte";

    let ipfsLoading = false;
    function handleSchemasSelect(schema) {
        console.log(schema)
    }

    onMount(()=>{
        getSchemas()
    })

    async function getSchemas() {
        let variables = {id: $vault.address.toLowerCase()}
        if ($vault.address) {
            try {
                let resp = await getSubgraphData($activeNetwork, variables, VAULT_INFORMATION_QUERY, 'offchainAssetReceiptVault')
                let receiptVaultInformations = ""
                let tempSchema = []

                if (resp && resp.data && resp.data.offchainAssetReceiptVault) {
                    ipfsLoading = true
                    receiptVaultInformations = resp.data.offchainAssetReceiptVault.receiptVaultInformations

                    if (receiptVaultInformations.length) {

                        receiptVaultInformations.map(async data => {
                            let cborDecodedInformation = cborDecode(data.information.slice(18))
                            let schemaHash = cborDecodedInformation[1].get(0)
                            let url = await getIpfsGetWay(schemaHash)
                            try {
                                if (url) {
                                    let res = await axios.get(url)
                                    if (res) {
                                        tempSchema.push({
                                            ...res.data,
                                            timestamp: data.timestamp,
                                            id: data.id,
                                            hash: schemaHash
                                        })
                                        tempSchema = tempSchema.filter(d => d.displayName)
                                        schemas.set(tempSchema)
                                        ipfsLoading = false;
                                    }
                                }
                            } catch (err) {
                                console.log(err)
                            }
                        })
                    }
                }

            } catch (err) {
                console.log(err)
            }
        }
    }

</script>

<DefaultFrame header="Asset Class List">
  <div slot="content">
    <div class="schemas">
      <table class="w-100">
        <tr class="f-weight-700">
          <th>Asset class label</th>
          <th>date created</th>
          <th>Asset count</th>
        </tr>
        {#if ($schemas.length)}
          {#each $schemas as schema }
            <tr class="schema" on:click={()=>{handleSchemasSelect(schema)}}>
              <td>{schema?.displayName}</td>
              <td>{timeStampToDate(schema?.timestamp)}</td>
              <td>{schema?.assetCount || ""}</td>
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

    /*table tr:first-child {*/
    /*    background: #625e91;*/
    /*    color: #ffffff;*/
    /*}*/

    table td, table th {
        padding: 5px 15px;
    }

    table th {
        top: 0;
        position: sticky;
        z-index: 20;
    }

</style>