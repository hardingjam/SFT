<script>
    import MintInput from "../components/MintInput.svelte";
    import {ethers} from "ethers";
    import {vault} from "../scripts/store.js";
    import {account} from "../scripts/store.js";
    import {navigateTo} from "yrv";
    import axios from "axios";
    import * as FormData from 'form-data'


    import { SubmitForm } from '../../node_modules/@restspace/svelte-schema-form';
    import '../../node_modules/@restspace/svelte-schema-form/css/layout.css';
    import '../../node_modules/@restspace/svelte-schema-form/css/basic-skin.css';

    let schema = {
        type: "object",
        properties: {
            "x": { "type": "string" }
        }
    };
    let value = {};

    const submit = (e) => {
        alert(JSON.stringify(e.detail.value, undefined, 2));
    }








    let error = ""

    let schemas = []

    export let ethersData;
    let {signer} = ethersData;

    let amount;
    let shouldDisable = !schemas.length

    let auditInfo = [
        {
            label: "PIE Certificate",
            value: 0
        }, {
            label: " Producer Wallet",
            value: 0
        }, {
            label: "Total Score",
            value: 0
        }, {
            label: "Max Options",
            value: 0
        }
    ]

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

    async function addToIpfs() {

        let payloadJson = JSON.stringify(auditInfo)

        let data = new FormData();
        data.append('path', `{"file", ${payloadJson}`);

        let config = {
            method: 'post',
            url: 'https://gildlab-ipfs.in.ngrok.io/api/v0/add',
            data: data
        };

        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
            })
            .catch(function (error) {
                console.log(error);
            });
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
          <div class="title f-weight-700">Audit info.</div>
          <table>

            {#each auditInfo as info}
              <tr class="info-row">
                <td>{info.label}</td>
                <td class="value">
                  <input type="text" class="default-input" bind:value={info.value}>
                </td>
              </tr>
            {/each}
            <tr>
              <td>Upload PIE Certificate</td>
              <td>
                <button class="default-btn" on:click={()=>{addToIpfs()}}>Upload</button>
              </td>
            </tr>

          </table>
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
  <div class="info-text f-weight-700">After Minting an amount you receive 2 things: ERC1155 token (NFT) and an ERC20
    (FT)
  </div>
  <button class="mint-btn btn-solid btn-submit" disabled={shouldDisable && amount} on:click={() => mint()}>Mint
    Options
  </button>



  <SubmitForm {schema} {value} on:submit={submit} />

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

