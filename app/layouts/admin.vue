<template>
  <div class="admin-layout">
    <header class="admin-header">
      <AdminHeader />
    </header>
    <section class="admin-content">
      <aside class="admin-sidebar">
        <AdminSidebar />
      </aside>
      <main class="admin-main">
        <slot></slot>
      </main>
    </section>
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: "Horizon-後台",
  ogTitle: "Horizon｜前端電商後台系統實作",
});
</script>

<style scoped lang="scss">
.admin-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
  isolation: isolate;
  background: var(--bg-surface);
}
.admin-header {
  //   position: fixed;
  top: 0;
  background: var(--bg-surface-strong);
  overflow-x: clip;
  width: 100%;
  z-index: 100;
}
.admin-content {
  flex: 1;
  position: relative;
  display: flex;
  .admin-sidebar {
    flex: 0 0 20%;
    max-width: 200px;
    min-width: 160px;
    background:var(text-tertiary);
  }
  .admin-main {
    flex: 1;
    position: relative;
    padding: 16px;
  }
}
</style>
