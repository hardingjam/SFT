<script>
    import {icons} from "../scripts/assets.js";
    import {navigate} from '../scripts/helpers.js';

    let error = ""

    function goToRoles() {
        navigate("#roles", {clear: true});
    }

</script>
<div class="sft-setup-container">
  <label class="title f-weight-700"></label>
  <div class="success-container form-box">
    <span class="success">Your SFT setup was successful!</span>
    <img src="{icons.success_circle}" alt="sft success"/>
  </div>
  <div class="form-after">
    <span class="info-text f-weight-700">After creating an SFT you’ll be added as an Admin; you’ll need to add other roles to manage the token.</span>
    <div class="error">{error}</div>
    <button class="create-token btn-solid btn-submit"
            on:click={() => goToRoles()}>Ok, take me to roles
    </button>
  </div>
</div>
<style>
    .sft-setup-container {
        max-width: 599px;
        left: 420px;
        top: 238px;
        background: #FFFFFF;
        border-radius: 10px;
        padding: 29px 11px;
        display: flex;
        flex-direction: column;
        text-align: left;
    }

    .title {
        margin-left: 24px;
        margin-bottom: 11px;
        font-style: normal;
        font-size: 16px;
        line-height: 27px;
        color: #000000;
    }

    .form-box {
        box-sizing: border-box;
        width: 577px;
        height: 191px;
        border: 1px solid #E5E4E4;
        border-radius: 10px;
        padding: 28px;
    }

    .form-box label {
        font-style: normal;
        font-size: 16px;
        line-height: 27px;
    }

    .form-box input {
        width: 343px;
        height: 28px;
        background: #ECECEC;
        border-radius: 5px;
        border: none;
        margin-bottom: 7px;
        padding-left: 13px;
        font-style: normal;
        font-weight: 300;
        font-size: 16px;
        line-height: 27px;
    }

    .form-after {
        align-items: center;
        display: flex;
        flex-direction: column;
    }

    .info-text {
        font-style: normal;
        font-size: 12px;
        line-height: 20px;
        margin-top: 21px;
        margin-bottom: 20px;
    }

    .create-token {
        width: 413px;
    }

    .success-container {
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-direction: column;
    }

    .error {
        margin-bottom: 10px;
    }

</style>