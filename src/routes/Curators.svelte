<script>
    import {icons} from '../scripts/assets.js';
    import LandingNav from '../components/LandingNav.svelte';
    import EcosystemsTemplate from '../components/EcosystemsTemplate.svelte';

</script>
<div class="transparency-container">
  <div class="poem-gradient9"></div>
  <LandingNav/>
  <EcosystemsTemplate icon="{icons.curator_icon}" hero="{icons.curator_hero}" name="Curators" iconBackground="#655DB4">
    <div slot="gradients">
      <div class="poem-gradient1"></div>
      <div class="poem-gradient2"></div>
      <div class="poem-gradient3"></div>
      <div class="poem-gradient4"></div>
      <div class="poem-gradient7"></div>
      <div class="poem-gradient8"></div>
    </div>
    <div slot="content">
      <div class="title-text">
        Curators: Connecting Investors and Auditors
      </div>

      <div class="paragraph short">
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

    </div>
  </EcosystemsTemplate>
</div>

<style>
    .transparency-container {
        background: #CFD1F3;
        margin-left: auto;
        margin-right: auto;
        position: relative;
        overflow: hidden;
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

    .poem-gradient1 {
        position: absolute;
        width: 2129px;
        height: 1011px;
        border-radius: 2129px;
        background: radial-gradient(50.35% 50.24% at 46.09% 49.91%, #FFF 0%, rgba(245, 245, 245, 0.56) 67.25%, rgba(233, 233, 233, 0.00) 100%);
        top: 580px;
        z-index: 1;
        right: 0;
    }

    .poem-gradient2 {
        position: absolute;
        width: 1576px;
        height: 714px;
        border-radius: 1576px;
        background: radial-gradient(50.35% 50.24% at 46.09% 49.91%, #F2F4F6 0%, rgba(242, 244, 246, 0.56) 67.25%, rgba(233, 233, 233, 0.00) 100%);
        top: 600px;
        left: 40%;
    }

    .poem-gradient3 {
        z-index: 2;
        position: absolute;
        top: 590px;
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
        top: 1000px;
        width: 2396px;
        height: 1252px;
        border-radius: 2396px;
        background: radial-gradient(50.35% 50.24% at 46.09% 49.91%, #BFCDFF 0%, rgba(217, 221, 255, 0.92) 53.13%, rgba(233, 233, 233, 0.00) 100%);
    }

    .poem-gradient7 {
        z-index: 0;
        position: absolute;
        top: 1750px;
        left: -25%;
        width: 1576px;
        height: 1378px;
        border-radius: 1576px;
        background: radial-gradient(50.35% 50.24% at 46.09% 49.91%, #FFF 0%, rgba(245, 245, 245, 0.56) 67.25%, rgba(233, 233, 233, 0.00) 100%);
    }

    .poem-gradient8 {
        z-index: -1;
        position: absolute;
        top: 1400px;
        left: 60%;
        width: 1576px;
        height: 1378px;
        border-radius: 1576px;
        background: radial-gradient(50% 50% at 50% 50%, #90D3F9 0%, rgba(144, 211, 249, 0.00) 100%);
    }

    .poem-gradient9 {
        position: absolute;
        width: 100%;
        height: 150px;
        top: 0;
        z-index: 0;
        display: none;
        background: rgb(104,94,173);
        background: linear-gradient(90deg, rgba(104,94,173,1) 0%, rgba(111,96,173,1) 50%, rgba(124,108,181,1) 81%, rgba(129,116,184,1) 98%)
    }

    @media only screen and (max-width: 430px) {
        .poem-gradient9 {
            display: flex;
        }
    }
</style>