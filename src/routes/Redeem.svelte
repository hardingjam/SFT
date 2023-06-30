<script>
    import MintInput from "../components/MintInput.svelte";
    import {getReceiptBalance, getSubgraphData, hasRole, showPrompt, timeStampToDate} from "../scripts/helpers.js";
    import {
        account,
        activeNetwork,
        vault
    } from "../scripts/store.js";
    import {onMount} from "svelte";
    import {ethers} from "ethers";
    import SftLoader from "../components/SftLoader.svelte";
    import {DEPLOYER_QUERY, RECEIPTS_QUERY} from '../scripts/queries.js'
    import ReceiptInformation from "./ReceiptInformation.svelte";

    let shouldDisable = false;
    let amount;
    let selectedReceipts;
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
                    await showPrompt(tx, {errorText: "Redeem failed", successText: "Redeem successful!"})

                    // selectedReceipts = []
                    await getData()

                    amount = 0;
                } else {
                    error = hasRoleWithdrawer.error;
                }

            } else {
                error = "Select receipt id"
                return
            }
        } catch (err) {
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
        // if (selectedReceipts.length > 1) {
        //     return
        // }
        let balance = await getReceiptBalance($activeNetwork, $vault, selectedReceipts)
        amount = ethers.utils.formatEther(balance)
    }


    async function multiCall() {
        error = ''

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
                let tx = await $vault
                    .multicall(
                        multicallArr,
                        {from: $account}
                    );
                await showPrompt(tx, {errorText: "Redeem failed", successText: "Redeem successful!"})
            } catch (err) {
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
      <div class="basic-frame p-5">
        <div class="receipts-table-container">
          {#if loading}
            <SftLoader width="50"></SftLoader>
          {/if}
          {#if !loading}
            <table class="receipts-table mb-5">
              <thead>
              <tr>
                <td class="f-weight-700 w-1/3">Receipt ID (NFT)</td>
                <td class="f-weight-700">Amount</td>
                <td class="f-weight-700 w-1/4">Minted</td>
              </tr>
              </thead>
              <tbody>
              {#each receiptBalances as receipt}
                <tr class:active={selectedReceipts === receipt.receipt.receiptId}
                    on:click={()=>{selectedReceipts=receipt.receipt.receiptId}}>
                  <td class="receipt-id">
                    <!--                    <label class="check-container">-->
                    <!--                      <input type="radio" class="check-box" bind:group={selectedReceipts}-->
                    <!--                             value={receipt.receipt.receiptId}/>-->
                    <!--                      <span class="checkmark"></span>-->
                    <!--                    </label>-->
                    <div class="check-box-label btn-hover"
                         on:click={()=>{goToReceiptInfo(receipt)}}>{receipt.receipt.receiptId}</div>
                  </td>
                  <td class="value"> {ethers.utils.formatUnits(receipt.receipt.balances[0].valueExact, 18)}</td>
                  <td class="value">{timeStampToDate(receipt.receipt.deposits[0].timestamp)}</td>
                </tr>
              {/each}
              </tbody>
            </table>
          {/if}
        </div>
        <MintInput bind:amount={amount} amountLabel={"Total to redeem"}
                   info="(Redeem amount = the number of tokens that will be burned from your wallet)" maxButton={true}
                   on:setMax={()=>{setMaxValue()}}/>
      </div>
    </div>
    {#if error}
      <span class="error">{error}</span>
    {/if}

    <button class="redeem-btn btn-solid mt-3" disabled="{!selectedReceipts || !parseFloat(amount)}"
            on:click={() => redeem(selectedReceipts)}>
      Redeem
    </button>

  {/if}

  {#if showReceiptInfo}
    <ReceiptInformation receipt={receiptClicked} on:back={showReceiptsList}/>
  {/if}

</div>

<style>
    .receipts-table-container {
        min-height: 255px;
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


    .receipts-table .active, .receipts-table .active:hover {
        background: #CAE6FF;
    }

    .receipts-table tbody tr:hover {
        cursor: pointer;
        background: #ECECEC;
    }

    .receipt-id {
        justify-content: center;
        display: flex;
    }

    .redeem-btn {
        width: calc(100% - 50px);
    }

    .check-box-label {
        width: 10px;
    }

    .check-box-label:hover {
        text-decoration: underline;
    }

</style>