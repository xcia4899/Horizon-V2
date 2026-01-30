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
      <div class="promo">
        <div class="promo-media">
          <img src="/images/home/promo/promo-01.png" alt="" />
        </div>
        <div class="promo-content">
          <div class="promo-content-inner">
            <h3 class="promo-title">簡約優雅 輕鬆制敵</h3>
            <p class="promo-text">
              ROG Falchion RX Low Profile 是一款精巧設計的 65%
              電競鍵盤，結合優雅風格與強大效能。搭載全新的 ROG RX
              矮軸與雙層消音泡棉，為您帶來無與倫比的打字與遊戲體驗。
            </p>
            <button class="promo-btn btn">了解更多</button>
          </div>
        </div>
      </div>
      <div class="promo">
        <div class="promo-media"></div>
        <div class="promo-content">
          <div class="promo-content-inner">
            <h3 class="promo-title">簡約優雅 輕鬆制敵</h3>
            <p class="promo-text">
              ROG Falchion RX Low Profile 是一款精巧設計的 65%
              電競鍵盤，結合優雅風格與強大效能。搭載全新的 ROG RX
              矮軸與雙層消音泡棉，為您帶來無與倫比的打字與遊戲體驗。
            </p>
            <button class="prome-btn btn">了解更多</button>
          </div>
        </div>
      </div>
    </section>
    <section class="home-brands">home-brands</section>
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
//--home-feature---------------
.home-feature {
  background-color: var(--bg-surface-strong);
  .feature-inner {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    padding-block: 76px 64px;
    gap: clamp(32px, 5vw, 48px);
  }
}
//--home-showcase---------------
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
  }
}
//home-promo
.home-promo {
  display: flex;
  flex-direction: column;
  .promo {
    display: flex;
    align-items: center;
    // justify-content: flex-start;
    width: 100%;
    border: 1px solid red;
    .promo-media {
      flex: 0 0 50%;
      // width: 50%;
      height: auto;
      aspect-ratio: 1 / 1;
      background-color: #797979;
      img {
        width: 100%;
        
      }
    }
    .promo-content {
      flex: 0 0 50%;
      display: flex;
      .promo-content-inner {
        max-width: 600px;
        // padding: 100px;
      }
    }
  }
  .promo:nth-child(even) {
    flex-direction: row-reverse;
    .promo-content {
      justify-content: flex-end;
    }
  }
}
</style>
