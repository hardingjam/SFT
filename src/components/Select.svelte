<script>
    import {createEventDispatcher} from 'svelte';
    import {icons} from "../scripts/assets.js";
    import Dropdown from 'sv-bootstrap-dropdown';

    export let options;
    export let showExpand = true;
    export let label;
    export let staticLabel = '';
    export let className;
    export let dropDownClass = '';
    export let expandIcon = icons.expand;
    let selected;

    const dispatch = createEventDispatcher();

    function selectOption(option) {
        dispatch('select', {
            selected: option
        });
        selected = option.displayName
    }


    let dropdownTrigger;

    function commitAction(option) {
        if (option.action) {
            option.action()
        }
        selectOption(option)
    }

</script>

<div>
  <Dropdown triggerElement={dropdownTrigger}>

    <button
        type="button"
        class={`${className} btn dropdown-toggle`}
        bind:this={dropdownTrigger}
    >
      <slot name="icon"></slot>
      <span class="select-label">{selected && !staticLabel ? selected : label}</span>
      {#if showExpand}
        <img class="expand" src={expandIcon} alt="expand"/>
      {/if}
    </button>
    <div slot="DropdownMenu" class={`${dropDownClass} ${className} dropdown`}>
      {#each options as option}
        <button class="dropdown-item" type="button" on:click={()=>commitAction(option)}>
          {#if option.icon}
            <img src={icons[option.icon]} alt={option?.displayName}/>
          {/if}
          <span class="select-label">{option.displayName}</span>
        </button>
      {/each}
    </div>
  </Dropdown>
</div>
<style >
    /*@import url("https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css");*/

    .btn:focus {
        outline: none;
        box-shadow: none;
    }

    .btn {
        font-style: normal;
        font-weight: 700;
        font-size: 18px;
        line-height: 30px;
        display: flex;
        justify-content: space-between;
        align-items: baseline;
        text-align: start;
    }

    .expand {
        margin-right: 10px;
        margin-left: 17px;
    }

    .select-label {
        margin-left: 10px;
        width: calc(100% - 15px);
    }

    .nav-dropdown .dropdown-item {
        font-weight: 700 !important;
        font-size: 18px !important;
        line-height: 30px !important;
        padding: 0 50px 0 13px !important;
        background: transparent;
        color: #FFFFFF;
        height: 39px;
    }

    .nav-dropdown .dropdown-item:focus,
    .nav-dropdown .dropdown-item:hover {
        text-decoration: none;
        color: #FFFFFF;
        background: #d9d9d98c !important;
    }

    /*important styles for select*/

    .dropdown-toggle::after {
        display: inline-block;
        content: '';
        border: none;
    }
    .dropdown-toggle{
        padding: 1px 0;
    }

    .meinMenu {
        color: #FFFFFF;
    }

    .inputSelect {
        background: #ECECEC;
        border-radius: 5px;
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 25px;
        color: #000000;
        width: 360px;
    }

    .inputSelect.dropdown {
        max-height: 255px;
        height: auto;
        overflow: auto;
        background-color: #ececec;
        min-width: 360px;
        max-width: 360px;
        overflow-x: hidden;
    }

    .dropdown-item {
        color: #000000;
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 27px;
        padding: 1px 0 !important;
    }

    .dropdown-item:focus, .dropdown-item:hover {
        text-decoration: none;
    }
</style>