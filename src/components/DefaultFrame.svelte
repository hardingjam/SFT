<script>
    export let header = ''
    export let backBtn = true
</script>
<div class="default-frame">
  <div class="header">
    <span>{header}</span>
    <slot name="address">
    </slot>
    <div class="display-flex">
      <slot name="header-buttons"></slot>
      {#if backBtn}
        <button class="header-btn btn-hover" on:click={()=>{history.back()}}>Back</button>
      {/if}
    </div>
  </div>
  <div class="default-frame-container">
    <slot name="content"></slot>
  </div>
</div>
<style>
    .header {
        color: #ffffff;
        display: flex;
        justify-content: space-between;
        padding: 5px 25px 10px 35px;
    }

    .default-frame-container {
        background: #FFFFFF;
        border-radius: 10px;
        color: #000000;
        display: flex;
        flex-direction: column;
        overflow: hidden;
        padding: 30px 60px;
    }

</style>