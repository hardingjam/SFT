<script>
    import {account, activeNetwork, pageTitle} from "../scripts/store.js";
    import {icons} from "../scripts/assets.js";
    import networks from "../scripts/networksConfig.js";
    import {createEventDispatcher} from "svelte";
    import {formatAddress} from "../scripts/helpers.js";
    import HeaderDropdown from './HeaderDropdown.svelte';
    import BreadCrumbs from './BreadCrumbs.svelte';

    export let location;

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
            },
            rightIcon: 'copy'
        },
        {
            id: "view",
            displayName: "View on explorer",
            action: () => {
                window.open(`${$activeNetwork.blockExplorer}/address/${$account}`);
            },
            class: 'underline',
        }
    ]

    const dispatch = createEventDispatcher();

    function handleNetworkSelect(event) {
        dispatch('select', {
            selected: event.detail.selected
        });
    }

    function handleAccountMenuOptionsSelect(event) {
        event.detail.selected.action()
    }

// let pageTitle = "Asset register"
</script>

<div class="{$account ? 'header' : ''} flex w-full h-14 justify-between pr-12 items-center font-bold">
  {#if $account}
    <div class="w-1/3"></div>
    <div class="page-title">{$pageTitle}</div>
    <div class="flex justify-end w-1/3">
      <HeaderDropdown triggerIcon={icons[$activeNetwork?.icon]}
                      triggerLabel={$activeNetwork?.displayName  || 'Supported networks'}
                      items={networks} on:select={handleNetworkSelect}></HeaderDropdown>

      <HeaderDropdown triggerLabel={formatAddress($account)}
                      items={accountMenuOptions} on:select={handleAccountMenuOptionsSelect}>
      </HeaderDropdown>
    </div>
    {#if location && (location !== "/" && location !== "#")}
      <BreadCrumbs/>
    {/if}
  {/if}
</div>


<style>

    .header {
        z-index: 2;
        position: fixed;
        top: 0;
        background: #6F5EA1;
        background: linear-gradient(90.04deg, #B5DCFF 2.46%, #6F5EA1 96.36%);
    }

    .page-title{
        width: 33.3%;
        color: #FFFFFF;
        font-family: "Mukta", sans-serif;
        font-size: 18px;
        font-style: normal;
        font-weight: 700;
        line-height: normal;
    }

</style>

