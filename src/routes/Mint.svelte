<script>
    import {icons} from "../scripts/assets.js";
    import MintInput from "../components/MintInput.svelte";
    import {ethers} from "ethers";
    import {vault} from "../scripts/store.js";
    import {account} from "../scripts/store.js";

    export let ethersData;
    let {signer} = ethersData;

    let amount;
    let shouldDisable = false

    let auditInfo = [
        {
            label: "PIE Certificate",
            value: 0
        }, {
            label: " Producer Wallet",
            value: 0
        }, {
            label: "Total Score",
            value: 0
        }, {
            label: "Max Options",
            value: 0
        }
    ]

    async function mint() {
        try {
            const shares = ethers.utils.parseEther(amount.toString());
            const tx = await $vault
                .connect(signer)
                ["mint(uint256,address)"](shares, $account);
            await tx.wait();
            amount = 0;
        } catch (error) {
            console.log(error);
        }
        shouldDisable = false;
    }

</script>

<div class="mint-container">
  <div class="audit-history btn-hover">
    <span>Audit History </span><img src={icons.show} alt="go to audit">
  </div>
  <MintInput bind:amount={amount} amountLabel={"Mint Amount"} label={"Options"}/>
  <div class="audit-info-container basic-frame-parent">
    <div class="audit-info basic-frame">
      <span class="title f-weight-700">Audit info.</span>
      <table>
        <!--        <tr>-->
        <!--          <td>PIE Certificate Number</td>-->
        <!--          <td class="value">12312312414</td>-->
        <!--        </tr>-->
        {#each auditInfo as info}
          <tr class="info-row">
            <td>{info.label}</td>
            <td class="value">
              <input type="text" class="default-input" bind:value={info.value}>
            </td>
          </tr>
        {/each}
        <tr>
          <td>Upload PIE Certificate</td>
          <td>
            <button class="default-btn value">Upload</button>
          </td>
        </tr>

      </table>
    </div>
  </div>
  <div class="info-text f-weight-700">After Minting an amount you receive 2 things: ERC1155 token (NFT) and an ERC20
    (FT)
  </div>
  <button class="btn-hover mint-btn btn-default btn-submit" disabled={shouldDisable} on:click={() => mint()}>Mint
    Options
  </button>

</div>

<style>
    .mint-container {
        padding-top: 17px;
        padding-bottom: 20px;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .audit-history {
        font-weight: 700;
        font-size: 16px;
        line-height: 27px;
        color: #AE6E00;
        text-align: right;
        width: 100%;
        padding-right: 40px;
        margin-bottom: 15px;
        cursor: pointer;
    }

    .audit-info {
        padding: 20px 60px;
        display: flex;
        text-align: left;
        flex-direction: column;
        font-weight: 400;
        font-size: 16px;
        line-height: 27px;

    }

    .audit-info .title {
        margin-left: -5px;
    }

    .value {
        padding-left: 20px;
    }

    .info-text {
        font-size: 12px;
        line-height: 20px;
    }

    .mint-btn {
        width: calc(100% - 70px);
        margin-top: 10px;
    }

    .default-input {
        width: 63px;
    }

    .info-row:hover input {
        border: 2px solid #A0C7DD;
    }

</style>

