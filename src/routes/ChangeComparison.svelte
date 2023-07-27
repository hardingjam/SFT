<script>
    import {
        selectedReceiptInformations,
        activeNetwork,
        sftInfo, pageTitle,
    } from "../scripts/store";
    import {
        bytesToMeta,
        cborDecode,
        formatDate,
        getSubgraphData, timeStampToDate, toSentenceCase,
    } from "../scripts/helpers.js";
    import {RECEIPT_INFORMATION_QUERY} from "../scripts/queries.js";
    import SftLoader from "../components/SftLoader.svelte";
    import {MAGIC_NUMBERS} from '../scripts/consts.js';

    let error = ''
    let receiptInformation1;
    let receiptInformation2;
    let loading = false;

    let comparisonTableData = [];


    $:$activeNetwork && getInformations();


    async function getInformations() {
        //set pageTitle
        pageTitle.set("Change comparison")

        let information_1_Id;
        let information_2_Id;

        if (!selectedReceiptInformations.length) {
            information_1_Id = localStorage.getItem("information_1")
            information_2_Id = localStorage.getItem("information_2")
        } else {
            information_1_Id = $selectedReceiptInformations[0]
            information_2_Id = $selectedReceiptInformations[1]
        }
        loading = true;
        try {
            let resp1 = await getSubgraphData($activeNetwork, {id: information_1_Id}, RECEIPT_INFORMATION_QUERY, 'receiptInformation')
            receiptInformation1 = resp1.data?.receiptInformation || {}
            let resp2 = await getSubgraphData($activeNetwork, {id: information_2_Id}, RECEIPT_INFORMATION_QUERY, 'receiptInformation')
            receiptInformation2 = resp2.data?.receiptInformation || {}
            let decodedReceiptInformation1 = decodeInformation(receiptInformation1.information)
            let decodedReceiptInformation2 = decodeInformation(receiptInformation2.information)

            comparisonTableData = decodedReceiptInformation1.map((info, index)=>{
                return {
                    field: info.field_label,
                    information_1: info.value,
                    information_2: decodedReceiptInformation2[index].value
                }
            })
        } catch (e) {
            console.log(e)
        }
        loading = false;

    }

    function decodeInformation(information) {
        let cborDecodedInformation = cborDecode(information.slice(18))
        let structure = bytesToMeta(cborDecodedInformation[0].get(0), "json")
        return Object.keys(structure).map(prop => {
            return {
                field: prop,
                field_label: toSentenceCase(prop),
                value: structure[prop]
            }
        })
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
          <th>Field</th>
          <th>Before {receiptInformation1? timeStampToDate(receiptInformation1.timestamp, 'yy-mm-dd/tt:tt') : "" }</th>
          <th>After {receiptInformation2? timeStampToDate(receiptInformation2.timestamp, 'yy-mm-dd/tt:tt'): ""}</th>
        </tr>
        </thead>
        <tbody>
        {#if selectedReceiptInformations.length}
          <!--{#each filteredReceiptInformations as information}-->
          <!--  <tr>-->
          <!--    <td class="receipt-id">-->
          <!--      <label class="check-container">-->
          <!--        <input type="checkbox" class="check-box" bind:group={selectedReceiptInformations}-->
          <!--               value={information.id}-->
          <!--               disabled={selectedReceiptInformations.length === 2 && !selectedReceiptInformations.includes(information.id)}/>-->
          <!--        <span class="checkmark"></span>-->
          <!--      </label>-->
          <!--    </td>-->
          <!--    <td class="date underline cursor-pointer">{timeStampToDate(information.timestamp, "yy-mm-dd/tt:tt")}</td>-->
          <!--    <td class="underline cursor-pointer"-->
          <!--        on:click={()=>{viewInExplorer(information.transaction.id)}}>{formatHash(information.transaction.id) ||-->
          <!--    ""}</td>-->
          <!--    <td>{formatAddress(information.emitter.address) || ""}</td>-->
          <!--    <td>{ethers.utils.formatUnits(information.receipt.deposits[0].amount, 18)}</td>-->
          <!--  </tr>-->
          <!--{/each}-->
        {/if}
        </tbody>
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

    .receipt-id {
        justify-content: center;
        display: flex;
    }

    .check-container {
        top: 8px;
        left: 18px;
    }
</style>
