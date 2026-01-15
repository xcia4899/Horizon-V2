// nuxt.config.ts
export default defineNuxtConfig({
  ssr: true,
  compatibilityDate: "2025-07-15",

  app: {
    // GH Pages 需要 /repo-name/，本機開發用 /
    baseURL: process.env.NUXT_APP_BASE_URL || "/",
  },

  // ✅ 只有在要部署 GH Pages（static）時才啟用
  nitro:
    process.env.NUXT_PUBLIC_DEPLOY_TARGET === "gh"
      ? {
          preset: "github_pages",
          prerender: {
            // 至少 prerender 首頁，避免停用 JS 空白
            routes: ["/"],
            crawlLinks: true,
            failOnError: false,
          },
        }
      : undefined,

  devtools: { enabled: true },

  css: ["@/assets/scss/main.scss"],

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
