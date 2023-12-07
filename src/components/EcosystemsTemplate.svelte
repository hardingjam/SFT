<script>
    export let name = ''
    export let hero = ''
    export let icon = ''
</script>
<div class="content">
  <div class="tube-container">
    <img src="{hero}" alt="hero"/>
  </div>

  <div class="info-card">
    <div class="gap-20 flex flex-col mb-24">
      <div class="flex items-center justify-center rounded-full page-icon">
        <img src="{icon}" alt="investor"/>
      </div>
      <div class="header-text">{name}</div>
    </div>
    <slot name="content"></slot>
  </div>
</div>

<style>

    .header-text {
        font-family: 'Inter', sans-serif;
        font-size: 45px;
        font-style: normal;
        font-weight: 700;
        line-height: 55px; /* 122.222% */
        background: linear-gradient(272deg, #5F9AD1 74.74%, #8B5BB0 98.07%);
        background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }

    .info-card {
        position: absolute;
        top: 395px;
        padding: 0 122px;
        z-index: 4;
        text-align: left;
    }

    .page-icon {
        width: 65px;
        height: 65px;
        background: #674AA5;
    }
</style>