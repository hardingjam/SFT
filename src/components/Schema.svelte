<script type="text/javascript">
    import {onMount} from "svelte";
    const jq = window.$;
    export let options;

    $: options.schema && generateForm();

    function generateForm(){
        //clear form html first so it shows new form after reselect
        jq('#form').html('')
        jq('#form').jsonForm({
            schema: options.schema,
            form: options.form,
            onSubmit: function (errors, values) {
                if (errors) {
                    jq('#res').html('<p>Something went wrong</p>');
                } else {
                    jq('#res').html('<p>Uploaded</p>');
                }
            }
        })
    }
</script>
<div>
  <form id="form"></form>
  <div id="res" class="alert"></div>
</div>