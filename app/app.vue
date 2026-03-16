<template>
  <NuxtLayout>
    <p>目前的 BaseURL 是: {{ useRuntimeConfig().app.baseURL }}</p>
    <NuxtPage />
  </NuxtLayout>
</template>

