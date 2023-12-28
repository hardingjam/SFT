<script>
    import {createEventDispatcher} from "svelte";

    export let amount = "0.0";
    export let maxButton;
    export let amountLabel;
    export let info;
    export let id;

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
    <div class="options flex-col">
      <div class="flex justify-between w-full">
        <div class="labels">
          <div class="txt f-weight-700">{amountLabel}</div>
        </div>
        <div class="options-input flex ">
          <input class="focus:shadow-none focus:ring-0 w-100" autofocus type="text" bind:value={amount}
                 on:keydown={(e)=>allowNumbersOnly(e)} id="{id}">
          {#if maxButton}
            <button class="max-button btn-hover" on:click={(e)=>setMaxValue(e)}>MAX</button>
          {/if}

        </div>
      </div>

      <div class="amount-info mr-2">{info}</div>

    </div>
  </div>
</div>

<style>
    .options-container {
        width: calc(100% + 40px);
        margin-left: -20px;
    }

    .options-background {
        width: 100%;
        padding: 6px 0;
        background: linear-gradient(270deg, #342604 12.96%, #A28541 87.96%);
    }

    .options {
        width: 100%;
        background: #2C2C54;
        padding: 11px 20px;
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
        align-items: center;
        width: 358px;
    }

    .options-input input {
        /*width: 358px;*/
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
        margin-left: 6px;
        padding: 0 6px;
    }

    .amount-info {
        color: #FFFFFF;
        font-weight: 700;
        font-size: 12px;
        line-height: 20px;
        align-self: end;
        margin-top: 2px;
    }
</style>