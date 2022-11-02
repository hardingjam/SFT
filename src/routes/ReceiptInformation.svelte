<script>
    import {onMount} from "svelte";
    import {account, activeNetwork, vault} from "../scripts/store.js";
    import {ethers} from "ethers";
    import {getSubgraphData, hexToString} from "../scripts/helpers.js";
    import {RECEIPT_INFORMATION_QUERY} from "../scripts/queries.js";
    import axios from "axios";
    import {IPFS_GETWAY} from "../scripts/consts.js";

    export let receipt = {}
    let receiptBalance = null
    let receiptInfo = {}

    let loading = false

    onMount(() => {
        getReceiptBalance(receipt);
        getReceiptData(receipt)
    })

    async function getReceiptData(receipt) {
        loading = true;
        let variables = {id: receipt.receipt.id}
        let resp = await getSubgraphData($activeNetwork, variables, RECEIPT_INFORMATION_QUERY, 'receipt')
        let receiptInfo = ""
        let byteInfo = ""

        if (resp && resp.data) {
            receiptInfo = resp.data.receipt.receiptInformations
            byteInfo = receiptInfo[0].information
            let infoHash = hexToString(byteInfo.slice(2))
            console.log(infoHash)
             let res = await axios.get(`${IPFS_GETWAY}/${infoHash}`);
            if (res) {
                console.log(res)
            }
        }
    }

    async function getReceiptBalance(receipt) {
        receiptBalance = await $vault["balanceOf(address,uint256)"](
            $account,
            receipt.receipt.receiptId
        );
        receiptBalance = ethers.utils.formatEther(ethers.BigNumber.from(receiptBalance))
    }

</script>
<div class="receipt-info-container">
  <div class="header-buttons">
    <button class="default-btn back-to-receipts"> back</button>
  </div>
  <div class="basic-frame-parent">
    <div class="basic-frame receipt-info">
      <div class="receipt-row-header">
        <span class="f-weight-700">Receipt ID (NFT): {receipt.receipt.receiptId}</span>
        <div class="date"> 11/06/2022</div>
      </div>
      <div class="receipt-row">
        <span class="f-weight-700">sft amount </span>
        <div class="date f-weight-700">{receiptBalance}</div>
      </div>

    </div>
  </div>
</div>

<style>
    .receipt-info-container {
        padding-top: 10px;
    }

    .header-buttons {
        display: flex;
        width: 100%;
        justify-content: right;
        padding: 0 12px 0 12px;
    }

    .back-to-receipts {

    }

    .receipt-info {
        min-height: 250px;
        padding: 10px 20px;
    }

    .receipt-row-header {
        display: flex;
        justify-content: space-between;
    }

    .receipt-row {
        padding: 0 20px;
        display: flex;
        justify-content: space-between;
    }
</style>