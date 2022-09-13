<script>
    import DefaultFrame from "../components/DefaultFrame.svelte";
    import {icons} from "../scripts/assets.js"

    let minTierErc20 = ''
    let addressErc20 = ''
    let minTierErc1155 = ''
    let addressErc1155 = ''
    let tierErc20Contract = ''
    let tierErc1155Contract = ''


    function checkAddressErc20() {
        console.log(444)
    }

    function checkAddressErc1155() {
        console.log(444)
    }
</script>
<DefaultFrame header="Members">
  <div slot="content">
    <div class="members f-weight-700">
      <div class="erc20 tier">
        <div>ERC20</div>
        <div class="display-flex address-container">
          <div class="f-weight-700 contract label">Contract address:</div>
          <input type="text" class="default-input address" bind:value={tierErc20Contract}>
          <img src={icons.edit} alt="edit" class="btn-hover">
        </div>
        <div class="display-flex address-container">
          <div class="f-weight-700 label">Minimum tier:
            <input type="text" class="default-input min-tier" bind:value={minTierErc20}>
          </div>
          <img src={icons.edit} alt="edit" class="btn-hover">
        </div>
        <div class="f-weight-700">Check address on the tier list:</div>
        <input type="text" class="default-input" bind:value={addressErc20}>
        <div>
          <button class="default-btn" on:click={()=>{checkAddressErc20()}}>Check</button>
        </div>
      </div>

      <div class="erc1155 tier">
        <div>ERC20</div>
        <div class="display-flex address-container">
          <div class="f-weight-700 contract label">Contract address:</div>
          <input type="text" class="default-input address" bind:value={tierErc1155Contract}>
          <img src={icons.edit} alt="edit" class="btn-hover">
        </div>
        <div class="display-flex address-container">
          <div class="f-weight-700 label">Minimum tier:
            <input type="text" class="default-input min-tier" bind:value={minTierErc1155}>
          </div>
          <img src={icons.edit} alt="edit" class="btn-hover">
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
    }

    .address {
        width: 80%;
        margin-right: 20px;
    }

    .label{
        margin-right: 5px;

    }

</style>