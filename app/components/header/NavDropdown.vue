<template>
  <li class="menu-btn" >
    <button
      type="button"
      class="menu-btn-trigger"
      :class="{ active: openMenu === menu.key }"
     
    >
      {{ menu.label }}
    </button>
    <!-- 沒有 items 就不渲染 dropdown -->
    <ul
      v-show="menu.items.length"
      class="dropdown"
      :class="{ 'is-open': openMenu === menu.key }"
    >
      <li v-for="item in menu.items" :key="item.href" class="dropdown-item">
        <a class="dropdown-link" :href="item.href">{{ item.text }}</a>
      </li>
    </ul>
  </li>
</template>

<script setup lang="ts">
type MenuKey = "product" | "brand" | "event" | "about" | null;

interface MenuItem {
  text: string;
  img: string;
  href: string;
}
interface Menu {
  key: string;
  label: string;
  items: MenuItem[];
}

const props = defineProps<{
  menu: Menu;
  openMenu: MenuKey;
  setOpenMenu: (key: MenuKey) => void; // hover 用 set
  toggleMenu: (key: MenuKey) => void; // click 用 toggle
}>();
// console.log("menu檔案",props.menu);
console.log("SSR:", import.meta.server);



</script>

<style scoped lang="scss">
.menu-btn {
  position: relative;
  list-style: none;
  height: 70px;
  display: flex;
  align-items: center;
  cursor: pointer;
  border-bottom: 4px solid transparent;
  white-space: nowrap;

  &:hover {
    border-color: $color-purple;
  }
}

.menu-btn-trigger {
  background: transparent;
  border: 0;
  height: 100%;
  display: flex;
  align-items: center;
  cursor: pointer;
}

/* 關閉狀態 */
.dropdown {
  position: absolute;
  top: 100%;
  left: 0;

  opacity: 0;
  transform: translateY(8px);
  pointer-events: none;

  margin: 0;
  padding: 8px 0;
  list-style: none;

  transition: all 0.3s ease;
}

/* 開啟狀態 */
.dropdown.is-open {
  opacity: 1;
  transform: translateY(0);
  pointer-events: auto;
}

.dropdown-item {
  height: auto;
  width: auto;
  background: transparent;
  border-bottom: 0;
}

.dropdown-link {
  display: block;
  padding: 8px 12px;
  text-decoration: none;
  transition: all 0.3s ease;
}
</style>
