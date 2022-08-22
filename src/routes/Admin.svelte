<script>

    import Role from "../components/Role.svelte";

    let executors = [
        "0x8058ad7C22fdC8788fe4cB1dAc15D6e976127324",
        "0x9999ad7C22fdC8788fe4cB1dAc15D6e976127324",
        "0x8888ad7C22fdC8788fe4cB1dAc15D6e976127324",
    ];
    let admins = [
        "0x1111ad7C22fdC8788fe4cB1dAc15D6e976127324",
    ]
</script>
<div class="sft-admin-container">
  <div class="admin-header">
    <span>Admin</span>
    <button class="btn-back btn-hover">Back</button>
  </div>
  <div class="roles-container">
    <span class="warning">Important - Deleting or adding is permanent on the blockchain. If all role admins are removed  then it will be unrecoverable.</span>
    <Role name="Depositor" admins={admins} executors={executors}></Role>
  </div>
</div>
<style>
    .sft-admin-container {
        width: 510px;
        height: calc(100vh - 280px);
        background: rgba(44, 44, 84, 0.33);
        border-radius: 20px;
        padding: 12px;
    }

    .admin-header {
        color: #ffffff;
        display: flex;
        justify-content: space-between;
        padding: 5px 25px 10px 35px;
    }

    .btn-back {
        box-sizing: border-box;
        border: 1px solid #FFFFFF;
        border-radius: 5px;
        background: transparent;
        color: #ffffff;
    }

    .btn-back:focus {
        outline: none;
    }

    .roles-container {
        height: calc(100% - 50px);
        background: #FFFFFF;
        border-radius: 10px;
    }

    .warning {
        font-style: normal;
        font-weight: 400;
        font-size: 8px;
        line-height: 13px;
        color: #000000;
    }
</style>