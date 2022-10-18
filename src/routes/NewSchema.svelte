<script>
    import formatHighlight from 'json-format-highlight'
    import DefaultFrame from "../components/DefaultFrame.svelte";

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


    let inputValue = ""

    // $: inputValue && update(inputValue);

</script>
<DefaultFrame header="New Schema">
  <div slot="content">
    <span class="f-weight-700">Schema label :</span> <input class="label-input"/>

    <div class="schema">
      <textarea class="textarea" id="editing" bind:value={inputValue}></textarea>

      <pre id="highlighting">
        <code id="highlighting-content"></code>
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
        text-align: left;
        overflow: auto;
        margin: 10px 0;
    }


    #editing {
        width: 100%;
        height: 100%;
    }

    #highlighting {
        display: none;
    }

</style>