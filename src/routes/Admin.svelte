<script>
    import {navigate} from "svelte-routing";
    import Role from "../components/Role.svelte";
    import {vault, activeNetwork} from "../scripts/store.js";

    let roles = [
        {
            name: "Depositor",
            executors: ["0x8058ad7C22fdC8788fe4cB1dAc15D6e976127324"],
            admins: ["0x9891ad7C22fdC8788fe4cB1dAc15D6e976127324"]
        },
        {
            name: "Withdrawer",
            executors: ["0x8058ad7C22fdC8788fe4cB1dAc15D6e976127324", "0x9999ad7C22fdC8788fe4cB1dAc15D6e976127324"],
            admins: ["0x1364ad7C22fdC8788fe4cB1dAc15D6e976127324"]
        },
        {
            name: "Certifier",
            executors: ["0x9999ad7C22fdC8788fe4cB1dAc15D6e976127324"],
            admins: ["0x1891ad7C22fdC8788fe4cB1dAc15D6e976127324"]
        },
        {
            name: "Handler",
            executors: ["0x8058ad7C22fdC8788fe4cB1dAc15D6e976127324", "0x9999ad7C22fdC8788fe4cB1dAc15D6e976127324"],
            admins: ["0x1361ad7C22fdC8788fe4cB1dAc15D6e976127324", "0x9999ad7C22fdC8788fe4cB1dAc15D6e976127324"]
        },
        {
            name: "ERC20 Tierer",
            executors: ["0x9999ad7C22fdC8788fe4cB1dAc15D6e976127324"],
            admins: ["0x1711ad7C22fdC8788fe4cB1dAc15D6e976127324"]
        },
        {
            name: "ERC1155 Tierer",
            executors: ["0x8058ad7C22fdC8788fe4cB1dAc15D6e976127324", "0x9999ad7C22fdC8788fe4cB1dAc15D6e976127324"],
            admins: ["0x1111ad7C22fdC8788fe4cB1dAc15D6e976127324"]
        },
        {
            name: "ERC20 Snapshotter",
            executors: ["0x9999ad7C22fdC8788fe4cB1dAc15D6e976127324"],
            admins: ["0x7961ad7C22fdC8788fe4cB1dAc15D6e976127324", "0x9999ad7C22fdC8788fe4cB1dAc15D6e976127324"]
        },
        {
            name: 'Confiscator',
            executors: ["0x8058ad7C22fdC8788fe4cB1dAc15D6e976127324", "0x9999ad7C22fdC8788fe4cB1dAc15D6e976127324", "0x9999ad7C22fdC8788fe4cB1dAc15D6e976127324"],
            admins: ["0x7711ad7C22fdC8788fe4cB1dAc15D6e976127324"]
        },
    ]

    function goBack() {
        navigate("/", {replace: false});
    }

</script>
<div class="sft-admin-container">
  <div class="admin-header">
    <span>Admin</span>
    <button class="btn-back btn-hover" on:click={()=>goBack()}>Back</button>
  </div>
  Address: <a href={`${$activeNetwork.blockExplorer}address/${$vault.address}`} class="contract-address btn-hover"
              target="_blank">{$vault.address}</a>
  <div class="roles-container">
    <span class="warning">Important - Deleting or adding is permanent on the blockchain. If all role admins are removed  then it will be unrecoverable.</span>
    <div class="roles">
      {#each roles as role}
        <Role name={role.name} admins={role.admins} executors={role.executors}></Role>
      {/each}
    </div>
  </div>
</div>
<style>
    .sft-admin-container {
        width: 819px;
        height: calc(100vh - 280px);
        background: rgba(44, 44, 84, 0.33);
        border-radius: 20px;
        padding: 12px;
        color: #ffffff;

    }

    .admin-header {
        color: #ffffff;
        display: flex;
        justify-content: space-between;
        padding: 5px 25px 10px 35px;
    }

    .btn-back {
        box-sizing: border-box;
        border: 1px solid #FFFFFF;
        border-radius: 5px;
        background: transparent;
        color: #ffffff;
    }

    .btn-back:focus {
        outline: none;
    }

    .roles-container {
        height: calc(100% - 70px);
        background: #FFFFFF;
        border-radius: 10px;
        color: #000000;
    }

    .roles {
        overflow: auto;
        height: calc(100% - 35px);
    }

    .warning {
        font-style: normal;
        font-weight: 400;
        font-size: 8px;
        line-height: 13px;
        color: #000000;
    }

    .contract-address {
        text-decoration: none;
        color: #ffffff;
    }
</style>