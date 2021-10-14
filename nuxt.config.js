export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'AliasGame',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=0.78 maximum-scale=0.78',
      },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Fascinate&family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap',
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Roboto%20Mono:wght@100;200;300;400;500;600;700;800;900&display=swap',
      },

      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com' },
      {
        rel: 'stylesheet',
        type: 'text/css',
        href: 'https://csshake.surge.sh/csshake.min.css',
      },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['@/assets/css/main.css'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/lodash.js',
    { src: '~/plugins/vue-confetti.js', mode: 'client' },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: ['@nuxtjs/fontawesome'],
  fontawesome: {
    component: 'fa',
    icons: {
      solid: ['faPlus', 'faCheck', 'faTimes', 'faPause', 'faMoon', 'faSun'],
      brands: [],
    },
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
    '@nuxtjs/dotenv',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    [
      '@nuxtjs/firebase',
      {
        config: {
          apiKey: process.env.FB_API_KEY,
          authDomain: process.env.FB_AUTH_DOMAIN,
          projectId: process.env.FB_PROJECT_ID,
          storageBucket: process.env.FB_STORAGE_BUCKET,
          messagingSenderId: process.env.FB_MESSAGING_SENDER_ID,
          appId: process.env.FB_APP_ID,
          measurementId: process.env.FB_MEASUREMENT_ID,
        },
        services: {
          // auth: true,  // Just as example. Can be any other service.
          firestore: true,
        },
      },
    ],
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
};
