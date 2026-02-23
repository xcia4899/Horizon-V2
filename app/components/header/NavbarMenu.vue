<template>
  <ul ref="menuRef" class="nav-list">
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
            <div class="card" @click="goProducts(item)">
              <div class="item-pic">
                <img :src="item.img" alt="" />
              </div>
              <div class="item-text">
                <h4>{{ item.text }}</h4>
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
import type { MenuKey, MenuItem, OpenMenu, SetMenu } from "@/types/ui/menu";

const router = useRouter();
//控制menuOPen 手機版本開關控制

//螢幕、手機模式判斷
const { isDesktop, isTouch } = useInteractionMode();
const props = defineProps<{
  menus: SetMenu[];
  closeMenuOpenMobile: () => void;
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

//跳轉商品頁 可代參數
const goProducts = async (item: MenuItem) => {
  await looding(200);
  router.push({
    path: "/products",
    query: item ? {} : {},
  });
  openMenu.value = null;
  props.closeMenuOpenMobile()
};
</script>

<style scoped lang="scss">
.nav-list {
  display: flex;
  justify-content: center;
  // gap: 8px;
  margin: auto auto;
}
.navbar-item {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: $headerHeight;
  padding: 0 8px;
  background-color: transparent;
  border-bottom: 4px solid transparent;
  cursor: pointer;
  @media (hover: hover) and (pointer: fine) {
    &:not(.active):hover {
      border-color: var(--brand);
    }
    &:not(.active):hover .navbar-title {
      color: var(--brand-hover);
    }
  }
  &.active {
    border-color: var(--brand);
  }
  .navbar-title {
    border-style: none;
    transition: color 0.3s ease;
    display: flex;
    align-items: center;

    letter-spacing: 1px;
    font-size: clamp(14px, 2vw, 18px);
    white-space: nowrap;
    background-color: transparent;
    // color: $color-white;
    color: var(--color-primary);
    padding: 8px 8px;
    cursor: pointer;
    @media (pointer: coarse) {
      min-height: 44px;
      padding: 16px 12px;
      width: 100%;
    }
    &:active {
      // transform: translateY(-4px);
      opacity: 0.85;
    }
    &.active {
      color: var(--brand-hover);
    }
  }

  .dropdown {
    position: fixed;
    top: $headerHeight;
    left: 1%;
    // right: auto;
    width: 98%;

    padding: 16px;
    background-color: var(--bg-surface);
    border-radius: 8px;
    opacity: 0;
    visibility: hidden;
    transform: translateY(8px);
    pointer-events: none;
    cursor: default;
    // overflow: hidden;
    transition:
      max-height 0.4s ease,
      inset 0.4s ease,
      opacity 0.4s ease,
      transform 0.4s ease,
      visibility 0.4s ease;
  }
  .dropdown.isOpen {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
    pointer-events: auto;
  }
  .dropdown-inner {
    max-width: 1280px; // 只限制內容
    margin: 0 auto; // 內容置中
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    flex-wrap: wrap;
    gap: 8px;
  }
  .dropdown-content {
    .card {
      position: relative;
      width: clamp(72px, 12vw, 160px);
      display: flex;
      flex-direction: column;
      border-radius: 6px;
      color: var(--text-secondary);

      z-index: 1;
      cursor: pointer;
      * {
        position: relative;
        z-index: 1;
      }
      .item-pic {
        padding: 8px;
        aspect-ratio: 1/1;
        border-radius: 6px;
        overflow: hidden;
        background: var(--bg-surface-soft);
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
        h4 {
          cursor: pointer;
          font-size: clamp(12px, 2vw, 20px);
          white-space: nowrap;
        }
      }
    }
    .card::after {
      content: "";
      position: absolute;
      border-radius: 6px;
      inset: 0 0 0 0;
      transform: scaleY(0);
      transform-origin: top;
      background: var(--bg-surface-soft);
      @include baseTransition(transform, 0.3s);
      z-index: 0;
    }
    @media (hover: hover) and (pointer: fine) {
      .card:hover::after {
        transform: scaleY(1);
        box-shadow: var(--shadow-float);
      }
    }
  }
}

/* ===== mobile ===== */
@media screen and (max-width: 768px) {
  .nav-list {
    width: 100%;
    display: flex;
    justify-content: start;
    align-items: flex-start;
    flex-direction: column;
    padding: 8px 0;
    gap: 8px;
    // overflow-y: auto;
  }
  .navbar-item {
    display: block;
    height: auto;
    padding: 0;
    width: 100%;
    border-bottom: 2px solid var(--border-default);
    .dropdown {
      position: relative;
      top: 0;
      left: 0;
      padding: 0;
      max-height: 0px;
      // padding: 0px;
      width: 100%;
      border-radius: 0px;
      background-color: transparent;
      transform: translateY(0px);
    }
    .dropdown.isOpen {
      max-height: 600px;
    }
    .dropdown-inner {
      gap: 16px 16px;
      padding: 16px;
      justify-content: center;
    }
    .dropdown-content {
      .card {
        display: flex;
        flex-direction: column;

        .item-pic {
          padding: 8px;
          background: transparent;
        }
        .item-text {
          padding: 4px;
          text-align: center;
        }
      }
      .card::after {
        content: "";
        transform: scaleY(1);
      }
    }
  }
}
</style>
