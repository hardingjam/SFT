<script>
    import SftTile from './SftTile.svelte';
    import {createEventDispatcher} from 'svelte';

    const dispatch = createEventDispatcher();
    export let tokens;
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

</script>
<div class="grid grid-cols-2 gap-5">
  {#each tokens as sft }
    <SftTile sft={sft} on:fileDrop={handleFileDrop} on:tokenSelect={handleTokenSelect}
             on:inputValueChange={handleInputs}></SftTile>
  {/each}
</div>