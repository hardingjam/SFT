<script>
    import {navigate} from "svelte-routing";
    import Role from "../components/Role.svelte";
    import {vault, activeNetwork, roles} from "../scripts/store.js";

    let executorRoles = $roles.filter(r => !r.roleName.includes('_ADMIN'))

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
      <table>
        {#each executorRoles as role}
          <tr>
            <td>
              <Role name={role.roleName}
                    roleHolders={$roles.find(r=>r.roleName===role.roleName).roleHolders}></Role>
            </td>
            <td>
              <Role roleHolders={$roles.find(r=>r.roleName===role.roleName+"_ADMIN").roleHolders} name={""}></Role>
            </td>
          </tr>
        {/each}
      </table>
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
        display: flex;
        justify-content: center;
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

    td {
        vertical-align: top;
        padding: 0 5px;
    }

</style>