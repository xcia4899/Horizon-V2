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

  .nav-right {
    gap: 0.2vw;
    display: flex;
    justify-content: flex-end;
    align-items: center;

    .btnitem {
      display: flex;
      justify-content: center;
      align-items: center;
      height: $headerHeight;
      width: 25%;
      // height: 100%;
      font-size: 12px;
      // padding: 6px;
      border-bottom: 4px solid transparent;
      cursor: pointer;

      &:hover {
        border-color: $color-purple;
      }
      .icon {
        color: $color-white;
        font-size: clamp(22px, 2.2vw, 30px);
      }
      &:hover .icon {
        color: #a02fec;
        // height: 100%;
      }
      a {
        color: $color-white;
      }

      &:hover svg {
        color: #a02fec;
        // height: 100%;
      }

      .cart-quantity {
        height: 24px;
        width: 24px;
        font-size: 14px;
        font-weight: 600;
        border-radius: 50%;
        color: $color-white;
        background-color: $color-purple;
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
        top: -24px;
        right: 0px;
      }
    }

    .cart-show {
      // display: none;
      color: $color-darkgery;
      position: absolute;
      top: $headerHeight;
      right: 0px;
      max-height: 00px;
      width: 400px;

      border-radius: 0 0 4px 4px;
      background-color: $color-white;

      font-size: 14px;
      font-weight: 600;
      color: $color-darkgery;

      transition: all 0.4s ease-out;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      gap: 8px;
      box-shadow: 0px 2px 2px 0px rgba(22, 22, 22, 0.4);

      .cart-area {
        padding: 16px;
        overflow-y: auto;
        // padding-bottom: 60px;
      }

      .cartproductshow {
        width: 100%;
        min-height: 90px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 8px 8px;
        border-bottom: 1px solid $color-middlekgery;

        img {
          max-width: 60px;
        }

        .itemname {
          max-width: 100px;
        }

        .itemprice {
          min-width: 90px;
        }

        .delete {
          cursor: pointer;
          border: 2px solid $color-middlekgery;
          border-radius: 50%;
          padding: 4px;

          &:hover {
            background-color: $color-purple;
            border: 2px solid transparent;
          }

          svg {
            transform: scale(1.2) rotate(45deg);
            border-radius: 50%;
          }

          &:hover svg {
            color: $color-white;
          }

          &::after {
            opacity: 0;
            visibility: hidden;
            content: "刪除";
            top: -28px;
            left: -6px;
            font-size: 12px;
            position: absolute;
            display: block;
            text-align: center;
            width: 36px;
            // width: 100%;
            border: 1px solid $color-darkgery;
            border-radius: 4px;
            padding: 2px;
          }

          &:hover::after {
            opacity: 0.6;
            visibility: visible;
          }
        }
      }

      &:hover {
        max-height: 600px;
      }

      .bottom-area {
        width: 100%;
        // position: absolute;
        // bottom: -50px;
        display: flex;
        justify-content: space-between;
        padding: 16px 16px;
        background-color: $color-white;

        a {
          display: block;
          width: auto;
        }

        h4 {
          font-weight: 900;
          letter-spacing: 0px;
        }

        .btn {
          height: 30px;
        }
      }
    }

    .cart-btn:hover + .cart-show {
      max-height: 600px;
      // background-color: #cf7e7e;
    }
  }
}
</style>
