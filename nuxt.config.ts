// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,
  sourcemap: true,
  srcDir: "src/",
  modules: [
    "@nuxt/content",
    "@nuxtjs/i18n",
    "@nuxt/eslint",
    "@nuxt/eslint",
    "@nuxt/icon",
    "@nuxtjs/tailwindcss",
  ],
  app: {
    head: {
      title: "Jan Walenda",
      meta: [
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { charset: "utf-8" },
        { name: "description", content: "A Nuxt UI example project" },
      ],
      link: [
        { rel: "icon", type: "image/png", href: "/favicon.png" },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap",
        },
      ],
    },
  },
  compatibilityDate: "2024-11-01",
  devtools: { enabled: false },
  css: ["~/assets/css/main.css"],
  routeRules: {
    "/**/**": { prerender: true },
  },
  icon: {
    mode: "svg",
  },
  i18n: {
    baseUrl: "https://janwalenda.de",
    strategy: "no_prefix",
    defaultLocale: "de",
    langDir: "translations/",
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: "i18n_redirected",
      redirectOn: "root", // recommended
    },
    locales: [
      {
        code: "de",
        language: "de-DE",
        name: "Deutsch",
        file: "de.json",
      },
      {
        code: "en",
        language: "en-US",
        name: "English",
        file: "en.json",
      },
      {
        code: "ja",
        language: "ja-JP",
        name: "日本語",
        file: "ja.json",
      },
    ],
  },
});
