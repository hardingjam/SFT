<script>
    import DefaultFrame from "../components/DefaultFrame.svelte";
    import {navigateTo} from "yrv";
    import {ethersData, vault, auditHistory, activeNetwork} from "../scripts/store";
    import {beforeUpdate, onMount} from "svelte";
    import {getSubgraphData, timeStampToDate} from "../scripts/helpers.js";
    import {AUDIT_HISTORY_DATA_QUERY} from "../scripts/consts.js";
    import {ethers} from "ethers";
    import {formatDate} from "../scripts/helpers";

    let error = ''
    let certifyUntil = formatDate(new Date())
    let certifyData = []
    beforeUpdate(async () => {
        if (!$auditHistory.id) {
            let data = await getSubgraphData($activeNetwork, {id: $vault.address.toLowerCase()}, AUDIT_HISTORY_DATA_QUERY, 'offchainAssetVault')
            if (data) {
                let temp = data.data.offchainAssetVault
                auditHistory.set(temp)
            } else return {}
        }
        certifyData = $auditHistory?.certifications
    })

    let receipts = [
        {
            receiptId: 12345678,
            options: "23.000",
            updated: "2022-03-05"
        }, {
            receiptId: 12345678,
            options: "23.000",
            updated: "2022-03-05"
        }, {
            receiptId: 12345678,
            options: "23.000",
            updated: "2022-03-05"
        }, {
            receiptId: 12345678,
            options: "23.000",
            updated: "2022-03-05"
        }, {
            receiptId: 12345678,
            options: "23.000",
            updated: "2022-03-05"
        }, {
            receiptId: 12345678,
            options: "23.000",
            updated: "2022-03-05"
        }, {
            receiptId: 12345678,
            options: "23.000",
            updated: "2022-03-05"
        }, {
            receiptId: 12345678,
            options: "23.000",
            updated: "2022-03-05"
        }, {
            receiptId: 12345678,
            options: "23.000",
            updated: "2022-03-05"
        }, {
            receiptId: 12345678,
            options: "23.000",
            updated: "2022-03-05"
        }, {
            receiptId: 12345678,
            options: "23.000",
            updated: "2022-03-05"
        }, {
            receiptId: 12345678,
            options: "23.000",
            updated: "2022-03-05"
        }, {
            receiptId: 12345678,
            options: "23.000",
            updated: "2022-03-05"
        },
    ]

    async function certify() {
        let until = new Date(certifyUntil).getTime()
        await $vault.certify(until / 1000, [], false)
    }
</script>
<DefaultFrame header="Audit History">
  <div slot="header-buttons">
    <button class="header-btn btn-hover" on:click={()=>{navigateTo("#members")}}>Members</button>
    <button class="header-btn btn-hover" on:click={()=>{navigateTo("#admin")}}>Admins</button>
  </div>
  <div slot="content">
    <div class="history">
      <div class="receipts">
        <table>
          <thead>
          <tr>
            <th>Receipt ID</th>
            <th>Options</th>
            <th>Last updated</th>
          </tr>
          </thead>
          <tbody>
          {#each receipts as receipt}
            <tr>
              <td>{receipt.receiptId}</td>
              <td>{receipt.options}</td>
              <td>{receipt.updated}</td>
            </tr>
          {/each}
          </tbody>
        </table>
      </div>
      <div class="certify">
        <table>
          <thead>
          <tr>
            <th>Total amount</th>
            <th>Certified on</th>
            <th>Certified by</th>
            <th>Certified until</th>
          </tr>
          </thead>
          <tbody>
          {#each certifyData as cert}
            <tr>
              <td>{ethers.utils.formatUnits($auditHistory?.totalShares, 18)}</td>
              <td>{timeStampToDate(cert?.timestamp)}</td>
              <td>{cert?.certifier.address.replace(/(.{9}).*/, "$1…")}</td>
              <td class="until">{timeStampToDate(cert?.certifiedUntil)}</td>
            </tr>
          {/each}
          </tbody>
        </table>
      </div>
      <div class="certify-btn-container">
        <input type="date" class="default-input certify-date-input" bind:value={certifyUntil}>
        <button class="default-btn" on:click={()=>{certify()}}>Certify</button>
      </div>

    </div>
    <div class="error">
      {error}
      <!--        System frozen until certified-->
    </div>
  </div>
</DefaultFrame>
<style>

    .history {
        text-align: left;
        display: flex;
        flex-direction: column;
        min-width: 678px;
        height: 530px;
        position: relative;

    }

    table {
        width: 100%;
    }

    thead, tbody {
        text-align: center;
    }

    .receipts {
        height: 300px;
        border-bottom: 1px solid #D2D2D2;
        overflow: auto;
    }

    .certify {
        margin-top: 30px;
        height: 180px;
        overflow: auto;
    }

    .error {
        float: right;
    }

    .certify-btn-container {
        display: flex;
        justify-content: end;
    }

    .certify-date-input {
        margin-right: 5px;
        width: 110px;
        border: none;
        box-sizing: border-box;
        outline: 0;
        padding: .75rem;
        position: relative;
    }

    .until {
        color: #F11717;;
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