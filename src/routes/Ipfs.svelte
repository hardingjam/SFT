<script>
    import DefaultFrame from "../components/DefaultFrame.svelte";

    let username = localStorage.getItem('ipfsUsername') || "";
    let password = localStorage.getItem('ipfsPassword') || "";
    let message = ""
    let passwordInput;
    let type = ""
    let show = true

    function updateCredentials() {
        message = ""
        localStorage.setItem('ipfsUsername', username);
        localStorage.setItem('ipfsPassword', password);
        message = "Username and password has been updated";
    }

    $:type && (show = !show)

    function toggleShowPassword() {
        type = passwordInput.getAttribute("type")
        if (type === "password") {
            passwordInput.setAttribute("type", "text")
        } else {
            passwordInput.setAttribute("type", "password")
        }
    }

</script>
<DefaultFrame header="IPFS login">
  <div slot="content">
    <div class="credentials">
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
      <button class="default-btn ok-button" disabled={!password || !username} on:click={()=>{updateCredentials()}}>OK
      </button>
      <div class="message error">{message}</div>
    </div>

  </div>
</DefaultFrame>

<style>

    .credentials {
        display: flex;
        flex-direction: column;
        border: 1px solid #D2D2D2;
        border-radius: 10px;
        padding: 45px;
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

</style>