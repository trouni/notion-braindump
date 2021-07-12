module.exports = {
  pwa: {
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      swSrc: './src/service-worker.js',
    },
    appleMobileWebAppCapable: 'yes',
    iconPaths: {
      favicon32: 'img/icons/favicon-32x32.png',
      favicon16: 'img/icons/favicon-16x16.png',
      appleTouchIcon: 'img/icons/apple-touch-icon-180x180.png',
      maskIcon: 'img/icons/safari-pinned-tab.svg',
      msTileImage: 'img/icons/mstile-150x150.png',
    },
    manifestOptions: {
      name: 'Braindump',
      short_name: 'Braindump',
      icons: [
        {
          src: '/img/icons/android-chrome-192x192.png',
          sizes: '192x192',
          type: 'image/png',
        },
        {
          src: '/img/icons/android-chrome-512x512.png',
          sizes: '512x512',
          type: 'image/png',
        },
      ],
      theme_color: '#2196f3',
      background_color: '#2196f3',
      start_url: '/',
      display: 'standalone',
      orientation: 'portrait',
      scope_url: '/',
      intent_filters: {
        scope_url_scheme: 'https',
        scope_url_host: 'massive-braindump.netlify.app',
        scope_url_path: '/',
      },
    },
  },
}
