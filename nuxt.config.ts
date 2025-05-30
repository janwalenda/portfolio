// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@nuxt/ui", "@nuxt/content", "@nuxtjs/i18n"],
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],
  i18n: {
    locales: [
      {
        code: "de",
        name: "Deutsch",
      },
      {
        code: "en",
        name: "English",
      },
    ],
  },
});
