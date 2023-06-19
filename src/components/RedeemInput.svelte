<script>
    import {createEventDispatcher} from "svelte";

    export let amount = "0.0";
    export let maxButton;
    export let amountLabel;

    function allowNumbersOnly(evt) {
        const charCode = evt.keyCode;
        if (charCode !== 46 //del
            && charCode !== 110 //period
            && charCode !== 190 //period
            && charCode !== 39 //right arrow
            && charCode !== 37 //left arrow
            && charCode > 31
            && (charCode < 48 || charCode > 57)
            && (charCode < 96 || charCode > 105)) {
            evt.preventDefault();
        }
    }

    const dispatch = createEventDispatcher();

    function setMaxValue() {
        dispatch('setMax');
    }

</script>
<div class="options-container">
  <div class="options-background">
    <div class="options">
      <div class="labels">
        <div class="txt">{amountLabel}</div>
      </div>
      <div class="options-input"><input class="focus:shadow-none focus:ring-0" autofocus type="text" bind:value={amount} on:keydown={(e)=>allowNumbersOnly(e)}>
        {#if maxButton}
          <button class="max-button btn-hover" on:click={(e)=>setMaxValue(e)}>Max</button>
        {/if}
      </div>
    </div>
  </div>
</div>

<style>
    .options-container {
        width: 100%;
    }

    .options-background {
        width: 100%;
        padding: 7px 0;
        background: linear-gradient(270deg, #342604 12.96%, #A28541 87.96%);
    }

    .options {
        width: 100%;
        background: #2C2C54;
        padding: 20px 53px 20px 64px;
        color: #ffffff;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .labels {
        display: flex;
        flex-direction: column;
        text-align: left;
    }

    .txt {
        font-weight: 300;
        font-size: 24px;
        line-height: 27px;
        white-space: nowrap;
    }

    .options-input {
        display: flex;
        align-items: center;
    }

    .options-input input {
        font-weight: 500;
        font-size: 32px;
        line-height: 53px;
        width: 100%;
        text-align: right;
        background: inherit;
        color: inherit;
    }

    .max-button {
        border: 1px solid #FFFFFF;
        border-radius: 5px;
        background: transparent;
        color: #ffffff;
        height: fit-content;
        margin-left: 5px;
    }
</style>