<script>
    import DefaultFrame from "../components/DefaultFrame.svelte";
    import {icons} from "../scripts/assets.js"
    import {navigateTo} from "yrv";
    import {ethersData, vault} from "../scripts/store";
    import {getEventArgs} from "../scripts/helpers.js";


    function toggleEditAddress1155() {

    }

    async function certify() {
        const blockNum = await $ethersData.provider.getBlockNumber();
        const block = await $ethersData.provider.getBlock(blockNum);
        const certifiedUntil = block.timestamp + 100;

        const {until} = (await getEventArgs(
            await $vault.certify(certifiedUntil, [], false),
            "Certify",
            $vault
        ))

    }

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

    let certifyData = [
        {
            total: "23.000",
            certifiedOn: "2022-03-05",
            certifiedBy: "0x4567789",
            until: "2022-03-05"
        }, {
            total: "23.000",
            certifiedOn: "2022-03-05",
            certifiedBy: "0x4567789",
            until: "2022-03-05"
        }, {
            total: "23.000",
            certifiedOn: "2022-03-05",
            certifiedBy: "0x4567789",
            until: "2022-03-05"
        }, {
            total: "23.000",
            certifiedOn: "2022-03-05",
            certifiedBy: "0x4567789",
            until: "2022-03-05"
        },
    ]
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
              <td>{cert.total}</td>
              <td>{cert.certifiedOn}</td>
              <td>{cert.certifiedBy}</td>
              <td class="until">{cert.until}</td>
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