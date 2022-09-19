<script>
    import MintInput from "../components/MintInput.svelte";
    import {getSubgraphData, timeStampToDate} from "../scripts/helpers.js";
    import {account, activeNetwork, vault} from "../scripts/store.js";
    import {onMount} from "svelte";
    import {ONE} from "../scripts/consts.js";
    import {ethers} from "ethers";
    import Spinner from "../components/Spinner.svelte";

    let shouldDisable = false;
    let amount;
    let selectedReceipt = [];
    let totalShares = 0
    let error = ""

    let loading = false

    export let ethersData;
    let {signer} = ethersData;

    async function redeem() {
        try {
            if (selectedReceipt.length) {
                error = ''
                const redeemAmount = ethers.utils.parseEther(amount.toString());

                const receiptBalance = await getReceiptBalance(selectedReceipt[0])

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
                    selectedReceipt[0]
                );
                await tx.wait();

                await setTempData(amount, selectedReceipt[0])
                selectedReceipt = []

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

    async function getReceiptBalance(receipt) {
        let receiptBalance

        if (selectedReceipt.length) {
            receiptBalance = await $vault["balanceOf(address,uint256)"](
                $account,
                receipt
            );
        }
        return ethers.BigNumber.from(receiptBalance)
    }

    async function setMaxValue(receipt) {
        let balance = await getReceiptBalance(receipt)
        amount = ethers.utils.formatEther(balance)
    }


    function setTempData(amount, receipt) {
        //indexing takes time, so to show correct data, ui modifications is needed
        let updatedReceipt = depositWithReceipts.find(d => d.receipt.receiptId === receipt)

        let valueBef = updatedReceipt.receipt.balances[0].value
        let valueExactBef = updatedReceipt.receipt.balances[0].valueExact

        updatedReceipt.receipt.balances[0].value = valueBef - amount
        updatedReceipt.receipt.balances[0].valueExact = Number(ethers.BigNumber.from(valueExactBef).sub(ethers.utils.parseEther(amount.toString())))

        depositWithReceipts = depositWithReceipts.map(d => {
            if (d.receipt.receiptId === receipt) {
                return {...d, receipt: updatedReceipt.receipt}
            } else {
                return d
            }
        }).filter(d => d.receipt.balances[0].value > 0)
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
                  <input type="checkbox" class="check-box" bind:group={selectedReceipt}
                         value={receipt.receipt.receiptId}/>
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
             on:setMax={()=>{setMaxValue(selectedReceipt[0])}}/>
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


</style>