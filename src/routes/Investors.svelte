<script>
    import {icons} from '../scripts/assets.js';
    import LandingNav from '../components/LandingNav.svelte';
    import EcosystemsTemplate from '../components/EcosystemsTemplate.svelte';

</script>
<div class="transparency-container">
  <LandingNav/>
  <div class="mt-5"></div>
  <EcosystemsTemplate icon="{icons.investor_icon}" hero="{icons.investor_hero}" name="Investors"
                      iconBackground="#674AA5" heroClassName="top-16">
    <div slot="gradients">
      <div class="poem-gradient1"></div>
      <div class="poem-gradient2"></div>
      <div class="poem-gradient3"></div>
      <div class="poem-gradient4"></div>
      <div class="poem-gradient6"></div>
      <div class="poem-gradient7"></div>
      <div class="poem-gradient8"></div>
      <div class="poem-gradient9"></div>
    </div>
    <div slot="content">
      <div class="paragraph short">Some investors are inclined towards a long-term strategy, preferring to buy and hold
        assets
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
    </div>
  </EcosystemsTemplate>

</div>

<style>
    .transparency-container {
        background: #FCFCFC;
        margin-left: auto;
        margin-right: auto;
        position: relative;
        overflow: hidden;
    }

    .poem-gradient1 {
        position: absolute;
        width: 2129px;
        height: 1011px;
        border-radius: 2129px;
        background: radial-gradient(50.35% 50.24% at 46.09% 49.91%, #FFF 0%, rgba(245, 245, 245, 0.56) 67.25%, rgba(233, 233, 233, 0.00) 100%);
        top: 235px;
        z-index: 1;
        right: 0;
    }

    .poem-gradient2 {
        z-index: 1;
        position: absolute;
        width: 1576px;
        height: 714px;
        border-radius: 1576px;
        background: radial-gradient(50.35% 50.24% at 46.09% 49.91%, #F2F4F6 0%, rgba(242, 244, 246, 0.56) 67.25%, rgba(233, 233, 233, 0.00) 100%);
        top: 355px;
        left: 40%;
    }

    .poem-gradient3 {
        z-index: 3;
        position: absolute;
        top: 590px;
        right: 5%;
        width: 1769px;
        height: 1547px;
        border-radius: 1576px;
        background: radial-gradient(50.35% 50.24% at 46.09% 49.91%, #F2F4F6 0%, rgba(242, 244, 246, 0.56) 67.25%, rgba(233, 233, 233, 0.00) 100%);
    }

    .poem-gradient4 {
        z-index: 2;
        position: absolute;
        right: -5%;
        top: 1000px;
        width: 2396px;
        height: 1252px;
        border-radius: 2396px;
        background: radial-gradient(50.35% 50.24% at 46.09% 49.91%, #BFCDFF 0%, rgba(217, 221, 255, 0.92) 53.13%, rgba(233, 233, 233, 0.00) 100%);
    }

    .poem-gradient6 {
        z-index: 2;
        position: absolute;
        top: 1200px;
        left: 5%;
        width: 1576px;
        height: 1378px;
        border-radius: 1576px;
        background: radial-gradient(50.35% 50.24% at 46.09% 49.91%, #FFF 0%, rgba(245, 245, 245, 0.56) 67.25%, rgba(233, 233, 233, 0.00) 100%);
    }

    .poem-gradient7 {
        z-index: 1;
        position: absolute;
        top: 1750px;
        left: -25%;
        width: 1576px;
        height: 1378px;
        border-radius: 1576px;
        background: radial-gradient(50.35% 50.24% at 46.09% 49.91%, #FFF 0%, rgba(245, 245, 245, 0.56) 67.25%, rgba(233, 233, 233, 0.00) 100%);
    }

    .poem-gradient8 {
        z-index: 1;
        position: absolute;
        top: 1400px;
        left: 55%;
        width: 1576px;
        height: 1378px;
        border-radius: 1576px;
        background: radial-gradient(50% 50% at 50% 50%, #90D3F9 0%, rgba(144, 211, 249, 0.00) 100%);
    }

    .poem-gradient9 {
        z-index: 1;
        position: absolute;
        top: 560px;
        left: -20%;
        width: 1769px;
        height: 1547px;
        border-radius: 1769px;
        background: radial-gradient(50.35% 50.24% at 46.09% 49.91%, #FFF 0%, rgba(245, 245, 245, 0.56) 77.71%, rgba(233, 233, 233, 0.00) 100%);
    }

    .paragraph {
        margin-bottom: 40px;
        color: #575757;
        font-family: 'Manrope', sans-serif;
        font-size: 20px;
        font-style: normal;
        font-weight: 600;
        line-height: 40px;
        max-width: 1500px;
    }

    .paragraph.short {
        max-width: 1000px;
    }
</style>