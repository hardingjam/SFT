<script>
    import {createEventDispatcher} from 'svelte';
    import SftList from './SftList.svelte';
    import CredentialLinksEditor from './CredentialLinksEditor.svelte';

    const dispatch = createEventDispatcher();
    export let tokens;
    let isEditorOpen = false
    let tokenToEdit;

    function handleTokenSelect(event) {
        dispatch('tokenSelect', {
            token: event.detail.token,
        });
    }

    function handleInputs(event) {
        dispatch('inputValueChange', {
            credentialLinks: event.detail.credentialLinks,
        });
    }

    function handleFileDrop(e) {
        dispatch('fileDrop', {
            file: e.detail.file,
            imageElement: e.detail.imageElement,
            vault: e.detail.vault
        });
    }

    function handleEditClick(event) {
        console.log(event)
        tokenToEdit = event.detail.token
        isEditorOpen = true
    }

</script>
<div>
  {#if !isEditorOpen}
    <table class="w-full leading-7 text-center token-list-table">
      <thead>
      <tr class="text-white text-bold">
        <th style="width: 99px"></th>
        <th>Token name</th>
        <th>Token symbol</th>
        <th>Creation date</th>
        <th>Number of holders</th>
        <th>Token supply</th>
        <th>Auditor(s)</th>
        <th>Name of issuer</th>
      </tr>
      </thead>
      <tbody>
      {#each tokens as sft }
        <SftList sft={sft} on:fileDrop={handleFileDrop} on:tokenSelect={handleTokenSelect}
                 on:inputValueChange={handleInputs} on:editClick={handleEditClick}></SftList>
      {/each}
      </tbody>
    </table>
  {/if}
  {#if isEditorOpen}
    <div class="editor mr-16 ml-14">
      <CredentialLinksEditor on:inputValueChange={handleInputs} sft={tokenToEdit}/>
    </div>
  {/if}
</div>
<style>

    .token-list-table thead th {
        background-color: #9196C5;
    }

    .token-list-table thead tr:first-child th:first-child {
        border-top-left-radius: 10px;
    }

    .token-list-table thead tr:first-child th:last-child {
        border-top-right-radius: 10px;
    }

    .editor{
        background: #FFFFFF;
        height: 100vh;
        border-radius:8px;
    }


</style>