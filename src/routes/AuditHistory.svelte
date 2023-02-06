<script>
    import DefaultFrame from "../components/DefaultFrame.svelte";
    import {navigateTo} from "yrv";
    import {vault, auditHistory, activeNetwork, account, selectedReceipt, ethersData} from "../scripts/store";
    import {beforeUpdate} from "svelte";
    import {getSubgraphData, hasRole, timeStampToDate} from "../scripts/helpers.js";
    import {AUDIT_HISTORY_DATA_QUERY} from "../scripts/queries.js";
    import {ethers} from "ethers";
    import {formatAddress, formatDate} from "../scripts/helpers";

    let error = ''
    let certifyUntil = formatDate(new Date())
    let certifyData = []
    let receipts = []

    beforeUpdate(async () => {
        if ($vault.address) {
            if (!$auditHistory?.id) {
                let data = await getSubgraphData($activeNetwork, {id: $vault.address.toLowerCase()}, AUDIT_HISTORY_DATA_QUERY, 'offchainAssetReceiptVault')
                if (data) {
                    let temp = data.data.offchainAssetReceiptVault
                    auditHistory.set(temp)
                } else return {}
            }
        }
        certifyData = $auditHistory?.certifications || []
        receipts = $auditHistory?.deposits || []
    })


    async function certify() {
        //Set date to the nearest Midnight in the future
        let untilToTime = new Date(certifyUntil).setHours(23, 59, 59, 0)
        untilToTime = new Date(untilToTime).getTime()

        const hasRoleCertifier = await hasRole($vault, $account, "CERTIFIER")
        const _referenceBlockNumber = await $ethersData.provider.getBlockNumber();

        if (!hasRoleCertifier.error) {
            await $vault.certify(untilToTime / 1000, _referenceBlockNumber, false, [])

            certifyData.push({
                timestamp: new Date().getTime() / 1000,
                certifier: {address: $account.address},
                certifiedUntil: untilToTime / 1000
            })

        } else {
            error = hasRoleCertifier.error
        }
    }

    function goToReceiptAudit(receipt) {
        selectedReceipt.set(receipt)
        navigateTo(`#receipt/${$selectedReceipt.receipt.receiptId}`, {replace: false})
    }
</script>
<DefaultFrame header="Audit History" backBtn={false}>
  <div slot="header-buttons" class="display-flex">
    <button class="header-btn btn-hover" on:click={()=>{navigateTo("#members")}}>Members</button>
    <button class="header-btn btn-hover" on:click={()=>{navigateTo("#roles")}}>Roles</button>
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
            <!--            <tr class="tb-row" on:click={()=>{goToReceiptAudit(receipt)}}>-->
            <tr class="tb-row">
              <td>{receipt.receipt.receiptId}</td>
              <td>{ethers.utils.formatUnits(receipt.amount, 18)}</td>
              <td>{timeStampToDate(receipt.timestamp)}</td>
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
              <td>{formatAddress(cert?.certifier.address)}</td>
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
      <div class="error">
        {error}
        <!--        System frozen until certified-->
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
        height: 300px;
        border-bottom: 1px solid #D2D2D2;
        overflow: auto;
    }

    .receipts table th {
        width: 33%;
    }

    .certify {
        margin-top: 30px;
        height: 180px;
        overflow: auto;
    }

    .certify-btn-container {
        display: flex;
        justify-content: end;
        margin-top: 10px
    }

    .certify-date-input {
        margin-right: 5px;
        width: 130px;
        border: none;
        box-sizing: border-box;
        outline: 0;
        position: relative;
        text-align: center;
    }

    .until {
        color: #F11717;;
    }

    .default-input {
        padding-left: 0;
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