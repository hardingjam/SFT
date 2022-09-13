<script>
    import DefaultFrame from "../components/DefaultFrame.svelte";
    import {icons} from "../scripts/assets.js"
    import {navigateTo} from "yrv";


    function toggleEditAddress1155() {

    }

    function toggleEditMinTier1155() {

    }


</script>
<DefaultFrame header="Audit History">
  <div slot="header-buttons">
    <button class="header-btn btn-hover" on:click={()=>{navigateTo("#members")}}>Members</button>
    <button class="header-btn btn-hover" on:click={()=>{navigateTo("#admin")}}>Admins</button>
  </div>
  <div slot="content">
    <div class="history f-weight-700">

    </div>
  </div>
</DefaultFrame>
<style>

    .history {
        text-align: left;
        display: flex;
        flex-direction: column;
        min-width: 385px;
    }

</style>