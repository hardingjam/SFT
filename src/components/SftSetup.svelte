<script>
    import {activeNetwork, data, roles, vault} from './../scripts/store.js';
    import {ethers} from "ethers";
    import contractFactoryAbi from "../contract/OffchainAssetVaultFactoryAbi.json"
    import contractAbi from "../contract/OffchainAssetVaultAbi.json"
    import {onMount} from "svelte";
    import {ADDRESS_ZERO, CONTRACT_FACTORY_ADDRESS, TEST_CONTRACT_ADDRESS} from "../scripts/consts.js"
    import {getEventArgs, getContract, getSubgraphData} from "../scripts/helpers.js";
    import {navigate} from "svelte-routing";

    let name = "";
    let admin_ledger = "";
    let symbol = "";
    let url = "";

    export let ethersData;
    let {signer, signerOrProvider, provider} = ethersData;
    let factoryContract;

    onMount(async () => {
        factoryContract = await getContract($activeNetwork, CONTRACT_FACTORY_ADDRESS[$activeNetwork.name], contractFactoryAbi, signerOrProvider)
    });

    // async function createToken() {
    //     let contract = await getContract($activeNetwork, TEST_CONTRACT_ADDRESS, contractAbi, signerOrProvider)
    //     vault.set(contract)
    //     await getSgData(contract.address)
    //
    //     navigate("/admin", {replace: false});
    // }
    //
    async function createToken() {
        const constructionConfig = {
            admin: admin_ledger.trim(),
            receiptVaultConfig: {
                asset: ADDRESS_ZERO,
                name,
                symbol,
                uri: url,
            },
        };

        const offChainAssetVaultTx =
            await factoryContract.createChildTyped(
                constructionConfig
            );

        let contract;

        contract = new ethers.Contract(
            ethers.utils.hexZeroPad(
                ethers.utils.hexStripZeros(
                    (await getEventArgs(offChainAssetVaultTx, "NewChild", factoryContract)).child
                ),
                20
            ),
            contractAbi,
            signer.address
        );

        name = null;
        admin_ledger = null;
        symbol = null;
        url = null;

        console.log(
            "vault deployed to:",
            contract.address
        );

        let newVault = await getContract($activeNetwork, contract.address, contractAbi, signerOrProvider)
        vault.set(newVault)


        await getSgData(newVault.address)
        navigate("/admin", {replace: false});

    }

    async function getSgData(vaultAddress) {
        let sgData = await getSubgraphData($activeNetwork.chainId, vaultAddress.toLowerCase())
        if (sgData) {
            data.set(sgData)
            roles.set($data.offchainAssetVault.roles)

            let rolesFiltered = $roles.map(role => {
                let roleRevokes = $data.offchainAssetVault.roleRevokes.filter(r => r.role.roleName === role.roleName)
                let roleRevokedAccounts = roleRevokes.map(rr => rr.roleHolder.account.address)
                let filtered = filterArray(role.roleHolders, roleRevokedAccounts)
                return {roleName: role.roleName, roleHolders: filtered}
            })
            roles.set(rolesFiltered)
        }
    }

    function filterArray(arr1, arr2) {
        return arr1.filter(a => {
            return arr2.indexOf(a.account.address) === -1
        })
    }


</script>
<div class="sft-setup-container">
  <label class="title f-weight-700">SFT Setup</label>
  <div class="form-box">
    <div class="space-between"><label class="f-weight-700">Token name:</label> <input type="text" bind:value={name}>
    </div>
    <div class="space-between"><label class="f-weight-700">Admin ledger:</label> <input type="text"
                                                                                        bind:value={admin_ledger}>
    </div>
    <div class="space-between"><label class="f-weight-700">Token symbol:</label> <input type="text" bind:value={symbol}>
    </div>
    <div class="space-between"><label class="f-weight-700">URL:</label> <input type="text" bind:value={url}></div>
  </div>
  <div class="form-after">
    <span class="info-text f-weight-700">After creating an SFT you’ll be added as an Admin; you’ll need to add other roles to manage the token.</span>
    <button class="btn-hover create-token btn-default btn-submit" on:click={() => createToken()}>Create SFT</button>
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
        height: 191px;
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

    .form-after {
        align-items: center;
        display: flex;
        flex-direction: column;
    }

    .info-text {
        font-style: normal;
        font-size: 12px;
        line-height: 20px;
        margin-top: 21px;
        margin-bottom: 10px;
        height: 45px;
    }

    .create-token {
        width: 413px;
    }

</style>