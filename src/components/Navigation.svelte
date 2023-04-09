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
    import {activeNetwork} from "../scripts/store.js";
    import {icons} from "../scripts/assets.js";
    import networks from "../scripts/networksConfig.js";
    import {createEventDispatcher} from "svelte";

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
      <DropdownMenu >
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
      <DropdownToggle nav caret>Options</DropdownToggle>
      <DropdownMenu end>
        <DropdownItem>Option 1 with long text leaking out of the view</DropdownItem>
        <DropdownItem>Option 2</DropdownItem>
        <DropdownItem divider/>
        <DropdownItem>Reset</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  </Nav>
</Collapse>
<style>
  .network-name{
      font-style: normal;
      font-weight: 700;
      font-size: 18px;
      line-height: 39px;
      color: #FFFFFF;
      margin-left: 20px;
      margin-right: 20px;
  }
  .dropdown-item{
      padding: 0 50px 0 13px!important;
  }

  .dropdown-item:hover{
      background: #d9d9d98c!important;
  }

</style>