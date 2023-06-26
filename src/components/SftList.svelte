<script>
    import {ethers} from 'ethers';
    import {createEventDispatcher, onMount} from 'svelte';
    import {account, activeNetwork} from '../scripts/store.js';
    import {cborDecode, formatAddress, timeStampToDate} from '../scripts/helpers.js';
    import {IPFS_GETWAY, MAGIC_NUMBERS} from '../scripts/consts.js';
    import {icons} from '../scripts/assets.js';

    export let sft = {}
    let auditors = []
    let issuers = []
    let sftLogo;
    let logoPreview;

    onMount(() => {
        getAuditors()
        getIssuers()
        getVaultImages()
    })

    $: sft && getVaultImages()

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
            file,
            imageElement: logoPreview,
            vault: sft
        });
    }

    async function getVaultImages() {
        let receiptVaultInformations = sft.receiptVaultInformations
        if (receiptVaultInformations.length) {
            let receiptInformations = receiptVaultInformations.map(data => {
                return cborDecode(data.information.slice(18))
            })
            let sftImages = receiptInformations.filter(i => i[0].get(1) === MAGIC_NUMBERS.OA_TOKEN_IMAGE)
            if (sftImages.length) {
                sft.icon = sftImages[0][1].get(0)
            }
        }
    }
</script>

<tr>
  <td class="sft-logo-container relative" style="width: 99px">
    <label for={`${sft.address}-upload`} id="sft-logo-upload"
           class="flex items-center justify-center text-white {sft.deployer.toLowerCase() === $account.toLowerCase() ? 'cursor-pointer' : '' }">
      {#if sft.icon}
        <img src={`${IPFS_GETWAY}${sft.icon}`} alt="sft logo" class="rounded-full sft-logo"
             bind:this={logoPreview}/>
      {/if}
      {#if !sft.icon}
        <div class="rounded-full no-image sft-logo"></div>
      {/if}
      {#if sft.deployer.toLowerCase() === $account.toLowerCase()}
        <div class="update absolute">
          <span class="text flex items-center mr-1">Update</span>
          <img src="{icons.camera}" alt="sft logo"/>
        </div>
        <input type="file" id={`${sft.address}-upload`} hidden accept=".jpg, .jpeg, .png, .svg"
               on:change={(e)=>onFileSelected(e)}
               bind:this={sftLogo}/>
      {/if}
    </label>
  </td>
  <td class="sft-name">{sft.name}</td>
  <td class="sft-info">{sft.symbol}</td>
  <td class="sft-info">{timeStampToDate(sft.deployTimestamp)}</td>
  <td class="sft-info">{sft.tokenHolders.filter(h=>h.balance !== "0").length}</td>
  <td class="sft-info">{sft?.totalShares ? ethers.utils.formatUnits(sft?.totalShares, 18) : 0}</td>
  <td class="sft-info">
    {#each auditors as auditor}
      <div class="underline">
        <a href={`${$activeNetwork.blockExplorer}/address/${auditor}`} target="_blank">{formatAddress(auditor)}</a>
      </div>
    {/each}
  </td>
  <td class="sft-info">
    {#each issuers as issuer}
      <div class="underline">
        <a href={`${$activeNetwork.blockExplorer}/address/${issuer}`} target="_blank">{formatAddress(issuer)}</a>
      </div>
    {/each}
  </td>
</tr>
<style>
    .sft-name {
        color: #9D7334;
    }

    .sft-info {
        color: #575757
    }

    tr:nth-child(even) {
        background-color: #F0EFF1;
    }

    tr:nth-child(odd) {
        background-color: #FFFFFF;
    }

    .update {
        display: none;
        width: 99px;
        height: 100%;
        position: absolute;
        align-items: center;
        justify-content: center;
        background: rgba(0, 0, 0, 0.6);
    }

    .sft-logo-container:hover .update {
        display: flex;
    }

    .no-image {
        background: #B7B7B7;
    }

    .sft-logo-container .sft-logo {
        width: 20px;
        height: 20px;
    }
</style>