<script>
    import MintInput from "../components/MintInput.svelte";
    import {getReceiptBalance, getSubgraphData, hasRole, timeStampToDate} from "../scripts/helpers.js";
    import {
        account,
        activeNetwork,
        transactionError,
        transactionHash, transactionInProgress, transactionInProgressShow,
        transactionSuccess,
        vault
    } from "../scripts/store.js";
    import {onMount} from "svelte";
    import {ethers} from "ethers";
    import SftLoader from "../components/SftLoader.svelte";
    import {DEPLOYER_QUERY, RECEIPTS_QUERY} from '../scripts/queries.js'
    import ReceiptInformation from "./ReceiptInformation.svelte";
    import TransactionInProgressBanner from "../components/TransactionInProgressBanner.svelte";
    import {TRANSACTION_IN_PROGRESS_TEXT, VIEW_ON_EXPLORER_TEXT} from "../scripts/consts.js";

    let shouldDisable = false;
    let amount;
    let selectedReceipts = [];
    let totalShares = 0
    let error = ""
    let showReceiptInfo = false
    let receiptClicked = {}

    let loading = false

    export let ethersData;
    let {signer} = ethersData;

    async function redeem(receipt) {
        try {
            if (receipt) {
                error = ''
                transactionError.set(false)
                transactionSuccess.set(false)
                const hasRoleWithdrawer = await hasRole($vault, $account, "WITHDRAWER")

                if (!hasRoleWithdrawer.error) {
                    const redeemAmount = ethers.utils.parseEther(amount.toString());

                    const receiptBalance = await getReceiptBalance($activeNetwork, $vault, receipt)

                    if ((receiptBalance.sub(redeemAmount)).isNegative()) {
                        error = "Not enough balance"
                        return
                    }

                    if (redeemAmount.eq(0)) {
                        error = "0 amount"
                        return
                    }
                    const tx = await $vault.connect(signer)["redeem(uint256,address,address,uint256,bytes)"](
                        redeemAmount,
                        $account,
                        $account,
                        receipt,
                        []
                   );
                    if (tx.hash) {
                        transactionHash.set(tx.hash)
                        transactionInProgressShow.set(true)
                        transactionInProgress.set(true)
                    }
                    let wait = await tx.wait()
                    if (wait.status === 1) {
                        transactionSuccess.set(true)
                        transactionInProgress.set(false)
                    }
                    await setTempData(amount, receipt)
                    // selectedReceipts = []

                    amount = 0;
                } else {
                    error = hasRoleWithdrawer.error;
                }

            } else {
                error = "Select receipt id"
                return
            }
        } catch (err) {
            transactionError.set(true)
            error = err.reason
        }
        shouldDisable = false;
    }


    let receiptBalances = []


    onMount(async () => {
        await getData()
    });


    async function getData() {
        loading = true;
        let variables = {id: $vault.address.toLowerCase()}
        let temp = await getSubgraphData($activeNetwork, variables, DEPLOYER_QUERY, 'offchainAssetReceiptVault')
        if (temp && temp.data) {
            totalShares = temp.data?.offchainAssetReceiptVault?.totalShares
            let variables = {id: `${$vault.address.toLowerCase()}-${$account.toLowerCase()}`}
            getSubgraphData($activeNetwork, variables, RECEIPTS_QUERY, 'account').then((res) => {
                receiptBalances = res.data.account?.receiptBalances.filter(d => d.receipt.balances[0].value > 0) || []
                loading = false
            })
        }
    }

    async function setMaxValue() {
        if (selectedReceipts.length > 1) {
            return
        }
        let balance = await getReceiptBalance($activeNetwork, $vault, selectedReceipts[0])
        amount = ethers.utils.formatEther(balance)
    }


    function setTempData(amount, receipt) {
        //indexing takes time, so to show correct data, ui modifications is needed
        let updatedReceipt = receiptBalances.find(d => d.receipt.receiptId === receipt)

        let valueBef = updatedReceipt.receipt.balances[0].value
        let valueExactBef = updatedReceipt.receipt.balances[0].valueExact

        updatedReceipt.receipt.balances[0].value = valueBef - amount
        updatedReceipt.receipt.balances[0].valueExact = Number(ethers.BigNumber.from(valueExactBef).sub(ethers.utils.parseEther(amount.toString())))

        receiptBalances = receiptBalances.map(d => {
            if (d.receipt.receiptId === receipt) {
                return {...d, receipt: updatedReceipt.receipt}
            } else {
                return d
            }
        }).filter(d => d.receipt.balances[0].value > 0)
    }

    async function multiCall() {
        error = ''
        transactionError.set(false)
        transactionSuccess.set(false)

        if (!selectedReceipts.length) {
            return
        }

        const hasRoleWithdrawer = await hasRole($vault, $account, "WITHDRAWER")
        if (!hasRoleWithdrawer.error) {
            let ABI = [
                "function redeem(uint256 shares_, address receiver_, address owner_, uint256 id_, bytes receiptInformation_)",
            ];
            let iface = new ethers.utils.Interface(ABI);

            let multicallArr = selectedReceipts.map(async receipt => {
                const receiptBalance = await getReceiptBalance($activeNetwork, $vault, receipt)
                return iface.encodeFunctionData("redeem", [
                    receiptBalance,
                    $account,
                    $account,
                    receipt,
                    []
                ])
            })

            try {
              let tx =  await $vault
                    .multicall(
                        multicallArr,
                        {from: $account}
                    );
                if (tx.hash) {
                    transactionHash.set(tx.hash)
                    transactionInProgressShow.set(true)
                    transactionInProgress.set(true)
                }
                let wait = await tx.wait()
                if (wait.status === 1) {
                    transactionSuccess.set(true)
                    transactionInProgress.set(false)
                }
            } catch (err) {
                transactionError.set(true)
                error = err.reason
            }
        } else {
            error = hasRoleWithdrawer.error
        }


    }

    async function withdraw() {
        if (selectedReceipts.length > 1) {
            await multiCall()
        } else {
            await redeem(selectedReceipts[0])
        }
    }

    function goToReceiptInfo(receipt) {
        receiptClicked = receipt
        showReceiptInfo = true
    }

    function showReceiptsList(e) {
        showReceiptInfo = e.detail.showReceiptInfo
    }
</script>


<div class="redeem-container">
  {#if !showReceiptInfo}
    <div class="title"><span
        class="f-weight-700">Total supply: (FT):</span>
      {ethers.utils.formatUnits(totalShares, 18)}
    </div>
    <div class="basic-frame-parent">
      <div class="receipts-table-container basic-frame">
        {#if loading}
          <SftLoader width="50"></SftLoader>
        {/if}
        {#if !loading}
          <table class="receipts-table">
            <tr>
              <td class="f-weight-700">Receipt ID (NFT)</td>
              <td class="f-weight-700">Amount</td>
              <td class="f-weight-700">Minted</td>
            </tr>
            {#each receiptBalances as receipt}
              <tr>
                <td class="receipt-id">
                  <label class="check-container">
                    <input type="checkbox" class="check-box" bind:group={selectedReceipts}
                           value={receipt.receipt.receiptId}/>
                    <span class="checkmark"></span>
                  </label>
                  <div class="check-box-label btn-hover"
                       on:click={()=>{goToReceiptInfo(receipt)}}>{receipt.receipt.receiptId}</div>
                </td>
                <td class="value"> {ethers.utils.formatUnits(receipt.receipt.balances[0].valueExact, 18)}</td>
                <td class="value">{timeStampToDate(receipt.receipt.deposits[0].timestamp)}</td>
              </tr>
            {/each}

          </table>
        {/if}
      </div>
    </div>
    {#if error}
      <span class="error">{error}</span>
    {/if}
    <MintInput bind:amount={amount} amountLabel={"Total to redeem"} maxButton={true}
               on:setMax={()=>{setMaxValue()}}/>
    <button class="redeem-btn btn-solid" disabled="{!selectedReceipts.length}" on:click={() => withdraw()}>
      Redeem
    </button>

  {/if}

  {#if showReceiptInfo}
    <ReceiptInformation receipt={receiptClicked} on:back={showReceiptsList}/>
  {/if}

</div>
<TransactionInProgressBanner topText={TRANSACTION_IN_PROGRESS_TEXT} bottomText={VIEW_ON_EXPLORER_TEXT}
                             transactionHash={$transactionHash}/>

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
        /*width: 33%;*/
        justify-content: left;
        display: flex;
        margin-left: 20px;
    }

    .redeem-btn {
        margin-top: 33px;
        width: calc(100% - 50px);
    }

    .check-box-label {
        width: 100%;
        text-align: left;
    }

    .check-box-label:hover {
        text-decoration: underline;
    }

</style>