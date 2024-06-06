# VitePress快速搭建属于自己的网站

## 介绍

VitePress 是一个基于 Vite 和 VuePress 的静态网站生成器。它提供了诸如 Markdown 语法、Vue 组件、自定义主题等功能，让你能够快速搭建属于自己的网站。

## 安装

首先，你需要安装 Node.js 和 npm。

然后，在命令行中运行以下命令安装 VitePress：

```bash
npm install -g vitepress
```


## 创建网站

创建网站的命令如下：

```bash
vitepress create my-website
```

这将创建一个名为 `my-website` 的目录，其中包含一个 VitePress 网站的基本结构。

## 运行网站

进入 `my-website` 目录，运行以下命令：

```bash
vitepress dev
```

这将启动一个本地开发服务器，并监听文件变化，自动更新网站。

## 构建网站

当你完成网站的编写后，你可以运行以下命令来构建网站：

```bash
vitepress build
```

这将生成一个静态的 HTML 文件，你可以将它部署到服务器上。

## 自定义主题

VitePress 提供了自定义主题的功能，你可以通过 `vitepress.config.js` 文件来配置。    
下面是一个简单的自定义主题的例子：

```js
module.exports = {
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide/' },
      { text: 'GitHub', link: 'https://github.com/vuejs/vitepress' }
    ],
    sidebar: [
      {
        text: 'Guide',
        children: [
          { text: 'Getting Started', link: '/guide/getting-started' },
          { text: 'Markdown', link: '/guide/markdown' },
          { text: 'Components', link: '/guide/components' },
          { text: 'Custom Theme', link: '/guide/custom-theme' }
        ]
      }
    ]
  }
}
```


## 结语

VitePress 是一个非常棒的静态网站生成器，它提供了诸如 Markdown 语法、Vue 组件、自定义主题等功能，让你能够快速搭建属于自己的网站。
