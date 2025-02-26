// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  modules: ["@nuxt/eslint"],
  css: ["bootstrap/dist/css/bootstrap.min.css", "assets/scss/main.scss"],
});
