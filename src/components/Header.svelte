<script>
    import {account, activeNetwork} from "../scripts/store.js";
    import {icons} from "../scripts/assets.js";
    import networks from "../scripts/networksConfig.js";
    import {createEventDispatcher} from "svelte";
    import {formatAddress} from "../scripts/helpers.js";
    import HeaderDropdown from './HeaderDropdown.svelte';

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

    function handleNetworkSelect(event) {
        dispatch('select', {
            selected: event.detail.selected
        });
    }

    function handleAccountMenuOptionsSelect(event) {
        event.detail.selected.action()
    }

    const loaded = new Map();

    function lazy(node, data) {
        if (loaded.has(data.src)) {
            node.setAttribute('src', data.src);
        } else {
            // simulate slow loading network
            setTimeout(() => {
                const img = new Image();
                img.src = data.src;
                img.onload = () => {
                    loaded.set(data.src, img);
                    node.setAttribute('src', data.src);
                };
            }, 1000);
        }

        return {
            destroy() {
            } // noop
        };
    }


</script>

<div class=" {$account ? 'header' : ''} flex w-full h-14 justify-between pr-20 text-white items-center font-bold">
  <div class="logo-container ml-14 flex items-center justify-center fixed">
    <a href="/">
      <img src={icons.logo_low} alt="sft"
           class="{$account ? 'border-8' : ''}  border-white rounded-full w-full h-full"
           use:lazy="{{src: icons.logo}}"/>
    </a>
  </div>
  {#if $account}
    <div class="flex justify-end w-full">
      <HeaderDropdown triggerIcon={icons[$activeNetwork?.icon]}
                      triggerLabel={$activeNetwork?.displayName  || 'Supported networks'}
                      items={networks} on:select={handleNetworkSelect}></HeaderDropdown>

      <HeaderDropdown triggerLabel={formatAddress($account)}
                      items={accountMenuOptions} on:select={handleAccountMenuOptionsSelect}></HeaderDropdown>
    </div>
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

    .logo-container {
        top: 26px;
    }

    .logo-container img {
        height: 85px;
        width: 85px;
    }
</style>

