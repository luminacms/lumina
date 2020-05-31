module.exports = {
    base: '/docs/',
    themeConfig: {
        sidebarDepth: 3,
        displayAllHeaders: true, // 默认值：false
        locales: {
            '/': {
                lang: 'en-US', // 将会被设置为 <html> 的 lang 属性
                title: 'VuePress',
                description: 'Vue-powered Static Site Generator'
            },
        },
        nav: [
            {
                text: '主站',
                link: '/'
            },
            {
                text: '首页',
                link: '/docs'
            },
            {
                text: '指南',
                link: '/zh/guide/'
            },
            {
                text: '模块',
                ariaLabel: 'Language Menu',
                items: [
                  { text: '交易模块', link: '/zh/payment/' }
                ]
            }
        ],
        sidebar: {
            '/zh/guide/': [{
                title: '使用指南',
                collapsable: false,
                children: [
                    'base/doc.md',
                    'base/route.md',
                    'base/user'
                ]
            }],
            '/zh/payment/': [{
                title: '交易模块',
                collapsable: false,
                children: [
                    'start.md',
                    'use.md'
                ]
            }],
        }
    },
    plugins: ['@vuepress/back-to-top']
}
