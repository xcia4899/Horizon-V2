<template>
  <li class="menu-btn" @mouseenter="onEnter" @mouseleave="onLeave">
    <button
      :class="{ active: openMenu === menu.key }"
      @click="toggleMenu(menu.key)"
      type="button"
    >
      <slot></slot>
    </button>

    <ul class="dropdown" :class="{ 'is-open': openMenu === menu.key }">
      <li v-for="item in menu.items" :key="item.href">
        <a :href="item.href">{{ item.text }}</a>
      </li>
    </ul>
  </li>
</template>

<script setup lang="ts">
type MenuKey = "product" | "brand" | "event" | "about" | null;

type MenuItem = { text: string; img: string; href: string };
type Menu = { key: Exclude<MenuKey, null>; label: string; items: MenuItem[] };

const props = defineProps<{
  menu: Menu;
  openMenu: MenuKey;
  toggleMenu: (key: MenuKey) => void;
}>();

function onEnter() {
  // hover 進入：開啟該選單（不要直接改 props.openMenu）
  props.toggleMenu(props.menu.key);
}

function onLeave() {
  // hover 離開：關閉
  props.toggleMenu(null);
}
</script>
<style scoped lang="scss">
.dropdown.is-open {
  opacity: 1;
  transform: translateY(0);
  pointer-events: auto;
}
</style>
