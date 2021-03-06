require('dotenv').config()

module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'meshireach',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'View of meshireach' }
    ],
    link: [
      { rel: 'icon', type: 'image/png', href: '/meshireach.png' }
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },
  plugins: [
    '@/plugins/firebase',
    '@/plugins/auth'
  ],
  mode:'spa',
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/dotenv',
    '@nuxtjs/pwa',
    'nuxt-device-detect'
  ],
  axios: {
    baseURL: process.env.BASE_URL
  },
  manifest: {
    name: 'meshireach',
    description: 'sns for having a meal with your friend ',
    lang: 'ja',
    icons: [
      {
        src: '/icons/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png'
      }
    ],
    start_url: '/',
    scope: '/',
    gcm_sender_id: '103953800507'// このgcm_sender_idは固定値
  },
  workbox: {
    swURL: 'custom-sw.js'
  }
}

