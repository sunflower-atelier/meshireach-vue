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
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
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
    '@nuxtjs/dotenv'
  ],
  axios: {
  },
  manifest: {
    name: 'meshireach',
    icons: [
      {
        src: "https://placehold.jp/192x192.png",
        sizes: "192x192",
        type: "image/png"
      }
    ],
    start_url: "/",
    display: "standalone",
    gcm_sender_id: '103953800507'// このgcm_sender_idは固定値
  }
}

