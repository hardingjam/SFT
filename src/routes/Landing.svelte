<script>
    import {icons} from '../scripts/assets.js';
</script>

<div class="landing-container">
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
      <button class="launch-button">Launch app</button>
    </div>

    <div class="globe-container">
      <div class="text">

        <div class="title">Create, review, and share tokens backed by real world assets.</div>
        <div class="info">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
            <line x1="16" y1="1" x2="-8.74228e-08" y2="0.999999" stroke="white" stroke-width="2"/>
            <line x1="1" y1="4.37114e-08" x2="0.999999" y2="16" stroke="white" stroke-width="2"/>
          </svg>
          Join our transparent, decentralised, programmatic, Semi Fungible Token system.
        </div>
        <button class="launch-button">Launch app</button>

      </div>
      <div class="globe">
        <img src="{icons.globe}" alt="globe"/>
      </div>
    </div>
  </div>

  <div class="poems">
    <div class="poem-gradient1">

    </div>
    <div class="poem-gradient2">

    </div>

    <div class="large-container">
      <div class="poem-gradient3">

      </div>
      <div class="poem-gradient4">

      </div>
      <div class="poem-gradient5">

      </div>
      <div class="poem-gradient6">

      </div>
      <div class="large">
      </div>

    </div>

  </div>
</div>

<style>
    .landing-container {
        background: #B5DCFF;
        margin-left: auto;
        margin-right: auto;
        overflow: hidden;

    }

    .landing-head {
        background: linear-gradient(176deg, #6F5EA1 57.64%, #B5DCFF 91.27%);
        position: relative;
        z-index: 1;
    }

    .head-gradient {
        position: absolute;
        left: 0;
        top: 0;
        z-index: -1;
    }

    .landing-logo {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        padding-top: 25px;
        padding-left: 100px;
        padding-right: 40px;

    }

    .launch-button {
        border-radius: 30px;
        background: #2C2C54;
        color: #FFFFFF;
        font-family: 'Mukta', sans-serif;
        font-size: 25px;
        font-style: normal;
        font-weight: 700;
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
        padding-left: 170px;
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
        font-family: 'Inter', sans-serif;
        font-size: 30px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        position: relative;
    }

    .text .info svg {
        position: absolute;
        top: -8px;
        left: -16px
    }

    .globe {
        width: 50%;
    }

    .poems {
        width: 100%;
        margin-top: 250px;
        position: relative;
        z-index: 1;
    }

    .poem-gradient1 {
        position: absolute;
        width: calc(100% + 400px);
        height: 1011px;
        border-radius: 2129px;
        background: radial-gradient(50.35% 50.24% at 46.09% 49.91%, #FFF 0%, rgba(245, 245, 245, 0.56) 67.25%, rgba(233, 233, 233, 0.00) 100%);
        top: -250px;
        z-index: -1;
        left: calc(-33% - 200px);
    }

    .poem-gradient2 {
        position: absolute;
        width: calc(100% + 400px);
        height: 1378px;
        border-radius: 1576px;
        background: radial-gradient(50.35% 50.24% at 46.09% 49.91%, #FFF 0%, rgba(245, 245, 245, 0.56) 67.25%, rgba(233, 233, 233, 0.00) 100%);
        top: -250px;
        z-index: -1;
        left: 50%;
    }

    .minis {
        display: flex;
        flex-direction: column;
    }

    .poems .mini {
        color: #575757;
        text-align: center;
        font-family: 'Manrope', sans-serif;
        font-size: 30px;
        font-style: normal;
        font-weight: 700;
        line-height: 40px; /* 133.333% */
    }

    .poems .mini.mini-first {
        width: 360px;

    }

    .poems .mini.mini-second {
        width: 297px;
        align-self: flex-end;
        margin-top: -85px;
    }

    .poems .large {
        display: flex;
        align-items: center;
        flex-direction: column;
        gap: 50px;
        padding-bottom: 120px;
        margin-top: 120px;
        margin-left: auto;
        margin-right: auto;
        width: 523px;
        color: #575757;
        text-align: center;
        font-family: 'Inter', sans-serif;
        font-size: 30px;
        font-style: normal;
        font-weight: 700;
        line-height: 40px; /* 133.333% */
    }

    .poems .cut-out {
        float: right;
        width: 300px;
        color: #707070;
        text-align: center;
        font-family: 'Mukta Mahee', sans-serif;
        font-size: 30px;
        font-style: normal;
        font-weight: 600;
        line-height: 40px; /* 133.333% */
        display: flex;
        flex-direction: column;
        align-items: center;
        position: relative;
        z-index: 1;
        gap: 40px;
    }

    .read-more-button {
        border-radius: 15px;
        background: linear-gradient(180deg, #6F5EA1 33.06%, #B5DCFF 129.84%);
        color: var(--text-secondary, #FFF);
        font-family: 'Mukta Mahee', sans-serif;
        font-size: 30px;
        font-style: normal;
        font-weight: 500;
        line-height: normal;
        padding: 5px 30px
    }

    .large-container {
        position: relative;
        z-index: 1;
        width: calc(100% + 400px);
        margin-left: -200px;
    }

    .poem-gradient3 {
        z-index: -1;
        position: absolute;
        top: 0;
        right: -50px;
        width: 2396px;
        height: 1252px;
        border-radius: 2396px;
        background: radial-gradient(50.35% 50.24% at 46.09% 49.91%, #BFCDFF 0%, rgba(217, 221, 255, 0.92) 53.13%, rgba(233, 233, 233, 0.00) 100%);
    }

    .poem-gradient4 {
        z-index: -2;
        position: absolute;
        top: 0;
        left: 50%;
        width: 1576px;
        height: 1378px;
        border-radius: 1576px;
        background: radial-gradient(50.35% 50.24% at 46.09% 49.91%, #FFF 0%, rgba(245, 245, 245, 0.56) 67.25%, rgba(233, 233, 233, 0.00) 100%);
    }

    .poem-gradient5 {
        z-index: -2;
        position: absolute;
        top: 0;
        left: 50%;
        width: 1576px;
        height: 1378px;
        border-radius: 1576px;
        background: radial-gradient(50.35% 50.24% at 46.09% 49.91%, #FFF 0%, rgba(245, 245, 245, 0.56) 67.25%, rgba(233, 233, 233, 0.00) 100%);
    }

    .poem-gradient6 {
        z-index: -2;
        position: absolute;
        left: -20%;
        width: 1576px;
        height: 1378px;
        border-radius: 1576px;
        background: radial-gradient(50% 50% at 50% 50%, #90D3F9 0%, rgba(144, 211, 249, 0.00) 100%);
    }
</style>