<script>
    import {icons} from '../scripts/assets.js';
    import {createEventDispatcher} from 'svelte';

    const dispatch = createEventDispatcher();

    let credentialLinks = {
        discord: "",
        github: "",
        telegram: "",
        twitter: "",
        web: "",
    };
    export let sft;

    function handleChange(event) {
        dispatch('inputValueChange', {credentialLinks});
    }
</script>
<div class="editor-container flex flex-col bg-white">
  <div class="span self-start pt-2 pb-4">{`Edit credentials links for ${sft.name}`}</div>
  <div class="form flex items-center justify-between">
    <div class="inputs">
      <div class="input flex items-center mb-4">
        <img src={icons.twitter} alt="twitter">
        <input class="default-input" bind:value={credentialLinks.twitter} on:input={handleChange}/></div>
      <div class="input flex items-center mb-4">
        <img src={icons.web_brown} alt="web">
        <input class="default-input" bind:value={credentialLinks.web} on:input={handleChange}/>
      </div>
      <div class="input flex items-center mb-4">
        <img src={icons.discord} alt="discord">
        <input class="default-input" bind:value={credentialLinks.discord} on:input={handleChange}/></div>
      <div class="input flex items-center mb-4">
        <img src={icons.github} alt="github">
        <input class="default-input" bind:value={credentialLinks.github} on:input={handleChange}/>
      </div>
      <div class="input flex items-center mb-4">
        <img src={icons.telegram} alt="telegram">
        <input class="default-input" bind:value={credentialLinks.telegram} on:input={handleChange}/></div>
    </div>
    <div class="ok-btn">
      <button class="default-btn w-full">ok</button>
    </div>
  </div>
</div>

<style>

    .inputs .input img {
        margin-right: 1rem;
    }

    .inputs .input input {
        width: 325px;
        margin-bottom: 0;
    }

    .ok-btn {
        width: 100px;
    }

    @media only screen and (max-width: 1600px) {
        .inputs .input input {
            width: 280px;
        }
    }

    @media only screen and (max-width: 1300px) {
        .inputs .input input {
            width: 200px;
        }
    }
</style>