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
      <div v-for="item in promoList" :key="item.id" class="promo">
        <div class="promo-media">
          <img :src="item.image.src" :alt="item.image.alt" />
        </div>
        <div class="promo-content">
          <div class="promo-content-inner">
            <h3 class="promo-title">{{ item.title }}</h3>
            <p class="promo-text">
              {{ item.text }}
            </p>
            <button class="promo-btn btn" @click="gotoLink(item.id, item.link)">
              {{ item.linkText }}
            </button>
          </div>
        </div>
      </div>
    </section>
    <section class="home-brands">home-brands</section>
  </div>
</template>

<script setup lang="ts">
// import { ref } from "vue";
const promoList = [
  {
    id: "falchion-rx",
    title: "簡約優雅・輕鬆制敵",
    text:
      "ROG Falchion RX Low Profile 是一款精巧設計的 65% 電競鍵盤，" +
      "結合優雅外型與強大效能。搭載全新的 ROG RX 矮軸與雙層消音泡棉，" +
      "為您帶來無與倫比的打字與遊戲體驗。",
    image: {
      src: "./images/home/promo/promo-01.png",
      alt: "ROG Falchion RX Low Profile 電競鍵盤",
    },
    linkText: "了解更多",
    link: "#",
  },
  {
    id: "mouse-pro",
    title: "舒適自然的進化",
    text:
      "PRO 級無線傳輸技術帶來前所未見的高速與穩定性。" +
      "我們最先進的滑鼠經過全面升級，解鎖全新反應標準，" +
      "讓你在頂級競技遊戲中獲得所需的速度與精準度。",
    image: {
      src: "./images/home/promo/promo-02.png",
      alt: "ROG PRO 無線電競滑鼠",
    },
    linkText: "了解更多",
    link: "#",
  },
];
const gotoLink = (id: string, link: string) => {
  // window.open(link, "_blank", "noopener,noreferrer");
  console.log(`前往${id}的詳細頁面`, link);
};
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
  background: radial-gradient(var(--bg-surface) , var(--bg-surface-strong));
  .promo {
    display: flex;
    align-items: center;
    .promo-media {
      flex: 0 0 50%;
      // width: 50%;
      height: auto;
      aspect-ratio: 1 / 1;
      img {
        width: 100%;
      }
    }
    .promo-content {
      flex: 0 0 50%;
      display: flex;
      .promo-content-inner {
        display: flex;
        flex-direction: column;
        gap: 24px;
        max-width: 640px;
        padding: clamp(16px, 5vw, 32px);
        padding-left: clamp(32px, 5vw, 64px);
      }
      .promo-text {
        color: var(--text-secondary);
      }
    }
  }
  .promo:nth-child(even) {
    flex-direction: row-reverse;
    .promo-content {
      justify-content: flex-end;
      .promo-content-inner {
        padding-right: clamp(32px, 5vw, 64px);
      }
    }
  }
}
</style>
