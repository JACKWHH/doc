// .vitepress/theme/index.js
import DefaultTheme from 'vitepress/theme';

export default {
    ...DefaultTheme,
    async enhanceApp() {
        if (!import.meta.env.SSR) {
            const {loadOml2d} = await import('oh-my-live2d');
            loadOml2d({
                models: [
                    {
                        path: 'https://imuncle.github.io/live2d/model/xiaomai/xiaomai.model.json',
                    },
                    {
                        path: 'https://imuncle.github.io/live2d/model/33_high/model.json',
                    },

                    {
                        path: 'https://imuncle.github.io/live2d/model/22_high/model.json',
                    },
                    {
                        path: 'https://imuncle.github.io/live2d/model/bronya/model.json',
                    },

                    {
                        path: 'https://summerscar.me/live2dDemo/assets/hibiki/hibiki.model.json'
                    },
                    {
                        path: 'https://summerscar.me/live2dDemo/assets/penchan/penchan.model.json'
                    },

                    {
                        path: 'https://imuncle.github.io/live2d/model/hibiki/hibiki.model.json',
                    },
                    {
                        path: 'https://imuncle.github.io/live2d/model/haruto/haruto.model.json',
                    },
                    {
                        path: 'https://summerscar.me/live2dDemo/assets/kesyoban/kesyoban.model.json'
                    },
                ],
                sayHello: false,
                menus: () => {
                    return {
                        items: (defaultItems) => {
                            return [defaultItems[0], defaultItems[2]];
                        }
                    }
                },
                //dockedPosition: 'right',
                tips: (data) => {
                    // console.log(data, '===')
                },
                statusBar: {
                    display: true,
                }

            });
        }
    }
};