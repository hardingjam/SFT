<script>
    import {
        activeNetwork,
        data, SFTCreated, tokens,
        transactionError, transactionInProgress, transactionInProgressShow,
        transactionSuccess,
        vault
    } from '../scripts/store.js';
    import {ethers} from "ethers";
    import contractFactoryAbi from "../contract/OffchainAssetVaultFactoryAbi.json"
    import contractAbi from "../contract/OffchainAssetVaultAbi.json"
    import {
        ADDRESS_ZERO
    } from "../scripts/consts.js"
    import {QUERY, VAULTS_QUERY} from "../scripts/queries.js";
    import {
        getEventArgs,
        getContract,
        getSubgraphData,
        getEvent,
        showPromptSFTCreate
    } from "../scripts/helpers.js";

    let name = "";
    let admin_ledger = "";
    let symbol = "";
    let loading = false;
    let error = ''

    export let ethersData;
    let {signer, signerOrProvider, provider} = ethersData;
    let factoryContract;

    // async function createToken() {
    //     let contract = await getContract($activeNetwork, TEST_CONTRACT_ADDRESS, contractAbi, signerOrProvider)
    //     vault.set(contract)
    //     await getSgData(contract.address)
    //     console.log($vault.address)
    //     localStorage.setItem('vaultAddress', $vault.address)
    //     navigateTo("#sft-create-success", {replace: false});
    // }

    async function createToken() {
        transactionError.set(false)
        transactionSuccess.set(false)
        error = ""
        let addressValid = ethers.utils.isAddress(admin_ledger);

        if (!addressValid) {
            error = "Please check Super admin address"
            return
        }
        const constructionConfig = {
            admin: admin_ledger.trim(),
            vaultConfig: {
                asset: ADDRESS_ZERO,
                name,
                symbol,
            },
        };

        let offChainAssetVaultTx;
        try {
            factoryContract = await getContract($activeNetwork, $activeNetwork.factory_address, contractFactoryAbi, signerOrProvider)

            offChainAssetVaultTx = await factoryContract.createChildTyped(
                constructionConfig
            )

            await showPromptSFTCreate(offChainAssetVaultTx)

            let eventArgs = await getEventArgs(offChainAssetVaultTx, "NewChild", factoryContract)
            let contract;
            contract = new ethers.Contract(
                ethers.utils.hexZeroPad(
                    ethers.utils.hexStripZeros(
                        (eventArgs).child
                    ),
                    20
                ),
                contractAbi,
                signer.address
            );

            console.log("vault deployed to:", contract.address);

            let newVault = await getContract($activeNetwork, contract.address, contractAbi, signerOrProvider)

            let createChildEvent = await getEvent(offChainAssetVaultTx, "OffchainAssetReceiptVaultInitialized", newVault)
            let deployBlockNumber = createChildEvent.blockNumber

            let wait = await offChainAssetVaultTx.wait()
            if (wait.status === 1) {
                let interval = setInterval(async () => {
                    await getTokens()
                    if (deployBlockNumber.toString() === $tokens[0].deployBlock) {
                        transactionInProgress.set(false)
                        transactionInProgressShow.set(false)
                        SFTCreated.set(true)
                        clearInterval(interval)
                        vault.set(newVault)
                        localStorage.setItem('vaultAddress', $vault.address)
                        //wait for sg data
                        await getSgData(newVault.address)
                    }
                }, 2000)
            } else {
                transactionError.set(true)
            }

        } catch (er) {
            console.log(er.message || er.message)
        }
        loading = false
    }

    async function getSgData(vaultAddress) {
        let variables = {id: vaultAddress.toLowerCase()}

        getSubgraphData($activeNetwork, variables, QUERY, 'offchainAssetReceiptVault').then((res) => {
            if (res && res.data) {
                data.set(res.data)
            }

        })

    }

    async function getTokens() {
        getSubgraphData($activeNetwork, {}, VAULTS_QUERY, 'offchainAssetReceiptVaults').then((res) => {
            if ($activeNetwork) {
                let temp = res.data.offchainAssetReceiptVaults
                tokens.set(temp)
            }
        })
    }

</script>
<div>
  <div class="sft-setup-container">
    <label class="title f-weight-700">SFT setup</label>
    <div class="form-box">
      <div class="space-between"><label class="f-weight-700">Token name:</label> <input type="text" bind:value={name}>
      </div>
      <div class="space-between"><label class="f-weight-700">Token symbol:</label> <input type="text"
                                                                                          bind:value={symbol}>
      </div>
      <div class="space-between"><label class="f-weight-700">Super admin address:</label> <input type="text"
                                                                                                 bind:value={admin_ledger}>
      </div>
      <div class="success info-text">The ‘super admin address’ will need to assign roles to manage this token.</div>
    </div>
    <div class="form-after">
      <div class="error">{error}</div>
      <button class="create-token btn-solid btn-submit" disabled={!name || !admin_ledger || !symbol}
              on:click={() => createToken()}>Create SFT
      </button>
    </div>
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
        font-size: 16px;
        line-height: 27px;
        color: #000000;
    }

    .form-box {
        box-sizing: border-box;
        width: 577px;
        border: 1px solid #D2D2D2;
        border-radius: 10px;
        padding: 28px;
    }

    .form-box label {
        font-style: normal;
        font-size: 16px;
        line-height: 27px;
    }

    .form-box input {
        width: 343px;
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

    .form-after {
        align-items: center;
        display: flex;
        flex-direction: column;
    }

    .info-text {
        font-size: 15px;
        line-height: 20px;
        text-align: center;
    }

    .create-token {
        width: 413px;
        margin-top: 20px;
    }

    .error {
        margin-bottom: 10px;
    }

</style>