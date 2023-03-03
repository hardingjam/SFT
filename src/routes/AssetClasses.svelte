<script>

import DefaultFrame from "../components/DefaultFrame.svelte";
import SftLoader from "../components/SftLoader.svelte";

let schemas = [
    {
        "displayName": 'Love To',
        "schema": {
            "type": "object",
            "required": [
                "pie_certificate",
                "producer_wallet",
                "total_score",
                "max_options"
            ],
            "properties": {
                "producer_wallet": {
                    "type": "string",
                    "title": "Producer Wallet",
                },
                "total_score": {
                    "type": "string",
                    "title": "Total Score"
                },
                "max_options": {
                    "type": "string",
                    "title": "Max Options"
                },
                "pie_certificate": {
                    "type": "string",
                    "editor": "upload",
                    "title": "PIE Certificate"
                },
            }
        }
    }
]

function handleSchemasSelect(schema){
    console.log(schema)
}
</script>

<DefaultFrame header="Asset classes">
  <div slot="content">
    <div class="schemas">
      <table class="w-100">
        <tr class="f-weight-700">
          <th>Asset class label</th>
          <th>date created</th>
          <th>Asset count</th>
        </tr>
        {#if (schemas.length)}
          {#each schemas as schema }
            <tr class="schema" on:click={()=>{handleSchemasSelect(schema)}}>
              <td>{schema?.displayName}</td>
              <td>{schema?.date}</td>
              <td>{schema?.assetCount}</td>
            </tr>
          {/each}
        {/if}

      </table>
      {#if !schemas.length}
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

    .schema:hover{
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