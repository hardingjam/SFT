<script>
    export let header = ''
</script>
<div class="default-frame">
  <div class="frame-header">
    <span class="header-text">{header}</span>
    <div class="display-flex buttons">
      <slot name="header-buttons"></slot>
    </div>
  </div>
  <div class="default-frame-container">
    <slot name="content"></slot>
  </div>
</div>
<style>
    .frame-header {
        display: flex;
        align-items: center;
        justify-content: right;
        padding-bottom: 14px;
    }

    .default-frame-container {
        background: #FFFFFF;
        border-radius: 10px;
        border: 1px solid #C1C1C1;
        color: #000000;
        display: flex;
        flex-direction: column;
        overflow: hidden;
        padding: 30px 60px;
    }

    .buttons {
        justify-content: end;
        width: 33.3%;
    }

    .header-text {
        font-weight: 700;
        color: #9D9D9D;
        text-align: center;
        width: 33.3%;
    }

</style>