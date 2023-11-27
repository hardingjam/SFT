<script>
    import IpfsLogin from '../components/IpfsLogin.svelte';
    import axios from 'axios';
    import {IPFS_APIS} from '../scripts/consts.js';

    let loggedIn;
    let message = ""
    let loggedInUser;

    let username = ''
    let password = ''
    let error = ''

    async function updateCredentials(e) {
        username = e.detail.username;
        password = e.detail.password;
        message = "";
        error = "";
        let formData = new FormData();
        formData.append('file', 'credentials')
        const requestArr = IPFS_APIS.map(async (url) => {
            try {
                return await axios.request({
                    url,
                    auth: {
                        username,
                        password
                    },
                    method: 'post',
                    headers: {
                        "Content-Type": `multipart/form-data;`,
                    },
                    data: formData,
                    onUploadProgress: ((p) => {
                        console.log(`Uploading...  ${p.loaded} / ${p.total}`);
                    }),
                    withCredentials: true,
                })
            } catch (e) {
                console.log(e.message)
            }

        });
        try {
            let respAll = await Promise.allSettled(requestArr)

            respAll.map(response => {
                if (response.status === "rejected") {
                    reportError(response.reason)
                } else return response
            })

            let resolvedPromise = respAll.find(r => r.status === "fulfilled" && r.value)
            if (resolvedPromise) {
                localStorage.setItem('ipfsUsername', username);
                localStorage.setItem('ipfsPassword', password);
                loggedInUser = localStorage.getItem('ipfsUsername');
                loggedIn = true;
                message = "Login successful!";
            } else {
                error = "Double check your login details and if the problem persists, contact us"
            }
        } catch (e) {
            console.log(e)
        }

    }

</script>
<IpfsLogin {loggedInUser} {loggedIn} {message} {error} on:okClick={updateCredentials}/>