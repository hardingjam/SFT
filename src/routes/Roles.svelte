<script>
    import {vault, activeNetwork, roles, data} from "../scripts/store.js";
    import Role from "../components/Role.svelte";
    import Select from "../components/Select.svelte";
    import {
        filterArray,
        getSubgraphData,
        accessControlError,
        toSentenceCase
    } from "../scripts/helpers.js";
    import {icons} from "../scripts/assets.js";
    import {QUERY} from "../scripts/queries.js";
    import {beforeUpdate, onMount} from "svelte";
    import DefaultFrame from "../components/DefaultFrame.svelte";
    import SftLoader from "../components/SftLoader.svelte";

    let executorRoles = []//$roles ? $roles.filter(r => !r.roleName.includes('_ADMIN')) : []
    let validAccount = true;
    let account = '';
    let roleName = '';
    let error = '';

    let loading = false

    beforeUpdate(() => {
        executorRoles = $roles.length ? $roles.filter(r => !r.roleName.includes('_ADMIN')) : []
    });

    onMount(async () => {
            if ($vault && $vault.address) {
                await getSgData($vault.address)
            }
        }
    )

    function handleRoleSelect(event) {
        roleName = event.detail.selected.roleName
    }

    async function grantRole() {
        let role = null
        roleName ? role = await $vault[roleName]() : error = "Select role"
        try {
            if (account) {
                validAccount = true;
                const grantRoleTx = await $vault.grantRole(role, account.trim());
                await grantRoleTx.wait()
                let updatedRoleHolders = $roles.find(r => r.roleName === roleName).roleHolders
                updatedRoleHolders.push({account: {address: account}})
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
            error = err.reason
            if (error.includes('AccessControl')) {
                error = accessControlError(error)
            }
        }
    }

    async function getSgData(vaultAddress) {
        let variables = {id: vaultAddress.toLowerCase()}

        getSubgraphData($activeNetwork, variables, QUERY, 'offchainAssetReceiptVault').then((res) => {
            loading = true
            if (res && res.data) {
                data.set(res.data)
                roles.set(res.data.offchainAssetReceiptVault?.roles || [])
                let rolesFiltered = $roles.map(role => {
                    let roleRevokes = $data.offchainAssetReceiptVault.roleRevokes.filter(r => r.role.roleName === role.roleName)
                    let roleRevokedAccounts = roleRevokes.map(rr => rr.roleHolder.account.address)
                    let filtered = filterArray(role.roleHolders, roleRevokedAccounts)
                    return {roleName: role.roleName, roleHolders: filtered}
                })
                roles.set(rolesFiltered)
                executorRoles = $roles ? $roles.filter(r => !r.roleName.includes('_ADMIN')) : []
                loading = false
            }
        })
    }
</script>
<DefaultFrame header="Roles">
  <div slot="address">
  <span>  Address: <a href={`${$activeNetwork.blockExplorer}address/${$vault.address}`}
                      class="contract-address btn-hover"
                      target="_blank">{$vault.address}</a></span>
  </div>

  <div slot="header-buttons">
    <!--    <button class="header-btn btn-hover" on:click={()=>{navigateTo("#new-schema")}}>New schema</button>-->
  </div>

  <div slot="content">
    <span class="warning">Important - Deleting or adding is permanent on the blockchain. If all role admins are removed  then it will be unrecoverable.</span>
    <div class="roles">
      <div class="grant-role-txt f-weight-700">Grant a role</div>
      <div class="error">{error}</div>
      <div class="role-list">
        <div class="row">
          <label class="f-weight-700 custom-col col-2">Role:</label>
          <div>
            <Select options={$roles.map(r=>{return {...r,displayName: toSentenceCase(r.roleName)}})}

                    on:select={handleRoleSelect}
                    label={'Choose'} className={"inputSelect"} expandIcon={icons.expand_black}></Select>
          </div>

        </div>
        <div class="row">
          <label class="f-weight-700 custom-col col-2">Address:</label>
          <input type="text" class="{validAccount ? 'default-input' : 'default-input invalid-input'}"
                 bind:value={account}>
        </div>
        <button class="default-btn" on:click={grantRole}>Enter</button>
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
                        roleHolders={$roles.find(r=>r.roleName===role.roleName).roleHolders} admin={false}></Role>
                </td>
                <td>
                  <Role roleHolders={$roles.find(r=>r.roleName===role.roleName+"_ADMIN").roleHolders}
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
        color: #000000;
        font-weight: 400;
        font-size: 12px;
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
        text-decoration: none;
        color: inherit;
    }

    .custom-col{
        margin-right: -10px;
    }

</style>