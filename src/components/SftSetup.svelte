<script></script>
<div class="sft-setup-container">
  <span class="title">SFT Setup</span>
  <div class="form-box">
    <div><label>Token name:</label> <input type="text" id="name" name="name"></div>
    <div><label>Admin ledger:</label> <input type="text" id="admin-ledger" name="admin_ledger"></div>
    <div><label>Token symbol:</label> <input type="text" id="symbol" name="symbol"></div>
    <div><label>URL:</label> <input type="text" id="url" name="url"></div>
  </div>
  <span class="info-text">After creating an SFT you’ll be added as an Admin; you’ll need to add other roles to manage the token.</span>
  <button>Create SFT</button>

</div>
<style>
    .sft-setup-container {
        width: 599px;
        left: 420px;
        top: 238px;
        background: #FFFFFF;
        border-radius: 20px;
        text-align: left;
        padding: 29px 11px;
        display: flex;
        flex-direction: column;
    }

    .title {
        margin-left: 24px;
        margin-bottom: 11px;
        font-family: 'Mukta', sans-serif;
        font-style: normal;
        font-weight: 700;
        font-size: 16px;
        line-height: 27px;
        color: #000000;
    }

    .form-box {
        box-sizing: border-box;
        width: 100%;
        height: 191px;
        border: 1px solid #D2D2D2;
        border-radius: 10px;
        padding: 28px;
    }

    .form-box label {
        font-family: 'Mukta', sans-serif;
        font-style: normal;
        font-weight: 700;
        font-size: 16px;
        line-height: 27px;
    }

    .info-text {
        font-family: 'Mukta', sans-serif;
        font-style: normal;
        font-weight: 700;
        font-size: 12px;
        line-height: 20px;
        margin-top: 25px;
        margin-bottom: 10px;
    }
    button{
        font-family: 'Mukta', sans-serif;
        font-style: normal;
        font-weight: 700;
        font-size: 16px;
        line-height: 27px;
        width: 413px;
        height: 50px;
        background: #9D7334;
        border-radius: 30px;
        color: #FFFFFF;
    }
</style>