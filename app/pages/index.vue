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
    <section class="home-showcase">
      <div class="container showcase-inner">
        <HomeShowcase />
      </div>
    </section>
    <section class="home-promo">
      <HomePromo />
    </section>
    <section class="home-ad">
      <BannerPromoBanner />
    </section>
  </div>
</template>

<script setup lang="ts">
// import { ref } from "vue";
</script>

<style scoped lang="scss">
.container {
  @media (max-width: 550px) {
    padding-inline: 0px;
  }
}
//分類---------------
.home-feature {
  background-color: var(--bg-surface-strong);
  .feature-inner {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    padding-block: 76px 64px;
    gap: clamp(32px, 5vw, 48px);
    @media (max-width: 550px) {
      padding-block: 64px 32px;
      // gap: 36px;
    }
  }
}
//最新消息---------------
.home-showcase {
  // width: 100%;
  color: var(--text-inverse);
  background: var(--bg-surface-contrast);
  .showcase-inner {
    display: flex;
    flex-direction: column;
    width: 100%;
    padding-block: 76px 64px;
    gap: 48px;
    @media (max-width: 550px) {
      padding-block: 64px 32px;
      gap: 36px;
    }
  }
}
//樣品廣告
.home-promo {
  display: flex;
  flex-direction: column;
  background: radial-gradient(var(--bg-surface), var(--bg-surface-strong));
}
//橫式宣傳圖----------
.home-ad {
  max-height: 400px;
  overflow: hidden;
}
</style>
