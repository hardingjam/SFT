<script>
    import {ethers} from "ethers";
    import contractAbi from "../contract/OffchainAssetVault-abi.json"
    import {onMount} from "svelte";
    import {ADDRESS_ZERO, CONTRACT_FACTORY_ADDRESS} from "../scripts/consts.js"
    import {getEventArgs, getContract} from "../scripts/helpers.js";
    import {navigate} from "svelte-routing";
    import {vault} from './../scripts/store.js';

    let name = null;
    let admin_ledger = null;
    let symbol = null;
    let url = null;

    export let activeNetwork;
    export let ethersData;
    let {signer, signerOrProvider, provider} = ethersData;
    let contract;

    onMount(async () => {
        contract = await getContract(activeNetwork, CONTRACT_FACTORY_ADDRESS, contractAbi, signerOrProvider)
    });

    // function createToken() {
    //     navigate("/admin", {replace: false});
    // }

    async function createToken() {
        const constructionConfig = {
            admin: admin_ledger,
            receiptVaultConfig: {
                asset: ADDRESS_ZERO,
                name,
                symbol,
                uri: url,
            },
        };

        const offChainAssetVaultTx =
            await contract.createChildTyped(
                constructionConfig
            );

        const vaultValue = new ethers.Contract(
            ethers.utils.hexZeroPad(
                ethers.utils.hexStripZeros(
                    (
                        await getEventArgs(
                            offChainAssetVaultTx,
                            "NewChild",
                            contract
                        )
                    ).child
                ),
                20
            ),
            contractAbi,
            signer.address
        )

        try {
            //this line need to be moved down later
            navigate("/admin", {replace: false});
            await vaultValue.deployed()
            name = null;
            admin_ledger = null;
            symbol = null;
            url = null;

        } catch (err) {
            console.log(err)
        }

        console.log(
            "vault deployed to:",
            vaultValue.address
        );
    }


</script>
<div class="sft-setup-container">
  <label class="title">SFT Setup</label>
  <div class="form-box">
    <div class="space-between"><label>Token name:</label> <input type="text" bind:value={name}></div>
    <div class="space-between"><label>Admin ledger:</label> <input type="text" bind:value={admin_ledger}>
    </div>
    <div class="space-between"><label>Token symbol:</label> <input type="text" bind:value={symbol}>
    </div>
    <div class="space-between"><label>URL:</label> <input type="text" bind:value={url}></div>
  </div>
  <div class="form-after">
    <span class="info-text">After creating an SFT you’ll be added as an Admin; you’ll need to add other roles to manage the token.</span>
    <button class="btn-hover create-token" on:click={() => createToken()}>Create SFT</button>
  </div>

</div>
<style>
    .sft-setup-container {
        max-width: 599px;
        left: 420px;
        top: 238px;
        background: #FFFFFF;
        border-radius: 20px;
        padding: 29px 11px;
        display: flex;
        flex-direction: column;
        text-align: left;
    }

    .title {
        margin-left: 24px;
        margin-bottom: 11px;
        font-style: normal;
        font-weight: 700;
        font-size: 16px;
        line-height: 27px;
        color: #000000;
    }

    .form-box {
        box-sizing: border-box;
        width: 577px;
        height: 191px;
        border: 1px solid #D2D2D2;
        border-radius: 10px;
        padding: 28px;
    }

    .form-box label {
        font-style: normal;
        font-weight: 700;
        font-size: 16px;
        line-height: 27px;
    }

    .form-box input {
        width: 370px;
        height: 28px;
        background: #ECECEC;
        border-radius: 5px;
        border: none;
        margin-bottom: 7px;
        padding-left: 13px;
        font-style: normal;
        font-weight: 300;
        font-size: 16px;
        line-height: 27px;
    }

    .form-box input:focus {
        outline: none;
    }

    .form-after {
        align-items: center;
        display: flex;
        flex-direction: column;
    }

    .info-text {
        font-style: normal;
        font-weight: 700;
        font-size: 12px;
        line-height: 20px;
        margin-top: 21px;
        margin-bottom: 10px;
        height: 45px;
    }

    .create-token {
        font-style: normal;
        font-weight: 700;
        font-size: 16px;
        line-height: 27px;
        width: 413px;
        height: 50px;
        background: #9D7334;
        border-radius: 30px;
        color: #FFFFFF;
        border: none;
        cursor: pointer;
    }

</style>