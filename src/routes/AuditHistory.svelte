<script>
    import {
        vault,
        auditHistory,
        activeNetwork, sftInfo, pageTitle
    } from "../scripts/store";
    import {
        getSubgraphData,
        navigate,
        timeStampToDate, toIsoDate
    } from "../scripts/helpers.js";
    import {AUDIT_HISTORY_DATA_QUERY} from "../scripts/queries.js";
    import {ethers} from "ethers";
    import {formatAddress} from "../scripts/helpers";
    import {accountRoles} from "../scripts/store.js";
    import SftLoader from '../components/SftLoader.svelte';
    import Pagination from '../components/Pagination.svelte';

    let error = ''
    let certifyData = []
    let loading = false;
    let filteredCertifications = [];
    let perPage = 10;
    let currentPage = 1

    async function getAuditHistory() {

        //set pageTitle
        pageTitle.set("Audit history")

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
    }

    $: $activeNetwork && getAuditHistory();


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
          <th>Audit report</th>
          <th>Certified until</th>
        </tr>
        </thead>
        <tbody>
        {#if certifyData.length}

          {#each filteredCertifications as cert}
            <tr class="tb-row">
              <td>{ethers.utils.formatUnits(cert?.totalShares, 18)}</td>
              <td>{timeStampToDate(cert?.timestamp)}</td>
              <td><span class="underline brown cursor-pointer"
                        on:click={()=>{navigate(`#address-overview/${cert?.certifier.address}`)}}>{formatAddress(cert?.certifier.address)}</span>
              </td>
              <td>
                {#if (cert?.data)}
                  <span class="brown cursor-pointer underline" on:click={()=>{navigate(`#audit-report/${cert?.id}`)}}>Asset class data</span>
                {/if}
                {#if (!cert?.data)}
                  N/A
                {/if}
              </td>
              <td class={inFuture(timeStampToDate(cert?.certifiedUntil)) ? "success" : "until"}>
                {toIsoDate(cert?.certifiedUntil)}
              </td>
            </tr>
          {/each}
        {/if}

        </tbody>


      </table>
      <Pagination dataLength={certifyData.length} {perPage} on:pageChange={handlePageChange}>
        <div slot="actions">
          {#if !loading && ($accountRoles.CERTIFIER)}
            <div class="certify-btn-container">
              <button class="default-btn ml-3" on:click={() => navigate('#certify')}>Certify</button>
            </div>
          {/if}
        </div>
      </Pagination>
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
        margin-top: 102px;
    }

    .certify-btn-container {
        display: flex;
        justify-content: end;
    }

    .until {
        color: #F11717;;
    }

</style>