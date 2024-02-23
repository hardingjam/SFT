<script>
    import {
        activeNetwork, deposits,
        ethersData, pageTitle, schemas,
        transactionError,
        transactionInProgress, transactionInProgressShow, transactionSuccess,
        uploadBtnLoading,
        vault, account
    } from "../scripts/store.js";
    import {
        cborEncode,
        encodeCBOR, getSchemas,
        getSubgraphData, navigate,
        showPrompt,
        showPromptSFTCreate
    } from "../scripts/helpers.js";
    import {IPFS_APIS, MAGIC_NUMBERS} from "../scripts/consts.js";
    import axios from "axios";
    import {arrayify} from "ethers/lib/utils.js";
    import {JSONEditor} from "svelte-jsoneditor";
    import {validator} from "@exodus/schemasafe";
    import {nullOptionalsAllowed} from '../plugins/@restspace/svelte-schema-form/utilities';
    import {DEPOSITS_QUERY, RECEIPT_VAULT_INFORMATION_QUERY} from "../scripts/queries.js";
    import Connect from '../components/Connect.svelte';


    let label = ""
    let schema = {}
    let content = {
        text: ""
    }
    let error = "";
    let showAuth = false;
    let promise;
    let username = "";
    let password = "";
    let schemaInformation = {};
    let invalidJson = ""
    let labelError = ""

    async function deploySchema() {
        error = ""
        labelError = ""

        if (!label) {
            labelError = "Please enter Schema label";
            return
        }

        if (!content.text) {
            error = "Please paste your schema";
            return
        }

        try {

            schemaInformation = {
                displayName: label,
                schema: schema,
            }

            let encodedSchema = encodeCBOR(schemaInformation, MAGIC_NUMBERS.OA_SCHEMA)

            try {
                let uploadResult = await upload(JSON.stringify(schemaInformation))
                let encodedHashList = cborEncode(
                    [uploadResult?.Hash].toString(),
                    MAGIC_NUMBERS.OA_HASH_LIST
                );
                const meta = "0x" + MAGIC_NUMBERS.RAIN_META_DOCUMENT.toString(16).toLowerCase() + encodedSchema +
                    encodedHashList
                let transaction = await $vault.connect($ethersData.signer).receiptVaultInformation(arrayify(meta))
                await showPromptSFTCreate(transaction)
                let wait = await transaction.wait()
                if (wait.status === 1) {
                    let interval = setInterval(async () => {
                        let assetClassesResp = await getSubgraphData($activeNetwork, {}, RECEIPT_VAULT_INFORMATION_QUERY, 'receiptVaultInformations')
                        assetClassesResp = assetClassesResp?.data?.receiptVaultInformations
                        if (assetClassesResp && assetClassesResp.length) {
                            if (wait.blockNumber.toString() ===
                                assetClassesResp[0].transaction.blockNumber.toString()) {
                                await getDeposits()
                                schemas.set(await getSchemas($activeNetwork, $vault, $deposits))
                                transactionSuccess.set(true)
                                transactionInProgress.set(false)
                                clearInterval(interval)
                                goToAssetClassList()
                            }
                        }
                    }, 2000)
                } else {
                    transactionError.set(true)
                }

            } catch (err) {
                console.log(err)
            }
        } catch (e) {
            console.log(e.message)
            error = "Schema is not valid JSON"
        }

    }

    const upload = async (data) => {
        error = ""
        uploadBtnLoading.set(true)

        let savedUsername = localStorage.getItem('ipfsUsername');
        let savedPassword = localStorage.getItem('ipfsPassword');
        if (!savedPassword || !savedUsername) {
            showAuth = true;
            await waitForCredentials()
        } else {
            username = savedUsername;
            password = savedPassword
        }

        let formData = new FormData();

        formData.append('file', data)


        const requestArr = IPFS_APIS.map((url) => {
            return axios.request({
                url,
                auth: {
                    username,
                    password
                },
                method: 'post',
                headers: {
                    "Content-Type": `multipart/form-data;`,
                },
                data: formData,
                onUploadProgress: (async (p) => {
                    await showPrompt(null, {topText: "Uploading to IPFS, please wait", noBottomText: true})
                    console.log(`Uploading...  ${p.loaded} / ${p.total}`);
                }),
                withCredentials: true,
            })
        });

        let respAll = await Promise.allSettled(requestArr)

        respAll.map(response => {
            if (response.status === "rejected") {
                reportError(response.reason)
            } else return response
        })

        let resolvedPromise = respAll.find(r => r.status === "fulfilled")
        if (resolvedPromise) {

            localStorage.setItem('ipfsUsername', username);
            localStorage.setItem('ipfsPassword', password);

        } else {
            error = "Something went wrong"
        }
        uploadBtnLoading.set(false)
        username = ""
        password = ""
        transactionInProgressShow.set(false)
        transactionInProgress.set(false)

        return resolvedPromise?.value.data
    };

    async function waitForCredentials() {
        const confirm = document.getElementById("ok-button")

        promise = new Promise((resolve) => {
            confirm.addEventListener('click', resolve)
        })
        return await promise.then(() => {
                showAuth = false;
            }
        )
    }

    $: content && getContent()
    $: label && clearLabelError()

    function getContent() {
        error = ""
        invalidJson = ""
        if (content.text) {
            try {
                schema = JSON.parse(content.text)
            } catch (err) {
                invalidJson = err
            }

            try {
                validator(nullOptionalsAllowed(schema), {
                    includeErrors: true,
                    allErrors: true,
                    allowUnusedKeywords: true
                });
            } catch (er) {
                if (!invalidJson) {
                    error = "Form cannot be generated from schema"
                }
            }
        }
    }

    function clearLabelError() {
        labelError = ""
    }

    function goToAssetClassList() {
        navigate("#asset-classes", {clear: true});
    }

    async function getDeposits() {
        let variables = {id: $vault.address.toLowerCase()}

        getSubgraphData($activeNetwork, variables, DEPOSITS_QUERY, 'offchainAssetReceiptVault').then((res) => {
            deposits.set(res.data.offchainAssetReceiptVault.deposits)
        })
    }

    pageTitle.set("New asset class")

</script>
<<<<<<< HEAD
<DefaultFrame>
  <div slot="content" class="schema-content bg-none">
    <div class={!showAuth  ? 'schema-container show' : 'schema-container hide'}>
      <div class="label">
        <span class="f-weight-700">Asset class label:</span>
        <input class="label-input" bind:value={label}/>
      </div>
      <div class="label">
        <!--        <div class="info-icon">-->
        <!--          <a href="" target="_blank">-->
        <!--          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">-->
        <!--            <path d="M9 10C9 9.40666 9.17595 8.82664 9.50559 8.33329C9.83524 7.83994 10.3038 7.45543 10.852 7.22836C11.4001 7.0013 12.0033 6.94189 12.5853 7.05765C13.1672 7.1734 13.7018 7.45912 14.1213 7.87868C14.5409 8.29824 14.8266 8.83279 14.9424 9.41473C15.0581 9.99667 14.9987 10.5999 14.7716 11.1481C14.5446 11.6962 14.1601 12.1648 13.6667 12.4944C13.1734 12.8241 12.5933 13 12 13V14M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#AE6E00" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>-->
        <!--            <circle cx="12" cy="17" r="1" fill="#AE6E00"/>-->
        <!--          </svg></a>-->
        <!--        </div>-->
        <span class="f-weight-700">Schema:</span>
      </div>
      <div class="schema">
        <JSONEditor bind:content mode="text" mainMenuBar="{false}"/>
      </div>
      <button class="default-btn deploy-btn" on:click={()=>{deploySchema()}}
              disabled={!content.text || error || invalidJson || labelError}>
        Create new asset class
      </button>
      <div class="error">{error || labelError}</div>
    </div>

    <div class={showAuth  ? 'auth show' : 'auth hide'}>
      <div class="display-flex space-between">
        <label>Username:</label>
        <input class="default-input" type="text" bind:value={username} autofocus/>
      </div>
      <div class="display-flex space-between">
        <label>Password:</label>
        <input class="default-input" type="password" bind:value={password}/>
      </div>
      <button id="ok-button" class="default-btn" disabled={!password || !username}>OK</button>
    </div>

=======
<div class="asset-classes-container min-w-[40rem] min-h-[30rem]">
  <div class="card-header justify-start pl-16">
    <div class="flex">New asset class</div>
>>>>>>> main
  </div>
  {#if $account}
    <div class="schema-content px-16 py-5">
      <div class={!showAuth  ? 'schema-container show' : 'schema-container hide'}>
        <div class="label">
          <span class="f-weight-700">Asset class label:</span>
          <input class="label-input" bind:value={label}/>
        </div>
        <div class="label">
          <!--        <div class="info-icon">-->
          <!--          <a href="" target="_blank">-->
          <!--          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">-->
          <!--            <path d="M9 10C9 9.40666 9.17595 8.82664 9.50559 8.33329C9.83524 7.83994 10.3038 7.45543 10.852 7.22836C11.4001 7.0013 12.0033 6.94189 12.5853 7.05765C13.1672 7.1734 13.7018 7.45912 14.1213 7.87868C14.5409 8.29824 14.8266 8.83279 14.9424 9.41473C15.0581 9.99667 14.9987 10.5999 14.7716 11.1481C14.5446 11.6962 14.1601 12.1648 13.6667 12.4944C13.1734 12.8241 12.5933 13 12 13V14M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#AE6E00" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>-->
          <!--            <circle cx="12" cy="17" r="1" fill="#AE6E00"/>-->
          <!--          </svg></a>-->
          <!--        </div>-->
          <span class="f-weight-700">Schema:</span>
        </div>
        <div class="schema">
          <JSONEditor bind:content mode="text" mainMenuBar="{false}"/>
        </div>
        <button class="default-btn deploy-btn" on:click={()=>{deploySchema()}}
                disabled={!content.text || error || invalidJson || labelError}>
          Create new asset class
        </button>
        <div class="error">{error || labelError}</div>
      </div>

      <div class={showAuth  ? 'auth show' : 'auth hide'}>
        <div class="display-flex space-between">
          <label>Username:</label>
          <input class="default-input" type="text" bind:value={username} autofocus/>
        </div>
        <div class="display-flex space-between">
          <label>Password:</label>
          <input class="default-input" type="password" bind:value={password}/>
        </div>
        <button id="ok-button" class="default-btn" disabled={!password || !username}>OK</button>
      </div>

    </div>
  {:else}
    <Connect action="create new asset class" className="pt-20"></Connect>
  {/if}
</div>
<style>

    .asset-classes-container {
        border-radius: 10px;
        background: #ffffff;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .schema-content {
        min-width: 660px;
        min-height: 400px;
    }

    .label-input {
        width: 560px;
        box-sizing: border-box;
        height: 36px;
        border: 1px solid #E5E4E4;
        border-radius: 5px;
        margin-left: 10px;
    }

    .schema {
        text-align: left;
        overflow: auto;
        margin: 10px 0;
        position: relative;
        border-radius: 5px 5px 0 0
    }

    .schema-container {
        display: flex;
        flex-direction: column;
    }

    .deploy-btn {
        align-self: end;
    }

    .auth {
        background: #FFFFFF;
        box-shadow: 0 1px 4px rgba(0, 0, 0, 0.25);
        border-radius: 10px;
        display: flex;
        flex-direction: column;
        justify-content: left;
        padding: 40px;
        width: calc(100% - 80px);
    }

    .show {
        display: flex;
    }

    .hide {
        display: none;
    }

    .label {
        display: flex;
        align-items: center;
    }

    .info-icon {
        margin-left: -35px;
        margin-right: 10px;
        cursor: pointer;
    }

</style>