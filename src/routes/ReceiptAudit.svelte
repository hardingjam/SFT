<script>

    import DefaultFrame from "../components/DefaultFrame.svelte";
    import {navigateTo} from "yrv";
    import SftLoader from "../components/SftLoader.svelte";
    import {activeNetwork, selectedReceipt} from "../scripts/store.js";
    import {ethers} from "ethers";
    import {timeStampToDate} from "../scripts/helpers.js";

    let receipt = $selectedReceipt.receipt;
    let loading = false
    let checkedReceipts = []

    function getHash(id) {
        return id.split('-')[1]
    }
</script>
<DefaultFrame header={`Audit History > ${receipt.receiptId}`}>
  <div slot="header-buttons" class="display-flex">
    <button class="header-btn btn-hover" on:click={()=>{navigateTo("#roles")}}>Roles</button>
  </div>
  <div slot="content">
    <div class="history">
      <div class="receipts">
        {#if (receipt.receiptInformations.length)}
          <table>
            <tbody>
            {#each receipt.receiptInformations as info}
              <tr class="tb-row">
                <td>{info.key}</td>
                <td>{info.value}</td>
              </tr>
            {/each}
            </tbody>
          </table>
        {/if}
        {#if (!receipt.receiptInformations.length)}
          <div class="no-data">Nothing to show</div>
        {/if}
      </div>
      <div class="receipts-table-container">
        {#if !loading}
          <SftLoader width="50"></SftLoader>
        {/if}
        {#if !loading}
          <table class="receipts-table">
            <tr>
              <td class="f-weight-700"></td>
              <td class="f-weight-700">Options</td>
              <td class="f-weight-700">Date</td>
              <td class="f-weight-700">Transaction Hash</td>
            </tr>
            {#each receipt.deposits as deposit}
              <tr>
                <td>
                  <label class="check-container">
                    <input type="checkbox" class="check-box" bind:group={checkedReceipts}
                           value={deposit.id}/>
                    <span class="checkmark"></span>
                  </label>
                </td>
                <td class="receipt-id">
                  <div class="check-box-label btn-hover">{ethers.utils.formatUnits(deposit.amount, 18)}</div>
                </td>
                <td class="value">{timeStampToDate(deposit.timestamp)} </td>
                <td class="value">
                  <a href="{`${$activeNetwork.blockExplorer}/tx/${getHash(deposit.id)}`}" target="_blank">
                    {getHash(deposit.id).replace(/(.{6}).*(.{6})/, "$1…$2") || ""}
                  </a>
                </td>
              </tr>
            {/each}

          </table>
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

    td {
        text-align: center;
    }

    a {
        text-decoration: none;
        color: inherit;
    }

    a:hover {
        text-decoration: underline;
    }
</style>