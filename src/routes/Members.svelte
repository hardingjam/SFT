<script>
    import DefaultFrame from "../components/DefaultFrame.svelte";

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
        <div class="display-flex">
          <label class="f-weight-700 contract">Contract address:</label>
          <input type="text" class="default-input address" bind:value={tierErc20Contract}>
        </div>
        <div>
          <label class="f-weight-700">Minimum tier:</label>
          <input type="text" class="default-input min-tier" bind:value={minTierErc20}>
        </div>
        <label class="f-weight-700">Check address on the tier list:</label>
        <input type="text" class="default-input address" bind:value={addressErc20}>
        <div>
          <button class="default-btn" on:click={()=>{checkAddressErc20()}}>Check</button>
        </div>
      </div>

      <div class="erc1155 tier">
        <div>ERC1155</div>
        <div class="display-flex">
          <label class="f-weight-700 contract">Contract address:</label>
          <input type="text" class="default-input address" bind:value={tierErc1155Contract}>

        </div>
        <div>
          <label class="f-weight-700">Minimum tier:</label>
          <input type="text" class="default-input min-tier" bind:value={minTierErc1155}>
        </div>
        <label class="f-weight-700">Check address on the tier list:</label>
        <input type="text" class="default-input address" bind:value={addressErc1155}>
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
</style>