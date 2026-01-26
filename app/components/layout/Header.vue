<template>
  <div
    class="header-container"
    :class="{ 'mobile-isOpen': isMenuOpen === true }"
  >
    <button type="button" class="menu-toggle" @click="toggleMenu">
      <Icon name="mdi:menu" class="icon" />
    </button>
    <!-- LOGO -->
    <div class="nav-left">
      <button type="button" class="logo">Horizon</button>
    </div>
    <!-- Navber-menu -->
    <section class="navbar" :class="{ 'mobile-isOpen': isMenuOpen === true }">
      <HeaderNavbarMenu :menus="menus" :isMenuOpen="isMenuOpen" />
    </section>
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
    label: "關於",
    items: [],
  },
];
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};
const isMenuOpen = ref(false);
</script>

<style scoped lang="scss">
.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  // top: 0;
  // height: auto;
  // margin: 0 auto;
  padding: 0 clamp(8px, 1.5vw, 16px);
  @include baseTransition(height, 0.6s);
  .nav-left,
  .nav-right,
  .navbar {
    flex: 1;
    // max-width: 300px;
    align-items: baseline;
  }
  .nav-left {
    display: grid;
    place-items: center start;

    .logo {
      font-size: 40px;
      // text-align: left;
      font-weight: bolder;
      // line-height: $headerHeight;

      color: var(--brand);
      cursor: pointer;
    }
  }

  .menu-toggle {
    display: none;
    height: $headerHeight;
    align-items: center;
    cursor: pointer;
    .icon {
      font-size: 36px;
      color: var(--inverse); // fill="currentColor" 會跟著變
      cursor: pointer;
    }
    &:active {
      .icon {
        transform: scale(0.9);
        opacity: 0.85;
        // color: $color-purple-500;
      }
    }
  }
  .navbar {
    flex: 2;
    @include baseTransition(max-height, 0.6s);
  }
}

/* ===== mobile ===== */
@media screen and (max-width: 768px) {
  .header-container {
    height: $headerHeight;
    background-color: var(--bg-header);
    align-content: flex-start;
    flex-wrap: wrap;
    @include baseTransition(height, 0.6s);
    .menu-toggle {
      flex: 1;
      display: flex;
    }
    .nav-left {
      place-items: center;
    }
    .navbar {
      flex: 0 0 100%;
      order: 3;
      // color: $color-gray-800;
      background-color: var(--bg-header);
      max-height: 0;
      opacity: 0;
      @include baseTransition(max-height, 0.4s);
      overflow: hidden;
    }
    .navbar.mobile-isOpen {
      opacity: 1;
      max-height: 700px;
    }
    .nav-right {
      order: 2;
    }
  }
  .header-container.mobile-isOpen {
    height: 100vh;
  }
}

// @media screen and (max-width: 425px) {
//   #header-inner {
//     .logo {
//       font-size: 28px;
//       width: 100%;
//     }

//     .menu-toggle {
//       transform: scale(0.8);
//       left: 16px;
//     }

//     .navbar {
//       ul {
//         a {
//           font-size: 20px;
//         }
//       }
//     }

//   }
// }
</style>
