<script>
    import DefaultFrame from './DefaultFrame.svelte';
    import {createEventDispatcher} from 'svelte';
    import {pageTitle} from '../scripts/store.js';
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

    pageTitle.set("IPFS login")


    function toggleShowPassword() {
        type = passwordInput.getAttribute("type")
        if (type === "password") {
            passwordInput.setAttribute("type", "text")
        } else {
            passwordInput.setAttribute("type", "password")
        }
    }

</script>

<DefaultFrame>
  <div slot="content">
    <div class="credentials">
      <div class="logged-in-text">{loggedIn ? `You are currently logged in as: ${loggedInUser}` : ''}</div>
      <div class="display-flex space-between">
        <label class="mr-2">Username:</label>
        <input class="default-input" type="text" bind:value={username} autofocus/>
      </div>
      <div class="display-flex space-between password">
        <label class="mr-2">Password:</label>
        <input class="default-input" type="password" bind:value={password} bind:this={passwordInput}/>
        {#if password}
          <div class="view" on:click={()=>{toggleShowPassword()}}>{show ? 'show' : 'hide'}</div>
        {/if}
      </div>
      <button class="default-btn ok-button" disabled={!password || !username} on:click={onOkButtonClick}>OK
      </button>
      <div class="message">{message}</div>
    </div>

  </div>
</DefaultFrame>

<style>

    .credentials {
        display: flex;
        flex-direction: column;
        border-radius: 10px;
        padding: 20px 45px 20px 45px;
        font-weight: 500;
        font-size: 16px;
        line-height: 27px;
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
    }

    .logged-in-text {
        height: 25px;
        color: #9D9D9D;
        text-align: left;
        margin-bottom: 10px;
        font-family: 'Mukta', sans-serif;
        font-style: normal;
        font-weight: 500;
        font-size: 16px;
        line-height: 27px;
    }

    .ok-button{
        font-weight: 400;
    }
</style>