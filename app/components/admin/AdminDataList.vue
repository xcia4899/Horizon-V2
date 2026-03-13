<template>
  <div class="data-list">
    <div
      class="data-row data-row--head"
      :style="{ gridTemplateColumns: gridColumns }"
    >
      <div v-for="column in tableTitle" :key="column.key">
        {{ column.label }}
      </div>
    </div>

    <div v-if="items.length === 0" class="data-empty">
      {{ emptyText || "目前沒有資料" }}
    </div>

    <div v-else class="data-body">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
export interface AdminColumn {
  key: string;
  label: string;
}

defineProps<{
  tableTitle: AdminColumn[];
  items: unknown[];
  gridColumns: string;
  emptyText?: string;
}>();
</script>

<style scoped lang="scss">
.data-list {
  border: 1px solid var(--border-default);
  border-radius: 12px;
  overflow: hidden;
  background: var(--bg-surface);
  box-shadow: var(--shadow-default);
}

.data-row {
  display: grid;
  align-items: center;
  gap: 12px;
  padding: 14px 16px;
  border-bottom: 1px solid var(--border-default);

  &--head {
    font-weight: 600;
    background: var(--bg-surface-strong);
  }
}

.data-empty {
  padding: 32px;
  text-align: center;
  color: var(--text-secondary);
}
</style>