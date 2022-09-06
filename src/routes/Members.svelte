<script>

    import {tokens} from "../scripts/store.js";
    import Select from "../components/Select.svelte";
    import {icons} from "../scripts/assets.js";
    import DefaultFrame from "../components/DefaultFrame.svelte";

    let minTier = ''
    let address = ''

    function handleTokenSelect(event) {
        console.log(event)
    }

    function checkAddress() {
        console.log(444)
    }
</script>
<DefaultFrame header="Members">
  <div slot="content">
    <div class="members f-weight-700">
      <div class="erc20 tier">
        <div>ERC20</div>
        <div class="display-flex">
          <label class="f-weight-700 contract">Contract Address:</label>
          {#if $tokens.length}
            <Select options={$tokens.map(t=>{return {...t,displayName: t.name}})}

                    on:select={handleTokenSelect}
                    label={'Select'} className={"inputSelect"} expandIcon={icons.expand_black}></Select>
          {/if}
        </div>
        <div>
          <label class="f-weight-700">Minimum Tier:</label>
          <input type="text" class="default-input min-tier" bind:value={minTier}>
        </div>
        <label class="f-weight-700">Check address on the tier list:</label>
        <input type="text" class="default-input address" bind:value={address}>
        <div>
          <button class="default-btn" on:click={()=>{checkAddress()}}>Check</button>
        </div>
      </div>
      <div class="erc1155 tier">
        <div>ERC1155</div>
        <div class="display-flex">
          <label class="f-weight-700 contract">Contract Address:</label>
          {#if $tokens.length}
            <Select options={$tokens.map(t=>{return {...t,displayName: t.address}})}

                    on:select={handleTokenSelect}
                    label={'Select'} className={"inputSelect"} expandIcon={icons.expand_black}></Select>
          {/if}
        </div>
        <div>
          <label class="f-weight-700">Minimum Tier:</label>
          <input type="text" class="default-input min-tier" bind:value={minTier}>
        </div>
        <label class="f-weight-700">Check address on the tier list:</label>
        <input type="text" class="default-input address" bind:value={address}>
        <div>
          <button class="default-btn" on:click={()=>{checkAddress()}}>Check</button>
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