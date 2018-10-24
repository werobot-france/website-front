const marked = require("marked");
const renderer = new marked.Renderer();

module.exports = {
  mode: 'universal',

  env: {
    twitter: "https://twitter.com/werobot_FR",
    facebook: "https://www.facebook.com/WeRobot/",
    instagram: "https://www.instagram.com/werobot/",
    youtube: "http://example.com/youtube",
    donate: "https://www.helloasso.com/associations/we-robot/formulaires/1"
  },

  /*
  ** Headers of the page
  */
  head: {
    title: "We Robot",
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'}
    ],
    link: [
      {rel: 'icon', type: 'image/png', href: '/favicon.png'},
      {rel: 'stylesheet', type: 'text/css', href: 'https://fonts.googleapis.com/css?family=Audiowide|Roboto+Slab'},
      {rel: 'stylesheet', type: 'text/css', href: 'https://use.fontawesome.com/releases/v5.3.1/css/all.css'},
      {rel: 'apple-touch-icon', sizes: '57x57', href: '/apple-icon-57x57.png'},
      {rel: 'apple-touch-icon', sizes: '60x60', href: '/apple-icon-60x60.png'},
      {rel: 'apple-touch-icon', sizes: '72x72', href: '/apple-icon-72x72.png'},
      {rel: 'apple-touch-icon', sizes: '76x76', href: '/apple-icon-76x76.png'},
      {rel: 'apple-touch-icon', sizes: '114x144', href: '/apple-icon-144x144.png'},
      {rel: 'apple-touch-icon', sizes: '120x120', href: '/apple-icon-120x120.png'},
      {rel: 'apple-touch-icon', sizes: '144x144', href: '/apple-icon-144x144.png'},
      {rel: 'apple-touch-icon', sizes: '152x152', href: '/apple-icon-152x152.png'},
      {rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-icon-180x180.png'},
      {rel: 'icon', type: 'image/png', sizes: '16x16', href: '/android-icon-16x16.png'},
      {rel: 'icon', type: 'image/png', sizes: '32x32', href: '/android-icon-32x32.png'},
      {rel: 'icon', type: 'image/png', sizes: '96x96', href: '/android-icon-96x96.png'},
      {rel: 'icon', type: 'image/png', sizes: '192x192', href: '/android-icon-192x192.png'},
      {rel: 'manifest', href: '/manifest.json'}
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: {color: '#2980b9'},

  /*
  ** Global CSS
  */
  css: [
    '~/assets/scss/main.scss'
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~/plugins/i18n.js',
    '~/plugins/moment.js',
    {src: '~/plugins/localStorage.js', ssr: false},
    {src: '~/plugins/cookie.js', ssr: false},
    {src: '~/plugins/slideMenu.js', ssr: false}
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/axios',
    ['@nuxtjs/moment', ['fr']]
  ],

  /*
  ** Axios module configuration
  */
  axios: {
    baseUrl: process.env.API_URL || "http://localhost:8000"
  },

  router: {
    middleware: 'i18n'
  },

  /*
  ** Build configuration
  */
  build: {
    extend(config, ctx) {
      // Run ESLint on save
      config.module.rules.push({
        test: /\.md$/,
        use: [
          {
            loader: "html-loader"
          },
          {
            loader: "markdown-loader",
            options: {
              pedantic: true,
              renderer
            }
          }
        ]
      });
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
};
