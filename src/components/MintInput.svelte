<script>
    export let amount;
    export let amountLabel;
    export let label;

    function allowNumbersOnly(evt) {
        const charCode = evt.keyCode;
        if (charCode !== 46
            && charCode !== 110
            && charCode !== 190
            && charCode > 31
            && (charCode < 48 || charCode > 57)
            && (charCode < 96 || charCode > 105)) {
            evt.preventDefault();
        }
    }

</script>
<div class="options-container">
  <div class="options-background">
    <div class="options">
      <div class="labels">
        <div class="txt">{amountLabel}</div>
        <div class="txt-options">{label}</div>
      </div>
      <div class="options-input"><input type="text" bind:value={amount} autofocus on:keydown={(e)=>allowNumbersOnly(e)}>
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
        padding: 15px 83px 15px 64px;
        color: #ffffff;
        display: flex;
        justify-content: space-between;
        align-items: end;
    }

    .labels {
        display: flex;
        flex-direction: column;
        text-align: left;
    }

    .txt {
        font-weight: 300;
        font-size: 16px;
        line-height: 27px;
        white-space: nowrap;
    }

    .txt-options {
        font-weight: 300;
        font-size: 32px;
        line-height: 53px;
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
</style>