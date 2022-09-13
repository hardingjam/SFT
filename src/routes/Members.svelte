<script>
    import DefaultFrame from "../components/DefaultFrame.svelte";
    import {icons} from "../scripts/assets.js"


    let mock = {
        minTierErc20: 7,
        tierErc20Contract: "0xc0D477556c25C9d67...",
        minTierErc1155: 8,
        tierErc1155Contract: "0xc9D477556c25C9d67..."
    }

    let minTierErc20 = mock.minTierErc20
    let addressErc20 = ''
    let minTierErc1155 = ''
    let addressErc1155 = ''
    let tierErc20Contract = mock.tierErc20Contract
    let tierErc1155Contract = ''
    let editErc20 = {
        address: false,
        minTier: false
    }
    let editErc1155 = {
        address: false,
        minTier: false
    }

    function checkAddressErc20() {
        console.log(444)
    }

    function checkAddressErc1155() {
        console.log(444)
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
          <img src={icons.edit} alt="edit" class="btn-hover" on:click={()=>toggleEditAddress()}>
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
          <img src={icons.edit} alt="edit" class="btn-hover" on:click={()=>toggleEditMinTier()}>
        </div>
        <div class="f-weight-700">Check address on the tier list:</div>
        <input type="text" class="default-input" bind:value={addressErc20}>
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
          <img src={icons.edit} alt="edit" class="btn-hover" on:click={()=>toggleEditAddress1155()}>
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
          <img src={icons.edit} alt="edit" class="btn-hover" on:click={()=>toggleEditMinTier1155()}>
        </div>
        <div class="f-weight-700">Check address on the tier list:</div>
        <input type="text" class="default-input" bind:value={addressErc1155}>
        <div>
          <button class="default-btn" on:click={()=>{checkAddressErc1155()}}>Check</button>
        </div>
      </div>

    </div>
  </div>
</DefaultFrame>
<style>

    .members {
        text-align: left;
        display: flex;
        flex-direction: column;
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

    .default-frame {
        width: 490px;
    }

    .contract {
        white-space: nowrap;
    }

    .address-container {
        align-items: baseline;
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

</style>