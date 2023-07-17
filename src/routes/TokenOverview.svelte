<script>
    import DefaultFrame from '../components/DefaultFrame.svelte';
    import {sftInfo, data} from '../scripts/store.js';
    import TokenOverviewTable from '../components/TokenOverviewTable.svelte';
    import {bytesToMeta, cborDecode} from '../scripts/helpers.js';
    import {MAGIC_NUMBERS} from '../scripts/consts.js';
    import SftCredentialLinks from '../components/SftCredentialLinks.svelte';

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
<SftCredentialLinks sft={token}></SftCredentialLinks>
  <DefaultFrame>
    <div slot="content">
      <div class="">
        <TokenOverviewTable {token}/>
      </div>
    </div>
  </DefaultFrame>
</div>
<style>

    .left-margin {
        margin-left: 223px;
    }

    .token-overview-container {
        background: #FFFFFF;
        /*height: calc(100vh - 200px);*/
        border-radius: 20px 20px 0 0;
        margin-top: 103px;
        margin-right: 102px;
    }
</style>