<script>
    import {
        activeNetwork,
        vault,
        roles,
        transactionError
    } from "../scripts/store.js";

    export let name;
    export let admin;
    import {icons} from '../scripts/assets.js'
    import {formatAddress, showPrompt} from "../scripts/helpers.js";

    let account = '';


    function showAddress(account) {
        window.open(`${$activeNetwork.blockExplorer}address/${account}`);
    }


    async function revokeRole(roleName, account) {
        let role = await $vault[roleName]()

        try {
            const revokeRoleTx = await $vault.revokeRole(role, account);
            await showPrompt(revokeRoleTx)

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
            // transactionInProgress.set(false)
        } catch (err) {
            transactionError.set(true)
            console.log(err)
        }

    }

    export let roleHolders;

</script>

<div class="role-container">
  <div class="role-list">
    <div class="role">
      <span>{admin ? 'Role Admin' : 'Executor'}</span>
      {#if roleHolders?.length}
        {#each roleHolders as roleHolder}
          <div>
            {formatAddress(roleHolder.account.address)}
            <img class="btn-hover action-icon" src={icons.show} alt="show"
                 on:click={()=>showAddress(roleHolder.account.address)}/>
            <img class="btn-hover action-icon" src={icons.delete_icon}
                 on:click={()=>revokeRole(name,roleHolder.account.address)}
                 alt="delete"/>
          </div>
        {/each}
      {/if}
    </div>
  </div>
</div>

<style>
    .role-container {
        text-align: left;
        margin-bottom: 25px;
    }


    .role-list {
        display: flex;
        justify-content: space-between;
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 27px;
    }

    .action-icon {
        margin: 0 3px;
    }
</style>