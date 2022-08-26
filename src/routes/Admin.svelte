<script>
    import {navigate} from "svelte-routing";
    import Role from "../components/Role.svelte";
    import {vault, activeNetwork, roles} from "../scripts/store.js";
    import Select from "../components/Select.svelte";
    import {toSentenceCase} from "../scripts/helpers.js";
    import {icons} from "../scripts/assets.js";

    let executorRoles = $roles.filter(r => !r.roleName.includes('_ADMIN'))
    let adminRoles = $roles.filter(r => r.roleName.includes('_ADMIN'))
    let validAccount = true;
    let account = '';

    function goBack() {
        navigate("/", {replace: false});
    }

    function handleRoleSelect(event) {
        console.log(event.detail.selected)
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
      <div class="grant-role-txt f-weight-700">Grant a role</div>
      <div>
        <div class="display-flex">
          <label class="f-weight-700">Role:</label>
          <Select options={$roles.map(r=>r = {...r,name: toSentenceCase(r.roleName)})} on:select={handleRoleSelect}
                  label={'Choose'} className={"inputSelect"} expandIcon={icons.expand_black}></Select>
        </div>
        <label class="f-weight-700">Address:</label>
        <input type="text" class="{validAccount ? 'account-input' : 'account-input invalid-input'}"
               bind:value={account}>
        <br>
        <button>enter</button>
      </div>
      <div class="roles-data">
        <div>
          {#each executorRoles as role}
            <Role name={role.roleName}
                  roleHolders={$roles.find(r=>r.roleName===role.roleName).roleHolders} admin={false}></Role>
          {/each}
        </div>
        <div>
          {#each adminRoles as role}
            <Role roleHolders={$roles.find(r=>r.roleName===role.roleName).roleHolders}
                  name={role.roleName} admin={true}></Role>
          {/each}
        </div>
      </div>
    </div>
  </div>
</div>
<style>
    .sft-admin-container {
        width: 697px;
        height: calc(100vh - 180px);
        background: rgba(44, 44, 84, 0.33);
        border-radius: 20px;
        padding: 12px;
        color: #ffffff;
        margin-top: -65px;
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
        display: flex;
        flex-direction: column;
        align-items: center;
        overflow: hidden;

    }

    .roles {
        text-align: left;
        width: calc(100% - 120px);
    }

    .roles-data {
        overflow: auto;
        height: calc(100% - 465px);
        display: flex;
        width: 100%;
        justify-content: space-between;
        margin-top: 15px;
    }

    .warning {
        font-style: normal;
        color: #000000;
        font-weight: 400;
        font-size: 12px;
        line-height: 20px;
    }

    .contract-address {
        text-decoration: none;
        color: #ffffff;
    }

    .grant-role-txt {
        margin-bottom: 25px;
        margin-top: 5px;
        font-style: normal;
        font-size: 16px;
        line-height: 27px;

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

</style>