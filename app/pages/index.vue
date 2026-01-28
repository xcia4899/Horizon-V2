feature-content
<template>
  <div>
    <section class="home-hero">home-hero</section>
    <section class="home-feature">
      <div class="feature-inner container">
        <HomeFeature />
      </div>
    </section>
    <section class="home-products">home-products</section>
    <section class="home-categories">home-categories</section>
    <section class="home-promo">home-promo</section>
    <section class="home-brands">home-brands</section>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
//--home-feature---------------
.home-feature {
  background-color: var(--bg-surface-strong);
  .feature-inner {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    padding-block: 64px;
    gap: clamp(32px, 5vw, 48px);
  }
}
.container {
  @media (max-width: 500px) {
    padding-inline: 0px;
  }
}
</style>
