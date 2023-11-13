<script>
    import Default from "./lib/Default.svelte";
    import {landing} from './scripts/store.js';
    import {onMount} from 'svelte';
    import {landingPages} from './scripts/consts.js';

    onMount(() => {
        if (window.location.hash && !landingPages.includes(window.location.hash)) {
            landing.set(false)
        }
    })
</script>

<main>
  <Default/>
</main>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Mukta:wght@200;300;400;500;600;700;800&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@200;300;400;500;600;700;800&family=Rubik+Iso&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@200;300;400;500;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@200;300;400;500;600;700;800&family=Mukta+Mahee:wght@200;300;400;500;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
</style>
