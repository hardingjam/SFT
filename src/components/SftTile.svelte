<script>
    import {icons} from "../scripts/assets.js"
    import {bytesToMeta, cborDecode, formatAddress, timeStampToDate} from '../scripts/helpers';
    import {ethers} from 'ethers';
    import {createEventDispatcher, onMount} from 'svelte';
    import {account, activeNetwork, vault} from '../scripts/store.js';
    import {IPFS_GETWAY, MAGIC_NUMBERS} from '../scripts/consts.js';
    import CredentialLinksEditor from './CredentialLinksEditor.svelte';

    export let sft = {}
    let auditors = []
    let issuers = []
    let sftLogo;
    let logoPreview;
    let isEditorOpen = false;
    const dispatch = createEventDispatcher();


    onMount(() => {
        getSftData()
    })

    $: sft && getSftData()

    function getSftData() {
        getVaultInformation()
        getAuditors()
        getIssuers()
    }

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

    const onFileSelected = (e) => {
        let file = e.target.files[0];
        dispatch('fileDrop', {
            file,
            imageElement: logoPreview,
            vault: sft
        });
    }

    const onTokenSelect = (token) => {
        dispatch('tokenSelect', {
            token,
        });
    }

    async function getVaultInformation() {
        let receiptVaultInformations = sft.receiptVaultInformations
        if (receiptVaultInformations.length) {
            let receiptInformations = receiptVaultInformations.map(data => {
                return cborDecode(data.information.slice(18))
            })
            let sftImages = receiptInformations.filter(i => i[0].get(1) === MAGIC_NUMBERS.OA_TOKEN_IMAGE)
            let sftCredentialLinks = receiptInformations.filter(i => i[0].get(1) ===
                MAGIC_NUMBERS.OA_TOKEN_CREDENTIAL_LINKS)
            if (sftImages.length) {
                sft.icon = sftImages[0][1].get(0)
            }
            if (sftCredentialLinks.length) {
                sft.credentialLinks = bytesToMeta(sftCredentialLinks[0][0].get(0), "json")
            }
        }
    }

    function openEditor() {
        isEditorOpen = true;
    }

    function handleOkButtonClick(event) {
        dispatch('okClick', {credentialLinks: event.detail.credentialLinks, token: event.detail.token});
    }
</script>
<div class="w-full bg-white pt-5 pb-5 {!isEditorOpen? 'pl-10 pr-6' : ''}  rounded-xl relative">
  <div class="absolute right-2 cursor-pointer expand-btn">
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
  {#if !isEditorOpen}
    <div class="flex justify-between">
      <table class="w-8/12 leading-8 text-left">
        <tr>
          <td class="font-bold">Token name</td>
          <td class="sft-name brown">
            <span on:click={()=>onTokenSelect(sft)} class="underline cursor-pointer">{sft.name}</span>
          </td>
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
          <td class="sft-info">{sft.tokenHolders.filter(h => h.balance !== "0").length}</td>
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
              <div class="underline brown">
                <a href={`${$activeNetwork.blockExplorer}/address/${auditor}`}
                   target="_blank">{formatAddress(auditor)}</a>
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
              <div class="underline brown">
                <a href={`${$activeNetwork.blockExplorer}/address/${issuer}`}
                   target="_blank">{formatAddress(issuer)}</a>
              </div>
            {/each}
          </td>
        </tr>
      </table>
      <div class="img-container mr-8">
        <div class="sft-logo-container rounded-full"
             class:hover={sft.deployer.toLowerCase() === $account.toLowerCase()}>
          <label for={`${sft.address}-upload`} id="sft-logo-upload"
                 class="flex items-center justify-center text-white flex-col {sft.deployer.toLowerCase() === $account.toLowerCase() ? 'cursor-pointer' : '' }">
            {#if sft.icon}
              <img src={`${IPFS_GETWAY}${sft.icon}`} alt="sft logo" class="logo" bind:this={logoPreview}/>
              {#if sft.deployer.toLowerCase() === $account.toLowerCase()}
                <div class="update absolute flex-col flex items-center justify-center">
                  <img src="{icons.camera}" alt="sft logo"/>
                  <span class="text">Update</span>
                </div>
              {/if}
            {/if}
            {#if !sft.icon}
              {#if sft.deployer.toLowerCase() === $account.toLowerCase()}
                <img src="{icons.camera}" alt="sft logo"/>
                <span class="text">Update</span>
              {/if}
            {/if}
            {#if sft.deployer.toLowerCase() === $account.toLowerCase()}
              <input type="file" id={`${sft.address}-upload`} hidden accept=".jpg, .jpeg, .png, .svg"
                     on:change={(e)=>onFileSelected(e)}
                     bind:this={sftLogo}/>
            {/if}
          </label>

        </div>
      </div>
    </div>
    <div class="links-container pt-5">
      {#if sft.credentialLinks}
        {#if sft.credentialLinks.twitter}
          <a href={sft.credentialLinks.twitter} target="_blank">
            <img class="link-icon" src={icons.twitter} alt="twitter"></a>{/if}
        {#if sft.credentialLinks.telegram}
          <a href={sft.credentialLinks.telegram} target="_blank">
            <img class="link-icon" src={icons.telegram} alt="telegram"></a>{/if}
        {#if sft.credentialLinks.github}
          <a href={sft.credentialLinks.github} target="_blank">
            <img class="link-icon" src={icons.github} alt="github"></a>{/if}
        {#if sft.credentialLinks.discord}
          <a href={sft.credentialLinks.discord} target="_blank">
            <img class="link-icon" src={icons.discord} alt="discord"></a>{/if}
        {#if sft.credentialLinks.webLink}
          <a href={sft.credentialLinks.webLink} target="_blank">
            <img class="link-icon" src={icons.web_brown} alt="web"></a>{/if}
      {/if}
      <a href={`${$activeNetwork?.blockExplorer}/address/${sft.address}`} target="_blank">
        <img class="link-icon" src={icons[$activeNetwork.blockExplorerIcon]} alt={$activeNetwork.blockExplorerIcon}>
      </a>
      {#if sft.deployer.toLowerCase() === $account.toLowerCase()}
        <img class="link-icon" src={icons.edit} alt="edit" on:click={()=>{openEditor()}}>
      {/if}
    </div>
  {/if}
  {#if isEditorOpen}
    <CredentialLinksEditor on:okClick={handleOkButtonClick} {sft}/>
    <div class="back flex justify-end w-full cursor-pointer" on:click={()=>{isEditorOpen = false}}>
      <img src={icons.back} alt="back" class="mr-6">
    </div>
  {/if}
</div>

<style>

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

    .sft-logo-container .logo {
        width: 100%;
        height: 100%;
        border-radius: 50%;
    }

    .sft-logo-container.hover:hover {
        background: rgba(0, 0, 0, 0.6);
    }

    #sft-logo-upload {
        width: 88px;
        height: 88px;
    }

    .update {
        display: none;
        width: inherit;
        height: inherit;
        border-radius: 50%;
        background: rgba(0, 0, 0, 0.6);
    }

    .sft-logo-container:hover .update {
        display: flex;
    }

    .expand-btn {
        top: 0.7rem;
        right: 1.2rem;
    }

    .links-container {
        display: flex;
        justify-content: flex-end;
        align-items: center;
    }

    .link-icon {
        margin-left: 22px;
        width: 24px;
        height: 24px;
    }

    .link-icon:hover {
        cursor: pointer;
    }
</style>