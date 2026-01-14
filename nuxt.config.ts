// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  app: {

    // baseURL: "/", // 重要：前後後要有 /
   baseURL: process.env.NUXT_APP_BASE_URL || "/",
  },
  nitro: {
    preset: "github_pages",
    prerender: {
      crawlLinks: false,
      failOnError: false,
    },
  },
  devtools: { enabled: true },
  css: ["@/assets/scss/main.scss"],

  // B. SCSS 全域注入（每個 <style lang="scss"> 都可直接用）
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @use "@/assets/scss/variables.scss" as *;
            @use "@/assets/scss/mixins.scss" as *;
          `,
        },
      },
    },
  },
  modules: [
    "@nuxt/fonts",
    "@nuxt/icon",
    "@nuxt/image",
    "@nuxt/eslint",
    "@pinia/nuxt",
  ],
});