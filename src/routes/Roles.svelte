<script>
    import {
        vault,
        roles,
        data, accountRoles, pageTitle, titleIcon,
    } from "../scripts/store.js";
    import Role from "../components/Role.svelte";
    import Select from "../components/Select.svelte";
    import {
        accessControlError,
        toSentenceCase, showPrompt, setAccountRoles, navigate
    } from "../scripts/helpers.js";
    import {icons} from "../scripts/assets.js";
    import SftLoader from "../components/SftLoader.svelte";
    import {ROLES} from "../scripts/consts.js";
    import {ethers} from "ethers";
    import {onMount} from 'svelte';

    let executorRoles = []//$roles ? $roles.filter(r => !r.roleName.includes('_ADMIN')) : []
    let account = '';
    let roleName = '';
    let error = '';

    let loading = false
    let accountValid = true;

    async function getData() {
        executorRoles = $roles.length ? $roles.filter(r => !r.roleName?.includes('_ADMIN')) : []
    }

    $: ($vault && $vault.address) && getData();
    $: account && validateAccount();

    function validateAccount() {
        error = ""
        accountValid = ethers.utils.isAddress(account)
        if (!accountValid) {
            error = "Address is not valid"
        }
    }

    function handleRoleSelect(event) {
        roleName = event.detail.selected.roleName
    }

    async function grantRole() {
        error = ""
        let role = null
        roleName ? role = ROLES.find(r => r.roleName === roleName).roleHash : error = "Select role"

        if (!account) {
            error = "Enter address"
        }

        try {
            if (error) {
                return
            }
            if (account && accountValid) {
                const grantRoleTx = await $vault.grantRole(role, account.trim());
                await showPrompt(grantRoleTx)
                let roleRevokes = $data.offchainAssetReceiptVault.roleRevokes;
                let revokedAccounts = []
                if (roleRevokes.length) {
                    roleRevokes = roleRevokes.filter(r => r.role.roleName === roleName)
                    revokedAccounts = roleRevokes.map(r => r.roleHolder.account.address)
                }
                if (revokedAccounts.indexOf(account.toLowerCase()) < 0) {
                    let updatedRoleHolders = $roles.find(r => r.roleName === roleName).roleHolders
                    updatedRoleHolders.push({account: {address: account.toLowerCase()}})
                    const newRoles = $roles.map(role => {
                        if (role.roleName === roleName) {
                            return {...role, roleHolders: updatedRoleHolders};
                        }
                        return role;
                    });
                    roles.set([...newRoles])
                    accountRoles.set(await setAccountRoles($roles, account.trim()));
                }

            }

        } catch (err) {
            error = err.reason || ""
            if (error && error?.includes('AccessControl')) {
                error = accessControlError(error)
            }
        }
    }

    onMount(() => {
        pageTitle.set("SFT roles")
        titleIcon.set(`${icons.roles_icon}`)
    })

</script>
<div class="roles-container">
  <div class="w-full flex justify-between roles-head">
    <div class="grant-role-txt f-weight-700 flex gap-2">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path
          d="M4 20V19C4 16.2386 6.23858 14 9 14H12.75M17.5355 13.9645V17.5M17.5355 17.5V21.0355M17.5355 17.5H21.0711M17.5355 17.5H14M15 7C15 9.20914 13.2091 11 11 11C8.79086 11 7 9.20914 7 7C7 4.79086 8.79086 3 11 3C13.2091 3 15 4.79086 15 7Z"
          stroke="#575757" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      SFT Roles
    </div>

    <button class="asset-class-btn default-btn" on:click={()=>{navigate("#new-asset-class")}}>
      New asset class
    </button>
  </div>
  <div class="roles">

    <div class="info">
      Roles are granted to specific addresses to control certain duties of a token. Every role has admins control who
      has the role, and admin for that role. Admins need to grant themselves their role to perform those duties.
    </div>
    <div class="error">{error}</div>
    <div class="role-list">
      <table>
        <tr>
          <td class="flex items-center">
            <img src={icons.plus_sign} alt="add" class="plus">
            <label class="f-weight-700">Role:</label></td>
          <td>
            <div>
              <Select options={ROLES.map(r=>{return {...r,displayName: toSentenceCase(r.roleName)}})}

                      on:select={handleRoleSelect}
                      label={'Choose'} className={"rolesInputSelect"} expandIcon={icons.expand_black}></Select>
            </div>
          </td>
        </tr>
        <tr>
          <td><label class="f-weight-700">Address:</label></td>
          <td><input type="text" class="default-input"
                     bind:value={account}></td>
        </tr>
      </table>
      <button class="default-btn" on:click={grantRole} disabled={!!error || !account || !roleName}>Enter</button>
    </div>
    <div class="warning error">Important - Deleting or adding is permanent on the blockchain. If all role admins are
      removed then it will be unrecoverable.
    </div>

    {#if loading}
      <SftLoader width="50"></SftLoader>
    {/if}
    {#if !loading}
      <div class="roles-data">

        <table>
          {#each executorRoles as role}
            <tr>
              <td>
                <span class="title f-weight-700">{role.roleName}</span>
              </td>
            </tr>
            <tr>
              <td>
                <Role name={role.roleName}
                      roleHolders={$roles?.find(r=>r.roleName===role.roleName)?.roleHolders} admin={false}></Role>
              </td>
              <td>
                <Role roleHolders={$roles?.find(r=>r.roleName===role.roleName+"_ADMIN")?.roleHolders}
                      name={role.roleName+"_ADMIN"} admin={true}></Role>
              </td>
            </tr>
          {/each}
        </table>
      </div>

    {/if}
  </div>
</div>


<style>

    .roles-container {
        border-radius: 10px;
        background: #FFF;
        min-width: 690px;
    }

    .roles-head {
        padding: 14px 38px;
        display: flex;
        align-items: center;
        border-bottom: 1px solid #EAEAEA;
    }

    .info {
        color: #575757;
        font-family: Mukta, sans-serif;
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
    }

    .roles {
        text-align: left;
        width: 650px;
        border-radius: 10px;
        padding: 34px 71px
    }

    .roles-data {
        overflow: auto;
        height: fit-content;
        display: flex;
        width: 100%;
        justify-content: space-between;
        margin-top: 15px;
    }

    .warning {
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 20px;
        margin-top: 18px;
        margin-bottom: 30px
    }

    .grant-role-txt {
        margin-top: 5px;
        font-style: normal;
        font-size: 16px;
        line-height: 27px;
    }

    .role-list {
        margin-top: 25px;
    }


    table {
        width: 100%;
    }

    td {
        vertical-align: top;
    }

    .title {
        font-style: normal;
        font-size: 16px;
        line-height: 27px;
        color: #000000;
    }

    .default-input {
        padding-left: 13px;
    }

    .plus {
        margin-left: -30px;
        margin-right: 13px;
    }

</style>