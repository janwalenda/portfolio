// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: "Jan Walenda",
      meta: [
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { charset: "utf-8" },
        { name: "description", content: "A Nuxt UI example project" },
      ],
      link: [
        { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
        { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap" }
      ],
    }
  },
  modules: ["@nuxt/ui", "@nuxt/content", "@nuxtjs/i18n"],
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],
  routeRules: {
    "/**/**": { prerender: true },
  },
  i18n: {
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root', // recommended
    },
    locales: [
      {
        code: "de",
        name: "Deutsch",
      },
      {
        code: "en",
        name: "English",
      },
      {
        code: "ja",
        name: "日本語",
      }
    ],
  },
});
