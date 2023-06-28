<script>
    import IpfsLogin from '../components/IpfsLogin.svelte';

    let loggedIn;
    let message = ""
    let loggedInUser;

    function updateCredentials(e) {
        console.log(e);
        message = ""
        localStorage.setItem('ipfsUsername', e.detail.username);
        localStorage.setItem('ipfsPassword', e.detail.password);
        loggedInUser = localStorage.getItem('ipfsUsername');
        loggedIn = true;
        message = "Login successful!";
    }

</script>
<IpfsLogin {loggedInUser} {loggedIn} {message} on:okClick={updateCredentials}/>

