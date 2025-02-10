import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxt/ui'],
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  vite: { plugins: [tailwindcss(),], },
  css: ['~/assets/css/main.css'],
})
