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

    const membersPages = ['#investors', '#curators', '#issuers', '#auditors']
</script>
<div class="landing-nav-container">
  <div class="links">
    <div class="dropdown">
      <div class="{membersPages.includes($router.path) ? 'active link' : 'link transparency-button'}">
        <span class="cursor-pointer">SFT Ecosystem members</span>
      </div>
      <div class="dropdown-content">
        <a href="/#investors" class="{$router.path === '#investors' ? 'active-list-item' : ''} investors">Investors</a>
<!--        <a href="/#curators" class="{$router.path === '#curators' ? 'active-list-item' : ''}   curators">Curators</a>-->
<!--        <a href="/#issuers" class="{$router.path === '#issuers' ? 'active-list-item' : ''}     issuers">Issuers</a>-->
<!--        <a href="/#auditors" class="{$router.path === '#auditors' ? 'active-list-item' : ''}   auditors">Auditors</a>-->
      </div>
    </div>
    <div class="{$router.path === '#transparency' ? 'active link' : 'link transparency-button'}">
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

    /* Base styles for the dropdown */
    .dropdown {
        position: relative;
        display: inline-block;
    }

    /* Styles for the dropdown trigger */
    .dropdown .link {
        cursor: pointer;
    }

    /* Styles for the dropdown content */
    .dropdown-content {
        display: none;
        position: absolute;
        background-color: rgba(255, 255, 255, 0.10);
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
        z-index: 1;
        width: 100%;
        flex-direction: column;
        gap: 12px;
        border-top: 10px solid transparent;
    }

    /* Styles for each dropdown item */
    .dropdown-content a {
        padding: 6px 16px;
        display: block;
        text-decoration: none;
        color: var(--Dark-Blue, #2C2C54);
        text-align: center;
        font-family: 'Inter', sans-serif;
        font-size: 20px;
        font-style: normal;
        font-weight: 700;
        line-height: normal;
    }

    /* Hover effect for dropdown items */
    .dropdown-content a:hover, .active-list-item {
        background-color: #CAE6FF;
    }


    /* Display the dropdown content when hovering over the dropdown */
    .dropdown:hover .dropdown-content {
        display: flex;
    }
</style>