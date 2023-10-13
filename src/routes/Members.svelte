<script>
    import {icons} from "../scripts/assets.js"
    import {
        account, accountRoles,
        activeNetwork,
        ethersData,
        pageTitle,
        titleIcon,
        vault
    } from "../scripts/store.js";
    import {getContract, hasRole, showPrompt, tierReport} from "../scripts/helpers.js";
    import tierContractAbi from "../contract/TierContractAbi.json";
    import {onMount} from 'svelte';


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
                error = "Something went wrong"
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
                let tx = await $vault.setERC20Tier(erc20TierContract, erc20MinTier, [], [])
                await showPrompt(tx)
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
                let tx = await $vault.setERC1155Tier(erc1155TierContract, erc1155MinTier, [], [])
                await showPrompt(tx)
                localStorage.setItem("erc1155TierContract", erc1155TierContract)
                localStorage.setItem("erc1155MinTier", erc1155MinTier)

            } else {
                error = hasRoleErc1155Tierer.error
            }

        } catch (e) {
            error = e.message
        }
    }

    onMount(() => {
        pageTitle.set("Members")
        titleIcon.set(`${icons.members_icon}`)
    })

</script>
<div class="members-container">
  <div class="w-full flex justify-between card-header">
    <div class="grant-role-txt f-weight-700 flex gap-1.5">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path
          d="M5 20V19C5 16.2386 7.23858 14 10 14H14C16.7614 14 19 16.2386 19 19V20M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z"
          stroke="#575757" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      <span class="mt-1">Members</span>
    </div>
  </div>
  <div class="members">
    <div class="erc20 tier">
      <div class="f-weight-700 mb-2">ERC20</div>
      <div class="address-container">
        <div class="contract label">
          Contract address:
          {#if ($accountRoles.ERC20TIERER)}
            <input type="text" class="default-input address" bind:value={erc20TierContract} autofocus>
          {:else}
            <input type="text" class="min-tier address bg-white" value="{erc20TierContract}" disabled>
          {/if}
        </div>
      </div>
      <div class="display-flex address-container">
        <div class="label">Minimum tier:</div>
        <div class="flex justify-between items-center w-full">
          {#if ($accountRoles.ERC20TIERER)}
            <input type="text" class="default-input min-tier " bind:value={erc20MinTier}>
            <div class="assign-tier">
              <button class="default-btn" on:click={()=>{assignTierErc20()}}>Update tier contract</button>
            </div>
          {:else}
            <input type="text" class="min-tier bg-white" value="{erc20MinTier}" disabled>
          {/if}
        </div>
      </div>

      <div class="address-container">Check address on the tier list:</div>
      <div class="check-address-input-container">
        <input type="text" class="default-input w-100" bind:value={addressErc20}>
        {#if isAddressValid.erc20 && showCheck.erc20 && addressErc20}
          <img src={icons.check} alt="check" class="check">
        {/if}
        {#if !isAddressValid.erc20 && showCheck.erc20 && addressErc20}
          <img src={icons.reject} alt="reject" class="reject">
        {/if}
      </div>
      <div class="flex items-center justify-end w-full">
        <button class="default-btn "
                on:click={()=>{checkAddress(erc20TierContract,addressErc20, erc20MinTier, 'erc20')}}>
          Check
        </button>
      </div>
    </div>
    <div class="erc1155 tier">
      <div class="f-weight-700 mb-2">ERC1155</div>
      <div class="display-flex address-container">

        <div class="contract label">
          Contract address:
          {#if ($accountRoles.ERC1155TIERER)}
            <input type="text" class="default-input address" bind:value={erc1155TierContract}>
          {:else}
            <input type="text" class="min-tier address bg-white" value="{erc1155TierContract}" disabled>
          {/if}
        </div>
      </div>
      <div class="display-flex address-container">
        <div class="label">Minimum tier:</div>
        <div class="flex justify-between items-center w-full">
          {#if ($accountRoles.ERC1155TIERER)}
            <input type="text" class="default-input min-tier " bind:value={erc1155MinTier}>
            <div class="assign-tier">
              <button class="default-btn" on:click={()=>{assignTierErc1155()}}>Update tier contract</button>
            </div>
          {:else}
            <input type="text" class="min-tier bg-white" value="{erc1155MinTier}" disabled>
          {/if}
        </div>
      </div>

      <div class="address-container">Check address on the tier list:</div>
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
      <div class="flex items-center justify-end w-full">
        <button class="default-btn"
                on:click={()=>{checkAddress(erc1155TierContract,addressErc1155, erc1155MinTier, 'erc1155')}}>
          Check
        </button>
      </div>
    </div>
    {#if error}
      <div class="error">
        {error}
        <!--                This address can not send or receive tokens. Tokens held by this address can be confiscated by the confiscator-->
      </div>
    {/if}
  </div>

</div>
<style>

    .members-container {
        text-align: left;
        display: flex;
        flex-direction: column;
        width: 655px;
        border-radius: 10px;
        background: #FFF;
    }

    .card-header {
        padding: 0 32px;
        color: #575757;
    }

    .members {
        text-align: left;
        width: 100%;
        border-radius: 10px;
        padding: 20px 60px 38px 60px;
    }

    .tier {
        display: flex;
        flex-direction: column;
    }

    .erc20 {
        margin-bottom: 15px;
    }

    .min-tier {
        width: 74px;
        margin-left: 29px;
    }

    .contract {
        white-space: nowrap;
        width: 100%;
        display: flex;
        align-items: baseline;
        justify-content: space-between;
    }

    .address-container {
        justify-content: space-between;
        min-height: 36px;
        margin-left: 10px;
        align-items: baseline;
    }

    .address {
        width: 100%;
        margin-left: 12px;
    }

    .label {
        margin-right: 5px;
        white-space: nowrap;
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