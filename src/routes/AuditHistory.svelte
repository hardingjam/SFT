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
      <div>
        <table class="receipts">
          <thead>
          <tr>
            <th>Receipt ID</th>
            <th>Options</th>
            <th>Last updated</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          </tbody>
        </table>
      </div>
      <div>
        <table class="certify">
          <thead>
          <tr>
            <th>Total amount</th>
            <th>Certified on</th>
            <th>Certified by</th>
            <th>Certified until</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          </tbody>
        </table>

      </div>
    </div>
  </div>
</DefaultFrame>
<style>

    .history {
        text-align: left;
        display: flex;
        flex-direction: column;
        min-width: 678px;
        height: 530px;
    }

    table {
        width: 100%;
    }

    thead {
        text-align: center;
    }

    .receipts {
        height: 300px;
        border-bottom: 1px solid #D2D2D2;;
    }

    .certify {
        margin-top: 30px;
    }


</style>