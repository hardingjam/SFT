<script>
    import {account, activeNetwork} from "../scripts/store.js";
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
            rightIcon: true
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


</script>

<div class="{$account ? 'header' : ''} flex w-full h-14 justify-between pr-20 items-center font-bold">
  {#if $account}
    <div class="flex justify-end w-full">
      <HeaderDropdown triggerIcon={icons[$activeNetwork?.icon]}
                      triggerLabel={$activeNetwork?.displayName  || 'Supported networks'}
                      items={networks} on:select={handleNetworkSelect}></HeaderDropdown>

      <HeaderDropdown triggerLabel={formatAddress($account)}
                      items={accountMenuOptions} on:select={handleAccountMenuOptionsSelect}>
        <div slot="rightIcon">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path class="icon-path"
                  d="M10.6668 8.59967V11.3997C10.6668 13.733 9.7335 14.6663 7.40016 14.6663H4.60016C2.26683 14.6663 1.3335 13.733 1.3335 11.3997V8.59967C1.3335 6.26634 2.26683 5.33301 4.60016 5.33301H7.40016C9.7335 5.33301 10.6668 6.26634 10.6668 8.59967Z"
                  stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path class="icon-path"
                  d="M14.6668 4.59967V7.39967C14.6668 9.73301 13.7335 10.6663 11.4002 10.6663H10.6668V8.59967C10.6668 6.26634 9.7335 5.33301 7.40016 5.33301H5.3335V4.59967C5.3335 2.26634 6.26683 1.33301 8.60016 1.33301H11.4002C13.7335 1.33301 14.6668 2.26634 14.6668 4.59967Z"
                  stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
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

</style>

