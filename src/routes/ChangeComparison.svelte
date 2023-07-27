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
            let fieldsArray = [...Object.keys(decodedReceiptInformation1), ...Object.keys(decodedReceiptInformation2)]
            //remove duplicate fields
            const uniqueSet = new Set(fieldsArray);
            fieldsArray = Array.from(uniqueSet);

            comparisonTableData = fieldsArray.map(field => {
                return {
                    field: toSentenceCase(field),
                    information_1: decodedReceiptInformation1[field],
                    information_2: decodedReceiptInformation2[field],
                }
            })
        } catch (e) {
            console.log(e)
        }
        loading = false;

    }

    function decodeInformation(information) {
        let cborDecodedInformation = cborDecode(information.slice(18))
        return bytesToMeta(cborDecodedInformation[0].get(0), "json")
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
          <th>Before {receiptInformation1 ? timeStampToDate(receiptInformation1.timestamp, 'yy-mm-dd/tt:tt') : "" }</th>
          <th>After {receiptInformation2 ? timeStampToDate(receiptInformation2.timestamp, 'yy-mm-dd/tt:tt') : ""}</th>
        </tr>
        </thead>
        <tbody>
        {#if comparisonTableData.length}
          {#each comparisonTableData as comparable}
            <tr>
              <td>{comparable.field}</td>
              <td>{comparable.information_1}</td>
              <td>{comparable.information_2}</td>
            </tr>
          {/each}
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
