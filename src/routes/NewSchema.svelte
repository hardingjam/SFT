<script>
    import formatHighlight from 'json-format-highlight'
    import DefaultFrame from "../components/DefaultFrame.svelte";
    import {afterUpdate} from "svelte";

    let code = {
        "$schema": "https:/json-schema.org/draft/2019-09/schema",
        "$id": "http://example.com/example.json",
        "type": "object",
        "default": {},
        "title": "Root Schema",
        "required": [
            "checked",
            "dimensions",
            "id",
            "name",
            "price",
            "tags"
        ],
        "properties": {
            "checked": {
                "type": "boolean",
                "default": false,
                "title": "The checked Schema",
                "examples": [
                    false
                ]
            },
            "dimensions": {
                "type": "object",
                "default": {},
                "title": "The dimensions Schema",
                "required": [
                    "width",
                    "height"
                ],
                "properties": {
                    "width": {
                        "type": "integer",
                        "default": 0,
                        "title": "The width Schema",
                        "examples": [
                            5
                        ]
                    },
                    "height": {
                        "type": "integer",
                        "default": 0,
                        "title": "The height Schema",
                        "examples": [
                            10
                        ]
                    }
                },
                "examples": [{
                    "width": 5,
                    "height": 10
                }]
            },
            "id": {
                "type": "integer",
                "default": 0,
                "title": "The id Schema",
                "examples": [
                    1
                ]
            },
            "name": {
                "type": "string",
                "default": "",
                "title": "The name Schema",
                "examples": [
                    "A green door"
                ]
            },
            "price": {
                "type": "number",
                "default": 0.0,
                "title": "The price Schema",
                "examples": [
                    12.5
                ]
            },
            "tags": {
                "type": "array",
                "default": [],
                "title": "The tags Schema",
                "items": {
                    "type": "string",
                    "title": "A Schema",
                    "examples": [
                        "home",
                        "green"
                    ]
                },
                "examples": [
                    ["home",
                        "green"
                    ]
                ]
            }
        },
        "examples": [{
            "checked": false,
            "dimensions": {
                "width": 5,
                "height": 10
            },
            "id": 1,
            "name": "A green door",
            "price": 12.5,
            "tags": [
                "home",
                "green"
            ]
        }]
    }

    let colors = {
        keyColor: 'black',
        numberColor: 'blue',
        stringColor: '#0B7500',
        trueColor: '#00cc00',
        falseColor: '#ff8080',
        nullColor: 'cornflowerblue'
    };

    afterUpdate(() => {
        document.getElementById("code").innerHTML = formatHighlight(code, colors)
    })

</script>
<DefaultFrame header="New Schema">
  <div slot="content">
    <span class="f-weight-700">Schema label :</span> <input class="label-input"/>

    <div class="schema">
      <!--      <Prism language="javascript" source="{JSON.stringify(code)}" />-->
      <!--{JSON.stringify(code)}-->

      <pre><code id="code"></code>


      </pre>
    </div>

    <button class="default-btn btn-hover right">Deploy schema</button>
  </div>

</DefaultFrame>
<style>
    .label-input {
        width: 560px;
        box-sizing: border-box;
        height: 36px;
        border: 1px solid #D2D2D2;
        border-radius: 5px;
        margin-left: 10px;
    }

    .schema {
        height: 300px;
    }
</style>