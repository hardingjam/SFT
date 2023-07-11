<script>
    import {navigateTo} from "yrv";
    import {
        vault,
        auditHistory,
        activeNetwork,
        selectedReceipt, sftInfo,
    } from "../scripts/store";
    import {
        cborDecode,
        getSubgraphData, navigate,
        timeStampToDate
    } from "../scripts/helpers.js";
    import {AUDIT_HISTORY_DATA_QUERY} from "../scripts/queries.js";
    import {ethers} from "ethers";
    import {formatDate} from "../scripts/helpers";
    import {
        IPFS_GETWAY,
        MAGIC_NUMBERS,
    } from "../scripts/consts.js";
    import axios from "axios";
    import SftLoader from "../components/SftLoader.svelte";

    let error = ''
    let certifyUntil = formatDate(new Date())
    let receipts = []
    let loading = false;
    let tempReceipts = []

    $:tempReceipts && setAssetClasses()
    $: $activeNetwork && getAuditHistory();

    async function setAssetClasses() {
        receipts = await Promise.all(tempReceipts.map(async (r) => {
            let information = r.receipt.receiptInformations[0]?.information ?
                cborDecode(r.receipt.receiptInformations[0]?.information.slice(18)) :
                null
            let schemaHash = information ? information[0].get(MAGIC_NUMBERS.OA_SCHEMA) : null
            let schema;
            if (schemaHash) {

                try {
                    let res = await axios.get(`${IPFS_GETWAY}${schemaHash}`)
                    if (res) {
                        schema = res.data.displayName
                    }
                } catch (err) {
                    console.log(err)
                }
            }

            return {...r, information, schema}
        }))
    }

    function goToAssetInformation(receipt) {
        selectedReceipt.set(receipt)
        navigate(`#asset-information/${$selectedReceipt.receipt.receiptId}`)
    }

    async function getAuditHistory() {
        if ($vault.address) {
            loading = true
            try {
                let data = await getSubgraphData($activeNetwork, {id: $vault.address.toLowerCase()}, AUDIT_HISTORY_DATA_QUERY, 'offchainAssetReceiptVault')

                if (data) {
                    let temp = data.data.offchainAssetReceiptVault
                    auditHistory.set(temp)
                } else {
                    auditHistory.set({})
                }
            } catch (e) {
                console.log(e)
            }

            loading = false
        }
        tempReceipts = $auditHistory?.deposits || []
    }
</script>
<div class="{$sftInfo ? 'w-full' : 'left-margin'} receipts">

  <div class="title">
    Asset register
  </div>
  {#if loading}
    <SftLoader/>
  {/if}
  {#if !loading && receipts.length}
    <table class="sft-table">
      <thead>
      <tr>
        <th>Receipt ID</th>
        <th>Asset class</th>
        <th>Amount</th>
        <th>Last updated</th>
      </tr>
      </thead>
      <tbody>
      {#each receipts as receipt}
        <!--            <tr class="tb-row" on:click={()=>{goToReceiptAudit(receipt)}}>-->
        <tr class="tb-row">
          <td class="brown hover-underline" on:click={()=>{goToAssetInformation(receipt)}}>{receipt.receipt.receiptId}</td>
          <td>{receipt.schema || ""}</td>
          <td>{ethers.utils.formatUnits(receipt.amount, 18)}</td>
          <td>{timeStampToDate(receipt.timestamp)}</td>
        </tr>
      {/each}
      </tbody>
    </table>
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
</style>
