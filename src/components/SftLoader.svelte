<script>
    import {onMount} from "svelte";

    export let width = "200"


    onMount(async () => {
        await loadAnimation('sftLoader.json');
        const animation = document.getElementById('sft-loader');
        animation.style.display = 'block';
    });

    const loadAnimation = (url) => {
        return fetch(url).then((response) => response.json());
    };

</script>
<div class="loader">
  <lottie-player id="sft-loader" src="sftLoader.json" background="transparent" speed="1"
                 style={`width: ${width}px; height: ${width}px;`} loop autoplay></lottie-player>
</div>

<style>
    .loader {
        display: flex;
        justify-content: center;
    }
</style>

