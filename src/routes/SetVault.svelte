<script>
    import {navigateTo} from "yrv";
</script>
<div class="buttons-container">
  <button class=" btn-hover" on:click={()=>{navigateTo("#setup")}}>
    setup new SFT
  </button>
  <button class=" btn-hover" on:click={()=>{navigateTo("#list")}}>
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
        background: rgba(44, 44, 84, 0.33);
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
</style>
