<template>
  <div class="layout">
    <header class="header">
      <div class="header-inner">
        <layoutHeader />
      </div>
    </header>

    <main class="container">
      <slot></slot>
    </main>

    <footer class="footer">
      <layoutFooter />
    </footer>
  </div>
</template>
<script setup lang="ts">
//soe 設定
useSeoMeta({
  title: "Horizon-V2",
  description:
    "Horizon 為前端電商系統實作專案，使用 Nuxt 4 與 Vue 3 建構，實作商品瀏覽、購物車流程、會員功能與狀態管理。",
  keywords: "前端工程師,Nuxt4,Vue3,電商系統,作品集,Pinia",

  ogTitle: "Horizon｜前端電商系統實作",
  ogDescription: "Nuxt 4 + Vue 3 電商專案，展示完整購物流程與前端架構能力。",
  ogType: "website",
  ogSiteName: "Horizon",

  twitterTitle: "Horizon 電商系統實作",
  twitterDescription: "Nuxt 4 + Vue 3 專案",
  twitterImage: "",
});
</script>

<style scoped lang="scss">
.layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
  isolation: isolate;
}
/* 外層：滿版 sticky + 背景 + 層級 */
.header {
  position: fixed;
  top: 0;
  background: rgba(var(--bg-header) ,0.8);
  backdrop-filter: blur(8px);
  overflow-x: clip;
  width: 100%;
  /* 內層：置中 + max-width */

  z-index: 100;
  .header-inner {
    position: relative;
    max-width: 1440px;
    margin: 0 auto;
    padding: 0 0px;
    // padding: 0 clamp(8px, 1.5vw, 16px);
    // @include baseTransition;
  }
}
.container {
  flex: 1;
  max-width: 1280px;
  min-height: 400px;
  margin: 70px auto;
  // padding: 16px;
  // z-index: 1;
}
.footer {
  position: relative;
  z-index: 10;

  // .footer-inner {
  //   position: relative;
  //   max-width: 1280px;
  //   margin: 0 auto;
  //   padding: 16px clamp(8px, 1.5vw, 16px);
  //   // @include baseTransition;
  // }
}
</style>
