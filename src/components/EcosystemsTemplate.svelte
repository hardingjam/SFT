<script>
    import LandingFooter from './LandingFooter.svelte';
    export let name = ''
    export let hero = ''
    export let icon = ''
    export let iconBackground = ''
</script>
<div class="content-container ">
  <div class="tube-container absolute top-0">
    <img src="{hero}" alt="hero"/>
  </div>
  <div class="content">
    <slot name="gradients"></slot>
    <div class="gap-20 flex flex-col mb-24">
      <div class="flex items-center justify-center rounded-full page-icon" style="
		   background: {iconBackground}">
        <img src="{icon}" alt="investor"/>
      </div>
      <div class="header-text">{name}</div>
    </div>
    <div class="paragraphs">
      <slot name="content"></slot>
    </div>
  </div>
  <LandingFooter></LandingFooter>
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

    .content {
        position: relative;
        margin-top: 400px;
        z-index: 2;
        text-align: left;
        padding: 0 122px;
    }

    .paragraphs {
        margin-bottom: 200px;
        position: relative;
        z-index: 3;
    }

    .page-icon {
        width: 65px;
        height: 65px;
    }
</style>