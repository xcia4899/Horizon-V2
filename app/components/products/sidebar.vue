<template>
  <section v-show="!isSidebarClose" class="main-sidebar">
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

        <ul v-show="isSectionOpen(index)" class="sidebar-group-options">
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
    <div class="mobile-Btn">
      <div class="reset">
        <h4>重置</h4>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <!-- 加號（+） -->
          <path
            d="M12 5v14M5 12h14"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
          />
        </svg>
      </div>
      <button class="btn">確定</button>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, toRefs } from "vue";
import type { SidebarList } from "@/types/ui/sidebar";

const props = defineProps<{
  sidebarList: SidebarList[];
  openSections: number[];
  selectTags: (string | number)[];
  isSidebarClose: boolean;
}>();

const emit = defineEmits<{
  (e: "update:selectTags", value: (string | number)[]): void;
  (e: "toggleSection", index: number): void;
}>();

const { sidebarList, openSections } = toRefs(props);

const modelSelectTags = computed({
  get: () => props.selectTags,
  set: (val) => emit("update:selectTags", val),
});
const toggleSection = (index: number) => {
  emit("toggleSection", index);
};

const isSectionOpen = (index: number) => openSections.value.includes(index);
</script>

<style scoped lang="scss">
.main-sidebar {
  width: clamp(186px, 25%, 240px);
  .sidebar-title {
    text-align: center;
    font-size: 24px;
    font-weight: 600;
    margin-bottom: 16px;
    display: none;
  }
  .sidebar-groups {
    .sidebar-group {
      padding: 4px 0px;
      margin-bottom: 4px;
      border-bottom: 1px dashed var(--border-default);
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
        .options-item {
          display: flex;
          align-items: center;
          max-height: 400px;
          overflow: hidden;
          padding: 6px 8px;
          border-radius: 4px;
          transition: background-color 0.2s ease-out;
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
        }
        &.onOpen {
          max-height: 400px;
        }
      }
      &.underline {
        border-bottom-style: solid;
        border-color: var(--border-soft);
      }
    }
  }
  .mobile-Btn {
    position: fixed;
    display: none;
    flex-direction: column;
    align-items: center;
    gap: 16px;
    left: 0;
    bottom: 0;

    width: 100%;
    // height: 140px;
    padding: 16px 0px 48px;
    font-size: 16px;

    .reset {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 8px 24px;
      // width: 90%;
      border-radius: 4px;
      text-align: center;
      border: 1px solid transparent;
      cursor: pointer;
      h4 {
        font-size: 16px;
      }
      svg {
        transform: rotate(45deg);
      }
    }
    .btn {
      font-size: 16px;
      width: 90%;
    }
  }
}
</style>
