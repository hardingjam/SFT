<script>
    import {createEventDispatcher, onDestroy, onMount} from 'svelte';
    import {pageTitle, titleIcon, tokenName} from '../scripts/store.js';
    import {icons} from '../scripts/assets.js';

    export let username = localStorage.getItem('ipfsUsername') || "";
    export let password = localStorage.getItem('ipfsPassword') || "";
    export let loggedIn = username && password
    export let message = ""
    let passwordInput;
    let type = ""
    let show = true;
    export let loggedInUser = localStorage.getItem('ipfsUsername')
    $:type && (show = !show)

    const dispatch = createEventDispatcher();

    const onOkButtonClick = (e) => {
        dispatch('okClick', {
            username,
            password
        });
    }

    onMount(async () => {
        pageTitle.set("IPFS login")

        titleIcon.set(`${icons.ipfs_white}`)
    })


    function toggleShowPassword() {
        type = passwordInput.getAttribute("type")
        if (type === "password") {
            passwordInput.setAttribute("type", "text")
        } else {
            passwordInput.setAttribute("type", "password")
        }
    }

</script>
<div class="ipfs-container">
  <div class="card-header justify-start pl-6">
    <div class="title flex gap-3"><img src="{icons.ipfs}" alt="ipfs"/>IPFS login</div>

  </div>
  <div class="credentials">
    {#if loggedIn}
      <div class="logged-in-text">{`You are currently logged in as: ${loggedInUser}`}</div>
    {/if}
    <div class="flex flex-col gap-2 w-full">
      <div class="w-full space-between items-center">
        <label class="mr-2">Username:</label>
        <input class="default-input ipfs-username" type="text" bind:value={username} autofocus/>
      </div>
      <div class="w-full space-between password items-center">
        <label class="mr-3">Password:</label>
        <input class="default-input ipfs-password" type="password" bind:value={password} bind:this={passwordInput}/>
        {#if password}
          <div class="view" on:click={()=>{toggleShowPassword()}}>{show ? 'show' : 'hide'}</div>
        {/if}
      </div>
    </div>


  </div>
  <div class="card-footer justify-start pt-4">
    <div class="message">{message}</div>
    <button class="default-btn ok-button" disabled={!password || !username} on:click={onOkButtonClick}>OK
    </button>
  </div>
</div>


<style>
    .ipfs-container {
        border-radius: 10px;
        background: #ffffff;
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 650px
    }

    .credentials {
        display: flex;
        flex-direction: column;
        padding: 20px 60px 35px 60px;
        font-weight: 500;
        font-size: 16px;
        line-height: 27px;
        background: #ffffff;
        align-items: flex-start;
        width: 100%;
    }

    .title {
        font-family: "Mukta", sans-serif;
        color: #000;
        font-size: 16px;
        font-style: normal;
        font-weight: 500;
        line-height: normal;
    }

    .password {
        position: relative;
    }

    .view {
        position: absolute;
        right: 5px;
        font-weight: 400;
        font-size: 14px;
        cursor: pointer;
    }

    .message {
        color: #26BE00;
        text-align: left;
        height: 25px;
        font-weight: 500;
    }

    .logged-in-text {
        height: 25px;
        color: #9D9D9D;
        text-align: left;
        margin-bottom: 25px;
        font-family: 'Mukta', sans-serif;
        font-style: normal;
        font-weight: 500;
        font-size: 16px;
        line-height: normal;
    }

    .ok-button {
        font-weight: 400;
        padding: 0 40px;
    }

    .card-footer {
        align-items: center;
        display: flex;
        border-top-width: 1px;
        padding: 16px 60px;
        width: 100%;
        justify-content: space-between;
    }

    .default-input {
        height: 36px;
        margin-bottom: 0;
        width: 100%;
    }
</style>