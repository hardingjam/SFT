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
    import {activeNetwork} from '../scripts/store.js';
    import {RECEIPT_INFORMATION_QUERY} from '../scripts/queries.js';
    import {onMount} from 'svelte';
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

    onMount(async () => {
        await getReceiptData(receipt)
    })

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


    async function getReceiptData(receipt) {
        loading = true;
        let variables = {id: receipt.id}
        let resp = await getSubgraphData($activeNetwork, variables, RECEIPT_INFORMATION_QUERY, 'receipt')
        let receiptInfo = ""
        let information = ""

        if (resp && resp.data && resp.data.receipt) {
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

    .ipfs-hash {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
    }
</style>