<template>
  <div
    class="header-container"
    :class="{ 'mobile-isOpen': isMenuOpen === true }"
  >
    <button type="button" class="menu-toggle" @click="toggleMenu">
      <Icon name="mdi:menu" class="icon" />
    </button>
    <!-- LOGO -->
    <div class="logo">Horizon</div>
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
    label: "關於我們",
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
  align-items: flex-start;
  top: 0;
  height: auto;
  margin: 0 auto;
  padding: 0 clamp(8px, 1.5vw, 16px);
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
    // position: absolute;
    // top: 0px;
    // left: 32px;
    height: $headerHeight;
    align-items: center;
    cursor: pointer;
    .icon {
      font-size: 36px;
      color: #fffed7; // fill="currentColor" 會跟著變
      cursor: pointer;
    }
  }
  .navbar {
    flex: 2;
    @include baseTransition(max-height, 0.6s);
  }
}

@media screen and (max-width: 920px) {
  .header-container {
    height: $headerHeight;
  
    
    background-color: #333;
    // max-height: $headerHeight;
    // color: $color-darkgery;
    // align-items: flex-end;
    align-content: flex-start;
    // flex-direction: column;
    flex-wrap: wrap;
    // transition: all 0.3s ease;
    // overflow: hidden;

    @include baseTransition(height, 0.6s);
    .logo {
      // position: absolute;
      // top: 0px;
      // left: 50%;
      // transform: translateX(-50%);
      // width: 50%;
      text-align: center;
      // max-width: 300px;
      order: 1;
    }

    .menu-toggle {
      flex: 1;
      display: flex;
      order: 0;
    }

    .navbar {
      flex: 0 0 100%;
      order: 3;
      // color: $color-darkgery;
      background-color: #474747;
      max-height: 0;
      opacity: 0;
      @include baseTransition(max-height, 0.4s);
      overflow: hidden;
      .nav-list {
        width: 100%;
        display: flex;
        justify-content: start;
        align-items: flex-start;
        flex-direction: column;
        // padding: 0;
        padding: 8px 0;
        // margin: 0;
        gap: 8px;

        // li {
        //   justify-content: flex-start;
        //   width: 100%;
        //   height: 50px;
        //   border-bottom: 2px solid;
        // }
      }
    }
    .navbar.mobile-isOpen {
      opacity: 1;
      max-height: 100vh;
    }
    .nav-right {
      order: 2;
    }

    .header-content {
      // top: 160px;
      top: 0;
      position: relative;
      background: transparent;
      box-shadow: none;
      transition: all 0.3s ease;
      overflow: visible;

      .hcontent-area {
        padding: 32px;

        .dropdown-close {
          top: -50px;

          &:hover svg {
            box-shadow: none;
          }
        }
      }

      .hcol {
        width: auto;
        flex-wrap: wrap;
        justify-content: center;
        // align-content: center;
        gap: 16px;

        .card {
          width: 120px;

          // background:transparent;
          &::after {
            height: 100%;
          }
        }

        .item-text {
          height: auto;
          padding: 8px;

          h3 {
            font-size: 20px;
          }
        }
      }
    }
  }
  .header-container.mobile-isOpen{
    height: 100vh;
  }
}

// @media screen and (max-width: 670px) {
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

//     .header-content {
//       .hcol {
//         .card {
//           width: 130px;
//         }

//         .item-text {
//           h3 {
//             font-size: 16px;
//           }
//         }
//       }
//     }
//   }
// }
</style>
