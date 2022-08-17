<script>
    import {createEventDispatcher} from 'svelte';

    export let options;
    let selected;

    const dispatch = createEventDispatcher();

    function selectOption() {
        dispatch('select', {
            activeNetwork: selected
        });
        return selected
    }

</script>

<div class="container">
  <select bind:value={selected} on:change={selectOption(selected)}>
    {#each options as option}
      <option value={option}>
        {option.name}
      </option>
    {/each}
  </select>
</div>
<style>
    .container {
        position: relative;
        display: inline-block;
        cursor: pointer;
    }
</style>