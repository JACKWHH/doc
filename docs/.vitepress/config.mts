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
        ['link', {rel: 'icon', href: 'favicon.png', type: 'image/png'}]
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
            {icon: {svg: '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="16px" height="16px" viewBox="0 0 16 16" enable-background="new 0 0 16 16" xml:space="preserve">\n' +
                        '    <image id="image0" width="16" height="16" x="0" y="0" xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAIGNIUk0AAHomAACAhAAA+gAAAIDo\n' +
                        'AAB1MAAA6mAAADqYAAAXcJy6UTwAAAB1UExURQAAANsAGNoAFNoAE9kAFP8AK9kAFdoAE9kAFNkA\n' +
                        'E+NJVvbIzP34+P////zx8uRKV/77+/fLzvXBxeE8St8sO90hMf76+uNFUtsOH9wWJ+E4Rv75+edf\n' +
                        'av329uhqdeE5R/S3vPXCxv79/eI+TP339/bFyeI/TTeqkrwAAAAJdFJOUwArj9XzBpT9vS/yx5oA\n' +
                        'AAABYktHRA32tGH1AAAAB3RJTUUH6AYGCCwTL3Ti+wAAAIpJREFUGNNlj1kSwjAMQx0nTSqoS9nL\n' +
                        'WqDA/Y+InQIz0PdnzciSiBTHPgTPjgaKmJBJsch3iS+lKRGYTCsxakT1J8zkTYPkiIG5LJYrYw0w\n' +
                        'eWAjW7Q7pQU8BUBkj4NZKiD8CGKCHwS1HOVkFjbhrB+7i1ztqcZ+Um+9xWqxOp/3xxNWbFx9NO5v\n' +
                        '/gs9sgonV9DkSAAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAyNC0wNi0wNlQwODo0NDoxOSswMDowMCRz\n' +
                        '0t0AAAAldEVYdGRhdGU6bW9kaWZ5ADIwMjQtMDYtMDZUMDg6NDQ6MTkrMDA6MDBVLmphAAAAKHRF\n' +
                        'WHRkYXRlOnRpbWVzdGFtcAAyMDI0LTA2LTA2VDA4OjQ0OjE5KzAwOjAwAjtLvgAAAABJRU5ErkJg\n' +
                        'gg=="/>\n' +
                        '</svg>'}, link: 'https://gitee.com/jack_whh'},
            {
                icon:{svg: '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="32px" height="32px" viewBox="0 0 32 32" enable-background="new 0 0 32 32" xml:space="preserve">\n' +
                        '    <image id="image0" width="32" height="32" x="0" y="0" xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAAIGNIUk0AAHomAACAhAAA+gAAAIDo\n' +
                        'AAB1MAAA6mAAADqYAAAXcJy6UTwAAAB1UExURf///wCh1gCh1gCh1gCh1gCh1gCh1gCh1gCh1gCh\n' +
                        '1gCh1gCh1gCh1gCh1gCh1gCh1gCh1gCh1gCh1gCh1gCh1gCh1gCh1gCh1gCh1gCh1gCh1gCh1gCh\n' +
                        '1gCh1gCh1gCh1gCh1gCh1gCh1gCh1gCh1gCh1v///xm4vC0AAAAldFJOUwAABKDqqA7rX8ViYwYP\n' +
                        'bsfzG8/QB222Gfn4SebnSuQYtdFvy/RY9Y7CAAAAAWJLR0QAiAUdSAAAAAd0SU1FB+gGBgkCHLUO\n' +
                        'nHEAAADVSURBVDjLtZLrDoIwDEY3EAQdjDvKRRDo+7+i28ySomNijN+Ppek52bK0hHwKlXHcg+dT\n' +
                        'FN87uo6qnkIAACEy/FA0AiScYGUoDmckMNUJI8xDhgTdi15rJbCYJ2BIwmMmhTSDzWQpJczCAfKC\n' +
                        'lGBNSbg4q5oaUlcCcXIRp5ELQ6ArkffQjUi2X2jattFA1yuhBWi1oOuVgJ/Cvf2CuLZDT3RvQt/d\n' +
                        'ei3o+rtv/lGwDGuQa6XGPQ4mno5q3LF9YWJS5DZ+L+xLm6dq7ad5MdFlnuTa/5wHH9xBMb8RA64A\n' +
                        'AAAldEVYdGRhdGU6Y3JlYXRlADIwMjQtMDYtMDZUMDk6MDI6MjgrMDA6MDBs2gTKAAAAJXRFWHRk\n' +
                        'YXRlOm1vZGlmeQAyMDI0LTA2LTA2VDA5OjAyOjI4KzAwOjAwHYe8dgAAACh0RVh0ZGF0ZTp0aW1l\n' +
                        'c3RhbXAAMjAyNC0wNi0wNlQwOTowMjoyOCswMDowMEqSnakAAAAASUVORK5CYII="/>\n' +
                        '</svg>'},
                link:'https://space.bilibili.com/359352463'
            }
        ],

        // 页脚信息
        footer: {
            message: '创作不易, 未经允许禁止转载',
            copyright: 'Copyright © 2024-2024 <a href="https://gitee.com/jack_whh"> Wdhcr</a>'
        }
    }
})
