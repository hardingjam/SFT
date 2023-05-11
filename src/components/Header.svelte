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

    function handleAccountMenuOptionsSelect(event){
        event.detail.selected.action()
    }

</script>

<HeaderDropdown triggerIcon={icons[$activeNetwork?.icon]} triggerLabel={$activeNetwork?.displayName}
          items={networks} on:select={handleNetworkSelect}></HeaderDropdown>

<HeaderDropdown triggerLabel={formatAddress($account)}
          items={accountMenuOptions} on:select={handleAccountMenuOptionsSelect}></HeaderDropdown>
