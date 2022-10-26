<script type="text/javascript">
    import {onMount} from "svelte";
    const jq = window.$;

    onMount(() => {
        jq('#form').jsonForm({
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
            },
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
  <h1>Getting started with JSON Form</h1>
  <form id="form"></form>
  <div id="res" class="alert"></div>
</div>
