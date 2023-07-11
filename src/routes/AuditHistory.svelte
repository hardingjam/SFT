<script>
    import DefaultFrame from "../components/DefaultFrame.svelte";
    import {
        vault,
        auditHistory,
        activeNetwork,
        account,
        ethersData,
        transactionError, transactionSuccess, transactionInProgress
    } from "../scripts/store";
    import {
        getSubgraphData,
        hasRole, navigate,
        showPromptSFTCreate,
        timeStampToDate
    } from "../scripts/helpers.js";
    import {AUDIT_HISTORY_DATA_QUERY} from "../scripts/queries.js";
    import {ethers} from "ethers";
    import {formatAddress, formatDate} from "../scripts/helpers";
    import {accountRoles} from "../scripts/store.js";

    let error = ''
    let certifyUntil = formatDate(new Date())
    let certifyData = []
    let loading = false;

    async function getAuditHistory() {
        if ($vault.address) {
            let data = await getSubgraphData($activeNetwork, {id: $vault.address.toLowerCase()}, AUDIT_HISTORY_DATA_QUERY, 'offchainAssetReceiptVault')
            if (data) {
                let temp = data.data.offchainAssetReceiptVault
                auditHistory.set(temp)
            } else {
                auditHistory.set({})
            }
        }
        certifyData = $auditHistory?.certifications || []
    }

    $: $activeNetwork && getAuditHistory();

    async function certify() {
        //Set date to the nearest Midnight in the future
        let untilToTime = new Date(certifyUntil).setHours(23, 59, 59, 0)
        untilToTime = new Date(untilToTime).getTime()

        const hasRoleCertifier = await hasRole($vault, $account, "CERTIFIER")
        const _referenceBlockNumber = await $ethersData.provider.getBlockNumber();
        if (!hasRoleCertifier.error) {
            try {

                let certifyTx = await $vault.certify(untilToTime / 1000, _referenceBlockNumber, false, [])
                await showPromptSFTCreate(certifyTx)

                let wait = await certifyTx.wait()
                if (wait.status === 1) {
                    let preData = await getSubgraphData($activeNetwork, {id: $vault.address.toLowerCase()}, AUDIT_HISTORY_DATA_QUERY, 'offchainAssetReceiptVault')
                    let lastElementBlockNumber = preData.data.offchainAssetReceiptVault.certifications.slice(-1)[0].transaction.blockNumber
                    let interval = setInterval(async () => {
                        if (wait.blockNumber.toString() === lastElementBlockNumber) {
                            let data = await getSubgraphData($activeNetwork, {id: $vault.address.toLowerCase()}, AUDIT_HISTORY_DATA_QUERY, 'offchainAssetReceiptVault')
                            if (auditHistory) {
                                let temp = data.data.offchainAssetReceiptVault
                                auditHistory.set(temp)
                                certifyData = $auditHistory?.certifications || []
                            } else {
                                auditHistory.set({})
                            }
                            transactionSuccess.set(true)
                            transactionInProgress.set(false)
                            clearInterval(interval)
                        }
                    }, 2000)
                } else {
                    transactionError.set(true)
                }

            } catch (e) {
                console.log(e)
            }


        } else {
            error = hasRoleCertifier.error
        }
    }

    function inFuture(date) {
        let day = date.split('-')[0]
        let month = date.split('-')[1]
        let year = date.split('-')[2]
        return new Date(`${month}/${day}/${year}`) > new Date()
    }
</script>
<DefaultFrame header="Audit history">
  <div slot="header-buttons" class="display-flex">
    <button class="header-btn btn-hover" on:click={()=>{navigate("#members")}}>Members</button>
    <button class="header-btn btn-hover" on:click={()=>{navigate("#roles")}}>Roles</button>
  </div>
  <div slot="content">
    <div class="history">
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
              <td>{ethers.utils.formatUnits(cert?.totalShares, 18)}</td>
              <td>{timeStampToDate(cert?.timestamp)}</td>
              <td>{formatAddress(cert?.certifier.address)}</td>
              <td
                class={inFuture(timeStampToDate(cert?.certifiedUntil)) ? "success" : "until"}>{timeStampToDate(cert?.certifiedUntil)}</td>
            </tr>
          {/each}
          </tbody>
        </table>
      </div>
      {#if ($accountRoles.CERTIFIER)}
        <div class="certify-btn-container">
          <input type="date" class="default-input certify-date-input" bind:value={certifyUntil}>
          <button class="default-btn" on:click={() => certify()}>Certify</button>
        </div>
      {/if}
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

    th {
        white-space: nowrap;
    }

    th, td {
        text-align: left;
    }

    td {
        padding-left: 10px;
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