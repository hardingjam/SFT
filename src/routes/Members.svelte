<script>
    import DefaultFrame from "../components/DefaultFrame.svelte";
    import {icons} from "../scripts/assets.js"
    import {account, activeNetwork, ethersData, vault} from "../scripts/store.js";
    import {getContract, hasRole, tierReport} from "../scripts/helpers.js";
    import tierContractAbi from "../contract/TierContractAbi.json";


    let erc20MinTier = localStorage.getItem("erc20MinTier") || ''
    let addressErc20 = ''
    let erc1155MinTier = localStorage.getItem("erc1155MinTier") || ''
    let addressErc1155 = ''
    let erc20TierContract = localStorage.getItem("erc20TierContract") || ''
    let erc1155TierContract = localStorage.getItem("erc1155TierContract") || ''

    let isAddressValid = {
        erc20: false,
        erc1155: false
    }
    let showCheck = {
        erc20: false,
        erc1155: false
    }

    let error = ''

    async function checkAddress(contract, account, minTier, erc) {
        if (!account || !minTier || !contract) {
            return
        }
        let tierContract = await getContract($activeNetwork, contract.trim(), tierContractAbi, $ethersData.signerOrProvider)

        if (tierContract) {
            error = ''

            try {
                let report = await tierContract.report(account.trim(), [])
                report = tierReport(report)
                showCheck[erc] = true
                isAddressValid[erc] = report[minTier - 1] === 0
            } catch (e) {
                error = e.message
                console.log(e.message)
            }
        }
    }

    async function assignTierErc20() {
        try {
            if (!erc20TierContract) {
                return
            }

            const hasRoleErc20Tierer = await hasRole($vault, $account, "ERC20TIERER")

            if (!hasRoleErc20Tierer.error) {
                let tx = await $vault.setERC20Tier(erc20TierContract, erc20MinTier, [])
                await tx.wait()
                localStorage.setItem("erc20TierContract", erc20TierContract)
                localStorage.setItem("erc20MinTier", erc20MinTier)
            } else {
                error = hasRoleErc20Tierer.error
            }

        } catch (e) {
            error = e.message
        }
    }

    async function assignTierErc1155() {
        try {
            if (!erc1155TierContract) {
                return
            }
            const hasRoleErc1155Tierer = await hasRole($vault, $account, "ERC1155TIERER")

            if (!hasRoleErc1155Tierer.error) {
                let tx = await $vault.setERC1155Tier(erc1155TierContract, erc1155MinTier, [])
                await tx.wait()
                localStorage.setItem("erc1155TierContract", erc1155TierContract)
                localStorage.setItem("erc1155MinTier", erc1155MinTier)

            } else {
                error = hasRoleErc1155Tierer.error
            }

        } catch (e) {
            error = e.message
        }
    }

</script>
<DefaultFrame header="Members">
  <div slot="content">
    <div class="members f-weight-700">
      <div class="erc20 tier">
        <div>ERC20</div>
        <div class="display-flex address-container">
          <div class="f-weight-700 contract label">Contract address:
            <input type="text" class="default-input address" bind:value={erc20TierContract} autofocus>
          </div>
        </div>
        <div class="display-flex address-container">
          <div class="f-weight-700 label">Minimum tier:
            <input type="text" class="default-input min-tier" bind:value={erc20MinTier} autofocus>
          </div>
        </div>
        <div class="assign-tier">
          <button class="default-btn" on:click={()=>{assignTierErc20()}}>Assign tier</button>
        </div>
        <div class="f-weight-700">Check address on the tier list:</div>
        <div class="check-address-input-container">
          <input type="text" class="default-input w-100" bind:value={addressErc20}>
          {#if isAddressValid.erc20 && showCheck.erc20 && addressErc20}
            <img src={icons.check} alt="check" class="check">
          {/if}
          {#if !isAddressValid.erc20 && showCheck.erc20 && addressErc20}
            <img src={icons.reject} alt="reject" class="reject">
          {/if}
        </div>
        <div>
          <button class="default-btn"
                  on:click={()=>{checkAddress(erc20TierContract,addressErc20, erc20MinTier, 'erc20')}}>
            Check
          </button>
        </div>
      </div>
      <div class="erc1155 tier">
        <div>ERC1155</div>
        <div class="display-flex address-container">

          <div class="f-weight-700 contract label">
            Contract address:
            <input type="text" class="default-input address" bind:value={erc1155TierContract} autofocus>
          </div>
        </div>
        <div class="display-flex address-container">
          <div class="f-weight-700 label">Minimum tier:
            <input type="text" class="default-input min-tier" bind:value={erc1155MinTier} autofocus>
          </div>
        </div>
        <div class="assign-tier">
          <button class="default-btn" on:click={()=>{assignTierErc1155()}}>Assign tier</button>
        </div>
        <div class="f-weight-700">Check address on the tier list:</div>
        <div class="check-address-input-container">
          {addressErc1155}
          <input type="text" class="default-input w-100" bind:value={addressErc1155}>
          {#if isAddressValid.erc1155 && showCheck.erc1155 && addressErc1155}
            <img src={icons.check} alt="check" class="check">
          {/if}
          {#if !isAddressValid.erc1155 && showCheck.erc1155 && addressErc1155}
            <img src={icons.reject} alt="reject" class="reject">
          {/if}
        </div>
        <div>
          <button class="default-btn"
                  on:click={()=>{checkAddress(erc1155TierContract,addressErc1155, erc1155MinTier, 'erc1155')}}>
            Check
          </button>
        </div>
      </div>
      {#if error}
        <div class="error">
          {error}
          <!--        This address can not send or receive tokens. Tokens held by this address can be confiscated by the confiscator-->
        </div>
      {/if}
    </div>

  </div>
</DefaultFrame>
<style>

    .members {
        text-align: left;
        display: flex;
        flex-direction: column;
        width: 385px;
    }

    .tier {
        display: flex;
        flex-direction: column;
    }

    .erc20 {
        margin-bottom: 35px;
    }

    .min-tier {
        width: 80px;
    }

    .contract {
        white-space: nowrap;
        width: 215px;
    }

    .address-container {
        justify-content: space-between;
        min-height: 36px;
    }

    .address {
        width: 258px;
        margin-right: 20px;
    }

    .label {
        margin-right: 5px;

    }

    .check-address-input-container {
        position: relative;
    }

    .check {
        position: absolute;
        right: 5px;
        top: 5px;
    }

    .reject {
        position: absolute;
        right: 5px;
        top: 2px;
    }

    .error {
        font-weight: 400;
        font-size: 12px;
        line-height: 20px;
    }

    .edit {
        margin-bottom: 13px;
    }

    .assign-tier button {
        /*float: right;*/
        margin-bottom: 10px;
    }

</style>