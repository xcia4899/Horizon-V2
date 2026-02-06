<template>
  <div class="feature-intro">
    <h2>打造你的理想戰場</h2>
    <p>
      探索專屬於你的桌面配置，從精準操作到沉浸體驗，找到最適合你的裝備組合。無論是激戰時刻或日常創作，Horizon
      都為你準備好進化所需。
    </p>
  </div>
  <div class="feature-content">
    <div class="feature-actions">
      <button
        v-for="(item, index) in featureContent"
        :key="item.label"
        type="button"
        class="actions-item"
        :class="{ active: activeIndex === index }"
        @click="clickAction(index)"
      >
        {{ item.label }}
      </button>
    </div>
    <div class="feature-panel">
      <div class="panel-inner" :style="panelStyle">
        <div
          v-for="item in featureContent"
          :key="item.title"
          class="panel-card"
        >
          <div class="card-media">
            <img :src="item.media" alt="" />
            <div
              v-for="value in item.pointerItems"
              :key="value.title"
              class="linkPoint"
              :style="{
                left: value.position.left,
                top: value.position.top,
              }"
            >
              <button class="point"></button>
              <p class="text">{{ value.title }}</p>
            </div>
          </div>
          <div class="card-content">
            <h3 class="card-title">{{ item.title }}</h3>
            <p class="card-text">
              {{ item.text }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
//featureContent 資料
const featureContent = [
  {
    label: "專業級操作",
    title: "專為專業人士而設計。",
    text: "為了在高強度使用情境下維持穩定表現，這些產品以實際需求為核心設計，兼顧效能與可靠性，讓你能專注於真正重要的事。",
    media: "./images/home/feature/feature-01.jpg",
    href: "",
    pointerItems: [
      {
        title: "G522 LIGHT",
        href: "",
        position: {
          left: "26%",
          top: "22%",
        },
      },
    ],
  },
  {
    label: "電競制霸",
    title: "競技表現，精準到位。",
    text: "從操作回饋到整體手感，每一個細節都為即時反應而生。透過精密調校與實戰驗證，帶來穩定且一致的操控體驗。",
    media: "./images/home/feature/feature-02.jpg",
    href: "",
    pointerItems: [
      {
        title: "G522 LIGHT",
        href: "",
        position: {
          left: "8%",
          top: "60%",
        },
      },
      {
        title: "PRO X TKL RAPID",
        href: "",
        position: {
          left: "36%",
          top: "52%",
        },
      },
      {
        title: "GM08 滑鼠",
        href: "",
        position: {
          left: "73%",
          top: "64%",
        },
      },
    ],
  },
  {
    label: "提高您的生產力",
    title: "為長時間專注而生。",
    text: "以人體工學為核心，提供良好的支撐與穩定性，減少長時間使用帶來的負擔，讓工作與創作都能保持流暢節奏。",
    media: "./images/home/feature/feature-03.jpg",
    href: "",
    pointerItems: [
      {
        title: "G522 LIGHT",
        href: "",
        position: {
          left: "72%",
          top: "4%",
        },
      },
      {
        title: "G915 X LIGHTSPEED",
        href: "",
        position: {
          left: "32%",
          top: "66%",
        },
      },
    ],
  },
  {
    label: "自在生活靈感",
    title: "設計，回歸日常。",
    text: "簡潔而不失質感的設計語言，融入生活中的每一個場景，讓使用變得自然，讓風格成為日常的一部分。",
    media: "./images/home/feature/feature-04.webp",
    href: "",
    pointerItems: [
      {
        title: "Cetra True 藍牙耳機",
        href: "",
        position: {
          left: "50%",
          top: "10%",
        },
      },
    ],
  },
];
// 預設為第一個
const activeIndex = ref(0);
//點擊切換
const clickAction = (index: number) => {
  activeIndex.value = index;
};
const panelStyle = computed(() => ({
  transform: `translate3d(${-activeIndex.value * 100}%, 0, 0)`,
}));
</script>

<style scoped lang="scss">
p {
  color: var(--text-secondary);
}
.feature-intro {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  text-align: center;
  max-width: 600px;
  @media (max-width: 550px) {
    padding-inline: $padding-RWD;
  }
}
.feature-content {
  display: flex;
  flex-direction: column;
  .feature-actions {
    // width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    // flex-direction: column;
    // flex-wrap: wrap;
    .actions-item {
      width: 0 0 50%;
      width: 100%;
      padding: 16px 16px;
      font-size: clamp(18px, 2vw, 20px);
      font-weight: 400;
      color: var(--text-tertiary);
      border-bottom: 2px solid var(--border-default);
      // transition: all 0.3s ease;
      cursor: pointer;
      @media (hover: hover) and (pointer: fine) {
        border-width: 4px;
        &:not(.active):hover {
          color: var(--text-secondary);
          border-color: var(--brand-hover);
        }
      }
      &:active,
      &.active {
        color: var(--brand-hover);
        border-color: var(--brand);
        font-weight: 500;
      }
    }

    @media (max-width: 550px) {
      flex-direction: column;
      padding-inline: $padding-RWD;
    }
  }

  .feature-panel {
    display: flex;
    flex-direction: column;
    padding-block: 32px 0;
    overflow: hidden;
    .panel-inner {
      display: flex;
      width: calc(100% + 2px);
      transition: transform 0.6s ease;
      will-change: transform;
    }
    .panel-card {
      flex: 0 0 100%;
      width: 100%;
      display: flex;
      align-items: center;
      // gap: clamp(16px, 3vw, 32px);
      // margin-inline:16px ;
      .card-media {
        position: relative;
        flex: 0 0 55%;
        width: 100%;
        img {
          width: 100%;
          object-fit: cover;
        }
      }
      .linkPoint {
        position: absolute;
        left: 0;
        top: 0;
        display: flex;
        flex-direction: column-reverse;
        justify-content: center;
        align-items: center;
        gap: 12px;
        .text {
          color: $color-black;
          background-color: rgba($color-white, 0.7);
          padding: 4px 8px;
          border-radius: 4px;
          transition: transform 0.3s ease-out;
        }
        .point:hover+.text {
          transform: translateY(-8px)scale(1.2);
          background-color: rgba($color-white, 1);
        }
      }
      .card-content {
        flex: 1;
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 24px;
        padding: $padding-RWD;
      }
      @media (max-width: 550px) {
        flex-direction: column;
      }
    }
  }
}
</style>
