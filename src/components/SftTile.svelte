<script>
    import {icons} from "../../src/scripts/assets.js"
    import {cborDecode, formatAddress, getIpfsGetWay, getSubgraphData, timeStampToDate} from '../scripts/helpers';
    import {ethers} from 'ethers';
    import {createEventDispatcher, onMount} from 'svelte';
    import {activeNetwork} from '../scripts/store.js';
    import {VAULT_INFORMATION_QUERY} from '../scripts/queries.js';
    import {IPFS_GETWAY, MAGIC_NUMBERS} from '../scripts/consts.js';

    export let sft = {}
    let auditors = []
    let issuers = []
    let sftLogo;

    onMount(() => {
        getAuditors()
        getIssuers()
        getVaultImages()
    })

    function getAuditors() {
        if (sft.address) {
            let tempAuditors = sft.roleHolders.filter(rh => rh.role.roleName === 'CERTIFIER')
            auditors = tempAuditors.map(a => a.account.address)
        }
    }

    function getIssuers() {
        if (sft.address) {
            let tempAuditors = sft.roleHolders.filter(rh => rh.role.roleName === 'DEPOSITOR')
            issuers = tempAuditors.map(a => a.account.address)
        }
    }

    const dispatch = createEventDispatcher();


    const onFileSelected = (e) => {
        let file = e.target.files[0];
        dispatch('fileDrop', {
            file
        });
    }

    async function getVaultImages() {
        let variables = {id: sft.address.toLowerCase()}
        if (sft.address) {
            try {
                let resp = await getSubgraphData($activeNetwork, variables, VAULT_INFORMATION_QUERY, 'offchainAssetReceiptVault')
                let receiptVaultInformations = ""

                if (resp && resp.data && resp.data.offchainAssetReceiptVault) {
                    receiptVaultInformations = resp.data.offchainAssetReceiptVault.receiptVaultInformations
                    if (receiptVaultInformations.length) {
                        receiptVaultInformations.map(async data => {
                            let cborDecodedInformation = cborDecode(data.information.slice(18))
                            if (cborDecodedInformation[0].get(1) === MAGIC_NUMBERS.OA_TOKEN_IMAGE) {
                                let imageHash = cborDecodedInformation[1].get(0)
                                sft.icon = imageHash
                            }
                        })
                    }
                }

            } catch (err) {
                console.log(err)
            }
        }
    }

</script>

<div class="w-full bg-white pt-5 pb-8 px-10 flex flex-row-reverse rounded-xl justify-between relative ">
  <div class="img-container">
    <div class="sft-logo-container rounded-full ">
      <label for="upload" id="sft-logo-upload"
             class="flex items-center justify-center text-white flex-col cursor-pointer">
        {#if sft.icon}
          <img src={`${IPFS_GETWAY}${sft.icon}`} alt="sft logo" class="logo"/>

          <div class="update absolute flex-col flex items-center justify-center">
            <img src="{icons.camera}" alt="sft logo"/>
            <span class="text">Update</span>
          </div>

        {/if}
        {#if !sft.icon}
          <img src="{icons.camera}" alt="sft logo"/>
          <input type="file" id="upload" hidden accept=".jpg, .jpeg, .png" on:change={(e)=>onFileSelected(e)}
                 bind:this={sftLogo}/>
          <span class="text">Upload</span>
        {/if}
      </label>

    </div>
    <div class="absolute top-2 right-2 cursor-pointer expand-btn">
      <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M14 10.3999L19 5.1999M19 5.1999L19 10.3999M19 5.1999L14 5.1999" stroke="#9D9D9D" stroke-width="2"
              stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M14 10.3999L19 5.1999M19 5.1999L19 10.3999M19 5.1999L14 5.1999" stroke="black" stroke-opacity="0.2"
              stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M10 14.5601L5 19.7601M5 19.7601L5 14.5601M5 19.7601H10" stroke="#9D9D9D" stroke-width="2"
              stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M10 14.5601L5 19.7601M5 19.7601L5 14.5601M5 19.7601H10" stroke="black" stroke-opacity="0.2"
              stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </div>
  </div>
  <table class="w-8/12 leading-8 text-left">
    <tr>
      <td class="font-bold">Token name</td>
      <td class="sft-name">{sft.name}</td>
    </tr>
    <tr>
      <td class="font-bold">Token symbol</td>
      <td class="sft-info">{sft.symbol}</td>
    </tr>
    <tr>
      <td class="font-bold">Creation date</td>
      <td class="sft-info">{timeStampToDate(sft.deployTimestamp)}</td>
    </tr>
    <tr>
      <td class="font-bold">Number of holders</td>
      <td class="sft-info">{issuers.length}</td>
    </tr>
    <tr>
      <td class="font-bold">Token supply</td>
      <td class="sft-info">{sft?.totalShares ? ethers.utils.formatUnits(sft?.totalShares, 18) : 0}</td>
    </tr>
    <tr>
      <td class="font-bold align-text-top">Name of auditor(s)</td>
      <td class="sft-info ">
        {#if !auditors.length}
          <div>N/A</div>
        {/if}
        {#each auditors as auditor}
          <div class="underline">
            <a href={`${$activeNetwork.blockExplorer}/address/${auditor}`} target="_blank">{formatAddress(auditor)}</a>
          </div>
        {/each}
      </td>

    </tr>
    <tr>
      <td class="font-bold">Name of issuer</td>
      <td class="sft-info ">
        {#if !issuers.length}
          <div>N/A</div>
        {/if}
        {#each issuers as issuer}
          <div class="underline">
            <a href={`${$activeNetwork.blockExplorer}/address/${issuer}`} target="_blank">{formatAddress(issuer)}</a>
          </div>
        {/each}
      </td>
    </tr>
  </table>
</div>

<style>
    .sft-name {
        color: #9D7334;
    }

    .sft-info {
        color: #575757
    }

    .img-container {
        width: 88px;
        height: 88px;
    }

    .sft-logo-container {
        background: #9D9D9D;
        width: 88px;
        height: 88px;
    }

    .sft-logo-container .logo{
        width: 100%;
        height: 100%;
        border-radius: 50%;
    }

    .sft-logo-container:hover {
        background: rgba(0, 0, 0, 0.6);
    }

    #sft-logo-upload {
        width: 88px;
        height: 88px;
    }

    .update{
        display: none;
        width: inherit;
        height: inherit;
        border-radius: 50%;
        background: rgba(0, 0, 0, 0.6);
    }

    .sft-logo-container:hover .update {
        display: flex;
    }
</style>