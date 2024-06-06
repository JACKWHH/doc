import {generateNav} from "./nav";
import {generateSidebar} from "./sidebar";


export interface AutoNavSidebarOption {
    whiteList: string[],
    basePath: string,
}

/**
 * 翻译成中文: 根据文件目录结构自动生成侧边栏和导航栏
 * @param options
 */
export const AutoNavSidebar = (options: AutoNavSidebarOption) => {
    return {
        nav: generateNav(options),
        sidebar: generateSidebar(options),
    }
}