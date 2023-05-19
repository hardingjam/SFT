<script>
    import manual from "../assets/documents/manual.pdf"
</script>

<div class="pdf-container">
  <iframe src={`${manual}#view=fit`} height="100%" width="100%"></iframe>
</div>


<style>
    .pdf-container {
        width: calc(100vw - 223px);
        height: calc(100vh - 176px);
        margin-left: 203px;
        margin-top: -48px;
    }
</style>