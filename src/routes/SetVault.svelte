<script>
    import {navigateTo} from "yrv";
    import {tokens} from "../scripts/store.js";
</script>
<div class="buttons-container">
  <button class=" btn-hover" on:click={()=>{navigateTo("#setup")}}>
    Setup new SFT
  </button>
  <button class="{$tokens.length ? `btn-hover`: 'disabled'}" on:click={()=>{navigateTo("#list")}}
          disabled="{!$tokens.length}">
    Manage existing SFT
  </button>
</div>

<style>
    .buttons-container {
        display: flex;
        flex-direction: column;
        width: 400px;
        height: 160px;
        justify-content: space-around;
        margin-top: 100px;
    }

    button {
        width: 100%;
        background: #2c2c5454;
        color: #ffffff;
        font-style: normal;
        font-weight: 700;
        font-size: 16px;
        line-height: 27px;
        height: 50px;
        border-radius: 30px;
        border: none;
        cursor: pointer;
        padding: 0 30px;
    }

    .disabled {
        background: #d9d9d98c;
    }
</style>
