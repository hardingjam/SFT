<script>


    import MintInput from "../components/MintInput.svelte";

    let shouldDisable = false;
    let balance = 1234567;
    let amount = 0;


    function redeem() {
        console.log(4545)
    }

    let receipts = [
        {
            id: 12345678,
            amount: 12345,
            minted: "11/07/2022",
        }, {
            id: 12345678,
            amount: 12345,
            minted: "11/07/2022",
        }, {
            id: 12345678,
            amount: 12345,
            minted: "11/07/2022",
        }, {
            id: 12345678,
            amount: 12345,
            minted: "11/07/2022",
        }, {
            id: 12345678,
            amount: 12345,
            minted: "11/07/2022",
        }, {
            id: 12345678,
            amount: 12345,
            minted: "11/07/2022",
        }, {
            id: 12345678,
            amount: 12345,
            minted: "11/07/2022",
        }, {
            id: 12345678,
            amount: 12345,
            minted: "11/07/2022",
        }, {
            id: 12345678,
            amount: 12345,
            minted: "11/07/2022",
        }, {
            id: 12345678,
            amount: 12345,
            minted: "11/07/2022",
        }

    ]
</script>


<div class="redeem-container">
  <div class="title"><span class="f-weight-700">Token Balance (FT):</span> {balance}</div>
  <div class=" basic-frame-parent">
    <div class="receipts-table-container basic-frame">
      <table class="receipts-table">
        <tr>
          <td class="f-weight-700 receipt-id">Receipt ID (NFT)</td>
          <td class="f-weight-700">Amount</td>
          <td class="f-weight-700">Minted</td>
        </tr>
        {#each receipts as receipt}
          <tr>
            <td class="receipt-id"><input type="checkbox" class="check-box"/>{receipt.id}</td>
            <td class="value">{receipt.amount}</td>
            <td class="value">{receipt.minted}</td>
          </tr>
        {/each}

      </table>
    </div>
  </div>
  <MintInput bind:amount={amount} amountLabel={"Total to Redeem"} label={"Options"}/>
  <button class="btn-hover redeem-btn btn-default btn-submit" on:click={() => redeem()}>Redeem
    Options
  </button>

</div>

<style>
    .receipts-table-container {
        height: 255px;
        overflow: auto;
    }

    .title {
        padding-top: 25px;
        font-size: 16px;
        line-height: 27px;
        text-align: right;
        margin-right: 55px;
    }

    .receipts-table {
        width: 100%;
        font-size: 16px;
        line-height: 30px;
    }

    .check-box {
        margin-right: 8px;
    }

    .receipt-id {
        width: 33%;
    }

    .redeem-btn {
        margin-top: 33px;
        width: calc(100% - 50px);
    }
</style>