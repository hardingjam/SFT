<script>
    import DefaultFrame from "../components/DefaultFrame.svelte";
    import {icons} from "../scripts/assets.js"
    import {vault} from "../scripts/store.js";


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

    let isAddressErc20Valid = false
    let isAddressErc1155Valid = false
    let showCheck = false
    let showCheckErc20 = false
    let error = ''

    function checkAddressErc20() {
        if (!addressErc20) {
            return
        }
        showCheckErc20 = true
        isAddressErc20Valid = !isAddressErc20Valid
    }

    function checkAddressErc1155() {
        if (!addressErc1155) {
            return
        }
        showCheck = true
        isAddressErc1155Valid = !isAddressErc1155Valid
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
            //todo Check for role

            let tx = await $vault.setERC20Tier(tierErc20Contract, minTierErc20, [])
            await tx.wait()
            editErc20.address = false
            editErc20.minTier = false

        } catch (e) {
            error = e.message
        }
    }
    async function assignTierErc1155() {
        try {
            if (!tierErc1155Contract) {
                console.log(4)
                return
            }

            //todo Check for role
            let tx = await $vault.setERC1155Tier(tierErc1155Contract, minTierErc1155, [])
            await tx.wait()
            editErc1155.address = false
            editErc1155.minTier = false

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
          </div>
          {#if editErc20.address}
            <input type="text" class="default-input address" bind:value={tierErc20Contract}>
          {/if}
          <img src={icons.edit} alt="edit" class="btn-hover edit" on:click={()=>toggleEditAddress()}>
        </div>
        <div class="display-flex address-container">
          <div class="f-weight-700 label">Minimum tier:
            {#if editErc20.minTier}
              <input type="text" class="default-input min-tier" bind:value={minTierErc20}>
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
          <input type="text" class="default-input" bind:value={addressErc20}>
          {#if isAddressErc20Valid && showCheckErc20 && addressErc20}
            <img src={icons.check} alt="check" class="check">
          {/if}
          {#if !isAddressErc20Valid && showCheckErc20 && addressErc20}
            <img src={icons.reject} alt="reject" class="reject">
          {/if}
        </div>
        <div>
          <button class="default-btn" on:click={()=>{checkAddressErc20()}}>Check</button>
        </div>
      </div>
      <div class="erc1155 tier">
        <div>ERC1155</div>
        <div class="display-flex address-container">
          <div class="f-weight-700 contract label">Contract address:
            {#if !editErc1155.address}
              {mock.tierErc1155Contract}
            {/if}
          </div>
          {#if editErc1155.address}
            <input type="text" class="default-input address" bind:value={tierErc1155Contract}>
          {/if}
          <img src={icons.edit} alt="edit" class="btn-hover edit" on:click={()=>toggleEditAddress1155()}>
        </div>
        <div class="display-flex address-container">
          <div class="f-weight-700 label">Minimum tier:
            {#if editErc1155.minTier}
              <input type="text" class="default-input min-tier" bind:value={minTierErc1155}>
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
          <input type="text" class="default-input" bind:value={addressErc1155}>
          {#if isAddressErc1155Valid && showCheck && addressErc1155}
            <img src={icons.check} alt="check" class="check">
          {/if}
          {#if !isAddressErc1155Valid && showCheck && addressErc1155}
            <img src={icons.reject} alt="reject" class="reject">
          {/if}
        </div>
        <div>
          <button class="default-btn" on:click={()=>{checkAddressErc1155()}}>Check</button>
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
        max-width: 485px;
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
    }

    .address-container {
        justify-content: space-between;
        min-height: 36px;
    }

    .address {
        width: 80%;
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
        float: right;
    }
</style>