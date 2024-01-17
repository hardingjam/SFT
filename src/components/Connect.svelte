<script>
    import {account, accountRoles, roles} from '../scripts/store.js';
    import {setAccountRoles} from '../scripts/helpers.js';

    async function connect() {
        try {
            const accounts = await window.ethereum.request({
                method: "wallet_requestPermissions",
                params: [{
                    eth_accounts: {}
                }]
            }).then(() => window.ethereum.request({
                method: "eth_requestAccounts"
            }));
            account.set(accounts[0]);
            accountRoles.set(await setAccountRoles($roles, $account));
            localStorage.setItem("account", $account);
        } catch (error) {
            console.log(error);
        }
    }
</script>
<div class="invalid-network f-weight-700">
  <button class="connect-metamask-btn f-weight-700" on:click={()=>connect()}>
      <span>Connect wallet</span>
  </button>
</div>

<style>
    .connect-metamask-btn {
        border-radius: 30px;
        background: #2C2C54;
        color: #FFF;
        font-size: 20px;
        font-style: normal;
        font-weight: 500;
        line-height: normal;
        font-family: "Mukta", sans-serif;
        padding: 6px 32px;
        width: fit-content;
        cursor: pointer;
    }
</style>