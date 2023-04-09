<script>
    import {
        Collapse,
        Navbar,
        NavbarToggler,
        NavbarBrand,
        Nav,
        NavItem,
        NavLink,
        Dropdown,
        DropdownToggle,
        DropdownMenu,
        DropdownItem
    } from 'sveltestrap';

    import {Styles} from 'sveltestrap';
    import {account, activeNetwork} from "../scripts/store.js";
    import {icons} from "../scripts/assets.js";
    import networks from "../scripts/networksConfig.js";
    import {createEventDispatcher} from "svelte";
    import {formatAddress} from "../scripts/helpers.js";
    import {navigateTo} from "yrv";

    let menuItems = [
        {
            id: "setup",
            displayName: "SFT Setup",
            action: () => {
                navigateTo('#setup', {replace: false})
            }
        },
        {
            id: "roles",
            displayName: "Roles",
            action: () => {
                navigateTo('#roles', {replace: false})
            }
        },
        {
            id: "mint",
            displayName: "Mint/Redeem",
            action: () => {
                navigateTo('#mint', {replace: false})
            }
        },
        {
            id: "list",
            displayName: "SFT List",
            action: () => {
                navigateTo('#list', {replace: false})
            }
        },
        {
            id: "members",
            displayName: "Members",
            action: () => {
                navigateTo('#members', {replace: false})
            }
        },
        {
            id: "audit-history",
            displayName: "Audit History",
            action: () => {
                navigateTo('#audit-history', {replace: false})
            }
        },
        // {
        //     id: "new-schema",
        //     displayName: "New Schema",
        //     action: () => {
        //         navigateTo('#new-schema', {replace: false})
        //     }
        // },
    ]


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
                window.open(`${$activeNetwork.blockExplorer}address/${$account}`);
            },
        }
    ]

    let isOpen = false;

    function handleUpdate(event) {
        isOpen = event.detail.isOpen;
    }

    const dispatch = createEventDispatcher();

    function handleNavItemClick(option) {
        dispatch('networkSelect', {
            selected: option
        });
    }

    // function handleAccountOptionClick(option) {
    //     dispatch('accountOptionSelect', {
    //         selected: option
    //     });
    // }
</script>

<Collapse {isOpen} navbar expand="md" on:update={handleUpdate}>
  <Nav>
    <Dropdown>
      <DropdownToggle nav>
        <img src={  icons[$activeNetwork?.icon]}
             alt={$activeNetwork?.displayName}/>
        <span class="network-name">{$activeNetwork.displayName}</span>
        <img src={ icons.expand}
             alt="expand"/></DropdownToggle>
      <DropdownMenu>
        {#each networks as network}
          <DropdownItem on:click={()=>handleNavItemClick(network)}>
            <div class="dropdown-item">
              <img src={icons[network.icon]} alt={network?.displayName}/>
              <span class="network-name">{network.displayName}</span>
            </div>
          </DropdownItem>
        {/each}
      </DropdownMenu>
    </Dropdown>
    <Dropdown>
      <DropdownToggle nav>
        <span class="network-name">{formatAddress($account)}</span>
        <img src={ icons.expand} alt="expand"/></DropdownToggle>
      <DropdownMenu end>
        {#each accountMenuOptions as accountOption}
          <DropdownItem on:click={()=>accountOption.action()}>
            <div class="dropdown-item">
              <span class="network-name">{accountOption.displayName}</span>
            </div>
          </DropdownItem>
        {/each}
      </DropdownMenu>
    </Dropdown>
    <Dropdown>
      <DropdownToggle nav>
        <img src={icons.burger} alt="menu"/></DropdownToggle>
      <DropdownMenu end>
        {#each menuItems as menuItem}
          <DropdownItem on:click={()=>menuItem.action()}>
            <div class="dropdown-item">
              <span class="network-name">{menuItem.displayName}</span>
            </div>
          </DropdownItem>
        {/each}
      </DropdownMenu>
    </Dropdown>
  </Nav>
</Collapse>
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