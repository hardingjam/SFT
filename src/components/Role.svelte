<script>
    import {activeNetwork, vault} from "../scripts/store.js";

    let isOpen = false;

    export let name;
    export let executors;
    export let admins
    import show from '../assets/icons/show.svg';
    import delete_icon from '../assets/icons/delete.svg';
    import plus_sign from '../assets/icons/plus-sign.svg';

    let roleToBeGranted;
    let account = '';

    function showAddress(account) {
        window.open(`${$activeNetwork.blockExplorer}address/${account}`);
    }

    async function showModal(roleName, isAdminRole) {
        isOpen = true;
        roleToBeGranted = isAdminRole ? roleName.toUpperCase() + "_ADMIN" : roleName.toUpperCase()
    }

    async function grantRole() {
        let role = await $vault[roleToBeGranted]()
        try {
            const grantRoleTx = await $vault.grantRole(role, account);
            await grantRoleTx.wait()
            isOpen = false;
        } catch (err) {
            console.log(err)
        }
    }

</script>

<div class="role-container">
  <span class="title">{name}</span>
  <div class="role-list">
    <div class="executor">
      <span>Executor</span>
      {#each executors as executor}
        <div>
          {executor.replace(/(.{7}).*/, "$1…")}
          <img class="btn-hover" src={show} alt="show" on:click={()=>showAddress(executor)}/>
          <img class="btn-hover hidden" src={delete_icon} alt="delete"/>
        </div>
      {/each}
      <div class="grant-tole hidden">
        <img class="btn-hover" src={plus_sign} alt="add new" on:click={()=>grantRole(name)}/>
        <input type="text" class="account-input" bind:value={account}>
      </div>
    </div>
    <div class="role-admin">
      <span>Role Admin</span>
      {#each admins as admin}
        <div>
          {admin.replace(/(.{7}).*/, "$1…")}
          <img class="btn-hover" src={show} alt="show" on:click={()=>showAddress(admin)}/>
          <img class="btn-hover hidden" src={delete_icon} alt="delete"/>
        </div>
      {/each}
      <div class="grant-tole hidden">
        <img class="btn-hover" src={plus_sign} alt="add new" on:click={()=>grantRole(name,true)}/>
        <input type="text" class="account-input" bind:value={account}>
      </div>
    </div>
  </div>
</div>

<style>
    .role-container {
        text-align: left;
        margin-left: 56px;
        margin-right: 56px;
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
        border: none;
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