<script>
    export let width = "200"
    import sftLoader from "../../public/sftLoader.json"

</script>
<div class="loader">
  <lottie-player id="sft-loader" src={sftLoader} background="transparent" speed="1"
                 style={`width: ${width}px; height: ${width}px;`} loop autoplay></lottie-player>
</div>

<style>
    .loader {
        display: flex;
        justify-content: center;
    }
</style>

