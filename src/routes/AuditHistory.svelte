<script>
    import DefaultFrame from "../components/DefaultFrame.svelte";
    import {navigateTo} from "yrv";
    import {
        vault,
        auditHistory,
        activeNetwork,
        account,
        selectedReceipt,
        ethersData,
        transactionError
    } from "../scripts/store";
    import {onMount} from "svelte";
    import {cborDecode, getSubgraphData, hasRole, showPrompt, timeStampToDate} from "../scripts/helpers.js";
    import {AUDIT_HISTORY_DATA_QUERY} from "../scripts/queries.js";
    import {ethers} from "ethers";
    import {formatAddress, formatDate} from "../scripts/helpers";
    import {
        IPFS_GETWAY,
        MAGIC_NUMBERS,
    } from "../scripts/consts.js";
    import axios from "axios";
    import SftLoader from "../components/SftLoader.svelte";

    let error = ''
    let certifyUntil = formatDate(new Date())
    let certifyData = []
    let receipts = []
    let loading = false;
    let tempReceipts = []

    $:tempReceipts && setAssetClasses()

    async function setAssetClasses() {
        receipts = await Promise.all(tempReceipts.map(async (r) => {
            let information = r.receipt.receiptInformations[0]?.information ? cborDecode(r.receipt.receiptInformations[0]?.information.slice(18)) : null
            let schemaHash = information ? information[0].get(MAGIC_NUMBERS.OA_SCHEMA) : null
            let schema;
            if (schemaHash) {

                try {
                    let res = await axios.get(`${IPFS_GETWAY}${schemaHash}`)
                    if (res) {
                        schema = res.data.displayName
                    }
                } catch (err) {
                    console.log(err)
                }
            }

            return {...r, information, schema}
        }))
    }

    async function getAuditHistory() {
        if ($vault.address) {
            let data = await getSubgraphData($activeNetwork, {id: $vault.address.toLowerCase()}, AUDIT_HISTORY_DATA_QUERY, 'offchainAssetReceiptVault')
            if (data) {
                let temp = data.data.offchainAssetReceiptVault
                auditHistory.set(temp)
            } else {
                auditHistory.set({})
            }
        }
        certifyData = $auditHistory?.certifications || []
        tempReceipts = $auditHistory?.deposits || []
    }


    onMount(async () => {
        if (!$auditHistory.id) {
            loading = true;
            await getAuditHistory()
            setInterval(getAuditHistory, 5000)
            loading = false
        } else {
            certifyData = $auditHistory?.certifications || []
            tempReceipts = $auditHistory?.deposits || []
        }

    })

    async function certify() {
        //Set date to the nearest Midnight in the future
        let untilToTime = new Date(certifyUntil).setHours(23, 59, 59, 0)
        untilToTime = new Date(untilToTime).getTime()

        const hasRoleCertifier = await hasRole($vault, $account, "CERTIFIER")
        const _referenceBlockNumber = await $ethersData.provider.getBlockNumber();
        if (!hasRoleCertifier.error) {
            try {

                let certifyTx = await $vault.certify(untilToTime / 1000, _referenceBlockNumber, false, [])
                await showPrompt(certifyTx).then(() => {
                    certifyData = [...certifyData, {
                        timestamp: Math.floor(new Date().getTime() / 1000),
                        certifier: {address: $account},
                        certifiedUntil: Math.floor(untilToTime / 1000),
                        totalShares: ethers.BigNumber.from($auditHistory?.totalShares)
                    }]
                })

            } catch (e) {
                transactionError.set(true)
                console.log(e)
            }


        } else {
            error = hasRoleCertifier.error
        }
    }

    function goToReceiptAudit(receipt) {
        selectedReceipt.set(receipt)
        navigateTo(`/receipt/${$selectedReceipt.receipt.receiptId}`, {replace: false})
    }
</script>
<DefaultFrame header="Audit history">
  <div slot="header-buttons" class="display-flex">
    <button class="header-btn btn-hover" on:click={()=>{navigateTo("/members")}}>Members</button>
    <button class="header-btn btn-hover" on:click={()=>{navigateTo("/roles")}}>Roles</button>
  </div>
  <div slot="content">
    <div class="history">
      <div class="receipts">
        {#if loading}
          <SftLoader width="50"></SftLoader>
        {/if}
        {#if !loading}
          <table>
            <thead>
            <tr>
              <th>Receipt ID</th>
              <th>Asset class</th>
              <th>Amount</th>
              <th>Last updated</th>
            </tr>
            </thead>
            <tbody>
            {#each receipts as receipt}
              <!--            <tr class="tb-row" on:click={()=>{goToReceiptAudit(receipt)}}>-->
              <tr class="tb-row">
                <td>{receipt.receipt.receiptId}</td>
                <td>{receipt.schema || ""}</td>
                <td>{ethers.utils.formatUnits(receipt.amount, 18)}</td>
                <td>{timeStampToDate(receipt.timestamp)}</td>
              </tr>
            {/each}
            </tbody>
          </table>
        {/if}
      </div>
      <div class="certify">
        <table>
          <thead>
          <tr>
            <th>Total amount</th>
            <th>Certified on</th>
            <th>Certified by</th>
            <th>Certified until</th>
          </tr>
          </thead>
          <tbody>
          {#each certifyData as cert}
            <tr>
              <td>{ethers.utils.formatUnits(cert?.totalShares, 18)}</td>
              <td>{timeStampToDate(cert?.timestamp)}</td>
              <td>{formatAddress(cert?.certifier.address)}</td>
              <td class="until">{timeStampToDate(cert?.certifiedUntil)}</td>
            </tr>
          {/each}
          </tbody>
        </table>
      </div>
      <div class="certify-btn-container">
        <input type="date" class="default-input certify-date-input" bind:value={certifyUntil}>
        <button class="default-btn" on:click={() => certify()}>Certify</button>
      </div>
      <div class="error">
        {error}
        <!--        System frozen until certified-->
      </div>
    </div>

  </div>

</DefaultFrame>
<style>

    .history {
        text-align: left;
        display: flex;
        flex-direction: column;
        width: 678px;
        min-height: 530px;
        position: relative;
    }

    table {
        width: 100%;
    }

    thead, tbody {
        text-align: center;
    }

    th {
        white-space: nowrap;
    }

    th, td {
        text-align: left;
    }

    td {
        padding-left: 10px;
    }

    .receipts {
        height: 300px;
        border-bottom: 1px solid #D2D2D2;
        overflow: auto;
    }

    .receipts table th {
        width: 33%;
    }

    .certify {
        margin-top: 30px;
        height: 180px;
        overflow: auto;
    }

    .certify-btn-container {
        display: flex;
        justify-content: end;
        margin-top: 10px
    }

    .certify-date-input {
        margin-right: 5px;
        width: 130px;
        border: none;
        box-sizing: border-box;
        outline: 0;
        position: relative;
        text-align: center;
    }

    .until {
        color: #F11717;;
    }

    .default-input {
        padding-left: 0;
    }

    input[type="date"]::-webkit-calendar-picker-indicator {
        background: transparent;
        bottom: 0;
        color: transparent;
        cursor: pointer;
        height: auto;
        left: 0;
        position: absolute;
        right: 0;
        top: 0;
        width: auto;
    }

</style>