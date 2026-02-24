feature-content
<template>
  <div>
    <section class="home-hero">
      <HomeHero />
    </section>
    <section class="home-feature">
      <div class="container">
        <HomeFeature />
      </div>
    </section>
    <section class="home-recommend">
      <div class="container">
        <CommonRecommend />
      </div>
    </section>
    <section class="home-showcase">
      <div class="container">
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

<script setup lang="ts"></script>

<style scoped lang="scss">
.container {
  @media (max-width: 550px) {
    padding-inline: 0px;
  }
}
.home-hero {
  position: relative;
}

//打造你的理想戰場---------------
.home-feature {
  background-color: var(--bg-surface-strong);
}
//熱門推薦
.home-recommend {
  background: var(--bg-surface);
  .container {
    padding-inline: clamp(16px, 4vw, 32px);
  }
}
//進入 Horizon 啟動新視野---------------
.home-showcase {
  color: var(--text-inverse);
  background: var(--bg-surface-contrast);
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
