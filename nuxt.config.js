const nodeExternals = require('webpack-node-externals')
const fs = require('fs');

const resolve = (dir) => require('path').join(__dirname, dir)
const envGenerator = (env = 'LOCAL') => envConfig[env];

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
      proxy: true,
    },
    server: {
      https: {
        key: fs.readFileSync(resolve('.env/local/localhost-key.pem')),
        cert: fs.readFileSync(resolve('.env/local/localhost.pem'))
      }
    },
    proxy: {
      // FIXME Use for used with real data
      // '/1.0': {
      //   target: 'https://askgod.nsec/',
      //   changeOrigin: true,
      //   secure: false,
      // }
      '/1.0': {
        target: 'http://localhost:3004',
        secure: false
      }
    }
  }
}

module.exports = {
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
    { src: '~/plugins/localStorage.js', ssr: false },
    { src: '~/plugins/websocket.js', ssr: false }
  ],
  // Nuxt.js dev-modules
  buildModules: [
    ['@nuxtjs/proxy'],
    ['@nuxtjs/vuetify', {
      defaultAssets: {
        font: {
          family: 'Roboto'
        },
        icons: 'md'
      }
    }]
  ],
  modules: [
    ['@nuxtjs/axios'],
    ['@nuxtjs/moment', {
      locales: [],
      plugin: true,
    }],
  ],
  vuetify: {
    theme: {
      dark: true,
    }
  },
  // Customize the progress bar color
  loading: { color: '#3B8070' },
  // environment specific options
  ...envGenerator(process.env.DEPLOY_ENV),
}
