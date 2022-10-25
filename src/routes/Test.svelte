
<script type="text/javascript">

    console.log(document.getElementsByClassName('form'))
    document.getElementsByClassName('form').jsonForm({
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
                document.getElementById('res').innerHTML = '<p>I beg your pardon?</p>';
            }
            else {
                document.getElementById('res').innerHTML ='<p>Hello ' + values.name + '.' +
                    (values.age ? '<br/>You are ' + values.age + '.' : '') +
                    '</p>';
            }
        }
    });
</script>
<div>
  <h1>Getting started with JSON Form</h1>
  <form class="form"></form>
  <div id="res" class="alert"></div>
</div>
