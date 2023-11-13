<script>
    import {landing} from '../scripts/store.js';
    import {navigate} from '../scripts/helpers.js';

    function launchApp() {
        landing.set(false)
        navigate("#list")
    }
</script>
<div class="landing-nav-container">
  <button class="launch-button" id="launch-button" on:click="{()=>launchApp()}">Launch app</button>

</div>

<style>
    .launch-button {
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
</style>