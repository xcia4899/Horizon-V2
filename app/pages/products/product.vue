<template>
  <div class="product">
    <main class="product-detailed">
      <!-- Product Overview: media + information -->
      <section class="product-overview">
        <div class="container product-overview-inner">
          <div class="product-media">
            <div class="product-media-main">
              <img :src="currentImage" :alt="`${product.name}商品大圖`" />
            </div>
            <div class="product-media-thumbnails">
              <button
                v-for="(img, index) in product.images.thumbnails"
                :key="index"
                class="thumbnails-btn"
                :class="{ active: currentImage === img }"
                @click="currentImage = img"
              >
                <img :src="img" alt="商品縮圖" />
              </button>
            </div>
          </div>

          <div class="product-information">
            <div class="information-title">
              <h3 class="product-title">{{ product.name }}</h3>
              <p class="product-subtitle">{{ product.subtitle }}</p>
            </div>
            <div class="information-color">
              <h4>顏色</h4>
              <h5>{{ product.color }}</h5>
            </div>
            <div class="information-shipping">
              <h4>免費運送</h4>
            </div>
            <div class="information-text">
              <p>
                {{ product.description }}
              </p>
            </div>
            <div
              v-for="(item, index) in product.details"
              :key="index"
              class="info-section"
            >
              <h4 class="section-title" @click="toggleInfoSection(index)">
                {{ item.section }}
                <icon
                  class="icon"
                  :class="{ rotate: isOpenInfoSection(index) }"
                  name="icon-park-solid:up-c"
                  size="24"
                />
              </h4>

              <div
                v-for="(content, idx) in item.content"
                :key="content.title + idx"
                class="section-content"
                :class="{ isOpen: isOpenInfoSection(index) }"
              >
                <div class="section-content-inner">
                  <div class="block-title">{{ content.title }}</div>
                  <ul class="block-list">
                    <li v-for="text in content.text" :key="text">{{ text }}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <!-- Product Video -->
      <section class="product-video">
        <div class="product-video-media">
          <!-- <iframe
            width="100%"
            height="auto"
            src="https://www.youtube.com/embed/vFZlgReIzOg"
            title="YouTube video player"
            frameborder="0"
            allow="
              accelerometer;
              autoplay;
              clipboard-write;
              encrypted-media;
              gyroscope;
              picture-in-picture;
            "
            allowfullscreen
          >
          </iframe> -->
        </div>
      </section>
      <!-- Product Features -->
      <section class="product-features">
        <h2 class="product-features-intro">
          {{ product.highlights.title }}
        </h2>
        <h4 class="product-features-text">
          {{ product.highlights.description }}
        </h4>
        <div class="product-features-content">
          <div
            v-for="item in product.highlights.items"
            :key="item.id"
            class="content-item"
          >
            <div class="item-icon">
              <img :src="item.icon" :alt="item.title + '圖示'" />
            </div>
            <h4>{{ item.title }} <br />{{ item.subtitle }}</h4>
            <div class="desc">
              <h5 v-for="desc in item.desc" :key="desc">
                {{ desc }}
              </h5>
            </div>
          </div>
        </div>
      </section>
    </main>
    <!-- Recommend -->
    <section class="recommend">
      <div class="container">
        <CommonRecommend />
      </div>
    </section>
    <!-- Bottom Bar -->
    <section class="product-bottomBar">
      <div class="bottomBar-inner">
        <div class="bottomBar-info">
          <h3 class="bottomBar-brand">{{ product.brand }} 系列</h3>
          <div class="bottomBar-price">
            <!-- 特價顯示（僅限有特價時） -->
            <h3 v-if="product.onsale" class="discount">
              特價 ${{ product.discount.toLocaleString() }}
            </h3>
            <!-- 原價，若有特價則加上刪除線 -->
            <h3 class="price" :class="{ strike: product.onsale }">
              NT$ {{ product.price.toLocaleString() }}
            </h3>
          </div>
        </div>
        <div class="bottomBar-actions">
          <button class="btn bottomBar-btn">加入購物車</button>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import CommonRecommend from "@/components/common/Recommend.vue";
import type { Product } from "@/composables/useProducts";

//商品資料來源
const productSeed: Product = {
  id: "MSI-1003",
  brand: "MSI",
  name: "GH50 電競耳機",
  subtitle: "舒適耐用，長時間遊戲不累",
  category: "耳機",
  color: "粉紅",
  discount: 1899,
  price: 2400,
  onsale: true,
  description:
    "搭配 RGB 背光系統，視覺效果升級，具備虛擬 7.1 聲道與可拆卸麥克風，專為沉浸式遊戲體驗打造。",
  images: {
    main: "/images/pic-detal/MSI-1003/10002.png",
    thumbnails: [
      "/images/pic-detal/MSI-1003/10001.png",
      "/images/pic-detal/MSI-1003/10002.png",
      "/images/pic-detal/MSI-1003/10003.png",
    ],
  },
  details: [
    {
      section: "規格與詳細資訊",
      content: [
        {
          title: "音效技術",
          text: ["虛擬 7.1 聲道環繞音效", "40mm 驅動單體", "可調整低音效果"],
        },
        {
          title: "設計與功能",
          text: [
            "RGB 燈效可自訂",
            "金屬頭帶結構",
            "可拆卸式降噪麥克風",
            "折疊式設計便於攜帶",
          ],
        },
      ],
    },
    {
      section: "相容性",
      content: [
        {
          title: "作業系統",
          text: ["Windows 10 或更新版本"],
        },
        {
          title: "連接方式",
          text: ["USB 介面"],
        },
      ],
    },
    {
      section: "包裝內容物",
      content: [
        {
          title: "內容物",
          text: ["GH50 電競耳機", "可拆卸式麥克風", "便攜收納包", "使用手冊"],
        },
      ],
    },
    {
      section: "支援",
      content: [
        {
          title: "項目",
          text: [
            "驅動程式下載",
            "產品註冊",
            "常見問題",
            "保固服務（2 年有限保固）",
            "技術支援",
          ],
        },
      ],
    },
  ],
  highlights: {
    title: "下一代進化的冠軍耳機",
    description:
      "受到冠軍的信任，憑藉我們的 HERO 2 感測器和閃電快速的 LIGHTFORCE開關的強大和精準度，您永遠不會錯過目標。專業級，準備好比賽，並以同級最佳表現為後盾。",

    items: [
      {
        id: "surround71",
        title: "HERO 2",
        subtitle: "感應器",
        icon: "/images/icon/g502x-hero25k-icon 1.png",
        desc: ["最先進的遊戲感應器", "44K DPI, 888 IPS, 88"],
      },
      {
        id: "rgb",
        title: "LIGHTSPEED",
        subtitle: "無線連接",
        icon: "/images/icon/g502x-lightspeed-icon 1.png",
        desc: ["冠軍信賴的錦標賽級技術"],
      },
      {
        id: "mic",
        title: "LIGHTFORCE",
        subtitle: "混合微動",
        icon: "/images/icon/g502x-lightforce-icon 1.png",
        desc: ["光學精準", "機械觸感"],
      },
    ],
  },
  tags: ["藍芽耳機", "電競耳機", "⭐⭐⭐⭐"],
};
//主要大圖
const currentImage = ref<string>(productSeed.images.main);

const openInfoSections = ref<number[]>([]);
//設定InfoSection點擊事件
const toggleInfoSection = (index: number) => {
  const idx = openInfoSections.value.indexOf(index);
  if (idx > -1) openInfoSections.value.splice(idx, 1);
  else openInfoSections.value.push(index);
};
//點擊後查詢有無值
const isOpenInfoSection = (index: number) => {
  return openInfoSections.value.includes(index);
};

//過濾後商品內容
const product = computed<Product>(() => {
  return productSeed;
});
</script>

<style scoped lang="scss">
.product-detailed {
  margin-top: 70px;
  width: 100%;
  background-color: var(--bg-surface);
  .product-overview {
    .product-overview-inner {
      display: flex;
      align-items: center;
      gap: 32px;
      height: calc(100vh - 160px);
      // overflow: hidden;
      padding-block: 32px;
    }
    .product-media {
      flex: 0 0 60%;
      // width: 70%;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 32px;

      .product-media-main {
        flex: 0 0 50%;
        display: flex;
        justify-content: center;
        img {
          max-height: 480px;
          max-width: 720px;
          width: 100%;
          height: 100%;
          object-fit: contain;
        }
      }
      .product-media-thumbnails {
        display: flex;
        justify-content: center;
        gap: 24px;
        .thumbnails-btn {
          display: flex;
          height: clamp(60px, 8vw, 80px);
          aspect-ratio: 6/4;
          padding: 4px;
          border: 2px solid var(--border-default);
          border-radius: 4px;
          // overflow: hidden;
          cursor: pointer;
          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
          &.active {
            border-color: var(--brand);
          }
        }
      }
    }
    .product-information {
      flex: 1;
      display: flex;
      flex-direction: column;

      height: 100%;
      min-width: 300px;

      gap: 16px;
      overflow: auto;
      scrollbar-width: none; //隱藏滾輪
      .information-color {
        display: flex;
        gap: 8px;
        align-items: flex-end;
      }
      .info-section {
        background-color: var(--bg-surface-strong);
        border-radius: 4px;
        padding: 8px;

        .section-title {
          display: flex;
          justify-content: space-between;
          align-items: center;
          cursor: pointer;

          .icon {
            transition: transform 0.25s ease;
            &.rotate {
              transform: rotate(-180deg);
            }
          }
          @media (hover: hover) and (pointer: fine) {
            &:hover {
              color: var(--brand-hover);
            }
          }
        }
        .section-content {
          display: grid;
          grid-template-rows: 0fr;
          overflow: hidden;
          padding: 0 8px;
          opacity: 0;
          transition:
            grid-template-rows 0.3s ease,
            opacity 0.6s ease 0.2s,
            padding 0.2s ease;

          .section-content-inner {
            overflow: hidden;
            border-radius: 8px;
          }

          .block-title {
            font-weight: bolder;
            font-size: 16px;
            padding-block: 12px 4px;
            cursor: default;
          }
          .block-list {
            font-weight: lighter;
            li {
              padding-block: 2px;
              cursor: default;
            }
            @media (hover: hover) and (pointer: fine) {
              li:hover {
                color: var(--brand-hover);
              }
            }
          }
          &.isOpen {
            opacity: 1;
            grid-template-rows: 1fr;
            padding: 8px 8px;
          }
        }
      }
    }
  }

  .product-video {
    background-color: #000;
    padding: 32px;
    .product-video-media {
      position: relative;
      height: 0;
      // overflow: hidden;
      // width: 90vw;
      height: 80vh;
      margin: 0 auto;
      padding: 32px;

      iframe {
        // position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border: none;
      }
    }
  }

  .product-features {
    padding: 32px 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: var(--bg-surface);
    // gap: 32px;

    .product-features-intro,
    .product-features-text,
    .product-features-content {
      padding: 32px;
      width: 80%;
      text-align: center;
    }
    .product-features-text {
      color: var(--text-secondary);
    }
    .product-features-content {
      // width: 60%;
      display: flex;
      justify-content: space-around;
      gap: 24px;

      .content-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 240px;
        gap: 16px;
        .item-icon {
          min-height: 200px;
          display: flex;
          align-items: center;
          justify-content: center;
          aspect-ratio: 1/1;
          padding: 8px;
          border-radius: 8px;
          background: $color-gray-100;
          transition: background-color 0.6s ease;
          img {
            object-fit: cover;
          }
          @media (hover: hover) and (pointer: fine) {
            &:hover {
              background: $color-white;
            }
          }
        }
        .desc {
          display: flex;
          flex-direction: column;
          align-items: center;
          color: var(--text-secondary);
        }
      }
    }
  }
}
.recommend {
  background: var(--bg-surface-strong);
}
.product-bottomBar {
  position: fixed;
  bottom: 0px;
  background-color: rgba(var(--bg-header), 0.8);
  backdrop-filter: blur(8px);

  // color: $color-darkgery;
  width: 100%;
  z-index: 100;
  box-shadow: var(--shadow-focus);
  .bottomBar-inner {
    position: relative;
    max-width: 1440px;
    margin: 0 auto;
    padding-inline: $padding-RWD;
    height: $headerHeight;

    display: flex;
    justify-content: space-between;
    align-items: center;

    gap: 16px;
  }
  .bottomBar-info {
    width: 100%;
    display: flex;
    justify-content: space-between;

    .bottomBar-price {
      font-size: clamp(20px, 3vw, 28px);
      font-weight: 900;

      display: flex;
      justify-content: center;
      align-items: flex-end;
      flex-direction: row-reverse;
      gap: 8px;
    }
    .discount {
      color: var(--state-danger);
      font-weight: bolder;
    }
    .strike {
      text-decoration: line-through;
      color: var(--text--tertiary);
      opacity: 0.8;
      font-size: clamp(16px, 3vw, 20px);
    }
  }

  .bottomBar-actions {
    .bottomBar-btn {
      width: 200px;
      font-size: clamp(16px, 2vw, 20px);
      font-weight: 600;
    }
  }
}
</style>
