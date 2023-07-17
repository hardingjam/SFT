<script>
    import DefaultFrame from '../components/DefaultFrame.svelte';
    import {sftInfo, data} from '../scripts/store.js';
    import TokenOverviewTable from '../components/TokenOverviewTable.svelte';
    import {bytesToMeta, cborDecode, navigate} from '../scripts/helpers.js';
    import {MAGIC_NUMBERS} from '../scripts/consts.js';
    import SftCredentialLinks from '../components/SftCredentialLinks.svelte';
    import {icons} from '../scripts/assets.js';

    $:$data && setToken()
    $:token && getVaultInformation()

    let token = {}

    function setToken() {
        token = $data.offchainAssetReceiptVault
    }

    async function getVaultInformation() {
        let receiptVaultInformations = token.receiptVaultInformations
        if (receiptVaultInformations.length) {
            let receiptInformations = receiptVaultInformations.map(data => {
                return cborDecode(data.information.slice(18))
            })
            let sftImages = receiptInformations.filter(i => i[0].get(1) === MAGIC_NUMBERS.OA_TOKEN_IMAGE)
            let sftCredentialLinks = receiptInformations.filter(i => i[0].get(1) ===
                MAGIC_NUMBERS.OA_TOKEN_CREDENTIAL_LINKS)
            if (sftImages.length) {
                token.icon = sftImages[0][1].get(0)
            }
            if (sftCredentialLinks.length) {
                token.credentialLinks = bytesToMeta(sftCredentialLinks[0][0].get(0), "json")
            }
        }
    }
</script>
<div class="{$sftInfo ? '' : 'left-margin'} w-full token-overview-container">
  <div class="flex justify-between mb-2">
    <div class="links">
      <SftCredentialLinks sft={token}></SftCredentialLinks>
    </div>
    <button class="btn-hover mr-3" on:click={()=>{navigate("#asset-register")}}>
      <img src={icons.back} alt="back">
    </button>
  </div>
  <div class="content">

    <div class="">
      <TokenOverviewTable {token}/>
    </div>
  </div>
</div>
<style>

    .left-margin {
        margin-left: 223px;
    }

    .token-overview-container {
        background: #FFFFFF;
        border-radius: 20px 20px 0 0;
        margin-top: 103px;
        margin-right: 102px;
        color: #000000;
        display: flex;
        flex-direction: column;
        overflow: hidden;
        padding: 14px 20px 20px 20px;
    }

    .content {
        border: 1px solid #C1C1C1;
        border-radius: 10px;
        padding: 20px
    }

</style>