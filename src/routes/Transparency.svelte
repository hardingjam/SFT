<script>
    import {icons} from '../scripts/assets.js';
    import {navigate} from '../scripts/helpers.js';
    import LandingNav from '../components/LandingNav.svelte';

    function launchApp() {
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
    <div class="landing-logo">
      <img src="{icons.logo}" alt="sft">
      <LandingNav/>
    </div>
  </div>
  <div class="content">
    <div class="tube-container">
      <img src="{icons.tube}" alt="globe"/>
    </div>

    <div class="info-card">
      <div class="header-text title-text">SFT transparency</div>

      <div class="title-text">Facts checked by auditors (eg KPMG, Deloitte)</div>

      <div class="paragraph">What makes it transparent is that the auditors are doing the audits based on the public
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
        z-index: 1;
        overflow: hidden;
    }

    .landing-logo {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        padding-top: 25px;
        padding-left: 100px;
        padding-right: 48px;
        position: fixed;
        z-index: 3;
    }

    .landing-logo img {
        width: 65px;
        height: 65px;
    }

    .content {
    }

    .tube-container {
        /*position: relative;*/
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
    }

    .header-text {
        font-family: 'Inter', sans-serif;
        font-size: 45px;
        font-style: normal;
        font-weight: 700;
        line-height: 55px; /* 122.222% */
        margin-bottom: 124px;
    }

    .info-card {
        position: absolute;
        top: 677px;
        left: 122px;
        width: calc(100% - 244px);
        z-index: 1;
        text-align: left;
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