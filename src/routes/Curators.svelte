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
  <div class="poem-gradient6"></div>
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
      <div class="paragraph">Some investors are inclined towards a long-term strategy, preferring to buy and hold assets
        for extended periods, others may adopt a more active approach, engaging in daily trading to capitalise on
        short-term market movements. Regardless of the strategy, every investor needs access to critical information to
        make informed decisions.
      </div>
      <div class="title-text">There’s more data available to discern your investments</div>

      <div class="paragraph">
        One crucial aspect is understanding the resiliency of the token they are investing in. For instance, stablecoins
        like Tether, with a significant circulation, have raised questions about the transparency of their backing. It's
        important for investors to know what supports the value of a token and the measures in place to prevent
        fraudulent activities.
      </div>
      <div class="title-text">Short-Term vs. Long-Term Considerations</div>

      <div class="paragraph">
        Whether you're a short-term trader or a long-term investor, understanding the underlying technology and
        governance of a token is crucial. Short-term traders focus on day-to-day market movements, identifying
        opportunities to buy and sell for profit. On the other hand, long-term investors seek tokens with resilience and
        longevity, emphasising factors like the token's collateralisation and the credibility of the issuing entity.
      </div>

      <div class="title-text">The Challenge of Information in the Crypto Space</div>

      <div class="paragraph">
        One challenge investors face in the crypto space is the lack of standardised information. Unlike traditional
        investments, where companies disclose detailed financial reports, cryptocurrency investments often lack
        transparency. Basic information about a token, such as its purpose, the creator behind it, and the potential
        risks, may not be readily available; SFT provides these.
      </div>

      <div class="title-text">The Role of Transparency in Crypto Investments</div>

      <div class="paragraph">
        To address the information gap, transparency becomes a cornerstone for healthy crypto investments. Unlike
        traditional financial systems, cryptocurrencies operate on decentralised and trustless networks. This
        decentralisation, while a key strength, can also pose challenges when it comes to verifying information.
        Investors need to be able to trust that the information they receive is accurate, unaltered, and comes from a
        reliable source.
      </div>

      <div class="title-text">The Two-Token System: A solution for Transparency</div>

      <div class="paragraph">
        One innovative solution to enhance transparency is the implementation of a two-token system. This system allows
        one token to represent the minting and burning process, providing a cryptographic trail of relevant information.
        This approach ensures that critical details about the token's creation and destruction are securely recorded on
        the blockchain, reducing the risk of manipulation or fraud.
      </div>


      <div class="paragraph">
        To empower investors, the crypto community must prioritise transparency, providing accessible and accurate
        information. Whether you're a long-term holder or a day trader, having the right information at your fingertips
        allows you to make informed decisions, contributing to the overall health and growth of the crypto market. As an
        investor, understanding the assets you hold is key, and the more information you have, the better equipped you
        are to navigate the dynamic landscape.
      </div>


      <div class="info-card-border"></div>
      <div class="learn-more">
        Learn more about how to use the SFT <br>application:
        <div class="launch-button">Launch app</div>
      </div>
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
        min-height: 3400px;
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
        background: linear-gradient(272deg, #5F9AD1 -14.26%, #8B5BB0 102.07%);
        background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }

    .info-card {
        position: absolute;
        top: 460px;
        padding: 0 122px;
        z-index: 4;
        text-align: left;
    }

    .info-card-border {
        margin-top: 270px;

        background: linear-gradient(90deg, #674AA5 8.61%, #59C3FF 100%);
        height: 6px;
        width: calc(100% + 244px);
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

    .poem-gradient6 {
        z-index: 1;
        position: absolute;
        top: 1600px;
        left: 5%;
        width: 1576px;
        height: 1378px;
        border-radius: 1576px;
        background: radial-gradient(50.35% 50.24% at 46.09% 49.91%, #FFF 0%, rgba(245, 245, 245, 0.56) 67.25%, rgba(233, 233, 233, 0.00) 100%);
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