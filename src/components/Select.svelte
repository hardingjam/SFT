<script>
    import {createEventDispatcher} from 'svelte';

    export let options;
    export let label;
    export let staticLabel;
    export let className;
    let selected;

    const dispatch = createEventDispatcher();

    function selectOption(option) {
        dispatch('select', {
            selected: option
        });
        selected = option.name
    }

    import Dropdown from 'sv-bootstrap-dropdown';

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
      <slot name="icon"></slot> <span class="select-label">{selected && !staticLabel ? selected : label}</span>
    </button>
    <div slot="DropdownMenu" class="dropdown">
      {#each options as option}
        <button class="dropdown-item" type="button" on:click={()=>commitAction(option)}>
          <slot name="option-icon"></slot>
          <span class="select-label">{option.name}</span>
        </button>
      {/each}
    </div>
  </Dropdown>
</div>
<style>
    @import url("https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css");

    .container {
        position: relative;
        display: inline-block;
        cursor: pointer;
    }

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
    }

    .dropdown-toggle::after {
        display: inline-block;
        margin-left: 17px;
        vertical-align: 0.255em;
        content: url("../assets/icons/expand.svg");
        border: none;
    }

    .meinMenu{
        color: #FFFFFF;
    }

    .inputSelect{
        background: #ECECEC;
        border-radius: 5px;
        height: 26px;
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 25px;
        color: #000000;
        padding: 0;
        width: 168px;
    }

    .select-label{
        margin-left: 10px;
    }
</style>