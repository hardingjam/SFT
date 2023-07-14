<script>
    export let header = ''
</script>
<div class="default-frame">
  <div class="display-flex buttons">
    <slot name="header-buttons"></slot>
  </div>
  <div class="default-frame-container">
    <slot name="content"></slot>
  </div>
</div>
<style>

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
        margin-bottom: 1rem;
    }

</style>