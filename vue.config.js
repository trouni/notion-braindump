module.exports = {
  pwa: {
    workboxPluginMode: "InjectManifest",
    workboxOptions: {
      swSrc: "./src/service-worker.js",
    },
    appleMobileWebAppCapable: "yes",
    iconPaths: {
      favicon32: "favicon-32x32.png",
      favicon16: "favicon-16x16.png",
      appleTouchIcon: "apple-touch-icon-180x180.png",
      maskIcon: "safari-pinned-tab.svg",
      msTileImage: "mstile-150x150.png",
    },
    manifestOptions: {
      name: "Section L Check-in",
      short_name: "Check-in",
      icons: [
        {
          src: "/android-chrome-192x192.png",
          sizes: "192x192",
          type: "image/png",
        },
        {
          src: "/android-chrome-512x512.png",
          sizes: "512x512",
          type: "image/png",
        },
      ],
      theme_color: "#2196f3",
      background_color: "#2196f3",
      start_url: "/",
      display: "standalone",
      orientation: "portrait",
      scope_url: "/",
      intent_filters: {
        scope_url_scheme: "https",
        scope_url_host: "checkin.section-l.co",
        scope_url_path: "/",
      },
    },
  },
};
