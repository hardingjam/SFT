<script>
    import {icons} from '../scripts/assets.js';
</script>
<div class="landing-footer">
  <div class="footer-border"></div>
  <div class="learn-more">
    Learn more about how to use the SFT <br>application:
    <div class="launch-button">Launch app</div>
  </div>
  <div class="wave-container">
    <img src={icons.wave} alt="wave" class="wave">
    <img src={icons.wave_resp} alt="wave" class="wave-resp">
    <div class="landing-logo">
      <img src="{icons.sft_logo_white}" alt="sft">
    </div>
  </div>

</div>

<style>

    .wave-container {
        position: relative;
    }

    .wave {
        width: 100%;
        bottom: 0;
    }

    .wave-resp {
        display: none;
    }

    .landing-footer {
        bottom: 0;
        width: 100%;
        left: 0;
        display: flex;
        flex-direction: column;
        gap: 9vw;
        z-index: 2;
        position: relative;
    }

    .landing-footer .landing-logo {
        position: absolute;
        bottom: 50%;
        left: calc(10px + 2.390625vw);
        padding: 0;
        top: 50%;
        transform: translate(0, -15%);
        width: 4.2vw;
    }

    .learn-more {
        margin-top: 40px;;
        color: #575757;
        text-align: center;
        font-family: 'Mukta Mahee', sans-serif;
        font-size: 2.1vw;
        font-style: normal;
        font-weight: 700;
        line-height: 2.3vw; /* 133.333% */
        display: flex;
        flex-direction: column;
        gap: 4.5vw;
        align-items: center;
        width: 100%;
    }


    .launch-button {
        border-radius: 30px;
        background: #2C2C54;
        color: #FFF;
        font-size: 2.1vw;
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
        z-index: 2;
    }

    @media only screen and (max-width: 430px) {
        .content {
            margin-top: 350px;
        }

        .footer-border {
            display: none;
        }

        .learn-more {
            display: none;
        }

        .wave-resp {
            display: block;
        }

        .wave {
            display: none;
        }

        .landing-footer .landing-logo{
            width: 65px;
            transform: unset;
            top:31%
        }
    }

</style>