<script>
    import {icons} from "../scripts/assets.js";

    let amount = 0;
</script>

<div class="mint-container">
  <div class="audit-history btn-hover">
    <span>Audit History </span><img src={icons.show} alt="go to audit">
  </div>
  <div class="options-container">
    <div class="options-background">
      <div class="options">
        <div class="labels">
          <div class="txt">Mint Amount</div>
          <div class="txt-options">Options</div>
        </div>
        <div class="options-input"><input type="text" bind:value={amount} autofocus></div>
      </div>
    </div>
  </div>
</div>

<style>
    .mint-container {
        padding-top: 17px;
        padding-bottom: 20px;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .audit-history {
        font-weight: 700;
        font-size: 16px;
        line-height: 27px;
        color: #AE6E00;
        text-align: right;
        width: 100%;
        padding-right: 40px;
        margin-bottom: 15px;
        cursor: pointer;
    }

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

