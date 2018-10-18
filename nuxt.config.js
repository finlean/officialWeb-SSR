const pkg = require('./package')
const webpack = require('webpack')

module.exports = {
    mode: 'universal',

    /*
  ** Headers of the page
  */
    head: {
        title: pkg.name,
        meta: [
            { charset: 'utf-8' },
            {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1'
            },
            {
                hid: 'description',
                name: 'description',
                content: pkg.description
            }
        ],
        link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
        script: [
            {
                src:
                    'https://webapi.amap.com/maps?v=1.4.4&key=6c909fa89c5a08581da5a110076b739e'
            }
        ]
    },
    router: {
        routes: [
            { name: 'index', path: '/', component: 'pages/index.vue' },
            {
                name: 'loanApplication',
                path: '/loanApplication',
                component: 'pages/loanApplication.vue'
            },
            {
                name: 'productConsultant',
                path: '/productConsultant',
                component: 'pages/productConsultant.vue'
            },
            {
                name: 'loanInformation',
                path: '/loanInformation',
                component: 'pages/loanInformation.vue'
            },
            {
                name: 'aboutUs',
                path: '/aboutUs',
                component: 'pages/aboutUs.vue'
            },
            {
                name: 'productDetails',
                path: '/productDetails',
                component: 'pages/productDetails.vue'
            },
            {
                name: 'informationDetails',
                path: '/informationDetails',
                component: 'pages/informationDetails.vue'
            },
            {
                name: 'informationList',
                path: '/informationList',
                component: 'pages/informationList.vue'
            }
        ]
    },
    /*
  ** Customize the progress-bar color
  */
    loading: { color: '#fff' },

    /*
  ** Global CSS
  */
    css: [
        'element-ui/lib/theme-chalk/index.css',
        { src: '~assets/comm.scss', lang: 'scss' }
        // { src: '~assets/comm.scss', lang: 'scss' }
    ],

    /*
  ** Plugins to load before mounting the App
  */
    plugins: ['@/plugins/element-ui'],

    /*
  ** Nuxt.js modules
  */
    modules: [
        // Doc: https://github.com/nuxt-community/axios-module#usage
        '@nuxtjs/axios'
    ],
    /*
  ** Axios module configuration
  */
    axios: {
        // See https://github.com/nuxt-community/axios-module#options
        proxy: true
    },
    proxy: {
        '/ow': 'https://t.finlean.com',
        '/json': 'https://t.finlean.com',
        '/image': 'https://t.finlean.com'
    },
    /*
  ** Build configuration
  */
    build: {
        /*
    ** You can extend webpack config here
    */
        styleResources: {
            scss: './assets/comm.scss'
        },
        extend(config, ctx) {}
    }
}
