<script>
    import DefaultFrame from "../components/DefaultFrame.svelte";

    let username = localStorage.getItem('ipfsUsername') || "";
    let password = localStorage.getItem('ipfsPassword') || "";
    let message = ""

    function updateCredentials() {
        message = ""
        localStorage.setItem('ipfsUsername', username);
        localStorage.setItem('ipfsPassword', password);
        message = "Username and password has been updated";
    }

</script>
<DefaultFrame header="IPFS login">
  <div slot="content">
    <div class="credentials">
      <div class="display-flex space-between">
        <label class="mr-2">Username:</label>
        <input class="default-input" type="text" bind:value={username} autofocus/>
      </div>
      <div class="display-flex space-between">
        <label class="mr-2">Password:</label>
        <input class="default-input" type="password" bind:value={password}/>
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

</style>