<script>
    import MintInput from "../components/MintInput.svelte";
    import {ethers} from "ethers";
    import {vault, fileHash, fileDropped} from "../scripts/store.js";
    import {account} from "../scripts/store.js";
    import {navigateTo} from "yrv";
    import axios from "axios";
    import * as FormData from 'form-data'
    import Select from "../components/Select.svelte";
    import {icons} from "../scripts/assets.js";
    import {IPFS_API, IPFS_GETWAY} from "../scripts/consts.js";
    import SchemaForm from "../components/SchemaForm.svelte"

    let image = {}

    let error = ""

    let schemas = [
        {
            "displayName": 'Love To',
            "schema": {
                "type": "object",
                "required": [
                    "pie_certificate",
                    "producer_wallet",
                    "total_score",
                    "max_options"
                ],
                "properties": {
                    "pie_certificate": {
                        "type": "string",
                        "editor": "upload",
                        "title": "PIE Certificate"
                    },
                    "producer_wallet": {
                        "type": "string",
                        "title": "Producer Wallet",
                    },
                    "total_score": {
                        "type": "number",
                        "title": "Total Score"
                    },
                    "max_options": {
                        "type": "string",
                        "title": "number"
                    }
                }
            }
        }
    ]

    let selectedSchema = {}
    export let ethersData;
    let {signer} = ethersData;

    let amount;
    let shouldDisable = !schemas.length

    async function mint() {
        try {
            await submitForm()

            const shares = ethers.utils.parseEther(amount.toString());
            const tx = await $vault
                .connect(signer)
                ["mint(uint256,address)"](shares, $account);
            await tx.wait();
            amount = 0;
        } catch (error) {
            console.log(error.reason);
        }
        shouldDisable = false;
    }


    const upload = async (data) => {
        const url = IPFS_API;
        let formData = new FormData();
        // if we're pinning metadata (objets)
        if (data instanceof Array) {
            data = data
            for (const [i, d] of data.entries()) {
                const blob = new Blob([JSON.stringify(d, null, 2)], {type: 'application/json'});
                formData.append(`file`, blob, `dir/${i}.json`);
            }
        }
        // or we're pinning the media file
        else {
            formData.append('file', data)
        }

        const response = await axios.request({
            url,
            method: 'post',
            headers: {
                "Content-Type": `multipart/form-data;`,
            },
            data: formData,
            onUploadProgress: ((p) => {
                console.log(`Uploading...  ${p.loaded} / ${p.total}`);
            }),
        }).catch(function (err) {
            error = err.toJSON().message
        });

        if ($fileDropped.size && response) {
            fileHash.set(response.data.Hash)
        }

        return response?.data
    };

    $: ($fileDropped && $fileDropped.size) && upload($fileDropped);

    function handleSchemaSelect(event) {
        selectedSchema = event.detail.selected
    }

    async function submitForm() {
        //get form data
        let formDataArr = window.$(".svelte-schema-form").serializeArray()
        const json = {};

        formDataArr.map(a => {
            json[a.name] = a.value
        })

        if ($fileHash) {
            json.fileHash = `${IPFS_GETWAY}/${$fileHash}`
        }

        await upload(JSON.stringify(json))
    }

</script>

<div class="mint-container">
  <div class="header-buttons">
    <button type="button" class="default-btn mr-2" disabled={shouldDisable} on:click={()=>{navigateTo('#schemas')}}>
      Access Schemas
    </button>
    <button class="default-btn" on:click={()=>{navigateTo('#audit-history')}}>
      Audit History
    </button>
  </div>

  <MintInput bind:amount={amount} amountLabel={"Mint Amount"} label={"Options"}/>
  <div class="audit-info-container basic-frame-parent">
    <div class="audit-info basic-frame">
      {#if schemas.length}
        <div class="schema">
          <div class="schema-dropdown display-flex">
            <label class="f-weight-700">Schema:</label>
            <Select options={schemas}

                    on:select={handleSchemaSelect}
                    label={'Choose'} className={"inputSelect"} expandIcon={icons.expand_black}></Select>

          </div>
          {#if selectedSchema?.displayName}
            <SchemaForm schema={selectedSchema.schema}></SchemaForm>
          {/if}
        </div>
      {/if}
      {#if !schemas.length}
        <div class="empty-schemas">
          <span>Please create a new schema to mint </span>
          <button class="default-btn" on:click={()=>{navigateTo("#new-schema")}}>New Schema</button>
        </div>
      {/if}

    </div>
  </div>

  <div class="error">{error}</div>
  <div class="info-text f-weight-700">After Minting an amount you receive 2 things: ERC1155 token (NFT) and an ERC20
    (FT)
  </div>
  <button class="mint-btn btn-solid btn-submit" disabled={shouldDisable && amount} on:click={() => mint()}>Mint
    Options
  </button>
</div>

<style>
    .mint-container {
        padding-top: 17px;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .header-buttons {
        margin-bottom: 15px;
        display: flex;
        width: 100%;
        justify-content: right;
        padding: 0 12px 0 12px;
    }

    .audit-info {
        padding: 20px 60px;
        display: flex;
        text-align: left;
        flex-direction: column;
        font-weight: 400;
        font-size: 16px;
        line-height: 27px;
        min-height: 142px;

    }

    .audit-info .title {
        text-align: center;
    }

    .value {
        padding-left: 20px;
    }

    .info-text {
        font-size: 12px;
        line-height: 20px;
    }

    .mint-btn {
        width: calc(100% - 70px);
        margin-top: 10px;
    }

    .default-input {
        width: 63px;
    }

    .info-row:hover input {
        border: 2px solid #A0C7DD;
    }

    .empty-schemas button {
        margin-top: 5px;
    }

    .schema table {
        width: 100%;
    }

    .schema table td:nth-child(2) {
        text-align: right;
    }


</style>

