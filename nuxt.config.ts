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
  },

  runtimeConfig: {
    public: {
      // Nuxt 會自動對應 NUXT_PUBLIC_BACKEND_BASE_URL
      backendBaseURL: "",
    },
  },

  nitro: {
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
    "@element-plus/nuxt",
  ],
  image: {
    // 解決 TS 報錯：直接移除 static 物件
    // 透過 dir 確保抓取 public 目錄
    dir: "public",

    // 如果未來需要針對不同環境調整路徑，我們可以用 providers 寫法，
    // 但對 GitHub Pages 來說，最簡單且不報錯的方式是直接把 baseURL 寫在 app 裡就好，
    // 然後透過一個簡單的變數來處理 alias。
    alias: {
      "/images": process.env.NUXT_APP_BASE_URL
        ? `${process.env.NUXT_APP_BASE_URL}/images`
        : "/images",
    },
  },
  icon: {
    serverBundle: "remote", // 改成遠端抓取，避免 API 路徑在 GitHub Pages 失效
  },
});
