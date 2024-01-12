<script>
    import {icons} from '../scripts/assets.js';
    import LandingNav from '../components/LandingNav.svelte';
    import EcosystemsTemplate from '../components/EcosystemsTemplate.svelte';

</script>
<div class="transparency-container">
  <div class="poem-gradient10"></div>
  <LandingNav/>
  <EcosystemsTemplate icon="{icons.lock}" hero="{icons.auditors_hero}" name="Auditors" iconBackground="#5E97DF">
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
      <div class="paragraph short">
        SFT tokens represent real-world assets, it's crucial that investors can trust their legitimacy. To maintain this
        trust, independent auditors play a key role in verifying that what's on the blockchain matches what's happening
        in the real world.
      </div>
      <div class="title-text">The Auditors Job</div>
      <div class="paragraph">
        Just like big financial companies get audits, cryptocurrency issuers appoint auditors. These auditors use their
        private key to sign off on audit reports, after issuers appoint their public key to the token to do so.
      </div>
      <div class="title-text">Why Auditor Approval Matters</div>
      <div class="paragraph">
        If the auditor finds a problem, they file a report. Depending on the report (approval or disapproval), the
        tokens could freeze. Frozen tokens mean the whole system stops working. This motivates issuers to fix any
        problems the auditor found so they can get approval and unfreeze the system.
      </div>
      <div class="title-text">Quality Check: Auditors and Issuers</div>
      <div class="paragraph">
        The credibility of the auditor is super important. Some issuers might try to appoint themselves as auditors, but
        the blockchain makes this visible. Having a recognized and professional auditor adds trust. It shows investors
        that the audit follows standards, is accurate, and happens on time.
      </div>
      <div class="title-text">Regulations and Legal Stuff</div>
      <div class="paragraph">
        Sometimes, audits aren't just a good idea—they're the law. In some places, you can't issue tokens without an
        audit. Having native support in the smart contracts for auditing requirements is a must for any serious issuer.
      </div>
      <div class="title-text">The Auditors Role</div>
      <div class="paragraph">
        Contrary to seeming complicated, the auditor's job is pretty straightforward. Issuers pay them standard rates to
        check documentation against the public record. No fancy stuff. The auditor should not hold the token itself, or
        have any other conflicts of interest that might bias their reports. The auditor's private key is used to sign
        off on the audit.
      </div>
      <div class="title-text">Transparency is Key</div>
      <div class="paragraph">
        Auditors must keep it simple too. They should only use information that's already public in the onchain minting
        record for their checks. If issuers can submit secret documents, it messes up the whole point of auditing and
        leaves investors without important information. These documents may even be important for potential court cases
        in the extreme event of issuer fraud, so the auditor should insist on sticking to the public record. By keeping
        it simple, being transparent, and following the rules, auditors help create a reliable cryptocurrency system.
      </div>
    </div>
  </EcosystemsTemplate>
</div>

<style>
    .transparency-container {
        background: #C3E7F6;
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
        width: 1576px;
        height: 714px;
        border-radius: 1576px;
        background: radial-gradient(50.35% 50.24% at 46.09% 49.91%, #F2F4F6 0%, rgba(242, 244, 246, 0.56) 67.25%, rgba(233, 233, 233, 0.00) 100%);
        top: 560px;
        z-index: 1;
        left: 40%;
    }

    .poem-gradient2 {
        position: absolute;
        width: 1769px;
        height: 1547px;
        border-radius: 1769px;
        background: radial-gradient(50.35% 50.24% at 46.09% 49.91%, #FFF 0%, rgba(245, 245, 245, 0.56) 77.71%, rgba(233, 233, 233, 0.00) 100%);
        top: 620px;
        left: -25%;
        z-index: 2;
    }

    .poem-gradient3 {
        z-index: 2;
        position: absolute;
        top: 620px;
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
        top: 1014px;
        width: 2396px;
        height: 1252px;
        border-radius: 2396px;
        background: radial-gradient(50.35% 50.24% at 46.09% 49.91%, #BFCDFF 0%, rgba(217, 221, 255, 0.92) 53.13%, rgba(233, 233, 233, 0.00) 100%);
    }

    .poem-gradient6 {
        z-index: 1;
        position: absolute;
        top: 938px;
        left: -30%;
        width: 1576px;
        height: 1378px;
        border-radius: 1576px;
        background: radial-gradient(50% 50% at 50% 50%, #ABC8FF 0%, rgba(144, 211, 249, 0.00) 100%);
    }

    .poem-gradient7 {
        z-index: 0;
        position: absolute;
        top: 1710px;
        left: -25%;
        width: 1576px;
        height: 1378px;
        border-radius: 1576px;
        background: radial-gradient(50.35% 50.24% at 46.09% 49.91%, #FFF 0%, rgba(245, 245, 245, 0.56) 67.25%, rgba(233, 233, 233, 0.00) 100%);
    }

    .poem-gradient8 {
        z-index: 0;
        position: absolute;
        top: 1100px;
        left: 50%;
        width: 1576px;
        height: 1378px;
        border-radius: 1576px;
        background: radial-gradient(50.35% 50.24% at 46.09% 49.91%, #FFF 0%, rgba(245, 245, 245, 0.56) 67.25%, rgba(233, 233, 233, 0.00) 100%);
    }

    .poem-gradient9 {
        z-index: 0;
        position: absolute;
        top: 1390px;
        left: 80%;
        width: 1576px;
        height: 1378px;
        border-radius: 1576px;
        background: radial-gradient(50% 50% at 50% 50%, #90D3F9 0%, rgba(144, 211, 249, 0.00) 100%);
    }

    .poem-gradient10 {
        position: absolute;
        width: 100%;
        height: 150px;
        top: 0;
        z-index: 0;
        display: none;
        background: rgb(104,94,173);
        background: linear-gradient(90deg, rgb(103 183 249) 0%, rgb(100 182 252) 50%, rgb(99 181 251) 81%, rgb(88 176 249) 98%)
    }

    @media only screen and (max-width: 430px) {
        .poem-gradient10 {
            display: flex;
        }
    }

</style>