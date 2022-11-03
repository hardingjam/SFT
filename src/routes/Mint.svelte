<script>
    import MintInput from "../components/MintInput.svelte";
    import {ethers} from "ethers";
    import {vault, fileHash, fileDropped, uploadBtnLoading} from "../scripts/store.js";
    import {account} from "../scripts/store.js";
    import {navigateTo} from "yrv";
    import axios from "axios";
    import Select from "../components/Select.svelte";
    import {icons} from "../scripts/assets.js";
    import {IPFS_API, IPFS_GETWAY, ONE} from "../scripts/consts.js";
    import SchemaForm from "../components/SchemaForm.svelte"
    import {toBytes} from "../scripts/helpers";
    import jQuery from 'jquery';

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
                    "producer_wallet": {
                        "type": "string",
                        "title": "Producer Wallet",
                    },
                    "total_score": {
                        "type": "string",
                        "title": "Total Score"
                    },
                    "max_options": {
                        "type": "string",
                        "title": "Max Options"
                    },
                    "pie_certificate": {
                        "type": "string",
                        "editor": "upload",
                        "title": "PIE Certificate"
                    },
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
            let formResponse = await submitForm()
            let shareRatio = ONE
            const shares = ethers.utils.parseEther(amount.toString());
            let dataBytes = toBytes(formResponse.Hash)

            const tx = await $vault
                .connect(signer)
                ["mint(uint256,address,uint256,bytes)"](shares, $account, shareRatio, dataBytes);
            await tx.wait();
            amount = 0;
        } catch (error) {
            console.log(error.reason || error)
        }
        shouldDisable = false;
    }


    const upload = async (data) => {
        error = ""
        uploadBtnLoading.set(true)
        const url = IPFS_API;
        let formData = new FormData();
        // if we're pinning metadata (objets)
        // if (data instanceof Array) {
        //     data = data
        //     for (const [i, d] of data.entries()) {
        //         const blob = new Blob([JSON.stringify(d, null, 2)], {type: 'application/json'});
        //         formData.append(`file`, blob, `dir/${i}.json`);
        //     }
        // }
        // or we're pinning the media file
        // else {
            formData.append('file', data)
        // }

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
        uploadBtnLoading.set(false)

        return response?.data
    };

    $: ($fileDropped && $fileDropped.size) && upload($fileDropped);

    function handleSchemaSelect(event) {
        selectedSchema = event.detail.selected
    }

    async function submitForm() {
        //get form data
        let formDataArr = jQuery(".svelte-schema-form").serializeArray()
        const json = {};

        formDataArr.map(a => {
            json[a.name] = a.value
        })

        if ($fileHash) {
            json.pie_certificate = `${IPFS_GETWAY}/${$fileHash}`
        }

        let response = await upload(JSON.stringify(json))

        return response
    }

</script>

<div class="mint-container">
  <div class="header-buttons">
    <button type="button" class="default-btn mr-2" disabled on:click={()=>{navigateTo('#schemas')}}>
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
            <span class="title f-weight-700">Asset info.</span>

            <SchemaForm schema={selectedSchema.schema}></SchemaForm>
            {#if $fileHash}
              <div class="file-uploaded">
                <span class="file-load-success">Pie Certificate loaded successfully</span>
                <div class="link-to-file">
                  <span>To Link</span>
                  <a href={IPFS_GETWAY+ '/' + $fileHash} target="_blank">
                    <img src="{icons.show}" alt="view file" class="btn-hover">
                  </a>
                  <!--                  <img src="{icons.delete_icon}" alt="remove file" class="btn-hover">-->
                </div>
              </div>
            {/if}
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

    .info-text {
        font-size: 12px;
        line-height: 20px;
    }

    .mint-btn {
        width: calc(100% - 70px);
        margin-top: 10px;
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

    .file-load-success {
        color: #1EA51B
    }

    .file-uploaded {
        display: flex;
        justify-content: space-between;
    }

</style>

