<script>
    import {icons} from "../scripts/assets.js";
    import MintInput from "../components/MintInput.svelte";
    import {ethers} from "ethers";
    import {activeNetwork, vault} from "../scripts/store.js";
    import {account} from "../scripts/store.js";
    import {onMount} from "svelte";
    import {getContract} from "../scripts/helpers.js";
    import contractAbi from "../contract/OffchainAssetVaultAbi.json";


    //test
    export let ethersData;
    let {signer, signerOrProvider, provider} = ethersData;

    onMount(async () => {
        if (!$vault.address) {
            await setVault()
        }
    });

    async function setVault() {
        let contractAddress = localStorage.getItem("vaultAddress")
        let contract = await getContract($activeNetwork, contractAddress, contractAbi, signerOrProvider)
        vault.set(contract)
    }

    //end test


    let amount = 0;
    let shouldDisable = false

    let auditInfo = [
        {
            label: "Meta Score 1",
            value: 550
        }, {
            label: "Meta Score 1",
            value: 234
        }, {
            label: "Meta Score 1",
            value: 234
        }, {
            label: "Meta Score 1",
            value: 23456
        }, {
            label: "Meta Score 1",
            value: 233
        }, {
            label: "Meta Score 1",
            value: 123123
        },
    ]

    async function mint() {
        try {
            const shares = ethers.utils.parseEther(amount.toString());
            const tx = await $vault
                .connect(signer)
                ["mint(uint256,address)"](shares, $account, {
                gasLimit: 1000000
            });
            await tx.wait();
            amount = "";
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
        <tr>
          <td>PIE Certificate Number</td>
          <td class="value">12312312414</td>
        </tr>
        {#each auditInfo as info}
          <tr>
            <td>{info.label}</td>
            <td class="value">{info.value}</td>
          </tr>
        {/each}
        <tr>
          <td>Upload PIE Certificate</td>
          <td>
            <button class="default-btn">Upload</button>
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


</style>

