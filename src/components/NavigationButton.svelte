<script>
    import {navigate} from '../scripts/helpers.js';
    import {navigationButtonClicked, tokenName} from '../scripts/store.js';
    import {ROUTE_LABEL_MAP} from '../scripts/consts.js';

    export let targetPath;
    export let label;
    export let path;
    export let child = false;
    export let disabled = false;

    export let clickable = true;
    export let externalUrl = '';

    function handleNavigationButtonClick() {

        if (!clickable) {
            return
        }
        if (externalUrl) {
            window.open(externalUrl, '_blank')
            return
        }
        navigate(targetPath, {clear: true})
        navigationButtonClicked.set(true)
    }

</script>
<button on:click={()=>handleNavigationButtonClick()}
        class:active={path===targetPath}
        class="{child? 'sub-nav-item' : 'nav-item'} {targetPath?.replace('#', 'path-')} space-x-6" disabled={disabled ? 'disabled' : ''}>
        <span class="w-3">
          <slot name="icon"></slot>
        </span>
  <label class="text-base leading-5  ">{targetPath ? ROUTE_LABEL_MAP.get(targetPath) : label.slice(0,15)} {label?.length>15? '...':''}
      {#if label && label.length > 15}<span class="tooltip-text">{label}</span>{/if}
  </label>
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
        cursor: pointer;
    }

    .sub-nav-item:hover {
        background: #ECECEC;
    }

    .nav-item, .nav-item label, .sub-nav-item label {
        cursor: pointer;
    }

    .text-base{
        position: relative;
    }

    .text-base:hover .tooltip-text {
        visibility: visible;
        opacity: 1;
    }

    .tooltip-text{
        left: 0;
        transform: unset;
    }


</style>