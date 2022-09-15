<script>
    import DefaultFrame from "../components/DefaultFrame.svelte";
    import {navigateTo} from "yrv";
    import {ethersData, vault, auditHistory, activeNetwork} from "../scripts/store";
    import {beforeUpdate, onMount} from "svelte";
    import {getSubgraphData, timeStampToDate} from "../scripts/helpers.js";
    import {AUDIT_HISTORY_DATA_QUERY} from "../scripts/consts.js";
    import {ethers} from "ethers";


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
        const blockNum = await $ethersData.provider.getBlockNumber();
        const block = await $ethersData.provider.getBlock(blockNum);
        const certifiedUntil = block.timestamp + 100;
        await $vault.certify(certifiedUntil, [], false)
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
      <button class="default-btn certify-btn" on:click={()=>{certify()}}>Certify</button>
      <div class="error">System frozen until certified</div>
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

    .certify-btn {
        position: absolute;
        right: 0;
        bottom: 0;
    }

    .until {
        color: #F11717;;
    }

</style>