<script>
    let hasSlot = false; // Initialize the slot flag to false

    // Check if the slot is provided from the parent component
    $: {
        hasSlot = !!$$slots.header_buttons;
    }
</script>

<div class="default-frame">
  <div class="display-flex justify-end {hasSlot? 'mb-5': ''}">
    <slot name="header_buttons"></slot>
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

</style>