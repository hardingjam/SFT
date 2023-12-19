<script>
import {icons} from '../scripts/assets.js';
</script>
<div class="landing-footer">
  <div class="footer-border"></div>
  <div class="learn-more">
    Learn more about how to use the SFT <br>application:
    <div class="launch-button">Launch app</div>
  </div>
  <img src={icons.wave} alt="wave" class="wave">
  <div class="landing-logo">
    <img src="{icons.sft_logo_white}" alt="sft">
  </div>
</div>

<style>

    .wave {
        width: 100%;
        bottom: 0;
    }

    .landing-footer {
        bottom: 0;
        width: 100%;
        left: 0;
        display: flex;
        flex-direction: column;
        gap: 128px;
        z-index: 2;
    }

    .landing-footer .landing-logo {
        position: absolute;
        bottom: 67px;
        left: 50px;
        padding: 0;
        width: calc(100% - 50px);
    }

    .learn-more {
        margin-top: 40px;;
        color: #575757;
        text-align: center;
        font-family: 'Mukta Mahee', sans-serif;
        font-size: 30px;
        font-style: normal;
        font-weight: 700;
        line-height: 40px; /* 133.333% */
        display: flex;
        flex-direction: column;
        gap: 61px;
        align-items: center;
        width: 100%;
    }


    .launch-button {
        border-radius: 30px;
        background: #2C2C54;
        color: #FFF;
        font-size: 30px;
        font-style: normal;
        font-weight: 500;
        line-height: normal;
        padding: 6px 32px;
        width: fit-content;
    }

    .footer-border {
        background: linear-gradient(90deg, #674AA5 8.61%, #59C3FF 100%);
        height: 6px;
        width: calc(100% + 411px);
        margin-left: -122px;
        z-index: 1;
    }

</style>