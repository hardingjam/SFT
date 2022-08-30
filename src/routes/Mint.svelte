<script>
    import {icons} from "../scripts/assets.js";
    import MintInput from "../components/MintInput.svelte";

    let amount = 0;
</script>

<div class="mint-container">
  <div class="audit-history btn-hover">
    <span>Audit History </span><img src={icons.show} alt="go to audit">
  </div>
  <MintInput bind:amount={amount}/>
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


</style>

