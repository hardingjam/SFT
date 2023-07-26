<script>
    import {
        vault,
        activeNetwork,
        sftInfo, pageTitle,
    } from "../scripts/store";
    import {
        formatAddress, formatHash,
        getSubgraphData,
        timeStampToDate
    } from "../scripts/helpers.js";
    import {RECEIPT_INFORMATION_QUERY} from "../scripts/queries.js";
    import {ethers} from "ethers";
    import {formatDate} from "../scripts/helpers";
    import SftLoader from "../components/SftLoader.svelte";
    import Pagination from '../components/Pagination.svelte';

    let error = ''
    let certifyUntil = formatDate(new Date())
    let receiptInformations = []
    let receipt;
    let loading = false;
    let filteredReceiptInformations = [];
    let perPage = 20;
    let currentPage = 1;

    $:$activeNetwork && getAuditHistory();


    async function getAuditHistory() {
        //set pageTitle
        pageTitle.set("Asset history")

        let variables
        if (!receipt) {
            let receiptId = $vault.address + "-" + window.location.hash.split("/")[1]
            variables = {id: receiptId}
        } else {
            variables = {id: receipt.id}
        }
        loading = true;
        try {
            let resp = await getSubgraphData($activeNetwork, variables, RECEIPT_INFORMATION_QUERY, 'receipt')
            receiptInformations = resp.data?.receipt.receiptInformations || []
            let skip = (perPage * (currentPage - 1)) - 1
            filteredReceiptInformations = receiptInformations.filter((r, index) => index > skip && index < perPage *
                currentPage)

        } catch (e) {
            console.log(e)
        }
        loading = false;


    }

    async function handlePageChange(event) {
        currentPage = event.detail.currentPage
        let skip = (perPage * (currentPage - 1)) - 1
        filteredReceiptInformations = receiptInformations.filter((r, index) => index > skip && index < perPage *
            currentPage)
    }

    function viewInExplorer(hash) {
        window.open(`${$activeNetwork.blockExplorer}/tx/${hash}`);
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
          <th></th>
          <th>Date/Time</th>
          <th>Transaction lInk</th>
          <th>Author</th>
          <th>Amount change</th>
        </tr>
        </thead>
        <tbody>
        {#if receiptInformations.length}
          {#each filteredReceiptInformations as information}
            <tr >
              <td></td>
              <td class="date underline cursor-pointer">{timeStampToDate(information.timestamp, "yy-mm-dd/tt:tt")}</td>
              <td class="underline cursor-pointer" on:click={()=>{viewInExplorer(information.transaction.id)}}>{formatHash(information.transaction.id) ||
              ""}</td>
              <td>{formatAddress(information.emitter.address) || ""}</td>
              <td>{ethers.utils.formatUnits(information.receipt.deposits[0].amount, 18)}</td>
            </tr>
          {/each}
        {/if}
        </tbody>
        <Pagination dataLength={receiptInformations.length} {perPage} on:pageChange={handlePageChange}/>
      </table>
    </div>
  {/if}
</div>

<style>

    .date {
        color: #9D7334
    }

    .left-margin {
        margin-left: 223px;
    }

    .receipts {
        width: 100%;
        margin-right: 20px;
        margin-top: 102px;
    }

</style>
