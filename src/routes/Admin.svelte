<script>
    import {vault, activeNetwork, roles, data} from "../scripts/store.js";
    import {navigateTo} from "yrv";
    import Role from "../components/Role.svelte";
    import Select from "../components/Select.svelte";
    import {filterArray, getSubgraphData, toSentenceCase} from "../scripts/helpers.js";
    import {icons} from "../scripts/assets.js";
    import {QUERY} from "../scripts/consts.js";
    import {onMount} from "svelte";

    let executorRoles = []//$roles ? $roles.filter(r => !r.roleName.includes('_ADMIN')) : []
    let validAccount = true;
    let account = '';
    let roleName = '';

    onMount(async () => {
            if ($vault) {
                await getSgData($vault.address)
            }
        }
    )

    function goBack() {
        navigateTo("#setup", {replace: false});
    }

    function goToMint() {
        navigateTo("#mint", {replace: false});
    }

    function handleRoleSelect(event) {
        roleName = event.detail.selected.roleName
    }

    async function grantRole() {
        let role = await $vault[roleName]()
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
            console.log(err)
        }
    }

    async function getSgData(vaultAddress) {
        let variables = {id: vaultAddress.toLowerCase()}

        getSubgraphData($activeNetwork, variables, QUERY, 'offchainAssetVault').then((res) => {
            if (res && res.data) {
                data.set(res.data)
                roles.set($data.offchainAssetVault.roles)
                let rolesFiltered = $roles.map(role => {
                    let roleRevokes = $data.offchainAssetVault.roleRevokes.filter(r => r.role.roleName === role.roleName)
                    let roleRevokedAccounts = roleRevokes.map(rr => rr.roleHolder.account.address)
                    let filtered = filterArray(role.roleHolders, roleRevokedAccounts)
                    return {roleName: role.roleName, roleHolders: filtered}
                })
                roles.set(rolesFiltered)
                executorRoles = $roles ? $roles.filter(r => !r.roleName.includes('_ADMIN')) : []
            }
        })
    }
</script>
<div class="sft-admin-container">
  <div class="admin-header">
    <span>Admin</span>
    <div>
      <button class="btn-back btn-hover" on:click={()=>goToMint()}>Mint/Redeem</button>
      <button class="btn-back btn-hover" on:click={()=>goBack()}>Back</button>
    </div>

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
          {#if $roles.length}
            <Select options={$roles.map(r=>{return {...r,displayName: toSentenceCase(r.roleName)}})}

                    on:select={handleRoleSelect}
                    label={'Choose'} className={"inputSelect"} expandIcon={icons.expand_black}></Select>
          {/if}
        </div>
        <label class="f-weight-700">Address:</label>
        <input type="text" class="{validAccount ? 'default-input' : 'default-input invalid-input'}"
               bind:value={account}>
        <br>
        <button class="default-btn" on:click={grantRole}>Enter</button>
      </div>
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
    </div>
  </div>
</div>
<style>
    .sft-admin-container {
        width: 697px;
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
        background: #FFFFFF;
        border-radius: 10px;
        color: #000000;
        display: flex;
        flex-direction: column;
        overflow: hidden;

    }

    .roles {
        text-align: left;
        margin-left: 60px;
    }

    .roles-data {
        overflow: auto;
        height: calc(100vh - 480px);
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

</style>