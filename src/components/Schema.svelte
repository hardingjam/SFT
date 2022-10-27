<script type="text/javascript">
    import {onMount} from "svelte";
    const jq = window.$;
    export let schema;

    $: schema && generateForm();

    function generateForm(){
        //clear form html first so it shows new form after reselect
        jq('#form').html('')
        jq('#form').jsonForm({
            schema: schema,
            onSubmit: function (errors, values) {
                if (errors) {
                    jq('#res').html('<p>Something went wrong</p>');
                } else {
                    jq('#res').html('<p>Uploaded</p>');
                    console.log(values.max_options)
                }
            }
        })
    }
</script>
<div>
  <form id="form"></form>
  <div id="res" class="alert"></div>
</div>