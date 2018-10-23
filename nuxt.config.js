const pkg = require('./package')

module.exports = {
    mode: 'universal',

    /*
  ** Headers of the page
  */
    head: {
        title:
            '上海吉帑贷款,上海吉帑金融,上海吉帑金融信息服务有限公司,成都贷款,个人贷款产品,贷款额度高,利率低,放款快-吉帑金服',
        meta: [
            { charset: 'utf-8' },
            {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1'
            },
            {
                hid: 'keywords',
                name: 'keywords',
                content:
                    '贷款,成都贷款,小额贷款,个人信用贷款,个人住房抵押贷款,车辆抵押贷款,网上贷款,贷款平台'
            },
            {
                hid: 'description',
                name: 'description',
                content:
                    '上海吉帑专注于为个人和企业提供各类融资解决方案,个人贷款,小额贷款,银行贷款,汽车贷款,住房贷款,抵押贷款,无抵押贷款和创业贷款等贷款咨询服务'
            }
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
            {
                rel: 'stylesheet',
                href:
                    'https://cdnjs.cloudflare.com/ajax/libs/element-ui/2.4.7/theme-chalk/index.css'
            }
        ],
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
