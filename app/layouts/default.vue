<template>
  <div class="layout">
    <header class="header">
      <div class="header-inner">
        <layoutHeader />
      </div>
    </header>

    <main class="container">
      <slot></slot>
    </main>

    <layoutFooter />
  </div>
</template>

<style scoped lang="scss">
.layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
  isolation: isolate;
}

/* 外層：滿版 sticky + 背景 + 層級 */
.header {
  position: sticky;
  position: relative;
  top: 0;
  //  background-color: #e9e9e9;
  // background-color: #fff;
  /* 內層：置中 + max-width */
  z-index: 100;
  .header-inner {
    position: relative;
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 32px;
    @include baseTransition;
    @media screen and (max-width: 670px) {
      padding: 0 16px;
    }
  }
}

.container {
  flex: 1;
  max-width: 1280px;
  margin: 0 auto;
  padding: 16px;
  z-index: 1;
}
</style>
