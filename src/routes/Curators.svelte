<script>
    import {icons} from '../scripts/assets.js';
    import LandingNav from '../components/LandingNav.svelte';
    import {Link} from 'yrv';

</script>
<div class="transparency-container">
  <div class="poem-gradient1"></div>
  <div class="poem-gradient2"></div>
  <div class="poem-gradient3"></div>
  <div class="poem-gradient4"></div>
  <div class="poem-gradient7"></div>
  <div class="poem-gradient8"></div>
  <div class="landing-head">
    <div class="landing-logo">
      <Link href="#">
        <img src="{icons.sft_logo_white}" alt="sft">
      </Link>
      <LandingNav/>
    </div>
  </div>
  <div class="content">
    <div class="tube-container">
      <img src="{icons.curator}" alt="globe"/>
    </div>

    <div class="info-card">
      <div class="flex justify-between w-full items-left flex-col gap-16">
        <div class="flex items-center justify-center rounded-full bg-amber-500 mic">
          <svg xmlns="http://www.w3.org/2000/svg" width="43" height="43" viewBox="0 0 43 43" fill="none">
            <path
              d="M25.0851 37.6249H17.9184M27.3784 19.0812L11.8626 28.2724C11.4694 28.5062 11.0017 28.5808 10.5553 28.4809C10.1089 28.3809 9.71768 28.1141 9.46175 27.7349L7.32966 24.5995C7.07776 24.2196 6.98014 23.7579 7.05671 23.3085C7.13327 22.8591 7.37824 22.4558 7.74175 22.1807L22.0751 11.2157L27.3784 19.0812ZM20.7313 9.20907L28.6684 21.0878L20.7313 9.20907ZM34.6705 8.54616C33.6079 6.97169 31.9636 5.88348 30.0991 5.52066C28.2346 5.15783 26.3022 5.55006 24.7267 6.61116C23.277 7.62937 22.2557 9.14847 21.8601 10.8753L27.7367 19.6007C29.5063 19.877 31.3152 19.4807 32.8072 18.4899C33.5892 17.9637 34.2598 17.2883 34.7805 16.5025C35.3012 15.7167 35.6617 14.8359 35.8414 13.9105C36.0212 12.9852 36.0166 12.0335 35.828 11.1099C35.6393 10.1863 35.2704 9.309 34.7422 8.52824L34.6705 8.54616ZM21.5017 23.2916V37.6249V23.2916Z"
              stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <div class="header-text">Curators</div>
      </div>
      <div class="title-text">
        Curators: Connecting Investors and Auditors
      </div>

      <div class="paragraph">
        Curators act as guides for investors. They help navigate the numerous new tokens that have been minted,
        distinguishing between legitimate ones and potential scams or low-quality projects.
      </div>
      <div class="title-text">
        Similar to Playlist Makers
      </div>
      <div class="paragraph">
        Think of curators like those who create playlists. They compile lists of tokens, covering different categories
        like short-term options or those related to real estate. The main goal is to provide investors with a curated
        selection of tokens that show promise.
      </div>
      <div class="title-text">
        Challenges for Investors: Accountability Issues
      </div>
      <div class="paragraph">
        Some issuers face challenges, like curators taking money to talk about specific tokens without being upfront
        about it. This lack of honesty has led to issues. To address this, on-chain curators have been introduced. These
        curators need to make transparent and unchangeable records of their actions.
      </div>
      <div class="title-text">
        Transparency in Action
      </div>
      <div class="paragraph">
        On-chain curators use blockchain technology to be transparent. By making records on the blockchain, curators
        create a permanent and unalterable record. This helps investors assess a curator's past performance and decide
        if they can be trusted.
      </div>
      <div class="title-text">
        Reliable Guides
      </div>
      <div class="paragraph">
        Unlike traditional gatekeepers who set rules, the crypto curator system is open and clear. It prevents a single
        group from having too much power. It's like having various guides to help you, similar to how email systems use
        filters to block spam. You can pick the guides you like and trust. They help investors by being honest and
        transparent, creating lists of tokens that show real potential. It's a decentralized system that gives investors
        more choices and helps prevent scams.
      </div>
      <div class="info-card-border"></div>

    </div>
    <div class="learn-more">
      Learn more about how to use the SFT <br>application:
      <div class="launch-button">Launch app</div>
    </div>
  </div>
  <div class="landing-footer">
    <img src={icons.wave} alt="wave" class="wave">
    <div class="landing-logo">
      <img src="{icons.sft_logo_white}" alt="sft">
    </div>
  </div>
</div>

<style>
    .transparency-container {
        background: #CFD1F3;
        margin-left: auto;
        margin-right: auto;
        position: relative;
        min-height: 3000px;
        overflow: hidden;
    }

    .landing-head {
        background: linear-gradient(176deg, #6F5EA1 57.64%, #B5DCFF 91.27%);
    }

    .landing-logo {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        padding-top: 25px;
        padding-left: 100px;
        padding-right: 48px;
        position: absolute;
        z-index: 3;
    }

    .landing-logo img {
        width: 65px;
        height: 65px;
    }

    .title-text {
        background: linear-gradient(272deg, #5F9AD1 -14.26%, #8B5BB0 102.07%);
        background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        font-family: 'Inter', sans-serif;
        font-size: 35px;
        font-style: normal;
        font-weight: 700;
        line-height: 55px; /* 157.143% */
        margin-bottom: 40px;
    }

    .header-text {
        font-family: 'Inter', sans-serif;
        font-size: 45px;
        font-style: normal;
        font-weight: 700;
        line-height: 55px; /* 122.222% */
        background: linear-gradient(272deg, #5F9AD1 74.74%, #8B5BB0 98.07%);
        background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }

    .info-card {
        position: absolute;
        top: 395px;
        padding: 0 289px 0 122px;
        z-index: 4;
        text-align: left;
    }

    .info-card-border {
        margin-top: 270px;
        background: linear-gradient(90deg, #674AA5 8.61%, #59C3FF 100%);
        height: 6px;
        width: calc(100% + 411px);
        margin-left: -122px;
    }

    .paragraph {
        margin-bottom: 40px;
        color: #575757;
        font-family: 'Manrope', sans-serif;
        font-size: 20px;
        font-style: normal;
        font-weight: 600;
        line-height: 40px;
    }

    .poem-gradient1 {
        position: absolute;
        width: 2129px;
        height: 1011px;
        border-radius: 2129px;
        background: radial-gradient(50.35% 50.24% at 46.09% 49.91%, #FFF 0%, rgba(245, 245, 245, 0.56) 67.25%, rgba(233, 233, 233, 0.00) 100%);
        top: 635px;
        z-index: 1;
        right: 0;
    }

    .poem-gradient2 {
        position: absolute;
        width: 1576px;
        height: 714px;
        border-radius: 1576px;
        background: radial-gradient(50.35% 50.24% at 46.09% 49.91%, #F2F4F6 0%, rgba(242, 244, 246, 0.56) 67.25%, rgba(233, 233, 233, 0.00) 100%);
        top: 787px;
        left: 40%;
    }

    .poem-gradient3 {
        z-index: 2;
        position: absolute;
        top: 990px;
        right: 5%;
        width: 1769px;
        height: 1547px;
        border-radius: 1576px;
        background: radial-gradient(50.35% 50.24% at 46.09% 49.91%, #F2F4F6 0%, rgba(242, 244, 246, 0.56) 67.25%, rgba(233, 233, 233, 0.00) 100%);
    }

    .poem-gradient4 {
        z-index: 1;
        position: absolute;
        right: -5%;
        top: 1455px;
        width: 2396px;
        height: 1252px;
        border-radius: 2396px;
        background: radial-gradient(50.35% 50.24% at 46.09% 49.91%, #BFCDFF 0%, rgba(217, 221, 255, 0.92) 53.13%, rgba(233, 233, 233, 0.00) 100%);
    }

    .poem-gradient7 {
        z-index: 0;
        position: absolute;
        top: 2194px;
        left: -25%;
        width: 1576px;
        height: 1378px;
        border-radius: 1576px;
        background: radial-gradient(50.35% 50.24% at 46.09% 49.91%, #FFF 0%, rgba(245, 245, 245, 0.56) 67.25%, rgba(233, 233, 233, 0.00) 100%);
    }

    .poem-gradient8 {
        z-index: 0;
        position: absolute;
        top: 1800px;
        left: 60%;
        width: 1576px;
        height: 1378px;
        border-radius: 1576px;
        background: radial-gradient(50% 50% at 50% 50%, #90D3F9 0%, rgba(144, 211, 249, 0.00) 100%);
    }

    .wave {
        width: 100%;
        bottom: 0;
    }

    .landing-footer {
        bottom: 0;
        position: absolute;
        width: 100%;
        left: 0;
    }

    .landing-footer .landing-logo {
        position: absolute;
        bottom: 67px;
        left: 50px;
        padding: 0;
        width: calc(100% - 50px);
    }

    .learn-more {
        margin-top: 97px;
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
        position: absolute;
        z-index: 2;
        bottom: 400px;
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

    .investor-img {
        width: 197px;
        height: 252px;
    }

    .mic {
        width: 65px;
        height: 65px;
        background: #655DB4;
    }

    .items-left {
        margin-bottom: 99px;
    }
</style>