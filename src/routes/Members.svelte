<script>
    import DefaultFrame from "../components/DefaultFrame.svelte";
    import {icons} from "../scripts/assets.js"
    import {account, activeNetwork, ethersData, vault} from "../scripts/store.js";
    import {getContract, tierReport} from "../scripts/helpers.js";
    import tierContractAbi from "../contract/TierContractAbi.json";


    let mock = {
        minTierErc20: '',
        tierErc20Contract: "",
        minTierErc1155: '',
        tierErc1155Contract: ""
    }

    let minTierErc20 = ''
    let addressErc20 = ''
    let minTierErc1155 = ''
    let addressErc1155 = ''
    let tierErc20Contract = ''
    let tierErc1155Contract = ''
    let editErc20 = {
        address: false,
        minTier: false
    }
    let editErc1155 = {
        address: false,
        minTier: false
    }

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

    function toggleEditAddress() {
        editErc20.address = !editErc20.address
    }

    function toggleEditMinTier() {
        editErc20.minTier = !editErc20.minTier
    }

    function toggleEditAddress1155() {
        editErc1155.address = !editErc1155.address
    }

    function toggleEditMinTier1155() {
        editErc1155.minTier = !editErc1155.minTier
    }

    async function assignTierErc20() {
        try {
            if (!tierErc20Contract) {
                return
            }
            const hasRoleErc20Tierer = await $vault.hasRole(
                await $vault.ERC20TIERER(),
                $account
            );

            if (hasRoleErc20Tierer) {
                let tx = await $vault.setERC20Tier(tierErc20Contract, minTierErc20, [])
                await tx.wait()
            } else {
                error = `AccessControl: account ${$account.toLowerCase()} is missing role ERC20TIERER`
            }

        } catch (e) {
            error = e.message
        }
    }

    async function assignTierErc1155() {
        try {
            if (!tierErc1155Contract) {
                return
            }
            const hasRoleErc1155Tierer = await $vault.hasRole(
                await $vault.ERC1155TIERER(),
                $account
            );

            if (hasRoleErc1155Tierer) {
                let tx = await $vault.setERC1155Tier(tierErc1155Contract, minTierErc1155, [])
                await tx.wait()
            } else {
                error = `AccessControl: account ${$account.toLowerCase()} is missing role ERC1155TIERER`
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
            {#if !editErc20.address}
              {mock.tierErc20Contract}
            {/if}
            {#if editErc20.address}
              <input type="text" class="default-input address" bind:value={tierErc20Contract} autofocus>
            {/if}
          </div>
          <img src={icons.edit} alt="edit" class="btn-hover edit" on:click={()=>toggleEditAddress()}>
        </div>
        <div class="display-flex address-container">
          <div class="f-weight-700 label">Minimum tier:
            {#if editErc20.minTier}
              <input type="text" class="default-input min-tier" bind:value={minTierErc20} autofocus>
            {/if}
            {#if !editErc20.minTier}
              {mock.minTierErc20}
            {/if}
          </div>
          <img src={icons.edit} alt="edit" class="btn-hover edit" on:click={()=>toggleEditMinTier()}>
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
                  on:click={()=>{checkAddress(tierErc20Contract,addressErc20, minTierErc20, 'erc20')}}>
            Check
          </button>
        </div>
      </div>
      <div class="erc1155 tier">
        <div>ERC1155</div>
        <div class="display-flex address-container">

          <div class="f-weight-700 contract label">
            Contract address:

            {#if !editErc1155.address}
              {mock.tierErc1155Contract}
            {/if}
            {#if editErc1155.address}
              <input type="text" class="default-input address" bind:value={tierErc1155Contract} autofocus>
            {/if}

          </div>
          <img src={icons.edit} alt="edit" class="btn-hover edit" on:click={()=>toggleEditAddress1155()}>
        </div>
        <div class="display-flex address-container">
          <div class="f-weight-700 label">Minimum tier:
            {#if editErc1155.minTier}
              <input type="text" class="default-input min-tier" bind:value={minTierErc1155} autofocus>
            {/if}
            {#if !editErc1155.minTier}
              {mock.minTierErc1155}
            {/if}
          </div>
          <img src={icons.edit} alt="edit" class="btn-hover edit" on:click={()=>toggleEditMinTier1155()}>
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
                  on:click={()=>{checkAddress(tierErc1155Contract,addressErc1155, minTierErc1155, 'erc1155')}}>
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
        width: 215px;
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