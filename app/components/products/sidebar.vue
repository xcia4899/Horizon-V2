<template>
  <section class="main-sidebar" :class="{ isClose: !isSidebarClose }">
    <div class="sidebar-title">篩選</div>
    <ul class="sidebar-groups">
      <li
        v-for="(item, index) in sidebarList"
        :key="item.key"
        class="sidebar-group"
        :class="{ underline: isSectionOpen(index) }"
      >
        <div class="sidebar-group-title" @click="toggleSection(index)">
          <h4 class="title">{{ item.title }}</h4>
          <icon
            class="icon"
            :class="{ rotate: isSectionOpen(index) }"
            name="icon-park-solid:up-c"
            size="24"
          />
        </div>

        <ul
          class="sidebar-group-options"
          :class="{ onOpen: isSectionOpen(index) }"
        >
          <li
            v-for="(options, i) in item.options"
            :key="i"
            class="options-item"
          >
            <label class="checkbox-area">
              <input
                v-model="modelSelectTags"
                class="checkbox"
                type="checkbox"
                :value="options.value"
              />
              {{ options.label }}
            </label>
          </li>
        </ul>
      </li>
    </ul>
    <div class="mobile-btnArea" :class="{ btnAreaShow: isSidebarClose }">
      <div class="reset" @click="resetTags">
        <h4>重置</h4>
        <Icon class="icon" name="iconoir:cancel" size="20" />
      </div>
      <button class="Submit btn" @click="toggleFilter">確定</button>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, toRefs, nextTick } from "vue";
import type { SidebarList } from "@/types/ui/sidebar";

const props = defineProps<{
  sidebarList: SidebarList[];
  openSections: number[];
  selectTags: (string | number)[];
  isSidebarClose: boolean;
  toggleFilter: () => void;
  collapseAllSections: () => void;
}>();

const emit = defineEmits<{
  (e: "update:selectTags", value: (string | number)[]): void;
  (e: "toggle-section", index: number): void;
}>();

const { sidebarList, openSections, toggleFilter, collapseAllSections } =
  toRefs(props);

//子元件用 modelSelectTags 直接雙向綁定v-model:selectTags
const modelSelectTags = computed({
  // 讀取父元件傳下來
  get: () => props.selectTags,
  // emit 回傳父元件更新 selectTags
  set: (val) => emit("update:selectTags", val),
});
// 通知父元件切換 sidebar 區塊開關
const toggleSection = (index: number) => {
  emit("toggle-section", index);
};
// 判斷某個 sidebar 區塊是否展開
const isSectionOpen = (index: number) => openSections.value.includes(index);

//清除TAGS 關閉sidebar 關閉sidebar所有展開
const resetTags = async () => {
  emit("update:selectTags", []);
  await nextTick();
  await looding(100);
  toggleFilter.value();
  collapseAllSections.value();
};
</script>

<style scoped lang="scss">
.main-sidebar {
  width: clamp(186px, 25%, 280px);
  max-width: 280px;
  overflow: hidden;
  opacity: 1;

  // color: var(--text-primary);
  background: var(--bg-surface-strong);

  @media (pointer: fine) {
    padding-right: 32px;
    transition:
      max-width 0.4s ease-out,
      opacity 0.2s ease-out,
      padding-right 0.2s ease-out 0.1s;
  }
  @media (pointer: coarse) {
    transition:
      max-height 0.4s ease-out,
      opacity 0.3s ease-out;
  }
  .sidebar-title {
    font-size: 24px;
    font-weight: 600;
    margin-bottom: 16px;
    display: none;
    justify-content: center;
    align-items: center;
  }
  .sidebar-groups {
    display: flex;
    flex-direction: column;
    gap: 8px;
    .sidebar-group {
      // margin-bottom: 4px;
      border-bottom: 2px dashed var(--border-default);
      transition:
        border-style 0.4s ease-out,
        border-color 0.4s ease-out;
      &.underline {
        border-bottom-style: solid;
        border-color: var(--border-soft);
      }
      @media (hover: hover) and (pointer: fine) {
        &:hover {
          border-bottom-style: solid;
          border-color: var(--border-soft);
        }
      }

      .sidebar-group-title {
        padding: 8px 6px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        cursor: pointer;
        .title {
          cursor: pointer;
        }
        .icon {
          color: var(--brand-soft);
          transition: transform 0.3s ease;
        }
        @media (hover: hover) and (pointer: fine) {
          &:hover {
            .icon {
              color: var(--brand);
            }
          }
        }
        .icon.rotate {
          color: var(--brand);
          transform: rotate(180deg);
        }
      }
      .sidebar-group-options {
        max-height: 0px;
        overflow: hidden;
        transition: max-height 0.4s ease-out;
        .options-item {
          display: flex;
          align-items: center;
          padding: 6px 8px;
          margin-block: 4px;
          border-radius: 4px;
          transition: background-color 0.2s ease-out;
          cursor: pointer;
          .checkbox-area {
            width: 100%;
          }
          .checkbox-area,
          .checkbox {
            cursor: pointer;
          }
          @media (hover: hover) and (pointer: fine) {
            &:hover {
              background: var(--bg-surface-soft);
              color: var(--brand-hover);
            }
          }
          &:active {
            background: var(--bg-surface-soft);
            color: var(--brand-hover);
          }
        }
        &.onOpen {
          max-height: 400px;
        }
      }
    }
  }
  .mobile-btnArea {
    position: fixed;
    display: none;
    flex-direction: column;
    align-items: center;
    gap: 16px;
    left: 0;
    bottom: 0;
    width: 100%;
    padding: 16px 0px 48px;
    font-size: 16px;
    opacity: 0;
    visibility: hidden;
    .reset {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 8px 16px;
      // width: 90%;
      border: 1px solid var(--border-default);
      border-radius: 4px;
      text-align: center;
      cursor: pointer;
      h4 {
        padding-inline: 3px;
      }
      .icon {
        color: var(--state-danger);
      }
      &:active {
        transform: scale(0.95);
      }
    }
    .Submit {
      width: 90%;
    }
  }
  &.isClose {
    opacity: 0;
    @media (pointer: fine) {
      max-width: 0px;
      padding-right: 0px;
    }
  }
  @media (pointer: coarse) and (max-width: 1024px), (max-width: 768px) {
    position: fixed;
    left: 0;
    top: 0px;
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 100%;
    max-height: 100%;
    height: 100%;
    z-index: 200;
    padding: 32px 48px;
    // background-color: #030303;
    .sidebar-title {
      display: flex;
    }
    .sidebar-groups {
      flex: 1;
      overflow-y: scroll;
      scrollbar-width: none; //隱藏滾輪
      gap: 8px;
      max-height: 400px;
      top: 0;
      bottom: 120px;
      .sidebar-group {
        .sidebar-group-options {
          .options-item {
            padding-block: 10px;
          }
        }
      }
    }
    .mobile-btnArea {
      display: flex;
      &.btnAreaShow {
        // opacity: 0;
        visibility: visible;
        // z-index: 200;
        opacity: 1;
        transition: opacity 0.5s ease-out 0.3s;
      }
    }
    &.isClose {
      max-height: 0%;
      z-index: 10;
      visibility: hidden;
    }
  }
}
</style>
