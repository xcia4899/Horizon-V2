<template>
  <ul ref="menuRef" class="navbar">
    <li
      v-for="menu in menus"
      :key="menu.ID"
      class="navbar-item"
      :class="{ active: openMenu === menu.ID && menu.items.length > 0 }"
      @mouseenter="isDesktop && setOpenMenu(menu.ID)"
    >
      <!-- label -->
      <button
        type="button"
        class="navbar-title"
        :class="{ active: openMenu === menu.ID && menu.items.length > 0 }"
        @click="isTouch && toggleMenu(menu.ID)"
      >
        {{ menu.label }}
      </button>
      <!-- 下拉選單 -->
      <div
        v-show="menu.items.length > 0"
        class="dropdown"
        :class="{ isOpen: openMenu === menu.ID }"
      >
        <ul class="dropdown-inner">
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
      </div>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";
//menu 型別
import type { MenuKey, OpenMenu, SetMenu } from "@/types/ui/menu";
//螢幕、手機模式判斷
const { isDesktop, isTouch } = useInteractionMode();
defineProps<{
  menus: SetMenu[];
}>();

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
  if (isTouch.value) return;
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
.navbar {
  display: flex;
  justify-content: center;
  gap: clamp(0px, 1%, 8px);
}
.navbar-item {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: $headerHeight;
  padding: 0 clamp(8px, 1.6vw, 16px);;
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
    width: 98%;
    padding: 16px;
    background-color: $color-lightgrey;
    border-radius: 8px;
    opacity: 0;
    visibility: hidden;
    transform: translateY(8px);
    pointer-events: none;
    @include baseTransition(0.6s);
    cursor: default;

    .dropdown-inner {
      max-width: 1280px; // 只限制內容
      margin: 0 auto; // 內容置中
      display: flex;
      justify-content: space-around;
      align-items: center;
      flex-wrap: wrap;
      gap: 8px;
    }
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
  .dropdown.isOpen {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
    pointer-events: auto;
  }
  &:hover {
    border-color: $color-purple;
  }
  &:hover .navbar-title {
    color: $color-purple;
  }
  &.active {
    border-color: $color-purple;
  }
}
</style>
