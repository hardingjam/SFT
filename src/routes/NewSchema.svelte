<script>

    import DefaultFrame from "../components/DefaultFrame.svelte";
</script>
<DefaultFrame header="New Schema">
  <div slot="content">
    <span class="f-weight-700">Schema label :</span> <input class="label-input"/>

    <div class="schema">

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