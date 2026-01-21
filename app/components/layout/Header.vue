<template>
  <div class="header-container">
    <button type="button" class="menu-toggle">
      <Icon name="mdi:menu" class="menu-icon" size="24" />
    </button>
    <!-- LOGO -->
    <div class="logo">Horizon</div>
    <!-- Navber-menu -->
    <HeaderNavbarMenu :menus="menus" />
    <!-- Navber-Right -->
    <HeaderNavbarRight />
  </div>
</template>

<script setup lang="ts">
// import { ref, onMounted, onBeforeUnmount } from "vue";
//element-plus/icons

// 下拉選單邏輯 ==================
//menu 型別
import type { SetMenu } from "@/types/ui/menu";

// 所有導覽列選單資料
const menus: SetMenu[] = [
  {
    ID: "product",
    label: "商品",
    items: [
      {
        text: "新品上市",
        img: "/images/pic-detal/RAZER-1000/10001.jpg",
        href: "",
      },
      {
        text: "特價商品",
        img: "/images/pic-detal/PRO-1002/10001.png",
        href: "",
      },
      { text: "滑鼠", img: "/images/pictrue/fourth-row2-01.png", href: "" },
      { text: "鍵盤", img: "", href: "" },
      { text: "耳機", img: "", href: "" },
      { text: "麥克風", img: "", href: "" },
    ],
  },
  {
    ID: "brand",
    label: "品牌",
    items: [
      { text: "MSI", img: "/images/logo/MSI.png", href: "" },
      { text: "Logitech", img: "/images/logo/LOGI.png", href: "" },
      { text: "Razer", img: "/images/logo/RAZER.png", href: "" },
      { text: "ROG", img: "/images/logo/ROG.png", href: "" },
    ],
  },
  {
    ID: "event",
    label: "活動",
    items: [],
  },
  {
    ID: "about",
    label: "關於我們",
    items: [],
  },
];
</script>

<style scoped lang="scss">
.header-container {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  top: 0;
  height: auto;
  margin: 0 auto;
  @include baseTransition(0.6s);
  .logo,
  .nav-right,
  .navbar {
    flex: 1;
    // max-width: 300px;
    align-items: baseline;
  }
  .logo {
    font-size: 40px;
    text-align: left;
    font-weight: bolder;
    line-height: $headerHeight;
    color: $color-purple;
    cursor: pointer;
  }
  .menu-toggle {
    display: none;
    position: absolute;
    top: 80px;
    left: 32px;
    height: $headerHeight;
    align-items: center;
    .menu-icon {
      font-size: clamp(22px, 2.2vw, 30px);
      color: #fffec2; // fill="currentColor" 會跟著變
      cursor: pointer;
    }
  }

  .navbar {
    flex: 2;
    display: flex;
    margin: auto auto;
  }
}
</style>
