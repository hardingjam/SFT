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
<div class="editor-container flex flex-col">
  <div class="span self-start pb-4">{`Edit credentials links for ${sft.name}`}</div>
  <div class="form flex items-center">
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
      <button class="default-btn w-1/2">ok</button>
    </div>
  </div>
</div>

<style>

    .inputs {
        width: 70%;
        margin-left: 5%;
    }

    .inputs .input img {
        margin-right: 1rem;
    }

    .inputs .input input {
        width: 100%;
        margin-bottom: 0;
    }

    .ok-btn {
        width: 30%;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .span {
        margin-left: 5%;
    }
</style>