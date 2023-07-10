<script>
    import {
        vault,
        activeNetwork,
        roles,
        data,
        transactionError, accountRoles,
    } from "../scripts/store.js";
    import Role from "../components/Role.svelte";
    import Select from "../components/Select.svelte";
    import {
        accessControlError,
        toSentenceCase, showPrompt, setAccountRoles
    } from "../scripts/helpers.js";
    import {icons} from "../scripts/assets.js";
    import DefaultFrame from "../components/DefaultFrame.svelte";
    import SftLoader from "../components/SftLoader.svelte";
    import {ROLES} from "../scripts/consts.js";
    import {ethers} from "ethers";

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


</script>
<div class="roles-container">
  <DefaultFrame header="Roles">

    <div slot="address">
  <span>Token address: <a href={`${$activeNetwork?.blockExplorer}/address/${$vault.address}`}
                          class="contract-address underline"
                          target="_blank">{$vault.address}</a></span>
    </div>

    <div slot="header-buttons">
      <!--    <button class="header-btn btn-hover" on:click={()=>{navigateTo("#new-schema")}}>New schema</button>-->
    </div>

    <div slot="content">
      <span class="warning error">Important - Deleting or adding is permanent on the blockchain. If all role admins are removed  then it will be unrecoverable.</span>
      <div class="roles">
        <div class="grant-role-txt f-weight-700">Grant a role</div>
        <div class="error">{error}</div>
        <div class="role-list">
          <table>
            <tr>
              <td><label class="f-weight-700">Role:</label></td>
              <td>
                <div>
                  <Select options={ROLES.map(r=>{return {...r,displayName: toSentenceCase(r.roleName)}})}

                          on:select={handleRoleSelect}
                          label={'Choose'} className={"inputSelect"} expandIcon={icons.expand_black}></Select>
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
  </DefaultFrame>
</div>


<style>

    .roles {
        text-align: left;
    }

    .roles-data {
        overflow: auto;
        /*height: calc(100vh - 515px);*/
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

    .contract-address {
        color: inherit;
    }

    .default-input {
        padding-left: 13px;
    }

</style>