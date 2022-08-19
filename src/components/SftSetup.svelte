<script>
    import {ethers} from "ethers";
    import contractAbi from "../contract/OffchainAssetVault-abi.json"
    import {onMount} from "svelte";
    const ADDRESS_ZERO = "0x0000000000000000000000000000000000000000";
    let CONTRACT_FACTORY_ADDRESS = "0x032c40424bA404BB9D5A8b7A5CCF7065C9Fd45DC";


    let name = "";
    let admin_ledger = "";
    let symbol = "";
    let url = "";

    export let activeNetwork;
    export let ethersData;
    let {signer, signerOrProvider, provider} = ethersData;
    let contract;

    onMount(async () => {
        await getContract()
    });

    async function getContract() {
        if (activeNetwork) {
            if (CONTRACT_FACTORY_ADDRESS) {
                contract = new ethers.Contract(
                    CONTRACT_FACTORY_ADDRESS,
                    contractAbi,
                    signerOrProvider
                );
            }
        }
    }

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


        const vault = new ethers.Contract(
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

        await vault.deployed();
        console.log(
            "vault deployed to:",
            vault.address
        );

    }


    async function getEventArgs (tx,eventName,contract){
        return contract.interface.decodeEventLog(eventName, (
                await getEvent(tx, eventName, contract)
            ).data
        );
    }

    async function getEvent(tx, eventName, contract){
        const events = (await tx.wait()).events || [];
        const filter = (contract.filters[eventName]().topics || [])[0];
        const eventObj = events.find(
            (x) => x.topics[0] === filter && x.address === contract.address
        );

        if (!eventObj) {
            throw new Error(`Could not find event with name ${eventName}`);
        }

        return eventObj;
    }


</script>
<div class="sft-setup-container">
  <label class="title">SFT Setup</label>
  <div class="form-box">
    <div class="space-between"><label>Token name:</label> <input type="text" bind:value={name} ></div>
    <div class="space-between"><label>Admin ledger:</label> <input type="text" bind:value={admin_ledger} >
    </div>
    <div class="space-between"><label>Token symbol:</label> <input type="text" bind:value={symbol} >
    </div>
    <div class="space-between"><label>URL:</label> <input type="text" bind:value={url} ></div>
  </div>
  <div class="form-after">
    <span class="info-text">After creating an SFT you’ll be added as an Admin; you’ll need to add other roles to manage the token.</span>
    <button on:click={() => createToken()}>Create SFT</button>
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

    button {
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

    button:hover {
        opacity: 0.9;
    }
</style>