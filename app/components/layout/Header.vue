<template>
  <div
    class="header-inner"
    :class="{ 'mobile-isOpen': isMenuOpenMobile === true }"
  >
    <button type="button" class="menu-toggle" @click="toggleMenu">
      <Icon name="mdi:menu" class="icon" />
    </button>
    <!-- LOGO -->
    <div class="nav-left">
      <button type="button" class="logo" @click="goHome">Horizon</button>
    </div>
    <!-- Navber-menu -->
    <section
      class="navbar"
      :class="{ 'mobile-isOpen': isMenuOpenMobile === true }"
    >
      <HeaderNavbarMenu :menus="menus" :closeMenuOpenMobile="closeMenuOpenMobile" />
    </section>
    <!-- Navber-Right -->
    <aside
      class="nav-right"
      :class="{ 'mobile-isOpen': isMenuOpenMobile === true }"
    >
      <HeaderNavbarRight v-model:isMenuOpenMobile="isMenuOpenMobile" />
    </aside>
  </div>
</template>

<script setup lang="ts">
// import { ref, onMounted, onBeforeUnmount } from "vue";
//element-plus/icons

// 下拉選單邏輯 ==================
//menu 型別
import type { SetMenu } from "@/types/ui/menu";
import { looding } from "@/composables/useFetchState";
// const router = useRouter();

// 所有導覽列選單資料
const menus: SetMenu[] = [
  {
    ID: "product",
    label: "商品",
    items: [
      { text: "新品上市", img: "./images/pic-detal/RAZER-1000/10001.jpg" },
      { text: "特價商品", img: "./images/pic-detal/PRO-1002/10001.png" },
      {
        text: "滑鼠",
        img: "./images/picture/fourth-row2-01.png",
        tag: "mouse",
      },
      {
        text: "鍵盤",
        img: "./images/picture/fourth-row2-06.png",
        tag: "keyboard",
      },
      {
        text: "耳機",
        img: "./images/pic-detal/PRO-1007/10007.png",
        tag: "headset",
      },
      {
        text: "麥克風",
        img: "./images/pic-detal/ROG-1005/10003.png",
        tag: "mic",
      },
    ],
  },
  {
    ID: "brand",
    label: "品牌",
    items: [
      { text: "MSI", img: "./images/logo/MSI.png", tag: "msi" },
      { text: "Logitech", img: "./images/logo/LOGI.png", tag: "logitech" },
      { text: "Razer", img: "./images/logo/RAZER.png", tag: "razer" },
      { text: "ROG", img: "./images/logo/ROG.png", tag: "rog" },
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
const isMenuOpenMobile = ref(false);
const toggleMenu = () => {
  isMenuOpenMobile.value = !isMenuOpenMobile.value;
};
const closeMenuOpenMobile = async () => {
  await looding(300);
  isMenuOpenMobile.value = false;
};
const goHome = async () => {
  await looding(200);
  navigateTo("/");
};
</script>

<style scoped lang="scss">
//header高度設定
// $headerHeight: 70px;

.header-inner {
  display: flex;
  justify-content: space-between;
  align-items: center;
  // top: 0;
  // height: auto;
  margin: 0 auto;
  padding-inline: $padding-RWD;

  @include baseTransition(height, 0.6s);
  .nav-left,
  .nav-right,
  .navbar {
    flex: 1;
    // max-width: 300px;
    align-items: baseline;
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
  .nav-left {
    display: grid;
    place-items: center start;
    height: 100%;
    max-height: 70px;
    .logo {
      height: 100%;
      font-size: 40px;
      // text-align: left;
      font-weight: bolder;
      // line-height: $headerHeight;

      color: var(--brand);
      cursor: pointer;
    }
  }

  .navbar {
    flex: 2;
    @include baseTransition(max-height, 0.6s);
  }
  .nav-right {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
}

/* ===== mobile ===== */
@media screen and (max-width: 768px) {
  .header-inner {
    height: $headerHeight;
    background-color: var(--bg-header);
    align-content: flex-start;
    flex-wrap: wrap;
    @include baseTransition(height, 0.6s);
    .menu-toggle {
      // position: absolute;
      flex: 0 0 auto;
      display: flex;
    }
    .nav-left {
      flex: 1;
      // place-items: center;
      position: absolute;
      left: 50%;
      top: 0px;
      transform: translateX(-50%);
      // transform: translateX(-50%);
      .logo {
        font-size: clamp(24px, 6vw, 40px);
      }
    }
    .navbar {
      order: 3;
    }
    .nav-right {
      order: 2;
    }
    .navbar,
    .nav-right {
      flex: 0 0 100%;
      // color: $color-gray-800;
      background-color: var(--bg-header);
      max-height: 0;
      opacity: 0;
      transition:
        max-height 0.4s ease,
        opacity 0.2s ease 0.2s;
      overflow: hidden;
    }
    .navbar.mobile-isOpen,
    .nav-right.mobile-isOpen {
      opacity: 1;
      max-height: 700px;
    }
  }
  .header-inner.mobile-isOpen {
    height: 100vh;
  }
}

// @media screen and (max-width: 550px) {
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
