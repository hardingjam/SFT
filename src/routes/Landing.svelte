<script>
    import {icons} from '../scripts/assets.js';
    import LandingNav from '../components/LandingNav.svelte';
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
        <button class="launch-button" on:click="{()=>launchApp()}">Launch app</button>

      </div>
      <div class="globe">
        <img src="{icons.globe}" alt="globe"/>
      </div>
    </div>
  </div>

  <div class="poems">

    <div class="poems-header">
      SFT is an ecosystem of 4 groups:
    </div>
    <div class="groups-line"></div>

    <div class="groups">
      <div class="group">
        <div class="investor"><img src="{icons.investor}" alt="investor"/></div>
        <div class="group-title">Investors</div>
        <div class="group-info">
          Buy/ trade/ hold tokens based on individual research & info from curators.
          <div class="mt-7"></div>
          Organic liquidity for high quality
          tokens is built.
        </div>
      </div>
      <div class="group">
        <div class="icon color-1"><img src="{icons.microphone}" alt="investor"/></div>

        <div class="group-title">Curators</div>
        <div class="group-info">Research reputable tokens and issuers to help investors make decisions.
          <div class="mt-7"></div>
          Every recommendation is recorded permanently onchain so that investors can assess the quality of each curator.
        </div>
      </div>
      <div class="group">
        <div class="icon color-2"><img src="{icons.sft_create}" alt="investor"/></div>

        <div class="group-title">Issuers</div>
        <div class="group-info">Mint (create) the tokens.
          <div class="mt-7"></div>

          Real world assets associated with each token.
          <div class="mt-7"></div>
          Issuance is permissionless; it is up to each issuer to prove the
          quality of their offering.
        </div>
      </div>
      <div class="group">
        <div class="icon color-3"><img src="{icons.lock}" alt="investor" class="lock"/></div>

        <div class="group-title">Auditors</div>
        <div class="group-info">Auditors check that all onchain data matches offchain reality.
          <div class="mt-7"></div>
          Appointed by the issuer,
          high quality audits improve investor confidence to increase token liquidity.
          <div class="mt-7"></div>
          If an audit fails, the token
          freezes (transfers are paused) until the problem is fixed.
        </div>
      </div>
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
          <svg xmlns="http://www.w3.org/2000/svg" width="44" height="51" viewBox="0 0 44 51" fill="none">
            <path
              d="M22.0013 33.7161L22.0013 25.3827M22.0013 17.0494L22.0013 25.3827M22.0013 25.3827L7.33464 25.3827M22.0013 25.3827L36.668 25.3827M7.33464 25.3827L11.918 30.5911M7.33464 25.3827L11.918 20.1744M36.668 25.3827L32.0846 20.1744M36.668 25.3827L32.0846 30.5911"
              stroke="#575757" stroke-width="3.7" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <span>Mint/Redeem</span>
        </div>
      </div>
    </div>
    <button class="launch-button bottom" on:click={()=>launchApp()}>Launch app</button>

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
        background: linear-gradient(176deg, #6F5EA1 57.64%, #B5DCFF 91.27%);
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
        padding-left: 100px;
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
    }

    .text .info svg {
        position: absolute;
        top: -8px;
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
        align-items: stretch;
        justify-content: center;
        gap: 41px;
        margin-left: 60px;
        margin-right: 60px;
        margin-bottom: 165px;
    }

    .group {
        position: relative;
        padding: 77px 25px;
        width: 25%;
        border-radius: 0 0 10px 10px;
        background: #FFF;
        /* For low elevation */
        /*box-shadow:*/
        /*        0.3px 0.5px 0.7px hsla(244, 28%, 63%, 0.32),*/
        /*        1px 1.9px 2.7px -1.6px hsla(244, 28%, 63%, 0.48);*/
        /* --shadow-elevation-low */

        /* For medium elevation */
        box-shadow: 0.3px 0.5px 0.7px hsla(244, 28%, 63%, 0.3),
        1.4px 2.8px 3.9px -0.8px hsla(244, 28%, 63%, 0.4),
        4.9px 9.7px 13.6px -1.6px hsla(244, 28%, 63%, 0.5);
        /* --shadow-elevation-medium */

        /* For high elevation */
        /* box-shadow:
          0.3px 0.5px 0.7px hsla(244, 28%, 63%, 0.33),
          2.8px 5.6px 7.8px -0.4px hsla(244, 28%, 63%, 0.4),
          6.1px 12.2px 17.1px -0.8px hsla(244, 28%, 63%, 0.47),
          12.2px 24.5px 34.3px -1.2px hsla(244, 28%, 63%, 0.54),
          23.5px 47px 65.8px -1.6px hsla(244, 28%, 63%, 0.61); */
        /* --shadow-elevation-high */
    }

    .group .investor {
        position: absolute;
        top: -10px;
        left: 50%;
        transform: translate(-50%, -50%);
        border-radius: 50%;
    }

    .group .icon {
        padding: 14px;
        position: absolute;
        top: 0;
        left: 50%;
        transform: translate(-50%, -50%);
        border-radius: 50%;
    }

    .group .icon img {
        width: 55px;
        height: 55px;
    }

    .group .icon img.lock {
        scale: 0.75;
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
        color: #575757;
        text-align: center;
        font-family: 'Manrope', sans-serif;
        font-size: 25px;
        font-style: normal;
        font-weight: 700;
        line-height: 40px; /* 160% */
    }

    .group-info {
        color: #575757;
        font-family: 'Manrope', sans-serif;
        font-size: 20px;
        font-style: normal;
        font-weight: 400;
        line-height: 40px;
    }

    .poems-header {
        margin-left: 100px;
        text-align: center;
        font-family: 'Manrope', sans-serif;
        font-size: 45px;
        font-style: normal;
        font-weight: 700;
        line-height: 40px; /* 88.889% */
        background: linear-gradient(272deg, #5F9AD1 -14.26%, #8B5BB0 102.07%);
        background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        width: 516px;
        height: 117px;
        flex-shrink: 0;
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
        display: flex;
        gap: 7px;
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
</style>