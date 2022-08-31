<script>
    import {getContext} from 'svelte';
    import {TABS} from './Tabs.svelte';

    const panel = {};
    const {registerPanel, selectedPanel} = getContext(TABS);

    registerPanel(panel);
</script>

{#if $selectedPanel === panel}
  <div class="tab-panel-container">
    <slot></slot>
  </div>
{/if}

<style>
    .tab-panel-container {
        width: 492px;
        min-height: 535px;
        background: #FFFFFF;
        border-radius: 0 20px 20px 20px;
        padding-bottom: 20px;
    }
</style>