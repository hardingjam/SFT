<script>

    import DefaultFrame from "../components/DefaultFrame.svelte";
    import {navigateTo} from "yrv";

    export let receipt = {};

</script>
<DefaultFrame header="Audit History">
  <div slot="header-buttons" class="display-flex">
    <button class="header-btn btn-hover" on:click={()=>{navigateTo("#admin")}}>Admins</button>
  </div>
  <div slot="content">
    <div class="history">
      <div class="receipts">
        {#if (receipt.receipt.receiptInformations.length)}
          <table>
            <tbody>
            {#each receipt.receipt.receiptInformations as info}
              <tr class="tb-row">
                <td>{info.key}</td>
                <td>{info.value}</td>
              </tr>
            {/each}
            </tbody>
          </table>
        {/if}
        {#if (!receipt.receipt.receiptInformations.length)}
          <div class="no-data">Nothing to show</div>
        {/if}
      </div>
      <div class="error">
      </div>
    </div>
  </div>
</DefaultFrame>

<style>

    .history {
        text-align: left;
        display: flex;
        flex-direction: column;
        width: 678px;
        min-height: 530px;
        position: relative;

    }

    table {
        width: 100%;
    }

    thead, tbody {
        text-align: center;
    }

    th, td {
        text-align: left;
    }

    td {
        padding-left: 10px;
    }

    .receipts {
        max-height: 300px;
        min-height: 100px;
        border-bottom: 1px solid #D2D2D2;
        overflow: auto;
    }

    .receipts table th {
        width: 33%;
    }

    input[type="date"]::-webkit-calendar-picker-indicator {
        background: transparent;
        bottom: 0;
        color: transparent;
        cursor: pointer;
        height: auto;
        left: 0;
        position: absolute;
        right: 0;
        top: 0;
        width: auto;
    }

</style>