<script>
    import {createEventDispatcher, onMount} from 'svelte';
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

    function commitAction() {
        if (selected.action) {
            selected.action()
        }
        selectOption(selected)
    }

</script>

<div>

  <select bind:value={selected} on:change="{() =>commitAction()}">
    {#each options as option}
      <option value={option}>
        {option.displayName}
      </option>
    {/each}
  </select>

<!--  <Dropdown triggerElement={dropdownTrigger}>-->

<!--    <button-->
<!--        type="button"-->
<!--        class={`${className} btn dropdown-toggle`}-->
<!--        bind:this={dropdownTrigger}-->
<!--    >-->
<!--      <slot name="icon"></slot>-->
<!--      <span class="select-label">{selected && !staticLabel ? selected : label}</span>-->
<!--      {#if showExpand}-->
<!--        <img class="expand" src={expandIcon} alt="expand"/>-->
<!--      {/if}-->
<!--    </button>-->
<!--    <div slot="DropdownMenu" class={`${dropDownClass} ${className} dropdown`}>-->
<!--      {#each options as option}-->
<!--        <button class="dropdown-item" type="button" on:click={()=>commitAction(option)}>-->
<!--          {#if option.icon}-->
<!--            <img src={icons[option.icon]} alt={option?.displayName}/>-->
<!--          {/if}-->
<!--          <span class="select-label">{option.displayName}</span>-->
<!--        </button>-->
<!--      {/each}-->
<!--    </div>-->
<!--  </Dropdown>-->
</div>
<style>
    @import url("https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css");

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

    .dropdown-toggle::after {
        display: inline-block;
        content: '';
        border: none;
    }

    .meinMenu {
        color: #FFFFFF;
    }

    .inputSelect {
        background: #ECECEC;
        border-radius: 5px;
        height: 26px;
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 25px;
        color: #000000;
        padding: 0;
        min-width: 230px;
        max-width: 250px;
        width: 100%;
    }

    .inputSelect.dropdown {
        max-height: 255px;
        height: auto;
        overflow: auto;
        background-color: #ececec;
        padding-right: 50px;
        min-width: 230px;
        max-width: 250px;
    }

    .select-label {
        margin-left: 10px;
        width: calc(100% - 15px);
    }


    .nav-dropdown {
        background-color: #2c2c5454 !important;
        border-radius: 0 0 5px 5px !important;
        box-shadow: 0 4px 4px #00000040;
        border: none !important;
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


    .dropdown-item {
        color: #000000;
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 27px;
        padding: 0 !important;
    }

    .dropdown-item:focus, .dropdown-item:hover {
        text-decoration: none;
    }
</style>