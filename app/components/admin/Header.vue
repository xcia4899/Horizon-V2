<template>
  <header class="admin-header">
    <div class="admin-header-brand">
      <h3 class="admin-header-logo" @click="goToAdmin">Horizon Admin</h3>
      <p class="admin-header-subtitle">後台管理系統</p>
    </div>

    <div class="admin-header-actions">
      <div class="admin-header-user">
        <span class="admin-header-user-name">XXX 管理員</span>
      </div>

      <div class="admin-header-buttons">
        <button type="button" class="admin-btn" @click="goToHome">
          回到網站
        </button>
        <button type="button" class="admin-btn admin-logout">登出帳號</button>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
const goToHome = () => {
  navigateTo("/");
};
const goToAdmin = () => {
  navigateTo("/admin");
};
</script>

<style scoped lang="scss">
.admin-header {
  min-height: 72px;

  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  padding: 8px 16px;
  background: var(--bg-surface);
  border-bottom: 1px solid var(--border-default);
}
.admin-header-brand {
  min-width: 180px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  cursor: pointer;
  .admin-header-logo {
    cursor: pointer;
    margin: 0;
    // font-size: 22px;
    font-weight: 700;
    color: var(--brand);
  }
  .admin-header-subtitle {
    margin: 4px 0 0;
    font-size: 12px;
    color: var(--text-secondary);
  }
}

.admin-header-actions {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  flex-wrap: wrap;
  justify-content: flex-end;
  .admin-header-user {
    font-size: 14px;
    color: var(--text-primary);
    .admin-header-user-name {
      padding: 8px 12px;
      border-radius: 8px;
      border: 1px solid var(--border-default);
    }
  }
  .admin-header-buttons {
    display: flex;
    gap: 10px;
    // flex-wrap: wrap;
    .admin-logout {
      color: #d9534f;
      &:hover {
        border-color: #d9534f;
      }
    }
  }
}

@media (max-width: 768px) {
  .admin-header {
    align-items: flex-start;
    flex-direction: column;
    padding: 16px;
    .admin-header-actions {
      width: 100%;
      justify-content: flex-end;
    }
  }
}
</style>
