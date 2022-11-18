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


    function deploySchema(){
        console.log(document.getElementById("code").textContent)
    }

</script>
<DefaultFrame header="New Schema">
  <div slot="content">
    <span class="f-weight-700">Schema label :</span> <input class="label-input"/>

    <div class="schema">
      <div class="editing-top-color">1</div>
      <span class="textarea" role="textbox" id="code" contenteditable ></span>
      <pre id="highlighting">
        <code id="highlighting-content"></code>
      </pre>

    </div>

    <button class="default-btn btn-hover right" on:click={()=>{deploySchema()}}>Deploy schema</button>
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

    .textarea:focus-visible{
        outline:none
    }

    .textarea[contenteditable]:empty::before {
        content: "Paste your schema here";
        color: gray;
    }


    .editing-top-color{
        position: absolute;
        width: 35px;
        left: 0;
        top: 0;
        background: #DCDBDD;
        border-radius:5px 0 0 0;
        text-align: center;
    }

    #highlighting {
        display: none;
    }

</style>