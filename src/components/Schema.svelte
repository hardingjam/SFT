<script type="text/javascript">
    import * as FormData from "form-data";
    import axios from "axios";
    import {fileHash} from "../scripts/store.js";
    import {IPFS_API, IPFS_GETWAY} from "../scripts/consts.js";

    const jq = window.$;
    export let options;

    $: options?.schema && generateForm();

    function generateForm() {
        //clear form html first so it shows new form after reselect
        jq('#form').html('')
        jq('#form').jsonForm({
            schema: options.schema,
            form: options.form,
            onSubmit: function (errors, values) {
                if (errors) {
                    jq('#res').html('<p>Something went wrong</p>');
                } else {
                    if ($fileHash) {
                        values.pie_certificate = `${IPFS_GETWAY}/${$fileHash}`
                    }
                    addToIpfs(values)

                    jq('#res').html('<p>Uploaded</p>');
                }
            }
        })
    }

    async function addToIpfs(data) {
        let formData = new FormData();
        let payloadJson = JSON.stringify(data)

        formData.append('path', payloadJson);

        await axios.request({
            url: IPFS_API,
            method: 'post',
            headers: {
                "Content-Type": `multipart/form-data;`,
            },
            data: formData,
            onUploadProgress: ((p) => {
                console.log(`Uploading...  ${p.loaded} / ${p.total}`);
            }),
        })
    }
</script>
<div>
  <form id="form"></form>
  <div id="res" class="alert"></div>
</div>