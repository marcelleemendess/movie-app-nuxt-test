export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'app-movie-nuxt',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    'bootstrap/dist/css/bootstrap.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [

  ],
  router: {
    middleware: ['auth']
  },
  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
      '@nuxtjs/firebase'
  ],
  firebase: {
        config: {
          apiKey: "AIzaSyDhs7zOA4ixxQa6eI5NUc6nSfXowNrAR5o",
          authDomain: "movie-app-nuxt-def48.firebaseapp.com",
          projectId: "movie-app-nuxt-def48",
          storageBucket: "movie-app-nuxt-def48.appspot.com",
          messagingSenderId: "895775294854",
          appId: "1:895775294854:web:b026e9e87630695c171807"
        },
        services: {
          auth: {
            persistence: 'local', // default
            initialize: {
              onAuthStateChangedAction: 'onAuthStateChangedAction',
              subscribeManually: false
            },
            ssr: false
          }

        }
    },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
