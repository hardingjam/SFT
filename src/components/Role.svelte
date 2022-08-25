<script>
    import {activeNetwork, vault, roles} from "../scripts/store.js";

    export let name;
    import show from '../assets/icons/show.svg';
    import delete_icon from '../assets/icons/delete.svg';
    import plus_sign from '../assets/icons/plus-sign.svg';

    let account = '';
    let validAccount = true;

    function showAddress(account) {
        window.open(`${$activeNetwork.blockExplorer}address/${account}`);
    }

    async function grantRole(roleName) {
        let role = await $vault[roleName]()
        try {
            if (account) {
                validAccount = true;
                const grantRoleTx = await $vault.grantRole(role, account);
                await grantRoleTx.wait()
                let updatedRoleHolders = $roles.find(r => r.roleName === roleName).roleHolders
                updatedRoleHolders.push(account)
                const newRoles = $roles.map(role => {
                    if (role.roleName === roleName) {
                        return {...role, roleHolders: updatedRoleHolders};
                    }
                    return role;
                });
                roles.set([...newRoles])
                account = "";
            } else {
                validAccount = false;
            }

        } catch (err) {
            console.log(err)
        }
    }

    async function revokeRole(roleName, account) {
        let role = await $vault[roleName]()

        try {
            const revokeRoleTx = await $vault.revokeRole(role, account);
            await revokeRoleTx.wait()
            let updatedRoleHolders = $roles.find(r => r.roleName === roleName).roleHolders
            let accountIndex = updatedRoleHolders.indexOf(account)
            updatedRoleHolders.splice(accountIndex, 1)
            const newRoles = $roles.map(role => {
                if (role.roleName === roleName) {
                    return {...role, roleHolders: updatedRoleHolders};
                }
                return role;
            });
            roles.set([...newRoles])
        } catch (err) {
            console.log(err)
        }

    }

    export let roleHolders;


</script>

<div class="role-container">
  {#if name}
    <span class="title">{name}</span>
  {/if}
  {#if !name}
    <br>
  {/if}
  <div class="role-list">
    <div class="executor">
      <span>Executor</span>
      {#each roleHolders as roleHolder}
        <div>
          {roleHolder.replace(/(.{7}).*/, "$1…")}
          <img class="btn-hover" src={show} alt="show" on:click={()=>showAddress(roleHolder)}/>
          <img class="btn-hover hidden" src={delete_icon} on:click={()=>revokeRole(name,roleHolder)} alt="delete"/>
        </div>
      {/each}
      <div class="grant-tole">
        <img class="btn-hover" src={plus_sign} alt="add new" on:click={()=>grantRole(name)}/>
        <input type="text" class="{validAccount ? 'account-input' : 'account-input invalid-input'}"
               bind:value={account}>
      </div>
    </div>
  </div>
</div>

<style>
    .role-container {
        text-align: left;
    }

    .title {
        font-style: normal;
        font-weight: 700;
        font-size: 16px;
        line-height: 27px;
        color: #000000;
    }

    .role-list {
        display: flex;
        justify-content: space-between;
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 27px;
    }

    .hidden {
        visibility: hidden;
    }

    .role-container:hover .hidden {
        visibility: visible;
    }

    .account-input {
        width: 370px;
        height: 28px;
        background: #ECECEC;
        border-radius: 5px;
        margin-bottom: 7px;
        padding-left: 13px;
        font-style: normal;
        font-weight: 300;
        font-size: 16px;
        line-height: 27px;
    }

    .grant-tole {
        display: flex;
        align-items: center;
    }

    .grant-tole input {
        width: 314px;
        margin: 0 5px;
    }
</style>