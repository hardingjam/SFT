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
    @import url('https://fonts.googleapis.com/css2?family=Monserrat:wght@200;300;400;500;600;700;800&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@200;300;400;500;600;700;800&family=Rubik+Iso&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@200;300;400;500;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400&display=swap');
    main {
        background-image: url("/src/assets/st0x_background.png");
        background-size: cover;
        background-repeat: no-repeat;
        background-attachment: fixed;
    }
    
</style>


