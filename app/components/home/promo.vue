<template>
  <div v-for="item in promoList" :key="item.id" class="promo">
    <div class="promo-media">
      <NuxtImg :src="item.image.src" :alt="item.image.alt" />
    </div>
    <div class="promo-content">
      <div class="promo-content-inner">
        <h3 class="promo-title">{{ item.title }}</h3>
        <p class="promo-text">
          {{ item.text }}
        </p>
        <button class="promo-btn btn" @click="gotoProductDetail(item.id)">
          了解更多
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const promoList = [
  {
    id: "ROG-1006",
    title: "簡約優雅・輕鬆制敵",
    text:
      "ROG Falchion RX Low Profile 是一款精巧設計的 65% 電競鍵盤，" +
      "結合優雅外型與強大效能。搭載全新的 ROG RX 矮軸與雙層消音泡棉，" +
      "為您帶來無與倫比的打字與遊戲體驗。",
    image: {
      src: "/images/home/promo/promo-01.png",
      alt: "ROG Falchion RX Low Profile 電競鍵盤",
    },
  },
  {
    id: "PRO-1015",
    title: "舒適自然的進化",
    text:
      "PRO 級無線傳輸技術帶來前所未見的高速與穩定性。" +
      "我們最先進的滑鼠經過全面升級，解鎖全新反應標準，" +
      "讓你在頂級競技遊戲中獲得所需的速度與精準度。",
    image: {
      src: "/images/home/promo/promo-02.png",
      alt: "ROG PRO 無線電競滑鼠",
    },
  },
];

const gotoProductDetail = async (id: string) => {
  // console.log("指定ID", id);
  await looding(100)
  await navigateTo({
    name: "products-id",
    params: { id },
  });
};
</script>

<style scoped lang="scss">
.promo {
  display: flex;
  align-items: center;
  .promo-media {
    flex: 0 0 50%;
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
      padding: $padding-RWD;
      padding-left: clamp(32px, 4vw, 64px);
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
      padding-right: clamp(32px, 4vw, 64px);
    }
  }
}
@media (max-width: 550px) {
  .promo,
  .promo:nth-child(even) {
    flex-direction: column;
    .promo-media,
    .promo-content {
      flex: 0 0 100%;
    }
    .promo-content {
      .promo-content-inner {
        padding: 16px 16px 32px;
      }
      .promo-title {
        align-self: center;
      }
      .promo-btn {
        width: 100%;
        height: 32px;
      }
    }
  }
}
</style>
