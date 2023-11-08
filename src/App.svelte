<script>
    import Default from "./lib/Default.svelte";
    import Landing from './routes/Landing.svelte';
    import {landing} from './scripts/store.js';
    import {onMount} from 'svelte';

    onMount(()=>{
        if(window.location.hash && window.location.hash !== '/' ){
            landing.set(false)
        }
    })
</script>

<main>
  {#if $landing}
    <Landing></Landing>
  {:else }
    <Default/>
  {/if}
</main>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Mukta:wght@200;300;400;500;600;700;800&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@200;300;400;500;600;700;800&family=Rubik+Iso&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@200;300;400;500;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@200;300;400;500;600;700;800&family=Mukta+Mahee:wght@200;300;400;500;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
</style>
