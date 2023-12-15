<script>
    import {icons} from '../scripts/assets.js';
    import LandingNav from '../components/LandingNav.svelte';
    import {landing} from '../scripts/store.js';
    import {navigate} from '../scripts/helpers.js';
    import {Link} from 'yrv';

    function launchApp() {
        landing.set(false)
        navigate("#list")
    }
</script>

<div class="landing-container">
  <div class="poem-gradient1"></div>
  <div class="poem-gradient2"></div>
  <div class="poem-gradient3"></div>
  <div class="poem-gradient4"></div>
  <div class="poem-gradient6"></div>
  <div class="poem-gradient7"></div>
  <div class="landing-head">
    <svg xmlns="http://www.w3.org/2000/svg" width="1440" height="1016" viewBox="0 0 1440 1016" fill="none"
         class="head-gradient">
      <path
        d="M2371 172C2371 638.128 1581.01 1016 606.5 1016C-368.006 1016 -1158 638.128 -1158 172C-1158 -294.128 -368.006 -672 606.5 -672C1581.01 -672 2371 -294.128 2371 172Z"
        fill="url(#paint0_radial_6596_11952)"/>
      <defs>
        <radialGradient id="paint0_radial_6596_11952" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse"
                        gradientTransform="translate(224.085 121.721) rotate(-158.213) scale(915.355 591.723)">
          <stop stop-color="#72A4F0"/>
          <stop offset="0.535632" stop-color="#5C75B9" stop-opacity="0.606986"/>
          <stop offset="1" stop-color="#3A2B63" stop-opacity="0"/>
        </radialGradient>
      </defs>
    </svg>
    <div class="landing-logo">
      <img src="{icons.sft_logo_white}" alt="sft">
      <LandingNav/>
    </div>

    <div class="globe-container">
      <div class="text">

        <div class="title">Create, review, and share tokens backed by real world assets.</div>
        <div class="info">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
            <line x1="16" y1="1" x2="-8.74228e-08" y2="0.999999" stroke="white" stroke-width="2"/>
            <line x1="1" y1="4.37114e-08" x2="0.999999" y2="16" stroke="white" stroke-width="2"/>
          </svg>
          Join our transparent, decentralised, programmatic, <span>Semi Fungible Token</span> system.
        </div>
        <button class="launch-button" id="launch-button-1" on:click="{()=>launchApp()}">Launch app</button>

      </div>
      <div class="globe">
        <img src="{icons.globe}" alt="globe"/>
      </div>
    </div>
  </div>

  <div class="poems">


    <div class="groups">
      <div class="group-item">
        <div class="color-4 group-icon group-icon-left"> <img src="{icons.investor_icon}" alt="investor" /></div>
        <div class="w-full h-inherit overflow-hidden"><img src="{icons.investor_hero}" alt="investor" class="group-hero investors-hero"/></div>
        <div class="group-text flex flex-col justify-between">
          <div class="group-title">Investors</div>
          <div class="group-info">
            Buy/ trade/ hold tokens based on individual research & info from curators.
            <div class="mt-7"></div>
            Organic liquidity for high quality
            tokens is built.
          </div>
          <Link href="#investors" class="items-center flex w-full justify-center">
            <div class="launch-button investors-read-more ">Read more</div>
          </Link>
        </div>

      </div>
      <!--      <div class="group-item">-->
      <!--        <img src="{icons.investor_icon}" alt="investor" class="group-img"/>-->
      <!--        <div class="group-text">-->
      <!--          <div class="group-title">Curators</div>-->
      <!--          <div class="group-info">Research reputable tokens and issuers to help investors make decisions.-->
      <!--            <div class="mt-7"></div>-->
      <!--            Every recommendation is recorded permanently onchain so that investors can assess the quality of each-->
      <!--            curator.-->
      <!--          </div>-->
      <!--        </div>-->
      <!--        <Link href="#investors">-->
      <!--          <div class="launch-button investors-read-more">Read more</div>-->
      <!--        </Link>-->
      <!--      </div>-->
      <!--      <div class="group-item">-->
      <!--        <img src="{icons.investor_icon}" alt="investor" class="group-img"/>-->
      <!--        <div class="group-text">-->
      <!--          <div class="group-title">Issuers</div>-->
      <!--          <div class="group-info">Mint (create) the tokens.-->
      <!--            <div class="mt-7"></div>-->

      <!--            Real world assets associated with each token.-->
      <!--            <div class="mt-7"></div>-->
      <!--            Issuance is permissionless; it is up to each issuer to prove the-->
      <!--            quality of their offering.-->
      <!--          </div>-->

      <!--        </div>-->
      <!--        <Link href="#investors">-->
      <!--          <div class="launch-button investors-read-more">Read more</div>-->
      <!--        </Link>-->
      <!--      </div>-->
      <!--      <div class="group-item">-->
      <!--        <img src="{icons.investor_icon}" alt="investor" class="flip-horizontal"/>-->
      <!--        <div class="group-text">-->
      <!--          <div class="group-title">Auditors</div>-->
      <!--          <div class="group-info">Auditors check that all onchain data matches offchain reality.-->
      <!--            <div class="mt-7"></div>-->
      <!--            Appointed by the issuer,-->
      <!--            high quality audits improve investor confidence to increase token liquidity.-->
      <!--            <div class="mt-7"></div>-->
      <!--            If an audit fails, the token-->
      <!--            freezes (transfers are paused) until the problem is fixed.-->
      <!--          </div>-->
      <!--        </div>-->
      <!--        <Link href="#investors">-->
      <!--          <div class="launch-button investors-read-more">Read more</div>-->
      <!--        </Link>-->
      <!--      </div>-->
    </div>


    <div class="transparency">
      <div class="left">
        100% <span>transparency</span>
        <br>
        - facts checked by auditors
        <br>(eg KPMG, Deloitte)

      </div>
      <div class="right">
        <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 44 44" fill="none" class="eye">
          <path
            d="M28.5642 22.0001C28.5642 25.6301 25.6308 28.5634 22.0008 28.5634C18.3708 28.5634 15.4375 25.6301 15.4375 22.0001C15.4375 18.3701 18.3708 15.4368 22.0008 15.4368C25.6308 15.4368 28.5642 18.3701 28.5642 22.0001Z"
            stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
          <path
            d="M22.0017 37.1617C28.4733 37.1617 34.505 33.3484 38.7033 26.7484C40.3533 24.1634 40.3533 19.8184 38.7033 17.2334C34.505 10.6334 28.4733 6.82007 22.0017 6.82007C15.53 6.82007 9.49833 10.6334 5.3 17.2334C3.65 19.8184 3.65 24.1634 5.3 26.7484C9.49833 33.3484 15.53 37.1617 22.0017 37.1617Z"
            stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <a href="https://gildlab.document360.io/docs/sft-transparency" target="_blank">
          <button class="launch-button read-more">Read more</button>
        </a>
      </div>


    </div>

    <div class="setting-up">
      <label>Setting up a new token as easy as:</label>
    </div>

    <div class="groups-line"></div>
    <div class="setting-up-flow">
      <div class="flow">
        <div class="icon color-1">1</div>
        <div class="flow-text">
          <svg xmlns="http://www.w3.org/2000/svg" width="37" height="38" viewBox="0 0 37 38" fill="none">
            <path
              d="M19.7812 24.6559H25.55M25.55 24.6559H31.1641M25.55 24.6559L25.5616 18.907M25.55 24.6559L25.5835 30.326"
              stroke="#575757" stroke-width="3.7" stroke-linecap="round" stroke-linejoin="round"/>
            <path
              d="M31.6257 19.2665C31.6257 18.139 31.4828 17.045 31.2159 16.0007C29.7617 10.3326 24.6157 6.13916 18.4984 6.13916C11.2536 6.13916 5.37109 12.0217 5.37109 19.2665C5.37109 26.5113 11.2536 32.3938 18.4984 32.3938C19.2919 32.3938 20.0679 32.3238 20.8219 32.1881"
              stroke="#575757" stroke-width="3.7" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <span>Setup new SFT</span>
        </div>
      </div>
      <div class="flow">
        <div class="icon color-2">2</div>
        <div class="flow-text">
          <svg xmlns="http://www.w3.org/2000/svg" width="37" height="38" viewBox="0 0 37 38" fill="none">
            <path
              d="M6.16797 31.2161V29.6745C6.16797 25.4173 9.61911 21.9661 13.8763 21.9661H19.6576M27.0352 21.9114V27.362M27.0352 27.362V32.8126M27.0352 27.362H32.4858M27.0352 27.362H21.5846M23.1263 11.1745C23.1263 14.5802 20.3654 17.3411 16.9596 17.3411C13.5539 17.3411 10.793 14.5802 10.793 11.1745C10.793 7.76872 13.5539 5.00781 16.9596 5.00781C20.3654 5.00781 23.1263 7.76872 23.1263 11.1745Z"
              stroke="#575757" stroke-width="3.7" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <span>SFT roles</span>
        </div>
      </div>
      <div class="flow">
        <div class="icon color-3">3</div>
        <div class="flow-text">
          <svg xmlns="http://www.w3.org/2000/svg" width="34" height="22" viewBox="0 0 34 22" fill="none">
            <path
              d="M17.0013 19.3333L17.0013 10.9999M17.0013 2.66658L17.0013 10.9999M17.0013 10.9999L2.33464 10.9999M17.0013 10.9999L31.668 10.9999M2.33464 10.9999L6.91798 16.2083M2.33464 10.9999L6.91797 5.79159M31.668 10.9999L27.0846 5.79158M31.668 10.9999L27.0846 16.2083"
              stroke="#575757" stroke-width="3.7" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <span>Mint/Redeem</span>
        </div>
      </div>
    </div>
    <button class="launch-button bottom" id="launch-button-2" on:click={()=>launchApp()}>Launch app</button>

  </div>
  <div class="landing-footer">
    <!--    <div class="bottom-gradient"></div>-->
    <img src={icons.wave} alt="wave" class="wave">
    <div class="landing-logo">
      <img src="{icons.sft_logo_white}" alt="sft">
    </div>
  </div>
</div>

<style>
    .landing-container {
        background: #B5DCFF;
        margin-left: auto;
        margin-right: auto;
        padding-bottom: 500px;
        overflow: hidden;
        position: relative;
    }

    .landing-head {
        background: linear-gradient(178deg, #6F5EA1 57.64%, #B5DCFF 91.27%);
        position: relative;
        z-index: 1;
        overflow: hidden;
    }

    .head-gradient {
        position: absolute;
        left: 0;
        top: 0;
        z-index: -1;
        height: 850px;
        flex-shrink: 0;
    }

    .landing-logo {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        padding-top: 25px;
        padding-left: 122px;
        padding-right: 48px;

    }

    .launch-button {
        border-radius: 30px;
        background: #2C2C54;
        color: #FFFFFF;
        font-family: 'Mukta', sans-serif;
        font-size: 25px;
        font-style: normal;
        font-weight: 600;
        line-height: normal;
        padding: 5px 40px;
        width: fit-content;
    }

    .globe-container {
        display: flex;
        width: 100%;
        justify-content: space-between;
        align-items: flex-start;
    }

    .text {
        width: 50%;
        display: flex;
        flex-direction: column;
        gap: 25px;
        padding-left: 120px;
        align-items: flex-start;
        text-align: left;
        padding-top: 100px;
    }

    .text .title {
        color: #FFF;
        font-family: 'Inter', sans-serif;
        font-size: 45px;
        font-style: normal;
        font-weight: 700;
        line-height: normal;
    }

    .text .info {
        color: #FFF;
        font-family: 'Manrope', sans-serif;
        font-size: 25px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        position: relative;
        margin-top: 20px;
    }

    .text .info svg {
        position: absolute;
        top: -13px;
        left: -41px
    }

    .text .info span {
        color: #FFF;
        font-family: 'Manrope', sans-serif;
        font-size: 25px;
        font-style: normal;
        font-weight: 700;
        line-height: normal;
    }

    .globe {
        width: 608px;
        height: 608px;
        margin-right: 48px;

    }

    .globe img {
        width: 100%;
        height: 100%;
    }

    .poems {
        width: 100%;
        margin-top: 200px;
        position: relative;
        z-index: 1;
    }

    .groups-line {
        margin-top: 120px;
        width: 100%;
        height: 6px;
        background: linear-gradient(90deg, #674AA5 8.61%, #59C3FF 100%);
    }

    .groups {
        display: flex;
        flex-direction: column;
        gap: 87px;
        width: 100%;
        align-items: center;
    }

    .group-item {
        position: relative;
        width: calc(100% - 240px);
        align-items: center;
        justify-content: center;
        display: flex;
        background: #FFFFFF;
        flex-direction: column;
        height: 633px;
        padding: 70px 0;
        border-radius: 20px;
        box-shadow: 0.2px 0.6px 0.7px hsl(222deg 36% 61% / 0.22),
        0.9px 2.5px 3px -0.3px hsl(222deg 36% 61% / 0.22),
        1.5px 4.4px 5.2px -0.6px hsl(222deg 36% 61% / 0.22),
        2.2px 6.6px 7.8px -0.8px hsl(222deg 36% 61% / 0.22),
        3.3px 9.6px 11.4px -1.1px hsl(222deg 36% 61% / 0.22),
        4.7px 13.7px 16.3px -1.4px hsl(222deg 36% 61% / 0.22),
        6.7px 19.5px 23.2px -1.7px hsl(222deg 36% 61% / 0.22),
        9.3px 27.2px 32.3px -1.9px hsl(222deg 36% 61% / 0.22),
        12.8px 37.3px 44.4px -2.2px hsl(222deg 36% 61% / 0.22),
        17.2px 50.3px 59.8px -2.5px hsl(222deg 36% 61% / 0.22);

    }

    .group-text {
        position: absolute;
        background: #FFFFFF;
        height: 100%;
        left: 0;
        padding: 70px 130px 122px 130px;
        max-width: 50%;
        border-radius: 20px;
    }

    .group-icon {
        position: absolute;
        top: 45px;
        padding: 14px;
        transform: translate(-50%, -50%);
        border-radius: 50%;
        z-index: 1;
        width: 123px;
        height: 123px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .group-icon img{
        width: 81px;
    }

    .group-hero {
        width: 100%;
        border-radius: 20px;
    }

    .investors-hero {
        -webkit-transform: scaleX(-1);
        transform: scaleX(-1);
    }

    .group-icon-left {
        left: 50px
    }

    .group-icon-right {

    }

    .color-4{
        background: #674AA5;
        filter: drop-shadow(0px 7px 8px #B4B3DB);
    }

    .color-1 {
        background: #655DB4;
    }

    .color-2 {
        background: #6180CD;
    }

    .color-3 {
        background: #5E97DF;
    }

    .group-title {
        font-family: 'Inter', sans-serif;
        font-size: 45px;
        font-style: normal;
        font-weight: 700;
        line-height: 40px; /* 88.889% */
        background: linear-gradient(272deg, #5F9AD1 -14.26%, #8B5BB0 102.07%);
        background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }

    .group-info {
        color: #575757;
        font-family: 'Manrope', sans-serif;
        font-size: 20px;
        font-style: normal;
        font-weight: 400;
        line-height: 40px;
    }

    .transparency {
        display: flex;
        border-radius: 0 10px 10px 0;
        background: #705FA2;
        padding: 40px 41px 40px 60px;
        width: calc(50% - 20px);
        color: #FFF;
        font-family: 'Manrope', sans-serif;
        font-size: 25px;
        font-style: normal;
        font-weight: 700;
        margin-bottom: 224px;
        line-height: 40px; /* 160% */
        justify-content: space-between;
    }

    .transparency .right {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 45px
    }

    .transparency .left {
        text-align: left;
    }

    .transparency span {
        color: #88E2FF;
    }

    .setting-up {
        color: #575757;
        text-align: center;
        font-family: 'Mukta Mahee', sans-serif;
        font-size: 30px;
        font-style: normal;
        font-weight: 700;
        line-height: 40px; /* 133.333% */
    }

    .setting-up-flow {
        display: flex;
        justify-content: center;
        width: 100%;
        gap: 200px;
        margin-bottom: 50px;
    }

    .flow {
        position: relative;
    }

    .flow-text {
        align-items: center;
        display: flex;
        gap: 21px;
        margin-top: 50px;
        color: #575757;
        text-align: center;
        font-family: 'Mukta', sans-serif;
        font-size: 30px;
        font-style: normal;
        font-weight: 700;
        line-height: 40px; /* 133.333% */
    }

    .flow .icon {
        top: calc(-50% + 6px);
        left: 50%;
        position: absolute;
        border-radius: 50%;
        color: #FFF;
        text-align: center;
        font-family: 'Arial', sans-serif;
        font-size: 37px;
        font-style: normal;
        font-weight: 700;
        line-height: normal;
        transform: translate(-50%, 12px);
        width: 55px;
        height: 55px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .poem-gradient1 {
        position: absolute;
        width: calc(100% + 400px);
        height: 1011px;
        border-radius: 2129px;
        background: radial-gradient(50.35% 50.24% at 46.09% 49.91%, #FFF 0%, rgba(245, 245, 245, 0.56) 67.25%, rgba(233, 233, 233, 0.00) 100%);
        top: 699px;
        z-index: 1;
        left: calc(-33% - 200px);
    }

    .poem-gradient2 {
        position: absolute;
        width: calc(100% + 400px);
        height: 1378px;
        border-radius: 1576px;
        background: radial-gradient(50.35% 50.24% at 46.09% 49.91%, #FFF 0%, rgba(245, 245, 245, 0.56) 67.25%, rgba(233, 233, 233, 0.00) 100%);
        top: 699px;
        left: 35%;
    }

    .poem-gradient3 {
        z-index: 1;
        position: absolute;
        top: 1507px;
        right: 15%;
        width: 2396px;
        height: 1252px;
        border-radius: 2396px;
        background: radial-gradient(50.35% 50.24% at 46.09% 49.91%, #BFCDFF 0%, rgba(217, 221, 255, 0.92) 53.13%, rgba(233, 233, 233, 0.00) 100%);
    }

    .poem-gradient4 {
        z-index: 0;
        position: absolute;
        top: 1570px;
        right: 15%;
        width: 1576px;
        height: 1378px;
        border-radius: 1576px;
        background: radial-gradient(50.35% 50.24% at 46.09% 49.91%, #FFF 0%, rgba(245, 245, 245, 0.56) 67.25%, rgba(233, 233, 233, 0.00) 100%);
    }

    .poem-gradient6 {
        position: absolute;
        top: 1600px;
        left: 50%;
        width: 1576px;
        height: 1378px;
        border-radius: 1576px;
        background: radial-gradient(50.35% 50.24% at 46.09% 49.91%, #FFF 0%, rgba(245, 245, 245, 0.56) 67.25%, rgba(233, 233, 233, 0.00) 100%);
    }

    .poem-gradient7 {
        z-index: 1;
        position: absolute;
        top: 1009px;
        left: -30%;
        width: 1769px;
        height: 1547px;
        border-radius: 1769px;
        background: radial-gradient(50.35% 50.24% at 46.09% 49.91%, #FFF 0%, rgba(245, 245, 245, 0.56) 77.71%, rgba(233, 233, 233, 0.00) 100%);
    }

    .wave {
        width: 100%;
        position: absolute;
        bottom: 0;
    }

    .landing-footer .landing-logo {
        position: absolute;
        bottom: 67px;
        left: 50px;
        padding: 0;
    }

    .launch-button.bottom {
        padding: 10px 45px;
    }

    .flip-horizontal {
        -webkit-transform: scaleX(-1);
        transform: scaleX(-1);
    }
</style>