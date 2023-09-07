<script>
    import {
        activeNetwork,
        vault,
        roles,
        transactionError, accountRoles
    } from "../scripts/store.js";

    export let name;
    export let admin;
    import {icons} from '../scripts/assets.js'
    import {formatAddress, navigate, setAccountRoles, showPrompt} from "../scripts/helpers.js";

    let account = '';


    function showAddress(account) {
        navigate(`#address-overview/${account}`)
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
            accountRoles.set(await setAccountRoles($roles, account));

        } catch (err) {
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
          <div class="flex items-center">
            <span class="underline btn-hover flex items-center mr-2 cursor-pointer"
                  on:click={()=>showAddress(roleHolder.account.address)}>
                          {formatAddress(roleHolder.account.address)}
              <img class="action-icon ml-2" src={icons.show} alt="show"/>
            </span>
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

    .role {
        min-width: 150px;
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
        width: 17px;
        height: 17px;
    }
</style>