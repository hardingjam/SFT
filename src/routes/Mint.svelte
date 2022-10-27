<script>
    import MintInput from "../components/MintInput.svelte";
    import {ethers} from "ethers";
    import {vault} from "../scripts/store.js";
    import {account} from "../scripts/store.js";
    import {navigateTo} from "yrv";
    import axios from "axios";
    import * as FormData from 'form-data'
    import Schema from "../components/Schema.svelte";
    import Select from "../components/Select.svelte";
    import {icons} from "../scripts/assets.js";
    import ImageDropZone from "../components/ImageDropZone.svelte";

    let mediaUploadResp = null
    let imageFile = null
    let image = {}

    let error = ""

    let schemas = [
        {
            displayName: 'Test',
            schema: {
                name: {
                    type: 'string',
                    title: 'Name',
                    required: true
                },
                age: {
                    type: 'number',
                    title: 'Age'
                }
            }
        },
        {
            displayName: 'Love To',
            schema: {
                pie_certificate: {
                    type: 'string',
                    title: 'PIE Certificate',
                    required: true
                },
                producer_wallet: {
                    type: 'string',
                    title: 'Producer Wallet',
                    required: true
                },
                total_score: {
                    type: 'string',
                    title: 'Total Score',
                    required: true
                },
                max_options: {
                    type: 'string',
                    title: 'Max Options',
                    required: true
                },
                upload: {
                    "type": 'file',
                    "title": 'Upload PIE Certificate',
                    "format": "date"
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

    // async function addToIpfs() {
    //
    //     let payloadJson = JSON.stringify(auditInfo)
    //
    //     let data = new FormData();
    //     data.append('path', `{"file", ${payloadJson}`);
    //
    //     let config = {
    //         method: 'post',
    //         url: 'https://gildlab-ipfs.in.ngrok.io/api/v0/add',
    //         data: data
    //     };
    //
    //     axios(config)
    //         .then(function (response) {
    //             console.log(JSON.stringify(response.data));
    //         })
    //         .catch(function (error) {
    //             console.log(error);
    //         });
    // }

    function handleSchemaSelect(event) {
        selectedSchema = event.detail.selected
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
          <Schema schema={selectedSchema.displayName? selectedSchema.schema : selectedSchema}></Schema>
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

  <ImageDropZone
      bind:imageFile={imageFile}
      bind:mediaUploadResp={mediaUploadResp}
      bind:this={image}/>
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

