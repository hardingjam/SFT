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
        <div class="txt f-weight-700">{amountLabel}</div>
      </div>
      <div class="options-input flex-col">
        <input class="focus:shadow-none focus:ring-0" autofocus type="text" bind:value={amount} on:keydown={(e)=>allowNumbersOnly(e)}>
        {#if maxButton}
          <button class="max-button btn-hover" on:click={(e)=>setMaxValue(e)}>Max</button>
        {/if}
        <div class="amount-info">(Mint amount = number of tokens that will go into your wallet)</div>
      </div>
    </div>
  </div>
</div>

<style>
    .options-container {
        width: calc(100% + 40px);
        margin-left: -20px;
        margin-bottom: 20px;
    }

    .options-background {
        width: 100%;
        padding: 6px 0;
        background: linear-gradient(270deg, #342604 12.96%, #A28541 87.96%);
    }

    .options {
        width: 100%;
        background: #2C2C54;
        padding: 13px 20px;
        display: flex;
        justify-content: space-between;
    }

    .labels {
        display: flex;
        flex-direction: column;
        text-align: left;
    }

    .txt {
        line-height: 27px;
        white-space: nowrap;
        color: #FFFFFF;
    }

    .options-input {
        display: flex;
        align-items: center;
    }

    .options-input input {
        width: 358px;
        height: 27px;
        left: 390px;
        top: 284px;
        background: #ECECEC;
        border-radius: 5px;
        padding-left: 10px;
    }

    .max-button {
        border: 1px solid #FFFFFF;
        border-radius: 5px;
        background: transparent;
        color: #ffffff;
        height: fit-content;
        margin-left: 5px;
    }

    .amount-info{
        color: #FFFFFF;
        font-weight: 700;
        font-size: 12px;
        line-height: 20px;
    }
</style>