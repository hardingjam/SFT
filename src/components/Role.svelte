<script>
    import {activeNetwork, vault} from "../scripts/store.js";
    import Modal from "sv-bootstrap-modal";

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
            await $vault.grantRole(role, account);
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
      <img class="btn-hover hidden" src={plus_sign} alt="add new" on:click={()=>showModal(name)}/>
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
      <img class="btn-hover hidden" src={plus_sign} alt="add new" on:click={()=>showModal(name,true)}/>
    </div>
  </div>

  <Modal bind:open={isOpen}>
    <div class="modal-header">
      <h5 class="modal-title">Grant {roleToBeGranted} Role to:</h5>
      <button type="button" class="close" on:click={() => (isOpen = false)}>
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body"><input type="text" bind:value={account}></div>
    <div class="modal-footer">
      <button type="button" class="btn btn-secondary" on:click={() => (isOpen = false)}>Close</button>
      <button type="button" class="btn btn-primary" on:click={() => grantRole()}>Submit</button>
    </div>
  </Modal>

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
</style>