<script>
    import {transactionInProgress} from "../scripts/store.js";
</script>

{#if (!$transactionInProgress)}
  <div class="frame">

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
    }
</style>