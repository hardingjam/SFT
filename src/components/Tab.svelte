<script>
    import {getContext} from 'svelte';
    import {TABS} from './Tabs.svelte';
    import {Link} from "yrv";

    const tab = {};
    const {registerTab, selectTab, selectedTab} = getContext(TABS);

    registerTab(tab);
    function chaneRoute(tab) {
        selectTab(tab)
    }

    export let href = ""
    export let isLast = false;
</script>

<style>
    button {
        margin: 0;
        color: #000000;
        width: 105px;
        height: 36px;
        background: linear-gradient(227.8deg, #FFFFFF 21.59%, #C5C4C4 61.47%);
        border-radius: 20px 10px 0 0;
        border: none;
        font-weight: 300;
        font-size: 16px;
        line-height: 27px;

    }

    .last-tab{
        border-radius: 10px 10px 0 0!important;
        margin-left: -1px;
    }

    .selected {
        background: #FFFFFF;
        font-weight: 700;
    }
</style>
<Link href={href}>
  <button class:selected="{$selectedTab === tab}" class:last-tab="{isLast}" on:click="{() => chaneRoute(tab)}">
    <slot></slot>
  </button>
</Link>

