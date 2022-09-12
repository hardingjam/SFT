<script>


    import MintInput from "../components/MintInput.svelte";
    import {getSubgraphData} from "../scripts/helpers.js";
    import {account, activeNetwork, data, roles, vault} from "../scripts/store.js";
    import {onMount} from "svelte";
    import {ONE} from "../scripts/consts.js";
    import {ethers} from "ethers";
    import Spinner from "../components/Spinner.svelte";

    let shouldDisable = false;
    let amount;
    let selectedReceipt = null;
    let totalShares = 0
    let error = ""

    let loading = false

    export let ethersData;
    let {signer} = ethersData;

    async function redeem() {
        try {
            if (selectedReceipt) {
                error = ''
                const redeemAmount = ethers.utils.parseEther(amount.toString());

                const receiptBalance = await getReceiptBalance()

                if ((receiptBalance.sub(redeemAmount)).isNegative()) {
                    error = "Not enough balance"
                    return
                }

                if (redeemAmount.eq(0)) {
                    error = "0 amount"
                    return
                }

                const tx = await $vault["redeem(uint256,address,address,uint256)"](
                    redeemAmount,
                    $account,
                    $account,
                    selectedReceipt
                );
                await tx.wait();

                await getData()
                amount = 0;
            } else {
                error = "Select receipt id"
                return
            }
        } catch (err) {
            error = err.reason
        }
        shouldDisable = false;
    }


    let depositWithReceipts = []

    let query = `
          query($id: ID!) {
           account(id: $id)
           {
              id,
              offchainAssetVault
              {
                name
                deposits
                {
                  id,
                  timestamp,
                  amount,
                  receipt
                  {
                    id,
                    shares,
                    receiptId,
                    balances {
                      value,
                      valueExact
                    }
                  },
                }
              }
           }
        }
         `
    let getVaultDeployer = `
          query($id: ID!) {
            offchainAssetVault(id: $id) {
                deployer,
                totalShares
            }
          }
         `

    onMount(async () => {
        await getData()
    });


    async function getData() {
        loading = true;
        let variables = {id: $vault.address.toLowerCase()}
        let temp = await getSubgraphData($activeNetwork, variables, getVaultDeployer, 'offchainAssetVault')
        if (temp && temp.data.offchainAssetVault) {
            totalShares = temp.data.offchainAssetVault.totalShares
            let variables = {id: `${$vault.address.toLowerCase()}-${$account.toLowerCase()}`}
            getSubgraphData($activeNetwork, variables, query, 'account').then((res) => {
                depositWithReceipts = res.data.account.offchainAssetVault.deposits.filter(d => d.receipt.balances[0].value > 0)
                loading = false
            })
        }
    }


    function timeStampToDate(timeStamp) {
        if (timeStamp) {
            let d = new Date(timeStamp * 1000)
            let day = d.getDate();
            let month = d.getMonth() + 1;
            let year = d.getFullYear()
            return day + '/' + month + "/" + year
        }
    }

    async function getReceiptBalance() {
        let receiptBalance

        if (selectedReceipt.length) {
            receiptBalance = await $vault["balanceOf(address,uint256)"](
                $account,
                selectedReceipt
            );
        }
        return ethers.BigNumber.from(receiptBalance)
    }

    async function setMaxValue() {
        let balance = await getReceiptBalance()
        amount = ethers.utils.formatEther(balance)
    }

</script>


<div class="redeem-container">
  <div class="title"><span
      class="f-weight-700">Total Supply: (FT):</span>
    {totalShares / ONE}
  </div>
  <div class="basic-frame-parent">
    <div class="receipts-table-container basic-frame">
      {#if loading}
        <Spinner></Spinner>
      {/if}
      {#if !loading}
        <table class="receipts-table">
          <tr>
            <td class="f-weight-700">Receipt ID (NFT)</td>
            <td class="f-weight-700">Amount</td>
            <td class="f-weight-700">Minted</td>
          </tr>
          {#each depositWithReceipts as receipt}
            <tr>
              <td class="receipt-id">
                <label class="check-container">
                  <input type="radio" class="check-box" bind:group={selectedReceipt} value={receipt.receipt.receiptId}/>
                  <span class="checkmark"></span>
                </label>
                <span class="check-box-label">{receipt.receipt.receiptId}</span>
              </td>
              <td class="value">{receipt.amount / ONE}</td>
              <td class="value">{timeStampToDate(receipt.timestamp)}</td>
            </tr>
          {/each}

        </table>
      {/if}
    </div>
  </div>
  {#if error}
    <span class="error">{error}</span>
  {/if}
  <MintInput bind:amount={amount} amountLabel={"Total to Redeem"} label={"Options"} maxButton={true}
             on:setMax={()=>{setMaxValue()}}/>
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
    }

    .check-box {
        margin-right: 8px;
    }

    .receipt-id {
        width: 33%;
        justify-content: left;
        display: flex;
        margin-left: 20px;
    }

    .redeem-btn {
        margin-top: 33px;
        width: calc(100% - 50px);
    }

    .error {
        color: #F11717;
    }
</style>