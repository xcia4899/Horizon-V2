<template>
  <div v-show="selectTags.length" class="filter-selected">
    <button class="selected-allClear" @click="clearAll">
      清除篩選條件
      <Icon class="icon" name="iconoir:cancel" size="24" />
    </button>
    <button
      v-for="(item, index) in selectTags"
      :key="index"
      class="selected-clearBtn"
      @click="removeTag(item)"
    >
      {{ item }}
      <Icon class="icon" name="iconoir:cancel" size="24" />
    </button>
  </div>
</template>

<script setup lang="ts">
type Tag = string | number;
const props = defineProps<{
  selectTags: Tag[];
  collapseAllSections: () => void;
}>();
const emit = defineEmits<{
  (e: "update:selectTags", value: Tag[]): void;
}>();
//filter-selected 刪除TAG
const removeTag = async (tag: string | number) => {
  await nextTick();
  await looding(100);
  emit(
    "update:selectTags",
    props.selectTags.filter((t) => t !== tag),
  );

  //   selectTags.value = selectTags.value.filter((t) => t !== tag);
};
const clearAll = async () => {
  await nextTick();
  await looding(100);

  emit("update:selectTags", []);
  props.collapseAllSections();
  //    return (selectTags.value = []);
};
</script>

<style scoped lang="scss">
.filter-selected {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  padding: 8px;
  .selected-allClear,
  .selected-clearBtn {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    font-weight: 400;
    letter-spacing: 1px;
    padding: 4px 12px;
    border-radius: 8px;
    color: var(--text-secondary);
    background: transparent;
    border: 2px solid var(--border-default);
    cursor: pointer;
    .icon {
      color: var(--brand-hover);
    }
    @media (hover: hover) and (pointer: fine) {
      &:hover {
        color: var(--text-secondary);
        background: var(--bg-surface-soft);
        border-color: var(--brand);
        .icon {
          color: var(--state-danger);
        }
      }
    }
    &:active{
      transform: scale(0.95);
    }
  }
}
</style>
;
