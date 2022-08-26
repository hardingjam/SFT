<script>
    import {createEventDispatcher} from 'svelte';
    import {icons} from "../scripts/assets.js";
    import Dropdown from 'sv-bootstrap-dropdown';

    export let options;
    export let label;
    export let staticLabel;
    export let className;
    export let dropDownClass;
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

<div class="container">
  <Dropdown triggerElement={dropdownTrigger}>

    <button
        type="button"
        class={`${className} btn dropdown-toggle`}
        bind:this={dropdownTrigger}
    >
      <slot name="icon"></slot>
      <span class="select-label">{selected && !staticLabel ? selected : label}</span>
      <img class="expand" src={expandIcon} alt="expand"/>
    </button>
    <div slot="DropdownMenu" class={`${dropDownClass} dropdown`}>
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
        min-width: 180px;
    }

    .dropdown {
        max-height: 255px;
        height: auto;
        overflow: auto;
        background-color: #ececec;
    }

    .select-label {
        width: calc(100% - 15px);
    }
</style>