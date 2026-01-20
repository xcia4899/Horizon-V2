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
  // background-color: $color-white;
 

  /* 內層：置中 + max-width */
  z-index: 100;
  .header-inner {
    position: relative;
    max-width: 1400px;
    margin: 0 auto;
    // padding: 0 32px;
    padding: 0 clamp(8px, 1.5vw, 16px);
    @include baseTransition;
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
