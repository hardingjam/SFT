<script>
    import {transactionInProgress} from "../scripts/store.js";
    import SftLoader from "./SftLoader.svelte";

    export let topText = ""
    export let bottomText = "View on the block explorer"
</script>

{#if ($transactionInProgress)}
  <div class="frame">
    <div class="content">
      <div class="top-text">{topText}</div>
      <SftLoader></SftLoader>
      <div class="bottom-text">{bottomText}&nbsp; &nbsp;
        <span class="icon"><slot name="icon"></slot></span>
      </div>
    </div>
  </div>
{/if}

<style>
    .frame {
        position: absolute;
        left: 50%;
        -webkit-transform: translateX(-50%);
        transform: translateX(-50%);
        top: 150px;
        bottom: 0;
        background: rgba(88, 85, 90, 0.92);
        border-radius: 20px;
        width: 420px;
        height: 420px;
        z-index: 2;
        padding: 10px;
    }

    .content {
        border-radius: 20px;
        border: 1px solid rgba(255, 255, 255, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        flex-direction: column;
        color: #FFFFFF;
        font-family: 'Mukta', sans-serif;
        font-style: normal;
        font-weight: 700;
        font-size: 20px;
        line-height: 33px;
    }

    .icon {
        cursor: pointer;
    }

</style>