<script>
    export let items = [];

    let hasItems = items.length > 0;
</script>

{#if hasItems}
  <ul>
    {#each items as item}
      <li>{item}</li>
    {/each}
  </ul>
{:else}
  <p>No items available.</p>
{/if}