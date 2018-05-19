const nodeExternals = require('webpack-node-externals')
const resolve = (dir) => require('path').join(__dirname, dir)

const envConfig = {
  GH_PAGES: {
    router: {
      base: '/askgod-webui/'
    },
    axios: {
      baseURL: 'https://nsec.github.io/askgod-webui/'
    }
  },
  NSEC_CTF: {
    router: {
      base: '/scoreboard/'
    },
    axios: {
      baseURL: 'https://askgod.nsec/'
    }
  },
  LOCAL: {
    router: {
      base: '/'
    },
    axios: {
      baseURL: 'https://askgod.nsec/',
    }
  }
}
const envGenerator = () => {
  var env = process.env.DEPLOY_ENV ? process.env.DEPLOY_ENV : 'LOCAL';
  return envConfig[env];
}

module.exports = {
  ...envGenerator(),
  /*
  ** Headers of the page
  */
  head: {
    title: 'NorthSec CTF - Askgod Web UI',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'AskGod Web UI' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicons/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons' }
    ]
  },
  mode: 'spa',
  plugins: [
    { src: '~/plugins/vuetify.js', ssr: false },
    { src: '~/plugins/localStorage.js', ssr: false },
    { src: '~/plugins/websocket.js', ssr: false }
  ],
  modules: [
    ['@nuxtjs/axios'],
    ['@nuxtjs/moment', { locales: [], plugin: true }],
  ],
  css: [
    '~/assets/style/app.styl'
  ],
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
    babel: {
      plugins: [
        ['transform-imports', {
          'vuetify': {
            'transform': 'vuetify/es5/components/${member}',
            'preventFullImport': true
          }
        }]
      ]
    },
    extractCSS: true,
    /*
    ** Run ESLint on save
    */
    extend (config, ctx) {
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
      if (ctx.isServer) {
        config.externals = [
          nodeExternals({
            whitelist: [/^vuetify/]
          })
        ]
      }
    }
  }
}
