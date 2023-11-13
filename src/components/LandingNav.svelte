<script>
    import {landing} from '../scripts/store.js';
    import {navigate} from '../scripts/helpers.js';
    import {Link, router} from 'yrv'
    import {onMount} from 'svelte';

    function launchApp() {
        landing.set(false)
        navigate("#list")
    }

    onMount(() => {
        console.log($router);
    })
</script>
<div class="landing-nav-container">
  <div class="links">
    <div class="{$router.path === '#transparency' ? 'active link' : 'link'}">
      <Link href="#transparency">SFT transparency</Link>
    </div>
  </div>
  <button class="launch-button" id="launch-button" on:click="{()=>launchApp()}">Launch app</button>
</div>

<style>

    .landing-nav-container {
        display: flex;
        align-items: center;
    }

    .launch-button {
        margin-left: 84px;
        border-radius: 30px;
        background: #2C2C54;
        color: #FFFFFF;
        font-family: 'Mukta', sans-serif;
        font-size: 25px;
        font-style: normal;
        font-weight: 600;
        line-height: normal;
        padding: 5px 40px;
        width: fit-content;
    }

    .links {
        display: flex;
        align-items: center;
        gap: 46px;
        color: #2C2C54;
        text-align: center;
        font-family: 'Inter', sans-serif;
        font-size: 20px;
        font-style: normal;
        font-weight: 700;
        line-height: normal;
    }

    .link {
        padding: 3px 0;
        border: 1px solid transparent;
    }

    .links .active {
        border-bottom: 3px solid #2C2C54;
    }
</style>