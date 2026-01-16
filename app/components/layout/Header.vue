<template>
  <div class="header-container">
    <div class="menu-toggle">
      <svg
        width="30"
        height="30"
        viewBox="0 0 100 80"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="100" height="12" rx="6" />
        <rect y="30" width="100" height="12" rx="6" />
        <rect y="60" width="100" height="12" rx="6" />
      </svg>
    </div>
    <div class="logo">Horizon</div>

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

    <aside class="nav-right">
      <div class="btnitem search-btn">
        <a href="./productlist.html">
          <svg
            class="icon-color"
            width="26"
            height="26"
            viewBox="0 0 26 26"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clip-path="url(#clip0_238_902)">
              <path
                d="M13.0962 19.1648C16.9139 18.3533 19.351 14.6006 18.5395 10.7828C17.728 6.96502 13.9753 4.52795 10.1575 5.33944C6.33973 6.15093 3.90266 9.90369 4.71415 13.7215C5.52564 17.5392 9.2784 19.9763 13.0962 19.1648Z"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M22.1045 19.0557L17.5468 16.0959"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </g>
            <defs>
              <clipPath id="clip0_238_902">
                <rect
                  width="21.2014"
                  height="21.2014"
                  fill="white"
                  transform="translate(0.101562 4.76758) rotate(-12)"
                />
              </clipPath>
            </defs>
          </svg>
        </a>
      </div>
      <div class="btnitem login-btn">
        <a href="./login.html">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </a>
      </div>
      <div class="btnitem cart-btn">
        <a href="">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 1H5L7.68 14.39C7.77144 14.8504 8.02191 15.264 8.38755 15.5583C8.75318 15.8526 9.2107 16.009 9.68 16H19.4C19.8693 16.009 20.3268 15.8526 20.6925 15.5583C21.0581 15.264 21.3086 14.8504 21.4 14.39L23 6H6"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M6.5 22C7.05228 22 7.5 21.5523 7.5 21C7.5 20.4477 7.05228 20 6.5 20C5.94772 20 5.5 20.4477 5.5 21C5.5 21.5523 5.94772 22 6.5 22Z"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M17.5 22C18.0523 22 18.5 21.5523 18.5 21C18.5 20.4477 18.0523 20 17.5 20C16.9477 20 16.5 20.4477 16.5 21C16.5 21.5523 16.9477 22 17.5 22Z"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </a>
        <!-- <div id="vue-cart-quantity">
              <div class="cart-quantity" v-if="cartItems.length > 0">
                {{ cartItems.length }}
              </div>
            </div> -->
      </div>
    </aside>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted,onBeforeUnmount  } from "vue";

// 下拉選單邏輯 ==================
// 選單固定 ID
type MenuKey = "product" | "brand" | "event" | "about";
// 選單控制（ null 代表全部關閉）
type OpenMenu = MenuKey | null;

//下拉內容
interface MenuItem {
  text: string;
  img: string;
  href: string;
}
// 主選單結構
interface Menu {
  ID: MenuKey;
  label: string;
  items: MenuItem[];
}
// 所有導覽列選單資料
const menus: Menu[] = [
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
    top: 0px;
    left: 32px;
    height: $headerHeight;
    align-items: center;
  }

  .navbar {
    display: flex;
    justify-content: center;
    gap: 1vw;
    max-width: 400px;
    margin: auto auto;
    .navbar-item {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      height: $headerHeight;
      padding: 0 16px;
      background-color: transparent;
      border-bottom: 4px solid transparent;
      cursor: pointer;
      .navbar-title {
        border-style: none;
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
        letter-spacing: 1pz;
        font-size: clamp(14px, 2.5vw, 18px);
        white-space: nowrap;
        background-color: transparent;
        color: $color-white;
        cursor: pointer;
      }
      .navbar-title.active {
        color: $color-purple;
      }
      .dropdown {
        position: fixed;
        top: $headerHeight;
        left: 1%;
        width: 98vw;
        padding: 16px;

        background-color: $color-lightgrey;
        border-radius: 8px;

        display: flex;
        justify-content: space-around;
        align-items: center;
        flex-wrap: wrap;
        gap: 8px;
        cursor: default;
        opacity: 0;
        transform: translateY(8px);
        pointer-events: none;
        @include baseTransition(0.6s);
        .dropdown-content {
          .card {
            position: relative;
            width: 160px;
            display: flex;
            flex-direction: column;
            border-radius: 6px;
            color: $color-darkgery;
            z-index: 1;
            cursor: pointer;
            &::after {
              content: "";
              position: absolute;
              border-radius: 6px;
              inset: 0 0 0 0;
              transform: scaleY(0);
              transform-origin: top;
              background: $color-white;
              @include baseTransition(0.3s);
              z-index: -1;
            }
            &:hover::after {
              transform: scaleY(1);
              box-shadow: $shadow-set;
            }
            * {
              position: relative;
              z-index: 1;
            }
            .item-pic {
              padding: 8px;
              aspect-ratio: 1/1;
              border-radius: 6px;
              overflow: hidden;
              background: $color-white;
              img {
                height: 100%;
                width: 100%;
                object-fit: cover;
              }
            }
            .item-text {
              padding: 16px 8px 16px;
              text-align: center;
              overflow-wrap: break-word;
              color: $color-darkgery;
              h3 {
                font-size: 20px;
              }
            }
          }
        }
      }
      .dropdown.is-open {
        opacity: 1;
        transform: translateY(0);
        pointer-events: auto;
      }
    }
    .navbar-item.active {
      border-color: $color-purple;
    }
  }

  .nav-right {
    gap: 0.2vw;
    display: flex;
    justify-content: flex-end;
    align-items: center;

    a {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: $color-darkgery;
    }

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
