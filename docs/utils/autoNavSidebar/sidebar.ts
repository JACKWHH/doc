import {AutoNavSidebarOption} from "./index";
import {getAllFilesInFolder, rootPath} from "./fileUtil";

/**
 * 创建侧边栏导航树
 * @param data 所有md文件目录层级
 * @returns 导航树
 */
function createSidebar(data: string[]): Record<string, { text: string; link: string }[]> {
    const transformedData: Record<string, { text: string; link: string }[]> = {};
    data.forEach((item) => {
        const parts = item.split('/');
        const category = `/${parts[1]}/${parts[2]}`;
        const text = parts[parts.length - 1];
        const link = item;
        if (transformedData[category]) {
            transformedData[category].push({text, link});
        } else {
            transformedData[category] = [{text, link}];
        }
    });
    return transformedData;
}


export const generateSidebar = (options: AutoNavSidebarOption) => {
    const folderPath = rootPath(options.basePath);
    // 获取所有md文件目录层级
    const allFiles = getAllFilesInFolder(folderPath, folderPath, options.whiteList);
    // 将allFiles最后.md去掉
    allFiles.forEach((item, index) => {
        allFiles[index] = item.replace('.md', '');
    });
    const sidebar = createSidebar(allFiles);
    // console.log(JSON.stringify(sidebar, null, 2))
    return sidebar;
}
