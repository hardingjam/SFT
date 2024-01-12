<script>
    import {icons} from '../scripts/assets.js';
    import {landing} from '../scripts/store.js';
    import {navigate} from '../scripts/helpers.js';
    function launchApp() {
        landing.set(false)
        navigate("#list")
    }
</script>
<div class="landing-footer">
  <div class="footer-border"></div>
  <div class="learn-more">
    Learn more about how to use the SFT <br>application:
    <div class="launch-button" id="launch-button-1" on:click="{()=>launchApp()}">Launch app</div>
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
        width: 100%;
        height: calc(100% - 3.4vw);
        left: calc(10px + 2.390625vw);
        padding: 0;
        bottom: 0;
    }

    .landing-footer .landing-logo img {
        position: absolute;
        top: 50%;
        transform: translate(0, -50%);
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
        cursor: pointer;
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
    }

</style>