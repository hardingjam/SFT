<script>
    import {createEventDispatcher} from 'svelte';

    export let options;
    export let label;
    export let staticLabel;
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
        class="btn dropdown-toggle"
        bind:this={dropdownTrigger}
    >
      {selected && !staticLabel ? selected : label}
    </button>
    <div slot="DropdownMenu">
      {#each options as option}
        <button class="dropdown-item" type="button" on:click={()=>commitAction(option)}>{option.name}</button>
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
        color: #FFFFFF;
        display: flex;
    }

    .dropdown-toggle::after {
        display: inline-block;
        margin-left: 17px;
        vertical-align: 0.255em;
        content: url("../assets/icons/expand.svg");
        border: none;
    }
</style>