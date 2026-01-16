<template>
  <li
        v-for="menu in menus"
        :key="menu.ID"
        class="navbar-item"
        :class="{ active: openMenu === menu.ID }"
        @mouseenter="openMenu = menu.ID"
      >
        <!-- label -->
        <button
          type="button"
          class="navbar-title"
          :class="{ active: openMenu === menu.ID }"
          @click="toggleMenu(menu.ID)"
        >
          {{ menu.label }}
        </button>
        <!-- 下拉選單 -->
        <ul
          v-show="menu.items.length > 0"
          class="dropdown"
          :class="{ 'is-open': openMenu === menu.ID }"
          @mouseleave="openMenu = menu.ID"
        >
          <li
            v-for="item in menu.items"
            :key="item.text"
            class="dropdown-content"
          >
            <div class="card">
              <div class="item-pic">
                <img :src="item.img" alt="" />
              </div>
              <div class="item-text">
                <h3>{{ item.text }}</h3>
              </div>
            </div>
          </li>
        </ul>
      </li>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
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

const props = defineProps<{
  menu: Menu;
  openMenu: MenuKey;
  setOpenMenu: (key: MenuKey) => void; // hover 用 set
  toggleMenu: (key: MenuKey) => void; // click 用 toggle
}>();

console.log("SSR:", import.meta.server);



</script>

<style scoped lang="scss">
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


</style>
