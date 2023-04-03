<script>
    import {vault, activeNetwork, roles, data, transactionInProgress} from "../scripts/store.js";
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
    import DefaultFrame from "../components/DefaultFrame.svelte";
    import SftLoader from "../components/SftLoader.svelte";
    import {ROLES} from "../scripts/consts.js";
    import TransactionInProgressBanner from "../components/TransactionInProgressBanner.svelte";

    let executorRoles = []//$roles ? $roles.filter(r => !r.roleName.includes('_ADMIN')) : []
    let validAccount = true;
    let account = '';
    let roleName = '';
    let error = '';

    let loading = false


    async function getData() {
        await getSgData($vault.address)
        executorRoles = $roles.length ? $roles.filter(r => !r.roleName.includes('_ADMIN')) : []
    }

    $: $vault && $vault.address && getData();


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
                if (grantRoleTx.hash) {
                    transactionInProgress.set(true)
                }
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
                transactionInProgress.set(false)
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
<div class="roles-container">
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
              <Select options={ROLES.map(r=>{return {...r,displayName: toSentenceCase(r.roleName)}})}

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
  <TransactionInProgressBanner topText="Transaction taking place, please wait">
     <span slot="icon" class="icon">
       <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M11.9803 1.16745C12.6519 1.16445 13.1133 1.16315 13.4648 1.20153C13.5791 1.21401 13.6745 1.23008 13.7556 1.24951L6.66996 8.33516C6.4747 8.53042 6.4747 8.847 6.66996 9.04226C6.86522 9.23752 7.1818 9.23752 7.37707 9.04226L14.4627 1.95662C14.4821 2.03769 14.4982 2.13316 14.5107 2.24739C14.5491 2.59888 14.5478 3.06031 14.5448 3.73189L14.5374 5.38665C14.5362 5.66279 14.759 5.88764 15.0352 5.88887C15.3113 5.89011 15.5362 5.66725 15.5374 5.39111L15.5449 3.70655C15.5477 3.07207 15.5501 2.55351 15.5048 2.13883C15.4577 1.70761 15.354 1.32583 15.0997 0.997307C15.0447 0.926192 14.9853 0.858669 14.922 0.795109C14.857 0.729932 14.7878 0.668926 14.7149 0.612489C14.3864 0.358247 14.0046 0.254535 13.5734 0.207443C13.1587 0.162157 12.6402 0.16448 12.0057 0.167322L10.3211 0.174838C10.045 0.17607 9.82212 0.400925 9.82335 0.677064C9.82458 0.953204 10.0494 1.17606 10.3256 1.17483L11.9803 1.16745Z"
            fill="white"/>
        <path
            d="M8.67233 2.29405C8.26858 2.28921 7.82385 2.28921 7.33517 2.28921H7.30284C6.07848 2.28921 5.11875 2.2892 4.35733 2.3717C3.5803 2.45588 2.95071 2.63076 2.41316 3.02131C2.08774 3.25775 1.80155 3.54394 1.56511 3.86937C1.17456 4.40692 0.999679 5.0365 0.915493 5.81353C0.832998 6.57495 0.833002 7.53469 0.833008 8.75905V8.81938C0.833002 10.0437 0.832998 11.0035 0.915493 11.7649C0.999679 12.5419 1.17456 13.1715 1.56511 13.7091C1.80155 14.0345 2.08773 14.3207 2.41317 14.5571C2.95071 14.9477 3.5803 15.1225 4.35733 15.2067C5.11874 15.2892 6.07845 15.2892 7.30278 15.2892H7.36319C8.58751 15.2892 9.54728 15.2892 10.3087 15.2067C11.0857 15.1225 11.7153 14.9477 12.2529 14.5571C12.5783 14.3207 12.8645 14.0345 13.1009 13.7091C13.4915 13.1715 13.6663 12.5419 13.7505 11.7649C13.833 11.0035 13.833 10.0438 13.833 8.81944V8.78691C13.833 8.29828 13.833 7.8536 13.8282 7.44989C13.8249 7.17376 13.5983 6.9526 13.3222 6.95591C13.0461 6.95922 12.8249 7.18575 12.8282 7.46187C12.833 7.85905 12.833 8.29809 12.833 8.78921C12.833 10.0503 12.8323 10.9559 12.7563 11.6572C12.6814 12.3491 12.5379 12.7826 12.2919 13.1213C12.1171 13.3618 11.9056 13.5733 11.6651 13.7481C11.3264 13.9942 10.8929 14.1376 10.201 14.2125C9.49968 14.2885 8.59406 14.2892 7.33301 14.2892C6.07196 14.2892 5.16634 14.2885 4.46504 14.2125C3.7731 14.1376 3.33962 13.9942 3.00095 13.7481C2.76042 13.5733 2.54889 13.3618 2.37413 13.1213C2.12807 12.7826 1.98464 12.3491 1.90968 11.6572C1.83369 10.9559 1.83301 10.0503 1.83301 8.78921C1.83301 7.52816 1.83369 6.62254 1.90968 5.92124C1.98464 5.2293 2.12807 4.79582 2.37413 4.45715C2.54889 4.21662 2.76041 4.00509 3.00095 3.83033C3.33962 3.58427 3.7731 3.44085 4.46504 3.36588C5.16634 3.2899 6.07196 3.28921 7.33301 3.28921C7.82413 3.28921 8.26317 3.28922 8.66035 3.29398C8.93647 3.29729 9.163 3.07613 9.16631 2.80001C9.16962 2.52389 8.94846 2.29736 8.67233 2.29405Z"
            fill="white"/>
        <path
            d="M11.9803 1.16745C12.6519 1.16445 13.1133 1.16315 13.4648 1.20153C13.5791 1.21401 13.6745 1.23008 13.7556 1.24951L6.66996 8.33516C6.4747 8.53042 6.4747 8.847 6.66996 9.04226C6.86522 9.23752 7.1818 9.23752 7.37707 9.04226L14.4627 1.95662C14.4821 2.03769 14.4982 2.13316 14.5107 2.24739C14.5491 2.59888 14.5478 3.06031 14.5448 3.73189L14.5374 5.38665C14.5362 5.66279 14.759 5.88764 15.0352 5.88887C15.3113 5.89011 15.5362 5.66725 15.5374 5.39111L15.5449 3.70655C15.5477 3.07207 15.5501 2.55351 15.5048 2.13883C15.4577 1.70761 15.354 1.32583 15.0997 0.997307C15.0447 0.926192 14.9853 0.858669 14.922 0.795109C14.857 0.729932 14.7878 0.668926 14.7149 0.612489C14.3864 0.358247 14.0046 0.254535 13.5734 0.207443C13.1587 0.162157 12.6402 0.16448 12.0057 0.167322L10.3211 0.174838C10.045 0.17607 9.82212 0.400925 9.82335 0.677064C9.82458 0.953204 10.0494 1.17606 10.3256 1.17483L11.9803 1.16745Z"
            stroke="white" stroke-linecap="round"/>
        <path
            d="M8.67233 2.29405C8.26858 2.28921 7.82385 2.28921 7.33517 2.28921H7.30284C6.07848 2.28921 5.11875 2.2892 4.35733 2.3717C3.5803 2.45588 2.95071 2.63076 2.41316 3.02131C2.08774 3.25775 1.80155 3.54394 1.56511 3.86937C1.17456 4.40692 0.999679 5.0365 0.915493 5.81353C0.832998 6.57495 0.833002 7.53469 0.833008 8.75905V8.81938C0.833002 10.0437 0.832998 11.0035 0.915493 11.7649C0.999679 12.5419 1.17456 13.1715 1.56511 13.7091C1.80155 14.0345 2.08773 14.3207 2.41317 14.5571C2.95071 14.9477 3.5803 15.1225 4.35733 15.2067C5.11874 15.2892 6.07845 15.2892 7.30278 15.2892H7.36319C8.58751 15.2892 9.54728 15.2892 10.3087 15.2067C11.0857 15.1225 11.7153 14.9477 12.2529 14.5571C12.5783 14.3207 12.8645 14.0345 13.1009 13.7091C13.4915 13.1715 13.6663 12.5419 13.7505 11.7649C13.833 11.0035 13.833 10.0438 13.833 8.81944V8.78691C13.833 8.29828 13.833 7.8536 13.8282 7.44989C13.8249 7.17376 13.5983 6.9526 13.3222 6.95591C13.0461 6.95922 12.8249 7.18575 12.8282 7.46187C12.833 7.85905 12.833 8.29809 12.833 8.78921C12.833 10.0503 12.8323 10.9559 12.7563 11.6572C12.6814 12.3491 12.5379 12.7826 12.2919 13.1213C12.1171 13.3618 11.9056 13.5733 11.6651 13.7481C11.3264 13.9942 10.8929 14.1376 10.201 14.2125C9.49968 14.2885 8.59406 14.2892 7.33301 14.2892C6.07196 14.2892 5.16634 14.2885 4.46504 14.2125C3.7731 14.1376 3.33962 13.9942 3.00095 13.7481C2.76042 13.5733 2.54889 13.3618 2.37413 13.1213C2.12807 12.7826 1.98464 12.3491 1.90968 11.6572C1.83369 10.9559 1.83301 10.0503 1.83301 8.78921C1.83301 7.52816 1.83369 6.62254 1.90968 5.92124C1.98464 5.2293 2.12807 4.79582 2.37413 4.45715C2.54889 4.21662 2.76041 4.00509 3.00095 3.83033C3.33962 3.58427 3.7731 3.44085 4.46504 3.36588C5.16634 3.2899 6.07196 3.28921 7.33301 3.28921C7.82413 3.28921 8.26317 3.28922 8.66035 3.29398C8.93647 3.29729 9.163 3.07613 9.16631 2.80001C9.16962 2.52389 8.94846 2.29736 8.67233 2.29405Z"
            stroke="white" stroke-linecap="round"/>
       </svg>
     </span>
  </TransactionInProgressBanner>

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

    .custom-col {
        margin-right: -10px;
    }

    .roles-container {
        position: relative;
    }

</style>