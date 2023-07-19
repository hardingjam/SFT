<script>
    import {IPFS_GETWAY, MAGIC_NUMBERS} from '../scripts/consts.js';
    import {icons} from '../scripts/assets.js';
    import {
        bytesToMeta,
        cborDecode,
        formatAddress, getIpfsGetWay,
        getSubgraphData,
        toSentenceCase
    } from '../scripts/helpers.js';
    import {activeNetwork, selectedReceipt, vault} from '../scripts/store.js';
    import {RECEIPT_INFORMATION_QUERY} from '../scripts/queries.js';
    import SftLoader from './SftLoader.svelte';
    import axios from 'axios';
    import {ethers} from 'ethers';

    let loading = false
    let ipfsLoading = false
    let ipfsAddress = ""
    let schemaHash = null;
    let displayInformation = []
    let schema = {}
    let fileUploadProperties = []
    export let receipt;

    $: schemaHash && getSchemaFileProps()
    $: $activeNetwork && getReceiptData(receipt)

    async function getSchema() {
        let url = await getIpfsGetWay(schemaHash)
        try {
            let res = await axios.get(url)
            if (res) {
                schema = res.data
            }
        } catch (err) {
            console.log(err)
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
            fileUploadProperties = fileUploadProperties.map(p => toSentenceCase(p))
        }
    }


    async function getReceiptData(_receipt) {
        let variables
        if (!_receipt) {
            let receiptId = $vault.address + "-" + window.location.hash.split("/")[1]
            variables = {id: receiptId}
        } else {
            variables = {id: _receipt.id}
        }
        loading = true;
        let resp = await getSubgraphData($activeNetwork, variables, RECEIPT_INFORMATION_QUERY, 'receipt')
        let receiptInfo = ""
        let information = ""

        if (resp && resp.data && resp.data.receipt) {
            selectedReceipt.set(resp.data)
            ipfsLoading = true;
            receiptInfo = resp.data.receipt.receiptInformations
            if (receiptInfo.length) {
                information = receiptInfo[0].information

                let cborDecodedInformation = cborDecode(information.slice(18))
                let structure = bytesToMeta(cborDecodedInformation[0].get(0), "json")
                schemaHash = cborDecodedInformation[0].get(MAGIC_NUMBERS.OA_SCHEMA)

                try {
                    displayInformation = Object.keys(structure).map(prop => {
                        return {
                            label: toSentenceCase(prop),
                            value: structure[prop]
                        }
                    })
                    ipfsLoading = false;
                } catch (err) {
                    console.log(err)
                }

            }
        }
    }

    function isAddress(value) {
        return ethers.utils.isAddress(value)
    }


</script>
<div class="">
  {#each displayInformation as info}
    <div class="receipt-row">

      {#if fileUploadProperties.includes(info.label)}
            <span class="underline btn-hover">
              <a href={`${IPFS_GETWAY}${info.value}`} target="_blank" class="display-flex">
                    {info.label} <img src="{icons.show}" alt="view file" class="ml-2">
              </a>
            </span>
      {/if}

      {#if !fileUploadProperties.includes(info.label)}
        <span class="w-2/3">{info.label}</span>
        <span class="w-1/3">{isAddress(info.value) ? formatAddress(info.value) : info.value}</span>
      {/if}

    </div>
  {/each}
  {#if (ipfsLoading)}
    <div class="ipfs-hash">
      <span class="f-weight-700">{ipfsAddress}</span>
      <SftLoader width="50"></SftLoader>
    </div>
  {/if}
</div>

<style>

    .receipt-row {
        padding: 2px 0;
        display: flex;
        justify-content: space-between;
    }

    .receipt-row span {
        text-align: start;
    }

    .ipfs-hash {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
    }
</style>