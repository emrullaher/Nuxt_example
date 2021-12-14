// https://www.npmjs.com/package/node-sass-glob-importer
const globImporter = require('node-sass-glob-importer');


export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'dashboard',
    htmlAttrs: {
      lang: 'tr'
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
    // '~/assets/css/app.scss'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  // components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://www.npmjs.com/package/@nuxtjs/svg-sprite
    '@nuxtjs/svg-sprite',
    '@nuxtjs/style-resources',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    cache: false,
    extend(config, {loaders: {scss}}) {
      const sassOptions = scss.sassOptions || {};
      sassOptions.importer = globImporter();
      scss.sassOptions = sassOptions;
    }
  },

  //SVG sprite
  svgSprite: {
    input: '~/assets/img/'
  },

  /*
  ** Disabling Bootstrap Compiled CSS
  */
  bootstrapVue: {
    bootstrapCSS: false,
    bootstrapVueCSS: false
  },

   /*
  ** Style Resources
  */
  styleResources: {
    scss: [
      '~/assets/css/app.scss',
    ]
  },
}
