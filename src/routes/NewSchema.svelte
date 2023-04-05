<script>
    import formatHighlight from 'json-format-highlight'
    import DefaultFrame from "../components/DefaultFrame.svelte";
    import {
        ethersData,
        transactionError,
        transactionHash,
        transactionInProgress, transactionInProgressShow, transactionSuccess,
        uploadBtnLoading,
        vault
    } from "../scripts/store.js";
    import {cborEncode, encodeCBOR} from "../scripts/helpers.js";
    import {IPFS_APIS, MAGIC_NUMBERS, TRANSACTION_IN_PROGRESS_TEXT, VIEW_ON_EXPLORER_TEXT} from "../scripts/consts.js";
    import axios from "axios";
    import {arrayify} from "ethers/lib/utils.js";
    import {JSONEditor} from "svelte-jsoneditor";
    import TransactionInProgressBanner from "../components/TransactionInProgressBanner.svelte";
    import {navigateTo} from "yrv";
    import {validator} from "@exodus/schemasafe";
    import {nullOptionalsAllowed} from '../plugins/@restspace/svelte-schema-form/utilities';


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
    let notValidSchemaError = false;


    let topText = ""
    let bottomText = ""

    let colors = {
        keyColor: 'black',
        numberColor: 'blue',
        stringColor: '#0B7500',
        trueColor: '#00cc00',
        falseColor: '#ff8080',
        nullColor: 'cornflowerblue'
    };

    function update(text) {
        document.getElementById("highlighting-content").innerHTML = formatHighlight(text, colors)
        document.getElementById("editing").style.display = "none"
        document.getElementById("highlighting").style.display = "block"
    }

    async function deploySchema() {
        error = ""
        if (!label) {
            error = "Please enter Schema label";
            return
        }

        if (!content.text) {
            error = "Please paste your schema";
            return
        }

        try {
            transactionError.set(false)
            transactionSuccess.set(false)
            try {
                validator(nullOptionalsAllowed(schema), {
                    includeErrors: true,
                    allErrors: true,
                    allowUnusedKeywords: true
                });
            } catch (er) {
                notValidSchemaError = true;
                error = "Form cannot be generated from schema"
                return
            }


            schemaInformation = {
                displayName: label,
                schema: schema,
            }

            let encodedSchema = encodeCBOR(schemaInformation)

            try {
                let uploadResult = await upload(JSON.stringify(schemaInformation))
                let encodedHashList = cborEncode(
                    [uploadResult?.Hash].toString(),
                    MAGIC_NUMBERS.OA_HASH_LIST
                );
                const meta = "0x" + MAGIC_NUMBERS.RAIN_META_DOCUMENT.toString(16).toLowerCase() + encodedSchema + encodedHashList
                let transaction = await $vault.connect($ethersData.signer).receiptVaultInformation(arrayify(meta))
                if (transaction.hash) {
                    topText = TRANSACTION_IN_PROGRESS_TEXT;
                    bottomText = VIEW_ON_EXPLORER_TEXT
                    transactionHash.set(transaction.hash)
                    transactionInProgressShow.set(true)
                    transactionInProgress.set(true)
                }
                let wait = await transaction.wait()
                if (wait.status === 1) {
                    transactionSuccess.set(true)
                    transactionInProgress.set(false)
                }

            } catch (err) {
                transactionError.set(true)
                console.log(err)
            }
        } catch (e) {
            console.log(e.message)
            error = "Schema is not valid JSON"
        }

    }

    const upload = async (data) => {
        error = ""
        topText = "Uploading to IPFS, please wait"
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
                onUploadProgress: ((p) => {
                    transactionInProgressShow.set(true)
                    transactionInProgress.set(true)
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

    function getContent() {
        error = ""
        notValidSchemaError = false
        if (content.text) {
            try {
                schema = JSON.parse(content.text)
            } catch (err) {
                error = err
                console.log("Invalid JSON:", error);
            }
        }
    }

    function goToAssetClassList(event) {
        if ($transactionSuccess && event.detail.close) {
            navigateTo("#asset-classes", {replace: false});
        }
    }

</script>
<DefaultFrame header="New Asset Class Schema">
  <div slot="content" class="schema-content">
    <div class={!showAuth  ? 'schema-container show' : 'schema-container hide'}>
      <div class="label">
        <span class="f-weight-700">Asset Class label :</span>
        <input class="label-input" bind:value={label}/>
      </div>

      <div class="schema">
        <JSONEditor bind:content mode="text" mainMenuBar="{false}"/>
      </div>
      <button class="default-btn btn-hover deploy-btn" on:click={()=>{deploySchema()}} disabled={notValidSchemaError}>
        Create new Asset Class
      </button>
      <div class="error">{error}</div>
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
</DefaultFrame>
<TransactionInProgressBanner topText={topText} bottomText={bottomText} transactionHash={$transactionHash}
                             on:close={goToAssetClassList}/>

<style>

    .schema-content {
        min-width: 660px;
        min-height: 400px;
    }

    .label-input {
        width: 560px;
        box-sizing: border-box;
        height: 36px;
        border: 1px solid #D2D2D2;
        border-radius: 5px;
        margin-left: 10px;
    }

    .schema {
        text-align: left;
        overflow: auto;
        margin: 10px 0;
        position: relative;
    }


    .textarea {
        width: 100%;
        height: 100%;
        border: none;
        border-left: 35px solid #F0EFF1;
        border-radius: 5px 5px 0 0;
        border-bottom: 1px solid #D2D2D2;
        background: #FBFBFB;
        display: block;
        overflow: hidden;
        resize: both;
        min-height: 300px;
        line-height: 20px;
        padding: 5px;
        max-width: 675px;
    }

    .textarea:focus-visible {
        outline: none
    }

    .textarea[contenteditable]:empty::before {
        content: "Paste your schema here";
        color: gray;
    }


    .editing-top-color {
        position: absolute;
        width: 35px;
        left: 0;
        top: 0;
        background: #DCDBDD;
        border-radius: 5px 0 0 0;
        text-align: center;
    }

    #highlighting {
        display: none;
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


</style>