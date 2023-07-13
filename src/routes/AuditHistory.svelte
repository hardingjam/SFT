<script>
    import {
        vault,
        auditHistory,
        activeNetwork,
        account,
        ethersData,
        transactionError, transactionSuccess, transactionInProgress, sftInfo
    } from "../scripts/store";
    import {
        getSubgraphData,
        hasRole,
        showPromptSFTCreate,
        timeStampToDate
    } from "../scripts/helpers.js";
    import {AUDIT_HISTORY_DATA_QUERY} from "../scripts/queries.js";
    import {ethers} from "ethers";
    import {formatAddress, formatDate} from "../scripts/helpers";
    import {accountRoles} from "../scripts/store.js";
    import SftLoader from '../components/SftLoader.svelte';
    import Pagination from '../components/Pagination.svelte';

    let error = ''
    let certifyUntil = formatDate(new Date())
    let certifyData = []
    let loading = false;
    let filteredCertifications = [];
    let perPage = 10;
    let currentPage = 1
    let maxCertifiedUntil = 0

    function getMaxCertifyDate() {
        for (const element of certifyData) {
            const certifiedUntil = parseInt(element.certifiedUntil);
            if (certifiedUntil > maxCertifiedUntil) {
                maxCertifiedUntil = certifiedUntil;
            }
        }
        maxCertifiedUntil = new Date(timeStampToDate(maxCertifiedUntil, "yyyy-mm-dd")).setHours(23, 59)
    }

    async function getAuditHistory() {
        if ($vault.address) {
            loading = true
            let data = await getSubgraphData($activeNetwork, {id: $vault.address.toLowerCase()}, AUDIT_HISTORY_DATA_QUERY, 'offchainAssetReceiptVault')
            if (data) {
                let temp = data.data.offchainAssetReceiptVault
                auditHistory.set(temp)
            } else {
                auditHistory.set({})
            }
        }
        certifyData = $auditHistory?.certifications || []
        let skip = (perPage * (currentPage - 1)) - 1
        filteredCertifications = certifyData.filter((r, index) => index > skip && index <
            perPage * currentPage)
        loading = false

        getMaxCertifyDate()

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
                    let interval = setInterval(async () => {
                        let preData = await getSubgraphData($activeNetwork, {id: $vault.address.toLowerCase()}, AUDIT_HISTORY_DATA_QUERY, 'offchainAssetReceiptVault')
                        preData = preData?.data?.offchainAssetReceiptVault.certifications
                        if (preData && preData.length) {
                            if (wait.blockNumber.toString() === preData[0].transaction.blockNumber) {
                                let data = await getSubgraphData($activeNetwork, {id: $vault.address.toLowerCase()}, AUDIT_HISTORY_DATA_QUERY, 'offchainAssetReceiptVault')
                                let temp = data.data.offchainAssetReceiptVault
                                auditHistory.set(temp)
                                certifyData = $auditHistory?.certifications || []
                                let skip = (perPage * (currentPage - 1)) - 1
                                filteredCertifications = certifyData.filter((r, index) => index > skip && index <
                                    perPage * currentPage)
                                getMaxCertifyDate()
                                transactionSuccess.set(true)
                                transactionInProgress.set(false)
                                clearInterval(interval)
                            }
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
        let d = new Date(`${month}/${day}/${year}`).setHours(23, 59)
        return d > new Date()
    }

    async function handlePageChange(event) {
        currentPage = event.detail.currentPage
        let skip = (perPage * (currentPage - 1)) - 1
        filteredCertifications = certifyData.filter((r, index) => index > skip && index < perPage * currentPage)
    }
</script>

<div class="{$sftInfo ? 'w-full' : 'left-margin'} receipts">

  <div class="title">
    Audit history
  </div>
  {#if loading}
    <SftLoader/>
  {/if}
  {#if !loading }
    <div class="sft-table-container">

      <table class="sft-table">
        <thead>
        <tr>
          <th>Total amount</th>
          <th>Certified on</th>
          <th>Certified by</th>
          <th>Certified until</th>
        </tr>
        </thead>
        <tbody>
        {#if certifyData.length}

          {#each filteredCertifications as cert}
            <!--            <tr class="tb-row" on:click={()=>{goToReceiptAudit(receipt)}}>-->
            <tr class="tb-row">
              <td>{ethers.utils.formatUnits(cert?.totalShares, 18)}</td>
              <td>{timeStampToDate(cert?.timestamp)}</td>
              <td>{formatAddress(cert?.certifier.address)}</td>
              <td class={inFuture(timeStampToDate(cert?.certifiedUntil)) ? "success" : "until"}>
                {timeStampToDate(cert?.certifiedUntil)}
              </td>
            </tr>
          {/each}
        {/if}

        </tbody>
        <Pagination dataLength={certifyData.length} {perPage} on:pageChange={handlePageChange}>
          <div slot="actions">
            {#if !loading && ($accountRoles.CERTIFIER)}
              <div class="certify-btn-container">
                {#if maxCertifiedUntil < new Date()}
                  <span class="error">System frozen until certified</span>
                {/if}
                <input type="date" class="default-input certify-date-input" bind:value={certifyUntil}>
                <button class="default-btn" on:click={() => certify()}>Certify</button>
              </div>
            {/if}
          </div>
        </Pagination>

      </table>
    </div>
  {/if}
</div>

<style>
    .left-margin {
        margin-left: 223px;
    }

    .receipts {
        width: 100%;
        margin-right: 20px;
        margin-top: 90px;
    }

    .title {
        color: #6B7280;
        font-weight: 700;
        text-align: center;
        width: 100%;
        margin-bottom: 25px;
    }

    .certify-btn-container {
        display: flex;
        justify-content: end;
        margin-top: 10px
    }

    .certify-date-input {
        margin-right: 20px;
        margin-left: 20px;
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