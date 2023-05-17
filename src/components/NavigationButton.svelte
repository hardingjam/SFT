<script>

    import {navigateTo} from 'yrv';
    import {breadCrumbs} from '../scripts/store.js';

    export let targetPath;
    export let path;
    export let label;
    export let child = false;

    function updateBreadCrumbsAndNavigate(path) {
        let target = {
            path,
            label
        }
        let temp = path === "#set-vault" ? [target] : [{path: "#set-vault", label: "Home"}, target]
        breadCrumbs.set(temp)
        navigateTo(targetPath)
    }

</script>
<button on:click={()=>updateBreadCrumbsAndNavigate(targetPath)}
        class:active={path===targetPath}
        class="{child? 'sub-nav-item' : 'nav-item'} space-x-6">
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

    .sub-nav-item {
        color: #575757;
        display: flex;
        justify-content: start;
        align-items: center;
        width: 100%;
        font-weight: 500;
        padding-left: 2.5rem;
        padding-top: 0.5rem;
        padding-bottom: 0.5rem;
        border-radius: 0.25rem;
        cursor: pointer;
    }

    .sub-nav-item:hover {
        background: #ECECEC;
    }

    .nav-item, .nav-item label, .sub-nav-item label {
        cursor: pointer;
    }


</style>