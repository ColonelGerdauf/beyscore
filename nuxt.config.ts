// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  modules: ["@nuxt/eslint", "@vite-pwa/nuxt"],
  css: ["bootstrap/dist/css/bootstrap.min.css", "assets/scss/main.scss"],
  pwa: {
    registerType: "autoUpdate",
    workbox: {
      globPatterns: ["**/*.{js,css,html,ico,png,svg}"],
    },
    // includeAssets: ["favicon.ico", "apple-touch-icon.png", "mask-icon.svg"],
    manifest: {
      name: "WBO BeySore",
      short_name: "BeyScore",
      description:
        "The official score keeping app of the World Beyblade Organization",
      theme_color: "#ffffff",
      scope: "/beyscore/",
      start_url: "/beyscore/",
      icons: [
        // {
        //   src: "pwa-192x192.png",
        //   sizes: "192x192",
        //   type: "image/png",
        // },
        // {
        //   src: "pwa-512x512.png",
        //   sizes: "512x512",
        //   type: "image/png",
        // },
      ],
    },
  },
});
