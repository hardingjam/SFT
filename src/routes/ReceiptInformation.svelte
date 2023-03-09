<script>
    import {createEventDispatcher, onMount} from "svelte";
    import {activeNetwork, vault} from "../scripts/store.js";
    import {
        formatAddress,
        getIpfsGetWay,
        getReceiptBalance,
        getSubgraphData,
        hexToString,
        toSentenceCase
    } from "../scripts/helpers.js";
    import {RECEIPT_INFORMATION_QUERY} from "../scripts/queries.js";
    import axios from "axios";
    import {icons} from "../scripts/assets.js";
    import {ethers} from "ethers";
    import {IPFS_GETWAY} from "../scripts/consts.js";
    import SftLoader from "../components/SftLoader.svelte";

    export let receipt = {}
    let receiptBalance = null
    let receiptInformations = {}
    let displayInformation = []
    let ipfsAddress = ""
    let ipfsLoading = false
    let schema = {}
    let schemaId = null;
    let loading = false
    let fileUploadProperties = []

    onMount(async () => {
        receiptBalance = await getReceiptBalance($activeNetwork, $vault, receipt.receipt.receiptId);
        await getReceiptData(receipt)
    })

    $: schemaId && getSchemaFileProps()

    async function getSchema() {
        let variables = {id: schemaId}

        let query = `
          query($id: ID!) {
            receiptVaultInformation(id: $id) {
                id,
                information
            }
          }
         `
        if ($vault.address) {
            try {
                let resp = await getSubgraphData($activeNetwork, variables, query, 'receiptVaultInformation')
                let byteInfo = ""
                if (resp && resp.data && resp.data.receiptVaultInformation) {
                    byteInfo = resp.data.receiptVaultInformation.information
                    let infoHash = hexToString(byteInfo.slice(2))
                    let url = await getIpfsGetWay(infoHash)
                    try {
                        if (url) {
                            let res = await axios.get(url)
                            if (res) {
                                schema = res.data
                            }
                        }
                    } catch (err) {
                        // console.log(err)
                    }
                }
            } catch (err) {
                console.log(err)
            }
        }
    }

    async function getSchemaFileProps() {
        await getSchema()
        if (schema) {
            let props = Object.keys(schema.schema.properties)
            fileUploadProperties = props.filter(p => {
                let value = schema.schema.properties[p]
                if (value.editor === "upload") {
                    return p
                }
            })
            fileUploadProperties = fileUploadProperties.map(p=>toSentenceCase(p))
        }
    }

    async function getReceiptData(receipt) {
        loading = true;
        let variables = {id: receipt.receipt.id}
        let resp = await getSubgraphData($activeNetwork, variables, RECEIPT_INFORMATION_QUERY, 'receipt')
        let receiptInfo = ""
        let byteInfo = ""

        if (resp && resp.data && resp.data.receipt) {
            ipfsLoading = true;
            receiptInfo = resp.data.receipt.receiptInformations

            if (receiptInfo.length) {
                byteInfo = receiptInfo[0].information
                let infoHash = hexToString(byteInfo.slice(2))
                ipfsAddress = `ipfs://${infoHash}`
                let url = await getIpfsGetWay(infoHash)
                try {
                    let res = await axios.get(url)
                    if (res) {
                        receiptInformations = res.data
                        schemaId = res.data.schema
                        displayInformation = Object.keys(receiptInformations).map(prop => {
                            return {
                                label: toSentenceCase(prop),
                                value: receiptInformations[prop]
                            }
                        })
                        displayInformation = displayInformation.filter(d => d.label !== "Schema" && d.label !== "Schemahash")
                        ipfsLoading = false;
                    }
                } catch (err) {
                    console.log(err)
                }

            }
        }
    }

    const dispatch = createEventDispatcher();

    function backButtonClicked() {
        dispatch('back', {
            showReceiptInfo: false
        });
    }

    function isAddress(value) {
        return ethers.utils.isAddress(value)
    }

</script>
<div class="receipt-info-container">
  <div class="header-buttons">
    <button class="default-btn back-to-receipts" on:click={()=>{backButtonClicked()}}> back</button>
  </div>
  <div class="basic-frame-parent">
    <div class="basic-frame receipt-info">
      <div class="receipt-row-header">
        <span class="f-weight-700">Receipt ID (NFT): {receipt.receipt.receiptId}</span>
        <div class="date"></div>
      </div>
      <div class="receipt-row">
        <span class="f-weight-700">Sft amount </span>
        <div class="date f-weight-700">{receiptBalance ? ethers.utils.formatUnits(receiptBalance) : ''}</div>
      </div>
      {#if (ipfsLoading)}
        <div class="ipfs-hash">
          <span class="f-weight-700">{ipfsAddress}</span>
          <SftLoader width="50"></SftLoader>
        </div>
      {/if}
      {#each displayInformation as info}
        <div class="receipt-row">

          {#if fileUploadProperties.includes(info.label)}
            <span>{info.label}
              <a href={`${IPFS_GETWAY}${info.value}`} target="_blank">
                    <img src="{icons.show}" alt="view file" class="btn-hover">
              </a>
            </span>
          {/if}

          {#if !fileUploadProperties.includes(info.label)} <span>{info.label}</span>
            {#if isAddress(info.value)}
              <div>{formatAddress(info.value)}</div>
            {/if}
            {#if !isAddress(info.value)}
              <div>{info.value}</div>
            {/if}
          {/if}

        </div>
      {/each}

    </div>
  </div>
</div>

<style>
    .receipt-info-container {
        padding-top: 10px;
    }

    .header-buttons {
        display: flex;
        width: 100%;
        justify-content: right;
        padding: 0 12px 0 12px;
    }

    .back-to-receipts {

    }

    .receipt-info {
        min-height: 250px;
        padding: 10px 20px;
    }

    .receipt-row-header {
        display: flex;
        justify-content: space-between;
    }

    .receipt-row {
        padding: 2px 0;
        display: flex;
        justify-content: space-between;
    }

    .ipfs-hash {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
    }
</style>