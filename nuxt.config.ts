// nuxt.config.ts
export default defineNuxtConfig({
  ssr: true,
  // 開啟 Server-Side Rendering（或 SSG prerender）
  // 本機 dev 會是 SSR，GitHub Pages 會變成靜態 HTML（SSG）

  compatibilityDate: "2025-07-15",
  // Nuxt 的相容性鎖定日期，確保未來版本更新時行為一致
  // 通常不用動，除非官方要求升級

  app: {
    // GitHub Pages 需要 /repo-name/ 子路徑
    // 本機開發通常用 /
    baseURL: process.env.NUXT_APP_BASE_URL || "/",
    // 例如：
    // 本機："/"
    // GH Pages："/Horizon-V2/"
  },

  runtimeConfig: {
    public: {
      // 前端與 server 端都能讀到的環境變數
      // 之後接後端 API 只要改這個，不用改程式碼
      backendBaseURL: process.env.NUXT_PUBLIC_BACKEND_BASE_URL || "",
      // 例：https://your-api.onrender.com
    },
  },

  nitro: {
    // 只有在部署到 GitHub Pages 時才啟用靜態輸出
    preset:
      process.env.NUXT_PUBLIC_DEPLOY_TARGET === "gh"
        ? "github_pages"
        : undefined,

    prerender: {
      // 讓 Nuxt 在 build 時預先產生 HTML
      crawlLinks: true,
      // 會從 "/" 開始爬所有 <a href="..."> 的連結
      routes: ["/"],
      // 至少要有首頁，避免 GitHub Pages 出現空白頁
      failOnError: false,
      // 某些頁面生成失敗時不要中斷 build（避免 CI 直接爆掉）
    },
  },

  devtools: { enabled: true },

  css: ["@/assets/scss/main.scss", "element-plus/dist/index.css"],

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
    "@element-plus/nuxt",
  ],
});
