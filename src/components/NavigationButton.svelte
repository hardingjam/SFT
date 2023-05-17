<script>

    import {navigateTo} from 'yrv';
    import {breadCrumbs} from '../scripts/store.js';

    export let targetPath;
    export let path;
    export let label;

    function updateBreadCrumbsAndNavigate(path){
        breadCrumbs.set(["#home", path])
        navigateTo(targetPath)
    }

</script>

<button on:click={()=>updateBreadCrumbsAndNavigate(targetPath)}
        class:active={path===targetPath}
        class="nav-item space-x-6">
        <span class="w-3">
          <slot name="icon"></slot>
        </span>
  <label class="text-base leading-5  ">{label}</label>
</button>

<style>
    .nav-item {
        color: #575757;
        display: flex;
        justify-content: start;
        align-items: center;
        width: 100%;
        font-weight: 700;
        padding-left: 1.25rem;
        padding-top: 0.5rem;
        padding-bottom: 0.5rem;
        border-radius: 0.25rem;
    }

    .nav-item:hover {
        background: #ECECEC
    }

    .nav-item:focus {
        outline-offset: 2px;
    }

    .nav-item:disabled {
        color: #B7B7B7;
    }

    .active {
        background: #CAE6FF;
    }

</style>