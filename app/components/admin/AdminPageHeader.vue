<template>
  <header class="page-header">
    <div class="page-header-info">
      <h1 class="page-header-title">{{ title }}</h1>
      <p v-if="desc" class="page-header-desc">{{ desc }}</p>
    </div>

    <div class="page-header-actions">
      <slot></slot>
    </div>
  </header>
</template>

<script setup lang="ts">
defineProps<{
  title: string;
  desc?: string;
}>();
</script>

<style scoped lang="scss">
.page-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;

  &-info {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  &-title {
    font-size: 24px;
    font-weight: 700;
  }

  &-desc {
    font-size: 14px;
    color: var(--text-secondary);
  }

  &-actions {
    display: flex;
    gap: 12px;
    flex-shrink: 0;
  }
}
</style>
