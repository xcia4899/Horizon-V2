<template>
  <div class="admin-header-inner">
    <div class="admin-title">
      <h2>Horizon</h2>

    </div>
    <div class="header-info">
      <div class="info-user">
        <div>XXX管理員</div>
        <div>登出帳號</div>
      </div>
      <div>回到網站</div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.admin-header-inner {
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: stretch;
}
.admin-title {
  flex: 0 0 20%;
  display: flex;
  align-items: center;
  // flex-direction: column;
  padding: 4px 16px;
  // gap: 8px;
  max-width: 200px;
  min-width: 160px;
  color: var(--brand);
  background: var(--bg-surface);
}
.header-info {
  padding: 4px 16px;
  // height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
  // align-items: flex-end;
  gap: 24px;
  .info-user {
    display: flex;
    gap: 8px;
  }
}
</style>
