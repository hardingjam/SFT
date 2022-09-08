<script>


    import MintInput from "../components/MintInput.svelte";
    import {getSubgraphData} from "../scripts/helpers.js";
    import {account, activeNetwork, data, roles, vault} from "../scripts/store.js";
    import {onMount} from "svelte";
    import {ONE} from "../scripts/consts.js";

    let shouldDisable = false;
    let amount = 0;
    let selectedReceipt = []
    let totalShares = 0

    export let ethersData;
    let {signer} = ethersData;

    async function redeem() {
        try {
            if (selectedReceipt.length) {
                const receiptBalance = await $vault["balanceOf(address,uint256)"](
                    $account,
                    selectedReceipt[0]
                );

                // await vault.setWithdrawId(selectedReceipt[0]);


                const tx = await $vault["redeem(uint256,address,address)"](
                    receiptBalance,
                    $account,
                    $account
                );
                await tx.wait();
                amount = 0;
            }


        } catch (error) {
            console.log(error);
        }
        shouldDisable = false;
    }


    let depositWithReceipts = []

    let query = `
          query($id: ID!) {
            account(id: $id) {
              depositWithReceipts{
                id,
                timestamp,
                amount
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
        let variables = {id: $vault.address.toLowerCase()}
        let temp = await getSubgraphData($activeNetwork, variables, getVaultDeployer, 'offchainAssetVault')
        let deployer = ""
        if (temp && temp.data.offchainAssetVault) {
            deployer = temp.data.offchainAssetVault.deployer
            totalShares = temp.data.offchainAssetVault.totalShares
            let variables = {id: `${$vault.address.toLowerCase()}-${deployer.toLowerCase()}`}
            getSubgraphData($activeNetwork, variables, query, 'account').then((res) => {
                depositWithReceipts = res.data.account.depositWithReceipts
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

</script>


<div class="redeem-container">
  <div class="title"><span
      class="f-weight-700">Total Supply: (FT):</span>
    {totalShares / ONE}
  </div>
  <div class=" basic-frame-parent">
    <div class="receipts-table-container basic-frame">
      <table class="receipts-table">
        <tr>
          <td class="f-weight-700 receipt-id">Receipt ID (NFT)</td>
          <td class="f-weight-700">Amount</td>
          <td class="f-weight-700">Minted</td>
        </tr>
        {#each depositWithReceipts as receipt}
          <tr>
            <td class="receipt-id">
              <input type="checkbox" class="check-box" bind:group={selectedReceipt}
                     value={receipt.id}/>{receipt.id}
            </td>
            <td class="value">{receipt.amount / ONE}</td>
            <td class="value">{timeStampToDate(receipt.timestamp)}</td>
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