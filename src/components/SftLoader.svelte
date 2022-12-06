<script>
import {onMount} from "svelte";
export let width = "200px"

onMount(()=>{
    bodymovin.loadAnimation({
        container: document.getElementById("sft-loader"),
        path: "sftLoader.json",
        renderer: "svg",
        loop:true,
        autoplay:true,
    })
})
</script>
<div id="sft-loader" style="width: {width}">
</div>

