<script>
    import MintInput from "../components/MintInput.svelte";
    import {getReceiptBalance, getSubgraphData, hasRole, showPrompt, timeStampToDate} from "../scripts/helpers.js";
    import {
        account,
        activeNetwork, pageTitle, tokenName,
        vault
    } from "../scripts/store.js";
    import {onMount} from "svelte";
    import {ethers} from "ethers";
    import SftLoader from "../components/SftLoader.svelte";
    import {DEPLOYER_QUERY, RECEIPTS_QUERY} from '../scripts/queries.js'
    import ReceiptInformation from "./ReceiptInformation.svelte";
    import Connect from '../components/Connect.svelte';
    import IpfsLogin from '../components/IpfsLogin.svelte';

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
        receiptClicked = receipt.receipt
        showReceiptInfo = true
    }

    function showReceiptsList(e) {
        showReceiptInfo = e.detail.showReceiptInfo
    }

    pageTitle.set("Mint/Redeem")
    let loggedIn = localStorage.getItem('ipfsPassword') || localStorage.getItem('ipfsUsername');

</script>

{#if !loggedIn || !$account}
  <div class="flex flex-col gap-5 w-full">
    <span class="font-bold w-full text-left float-left ml-6 mt-5"> {$tokenName}</span>
    <div class="border flex items-center p-5 steps"><span>2 things to do before minting - You need to connect a wallet so you can send transactions
      to the blockchain and you need a data storage (Currently using IPFS, Holochain coming soon).</span>
    </div>

    {#if !loggedIn}
        <IpfsLogin on:success={()=>{loggedIn = true}}/>
    {/if}

    {#if !$account}
      <div class="border flex items-center">
        <Connect action="redeem" className="pt-5 pb-5"></Connect>
      </div>
    {/if}
  </div>



{:else}
  <div class="redeem-container flex items-center flex-col">
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

{/if}


<style>
    .receipts-table-container {
        min-height: 255px;
        overflow: auto;
    }

    .title {
        padding-top: 25px;
        font-size: 16px;
        align-self: flex-start;
        line-height: 27px;
        text-align: left;
        margin-left: 1rem;
    }

    .receipts-table {
        /*width: 100%;*/
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
    .border {
        border: 1px solid #D2D2D2;
        margin-left: 1.5rem;
        margin-right: 1.5rem;
        border-radius: 10px;
        width: calc(100% - 3rem);
    }

    .steps {
        color: #000;
        font-family: "Mukta", sans-serif;
        font-size: 16px;
        font-style: normal;
        font-weight: 700;
        line-height: normal;
    }
</style>