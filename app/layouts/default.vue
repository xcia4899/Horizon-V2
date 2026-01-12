<template>
  <div class="layout">
    <MainHeader />

    <main class="container">
      <slot />
    </main>

    <MainFooter />
  </div>
</template>

<style scoped lang="scss">
.layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
.container {
  flex: 1;
  max-width: 1200px;
  margin: 0 auto;
  padding: 16px;
}
</style>
