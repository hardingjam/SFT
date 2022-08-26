<script>
    import {activeNetwork, vault, roles} from "../scripts/store.js";

    export let name;
    export let admin;
    import {icons} from '../scripts/assets.js'

    let account = '';


    function showAddress(account) {
        window.open(`${$activeNetwork.blockExplorer}address/${account}`);
    }

    // async function grantRole(roleName) {
    //     let role = await $vault[roleName]()
    //     try {
    //         if (account) {
    //             validAccount = true;
    //             const grantRoleTx = await $vault.grantRole(role, account);
    //             await grantRoleTx.wait()
    //             let updatedRoleHolders = $roles.find(r => r.roleName === roleName).roleHolders
    //             updatedRoleHolders.push(account)
    //             const newRoles = $roles.map(role => {
    //                 if (role.roleName === roleName) {
    //                     return {...role, roleHolders: updatedRoleHolders};
    //                 }
    //                 return role;
    //             });
    //             roles.set([...newRoles])
    //             account = "";
    //         } else {
    //             validAccount = false;
    //         }
    //
    //     } catch (err) {
    //         console.log(err)
    //     }
    // }

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
  {#if !admin}
    <span class="title f-weight-700">{name}</span>
  {/if}
  {#if admin}
    <br>
  {/if}
  <div class="role-list">
    <div class="role">
      <span>{admin ? 'Role Admin' : 'Executor'}</span>
      {#each roleHolders as roleHolder}
        <div>
          {roleHolder.replace(/(.{7}).*/, "$1…")}
          <img class="btn-hover" src={icons.show} alt="show" on:click={()=>showAddress(roleHolder)}/>
          <img class="btn-hover hidden" src={icons.delete_icon} on:click={()=>revokeRole(name,roleHolder)}
               alt="delete"/>
        </div>
      {/each}
    </div>
  </div>
</div>

<style>
    .role-container {
        text-align: left;
    }

    .title {
        font-style: normal;
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
</style>