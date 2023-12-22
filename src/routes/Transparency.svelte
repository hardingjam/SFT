<script>
    import {icons} from '../scripts/assets.js';
    import {navigate} from '../scripts/helpers.js';
    import LandingNav from '../components/LandingNav.svelte';
    import LandingFooter from '../components/LandingFooter.svelte';

    function launchApp() {
        navigate("#list")
    }
</script>
<div class="transparency-container">
  <LandingNav/>
  <div class="tube-container absolute">
    <img src="{icons.tube}" alt="globe" class="hero-img"/>
  </div>
  <div class="content">
    <div class="gradients">
      <div class="poem-gradient1"></div>
      <div class="poem-gradient2"></div>
      <div class="poem-gradient3"></div>
      <div class="poem-gradient4"></div>
      <div class="poem-gradient5"></div>
      <div class="poem-gradient6"></div>
      <div class="poem-gradient7"></div>
      <div class="poem-gradient8"></div>
    </div>
    <div class="paragraphs">
      <div class="header-text title-text">SFT transparency</div>

      <div class="title-text">Facts checked by auditors (eg KPMG, Deloitte)</div>

      <div class="paragraph short">What makes it transparent is that the auditors are doing the audits based on the
        public
        data
        on IPFS.
        Transparency in this system is achieved through several key mechanisms:
      </div>

      <div class="title-text">Public Audit Trail</div>
      <div class="paragraph">The system maintains an audit trail that the auditor can cross-reference with real-world
        data. This audit trail is publicly accessible and stored on the InterPlanetary File System (IPFS), ensuring that
        the information is open and accessible to the general public.
        Immutable Blockchain Records: Every modification made to the system is recorded on a blockchain. These records
        are
        permanent and timestamped, making it impossible to alter or erase historical data. This ensures a reliable and
        unchangeable history of the system's activities.
      </div>

      <div class="title-text">Permissionless Structure</div>
      <div class="paragraph">The system operates on a permissionless basis, meaning there are no hidden layers of
        individuals with the authority to approve or reject actions or changes. This open approach eliminates the
        possibility of manipulation by a select group of individuals, ensuring fairness and openness.
      </div>

      <div class="title-text">Curator Accountability</div>
      <div class="paragraph">Even curators, including influential individuals, are subject to the same transparency
        requirements. Any actions or endorsements they make within the system are also permanently recorded on the
        blockchain, preventing the deletion or manipulation of their contributions.
      </div>

      <div class="title-text">Curators vs. Gatekeepers</div>
      <div class="paragraph">in a permissionless system it's easy for anyone to create a scam, that's why instinctively
        most people want trusted gatekeepers to reject anything that looks bad before it can even exist. This would be
        great if it were possible to have such flawless gatekeepers, perhaps one day the great AI overlords will do all
        this for us. In the meantime, we have to deal with monopolistic, corrupt and incompetent humans, so the model
        for
        SFT is based on curators rather than gatekeepers. Everyone can do anything that they want on the public ledger,
        and there's a public trail so that we can shift the focus to real track records and fair and open competition.
        End
        users can filter and search everything according to all the same data that everyone else sees.
      </div>
    </div>
    <LandingFooter></LandingFooter>
  </div>

</div>

<style>
    .transparency-container {
        background: #e7f4fd;
        margin-left: auto;
        margin-right: auto;
        position: relative;
        overflow: hidden;
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
        line-height: 55px;
        margin-bottom: 40px;
    }

    .header-text {
        font-family: 'Inter', sans-serif;
        font-size: 45px;
        font-style: normal;
        font-weight: 700;
        line-height: 55px;
        margin-bottom: 65px;
    }

    .content {
        position: relative;
        margin-top: calc(100vh - 11.8%);
        z-index: 2;
        text-align: left;
    }

    .paragraphs {
        padding: 0 122px;
        margin-bottom: 200px;
        position: relative;
        z-index: 3;
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
        top: -85px;
        z-index: 1;
        left: -30%;
    }

    .poem-gradient2 {
        position: absolute;
        width: 1788px;
        height: 1675px;
        transform: rotate(17.043deg);
        border-radius: 1788px;
        background: radial-gradient(63.35% 39.54% at 46.09% 49.91%, #B5D9FE 0%, rgba(181, 217, 254, 0.06) 53.34%, rgba(233, 233, 233, 0.00) 100%);
        top: 300px;
        left: 20%;
        z-index: 1;
    }

    .poem-gradient3 {
        z-index: 2;
        position: absolute;
        top: 440px;
        left: -24%;
        width: 1769px;
        height: 1120px;
        border-radius: 1769px;
        background: radial-gradient(50.35% 50.24% at 46.09% 49.91%, #FFF 0%, rgba(245, 245, 245, 0.56) 77.71%, rgba(233, 233, 233, 0.00) 100%);
    }

    .poem-gradient4 {
        z-index: 1;
        position: absolute;
        top: 500px;
        right: -40%;
        width: 1424px;
        height: 1043px;
        transform: rotate(62deg);
        border-radius: 1424px;
        background: radial-gradient(63.35% 39.54% at 46.09% 49.91%, #90C7FF 0%, rgba(181, 217, 254, 0.06) 53.34%, rgba(233, 233, 233, 0.00) 100%);
    }

    .poem-gradient5 {
        z-index: 1;
        position: absolute;
        top: 30px;
        left: 25%;
        width: 1576px;
        height: 714px;
        border-radius: 1576px;
        background: radial-gradient(50.35% 50.24% at 46.09% 49.91%, #F2F4F6 0%, rgba(242, 244, 246, 0.56) 67.25%, rgba(233, 233, 233, 0.00) 100%);
    }

    .poem-gradient6 {
        z-index: 1;
        position: absolute;
        top: 370px;
        left: -30%;
        width: 1769px;
        height: 1547px;
        border-radius: 1769px;
        background: radial-gradient(50.35% 50.24% at 46.09% 49.91%, #FFF 0%, rgba(245, 245, 245, 0.56) 77.71%, rgba(233, 233, 233, 0.00) 100%);
    }

    .poem-gradient7 {
        left: 27%;
        top: 50%;
        z-index: -1;
        position: absolute;
        width: 1891px;
        height: 100%;
        transform: rotate(17deg);
        border-radius: 1891px;
        background: radial-gradient(53.97% 41.99% at 46.31% 47.43%, #9ECEFF 0%, rgba(181, 217, 254, 0.06) 53.34%, rgba(233, 233, 233, 0.00) 100%);
    }

    .poem-gradient8 {
        z-index: 1;
        position: absolute;
        bottom: 22%;
        right: -17%;
        width: 2396px;
        height: 1252px;
        border-radius: 2396px;
        background: radial-gradient(50.35% 50.24% at 46.09% 49.91%, #BFCDFF 0%, rgba(217, 221, 255, 0.92) 53.13%, rgba(233, 233, 233, 0.00) 100%);
    }

    .landing-footer .landing-logo {
        position: absolute;
        bottom: 67px;
        left: 50px;
        padding: 0;
        width: calc(100% - 50px);
    }

    .tube-container, .tube-container .hero-img {
        width: 100%
    }

    @media only screen and (min-width: 1920px) {
        .content {
            top: calc(100vh - 10.2%);
        }
    }

</style>