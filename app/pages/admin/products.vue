<template>
  <div class="admin-page">
    <!-- page header -->
    <header class="page-header">
      <div>
        <h1 class="page-title">商品管理</h1>
        <p class="page-desc">管理網站商品資料</p>
      </div>

      <div class="page-actions">
        <button class="btn-primary">新增商品</button>
      </div>
    </header>

    <!-- toolbar -->
    <section class="page-toolbar">
      <input placeholder="搜尋商品..." class="search-input" />
    </section>

    <!-- main content -->
    <section class="page-content">
      <div class="content-card">
        <!-- table example -->
        <table class="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>商品名稱</th>
              <th>價格</th>
              <th>操作</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>1</td>
              <td>Gaming Keyboard</td>
              <td>$2990</td>
              <td>
                <button>編輯</button>
                <button>刪除</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "admin",
});
</script>

<style scoped lang="scss">
.admin-page {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

/* header */

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.page-title {
  font-size: 24px;
  font-weight: 700;
}

.page-desc {
  font-size: 14px;
  color: #666;
}

/* toolbar */

.page-toolbar {
  display: flex;
  gap: 12px;
}

/* content */

.page-content {
  flex: 1;
}

.content-card {
  padding: 20px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

/* table */

.data-table {
  width: 100%;
  border-collapse: collapse;

  th,
  td {
    padding: 12px;
    text-align: left;
  }

  thead {
    background: #f5f5f5;
  }

  tbody tr {
    border-bottom: 1px solid #eee;
  }
}
</style>
