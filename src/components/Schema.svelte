<script type="text/javascript">
    import {onMount} from "svelte";
    const jq = window.$;
    export let schema;

    onMount(() => {
        jq('#form').jsonForm({
            schema: schema,
            onSubmit: function (errors, values) {
                if (errors) {
                    jq('#res').html('<p>I beg your pardon?</p>');
                } else {
                    jq('#res').html('<p>Hello ' + values.name + '.' +
                        (values.age ? '<br/>You are ' + values.age + '.' : '') +
                        '</p>');
                }
            }
        })
    })
</script>
<div>
  <form id="form"></form>
  <div id="res" class="alert"></div>
</div>