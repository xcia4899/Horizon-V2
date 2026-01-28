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
// import { ref, computed } from "vue";
// //featureContent 資料
// const featureContent = [
//   {
//     label: "專業級操作",
//     title: "專為專業人士而設計。",
//     text: "為了在高強度使用情境下維持穩定表現，這些產品以實際需求為核心設計，兼顧效能與可靠性，讓你能專注於真正重要的事。",
//     media: "./images/picture/row-second-item-01.jpg",
//     href: "",
//   },
//   {
//     label: "電競制霸",
//     title: "競技表現，精準到位。",
//     text: "從操作回饋到整體手感，每一個細節都為即時反應而生。透過精密調校與實戰驗證，帶來穩定且一致的操控體驗。",
//     media: "./images/picture/row-second-item-02.jpg",
//     href: "",
//   },
//   {
//     label: "提高您的生產力",
//     title: "為長時間專注而生。",
//     text: "以人體工學為核心，提供良好的支撐與穩定性，減少長時間使用帶來的負擔，讓工作與創作都能保持流暢節奏。",
//     media: "./images/picture/row-second-item-04.jpg",
//     href: "",
//   },
//   {
//     label: "自在生活靈感",
//     title: "設計，回歸日常。",
//     text: "簡潔而不失質感的設計語言，融入生活中的每一個場景，讓使用變得自然，讓風格成為日常的一部分。",
//     media: "./images/picture/row-second-item-03.webp",
//     href: "",
//   },
// ];
// // 預設為第一個
// const activeIndex = ref(0);
// //點擊切換
// const clickAction = (index: number) => {
//   activeIndex.value = index;
// };
// const panelStyle = computed(() => ({
//   transform: `translate3d(${-activeIndex.value * 100}%, 0, 0)`,
// }));
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
    gap: 48px;
  }
}
</style>
