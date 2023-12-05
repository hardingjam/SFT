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
  <div class="poem-gradient9  "></div>
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
      <img src="{icons.issuers}" alt="globe"/>
    </div>

    <div class="info-card">
      <div class="flex justify-between w-full items-left flex-col gap-16">
        <div class="flex items-center justify-center rounded-full bg-amber-500 mic">
          <img src="{icons.sft_create}" alt="issuer" class="issuer-plus-icon"/>
        </div>
        <div class="header-text">Issuers</div>
      </div>
      <div class="paragraph">An issuer is someone looking to create a token, a digital representation of value. This
        involves two key aspects: the technology for token creation (minting) and ensuring liquidity for trading.
      </div>
      <div class="title-text">Minting and Liquidity</div>

      <div class="paragraph">
        Minting is about using smart contracts, often on platforms like Ethereum, to create tokens. Liquidity, on the
        other hand, ensures there are buyers and sellers in the market. It's akin to having someone ready to buy or sell
        custom surfboards – without enough participants, even a valuable item may struggle to find takers.
      </div>
      <div class="title-text">The Catch-22 Challenge</div>

      <div class="paragraph">
        The challenge lies in a catch-22 situation. Tokens lack liquidity without users, yet users are hesitant if
        liquidity is scarce. The key for issuers is to encourage widespread adoption of their token. For instance, a
        gold token's value isn't just in the gold it represents but in the ease of access within the blockchain system.
      </div>
      <div class="title-text">The Role of Transparency</div>

      <div class="paragraph">
        Transparency is a crucial tool for issuers. In the often opaque world of token creation, being transparent about
        the token's quality during minting builds trust. This is vital in a landscape where many tokens lack clear
        information, making users wary.
      </div>
      <div class="title-text">Beyond Token Creation</div>

      <div class="paragraph">
        To succeed, issuers need more than just a token – they need a compelling narrative. Transparency acts as the
        linchpin, connecting issuers with users, fostering liquidity, and ensuring the token's relevance in the digital
        space.
        <p>
          Issuers must not only focus on creating tokens but also on storytelling and transparency. The success of a
          token ultimately hinges on user confidence and liquidity in the fast-paced world of digital assets.
        </p>
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
        background: #D2D0FF;
        margin-left: auto;
        margin-right: auto;
        position: relative;
        min-height: 2900px;
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
        top: 433px;
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
        width: 1576px;
        height: 714px;
        border-radius: 1576px;
        background: radial-gradient(50.35% 50.24% at 46.09% 49.91%, #F2F4F6 0%, rgba(242, 244, 246, 0.56) 67.25%, rgba(233, 233, 233, 0.00) 100%);
        top: 757px;
        z-index: 1;
        left: 40%;
    }

    .poem-gradient2 {
        position: absolute;
        width: 1769px;
        height: 1547px;
        border-radius: 1769px;
        background: radial-gradient(50.35% 50.24% at 46.09% 49.91%, #FFF 0%, rgba(245, 245, 245, 0.56) 77.71%, rgba(233, 233, 233, 0.00) 100%);
        top: 1020px;
        left: -25%;
        z-index: 2;
    }

    .poem-gradient3 {
        z-index: 2;
        position: absolute;
        top: 1020px;
        left: -25%;
        width: 2129px;
        height: 1011px;
        border-radius: 2129px;
        background: radial-gradient(50.35% 50.24% at 46.09% 49.91%, #FFF 0%, rgba(245, 245, 245, 0.56) 67.25%, rgba(233, 233, 233, 0.00) 100%);
    }

    .poem-gradient4 {
        z-index: 1;
        position: absolute;
        left: -30%;
        top: 1414px;
        width: 2396px;
        height: 1252px;
        border-radius: 2396px;
        background: radial-gradient(50.35% 50.24% at 46.09% 49.91%, #BFCDFF 0%, rgba(217, 221, 255, 0.92) 53.13%, rgba(233, 233, 233, 0.00) 100%);
    }

    .poem-gradient6 {
        z-index: 1;
        position: absolute;
        top: 1338px;
        left: -30%;
        width: 1576px;
        height: 1378px;
        border-radius: 1576px;
        background: radial-gradient(50% 50% at 50% 50%, #ABC8FF 0%, rgba(144, 211, 249, 0.00) 100%);
    }

    .poem-gradient7 {
        z-index: 0;
        position: absolute;
        top: 2110px;
        left: -25%;
        width: 1576px;
        height: 1378px;
        border-radius: 1576px;
        background: radial-gradient(50.35% 50.24% at 46.09% 49.91%, #FFF 0%, rgba(245, 245, 245, 0.56) 67.25%, rgba(233, 233, 233, 0.00) 100%);
    }

    .poem-gradient8 {
        z-index: 0;
        position: absolute;
        top: 1552px;
        left: 50%;
        width: 1576px;
        height: 1378px;
        border-radius: 1576px;
        background: radial-gradient(50.35% 50.24% at 46.09% 49.91%, #FFF 0%, rgba(245, 245, 245, 0.56) 67.25%, rgba(233, 233, 233, 0.00) 100%);
    }

    .poem-gradient9 {
        z-index: 0;
        position: absolute;
        top: 1790px;
        left: 50%;
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
        margin-bottom: 50px;
    }

    .issuer-plus-icon {
        width: 44px;
        height: 44px;
    }
</style>