<script>
    export let name;
    export let executors;
    export let admins
</script>

<div class="role-container">
  <span class="title">{name}</span>
  <div class="role-list">
    <div class="executor">
      <span>Executor</span>
      {#each executors as executor}
        <div>{executor.replace(/(.{7}).*/, "$1…")}</div>
      {/each}
    </div>
    <div class="role-admin">
      <span>Role Admin</span>
      {#each admins as admin}
        <div>{admin.replace(/(.{7}).*/, "$1…")}</div>
      {/each}
    </div>
  </div>

</div>

<style>
    .role-container {
        text-align: left;
        margin-left: 56px;
        margin-right: 56px;
    }

    .title {
        font-style: normal;
        font-weight: 700;
        font-size: 16px;
        line-height: 27px;
        color: #000000;
    }

    .role-list {
        display: flex;
        justify-content: space-between;
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 27px;
    }
</style>