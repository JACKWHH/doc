import {defineConfig} from 'vitepress'
import {AutoNavSidebar} from "../utils/autoNavSidebar";

const {nav, sidebar} = AutoNavSidebar({
    basePath: '../../docs',
    whiteList: ['README.md', '.vitepress', 'generate.js', 'public', 'index.md', 'utils']
});


// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: "Wdhcr知识库",
    description: "一个富含各类编程知识的文档库",
    lastUpdated: true,
    lang: "zh-cn",
    base: "/doc/",
    head: [
        ['link', {rel: 'icon', href: '/favicon.ico', type: 'image/x-icon'}]
    ],
    themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        logo: 'https://jianqiezhushou.com/_astro/logo.73aa3e83.png',
        outline: {
            level: 'deep',
            label: '页面导航'
        },
        // 导航栏开启搜索框
        // 设置搜索框的样式
        search: {
            provider: "local",
            options: {
                translations: {
                    button: {
                        buttonText: "请输入关键字进行搜索",
                        buttonAriaLabel: "请输入关键字进行搜索",
                    },
                    modal: {
                        noResultsText: "无法找到相关结果",
                        resetButtonTitle: "清除查询条件",
                        footer: {
                            selectText: "选择",
                            navigateText: "切换",
                        },
                    },
                },
            },
        },
        nav: nav,
        sidebar: sidebar,
        socialLinks: [
            {icon: 'github', link: 'https://gitee.com/jack_whh'}
        ],

        // 页脚信息
        footer: {
            message: '创作不易, 未经允许禁止转载',
            copyright: 'Copyright © 2024-2024 <a href="https://gitee.com/jack_whh"> Wdhcr</a>'
        }
    }
})
