// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  future: {
    compatibilityVersion: 4,
  },
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  modules: [
    "@nuxt/eslint",
    "@vite-pwa/nuxt",
    "@vueuse/sound/nuxt",
    "@nuxtjs/color-mode",
    "@pinia/nuxt",
  ],
  css: ["bootstrap/dist/css/bootstrap.min.css", "assets/scss/main.scss"],
  sound: {
    sounds: {
      scan: true,
    },
  },
  pwa: {
    registerType: "autoUpdate",
    devOptions: {
      enabled: true,
    },
    workbox: {
      globPatterns: ["**/*.{js,css,html,ico,png,svg}"],
    },
    includeAssets: ["favicon.ico", "apple-touch-icon.png", "maskable-icon.png"],
    manifest: {
      name: "WBO BeySore",
      short_name: "BeyScore",
      description:
        "The official score keeping app of the World Beyblade Organization",
      theme_color: "#ffffff",
      scope: "/",
      start_url: "/",
      icons: [
        {
          src: "pwa-64x64.png",
          sizes: "64x64",
          type: "image/png",
        },
        {
          src: "pwa-192x192.png",
          sizes: "192x192",
          type: "image/png",
        },
        {
          src: "pwa-512x512.png",
          sizes: "512x512",
          type: "image/png",
        },
      ],
    },
  },
  colorMode: {
    dataValue: "bs-theme",
  },
});

