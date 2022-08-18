<script>
    import {createEventDispatcher} from 'svelte';

    export let options;
    export let label;
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
        class="btn btn-secondary dropdown-toggle"
        bind:this={dropdownTrigger}
    >
      {selected ? selected : label}
    </button>
    <div slot="DropdownMenu">
      {#each options as option}
        <button class="dropdown-item" type="button" on:click={commitAction(option)}>{option.name}</button>
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
</style>