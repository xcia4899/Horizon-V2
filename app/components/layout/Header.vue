<template>
  <div class="header-container">
    <button type="button" class="menu-toggle">
      <Icon name="mdi:menu" class="menu-icon" size="24" />
    </button>
    <!-- LOGO -->
    <div class="logo">Horizon</div>
    <!-- Navber-menu -->
    <ul ref="menuRef" class="navbar">
      <HeaderNavbarMenu
        v-for="menu in menus"
        :key="menu.ID"
        :menu="menu"
        :openMenu="openMenu"
        :setOpenMenu="setOpenMenu"
        :toggleMenu="toggleMenu"
      />
    </ul>
    <!-- Navber-Right -->
    <HeaderNavbarRight />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";
//element-plus/icons

// 下拉選單邏輯 ==================
//menu 型別
import type { MenuKey, OpenMenu, SetMenu } from "@/types/ui/menu";

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
// 導覽列ref，用來判斷是否點擊到外部
const menuRef = ref<HTMLElement | null>(null);
// 目前開啟的dropdown的ID
const openMenu = ref<OpenMenu>(null);
const setOpenMenu = (name: OpenMenu) => {
  openMenu.value = name;
};

//dropdown 開關切換
function toggleMenu(name: MenuKey) {
  openMenu.value = openMenu.value === name ? null : name;
}
// 點擊選單外部時關閉所有選單
function handleClickOutside(e: MouseEvent) {
  if (!menuRef.value) return;
  if (!menuRef.value.contains(e.target as Node)) {
    openMenu.value = null;
  }
}
// console.log("SSR:", import.meta.server);
// 掛載時註冊全域點擊事件
onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});
// 卸載時移除事件
onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside);
});
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

  // a {
  //   color: $color-white;
  // }

  .logo,
  .nav-right,
  .navbar {
    flex: 1;
    max-width: 300px;
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
    display: flex;
    justify-content: center;
    gap: 1vw;
    max-width: 400px;
    margin: auto auto;
  }
}
</style>
