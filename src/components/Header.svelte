<script>
    import {account, activeNetwork} from "../scripts/store.js";
    import {icons} from "../scripts/assets.js";
    import networks from "../scripts/networksConfig.js";
    import {createEventDispatcher} from "svelte";
    import {formatAddress} from "../scripts/helpers.js";

    let accountMenuOptions = [
        {
            id: "copy",
            displayName: "Copy address",
            action: () => {
                if (navigator && navigator.clipboard && navigator.clipboard.writeText) {
                    // this.showTooltip = true;
                    // setTimeout(() => {
                    //     this.showTooltip = false;
                    // }, 1000);
                    return navigator.clipboard.writeText($account);
                }
                return Promise.reject("The Clipboard API is not available.");
            }
        },
        {
            id: "view",
            displayName: "View on explorer",
            action: () => {
                window.open(`${$activeNetwork.blockExplorer}/address/${$account}`);
            },
            class: 'underline'
        }
    ]

    const dispatch = createEventDispatcher();

    function handleNavItemClick(option) {
        dispatch('networkSelect', {
            selected: option
        });
    }

</script>


<button id="networks-dropdown" data-dropdown-toggle="networks"
        class="text-white focus:outline-none items-center display-flex mr-10" type="button">
  <img src={  icons[$activeNetwork?.icon]}
       alt={$activeNetwork?.displayName}/>
  <span class="network-name">{$activeNetwork?.displayName || networks[0].displayName}</span>
  <img src={ icons.expand} alt="expand"/>
</button>
<!-- Dropdown menu -->
<div id="networks" class="hidden">
  <ul class="dropdown-menu" aria-labelledby="dropdownDefaultButton">
    {#each networks as network}
      <li on:click={()=>handleNavItemClick(network)} class="dropdown-item cursor-pointer display-flex">
        <img src={icons[network.icon]} alt={network?.displayName}/>
        <span class="network-name">{network?.displayName}</span>
      </li>
    {/each}
  </ul>
</div>

<button id="account-options-dropdown" data-dropdown-toggle="account-options"
        class="text-white focus:outline-none items-center display-flex" type="button">
  <span class="network-name">{formatAddress($account)}</span>
  <img src={ icons.expand} alt="expand"/>
</button>

<div id="account-options" class="hidden">
  <ul class="dropdown-menu" aria-labelledby="dropdownDefaultButton">
    {#each accountMenuOptions as accountOption}
      <li on:click={()=>accountOption.action()} class="dropdown-item cursor-pointer display-flex">
        <span class={`network-name ${accountOption?.class}`}>{accountOption?.displayName}</span>
      </li>
    {/each}
  </ul>
</div>
<style>
    .network-name {
        font-style: normal;
        font-weight: 700;
        font-size: 18px;
        line-height: 39px;
        color: #FFFFFF;
        margin-left: 20px;
        margin-right: 20px;
    }

    .dropdown-item {
        padding: 0 40px 0 13px !important;
    }

    .dropdown-item:hover {
        background: #d9d9d98c !important;
    }

</style>