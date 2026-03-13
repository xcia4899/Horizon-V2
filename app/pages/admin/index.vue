<template>
  <div class="admin-dashboard">
    <!-- 系統介紹 -->
    <section class="dashboard-hero">
      <h1>Horizon 管理後台</h1>
      <p>此後台用於管理網站商品、首頁內容與網站資料。</p>
    </section>

    <!-- 管理入口 -->
    <section class="dashboard-grid">
      <div class="dashboard-card">
        <h3>首頁內容管理</h3>
        <p>管理首頁 Hero、Feature、Promo 與 Showcase 區塊。</p>
        <NuxtLink to="/admin/home" class="card-btn">前往管理</NuxtLink>
      </div>

      <div class="dashboard-card">
        <h3>商品管理</h3>
        <p>新增、編輯與刪除商品資料。</p>
        <NuxtLink to="/admin/products" class="card-btn">前往管理</NuxtLink>
      </div>

      <div class="dashboard-card">
        <h3>Banner 管理</h3>
        <p>管理網站活動 Banner 或宣傳內容。</p>
        <NuxtLink to="/admin/banner" class="card-btn">前往管理</NuxtLink>
      </div>

      <div class="dashboard-card">
        <h3>訂單資訊</h3>
        <p>查看訂單狀態與購買資訊（預留功能）。</p>
        <NuxtLink to="/admin/orders" class="card-btn">前往管理</NuxtLink>
      </div>
    </section>

    <!-- 使用說明 -->
    <section class="dashboard-guide">
      <h2>後台使用說明</h2>

      <p>
        本後台系統用於管理網站內容，例如首頁展示商品、商品資料與網站相關資訊。
        管理者可以透過左側選單進入不同的管理功能頁面，查看目前網站的資料列表。
      </p>

      <p>
        進入管理頁面後，可以對資料進行新增、編輯或刪除操作。修改完成後儲存資料，
        系統會更新對應的網站內容。
      </p>

      <p>
        若需要確認修改結果，可點擊「回到網站」查看實際顯示效果。建議在刪除或修改資料前，
        先確認內容是否正確，以避免誤刪或錯誤更新。
      </p>
    </section>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "admin",
});
</script>

<style scoped lang="scss">
.admin-dashboard {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

/* 系統介紹 */
.dashboard-hero {
  padding: 24px;
  border-radius: 8px;
  background: var(--bg-surface);

  h1 {
    font-size: 24px;
    margin-bottom: 8px;
  }

  p {
    color: var(--text-secondary);
  }
}

/* 卡片區 */
.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 16px;
}

.dashboard-card {
  padding: 20px;
  border-radius: 8px;
  background: var(--bg-surface);
  border: 1px solid var(--border-default);

  display: flex;
  flex-direction: column;
  gap: 12px;

  h3 {
    font-size: 16px;
  }

  p {
    font-size: 14px;
    color: var(--text-secondary);
  }
}

.card-btn {
  margin-top: auto;
  padding: 6px 10px;
  background: var(--brand);
  color: white;
  border-radius: 4px;
  text-align: center;
  font-size: 14px;
}

/* 操作說明 */
.dashboard-guide {
  padding: 20px;
  border-radius: 8px;
  background: var(--bg-surface);
}
</style>
