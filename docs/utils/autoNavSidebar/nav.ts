import {AutoNavSidebarOption} from "./index";
import {getAllFilesInFolder, rootPath} from "./fileUtil";


/**
 * 导航树节点
 */
interface TreeNode {
    // 节点文本
    text: string;
    // 子节点
    items?: TreeNode[];
    // 链接
    link?: string;
    // 匹配激活状态的正则
    activeMatch?: string;
}


/**
 * 创建导航树
 * @param data 所有md文件目录层级
 * @returns 导航树
 */
function createNav(data: string[]): TreeNode[] {
    const root: TreeNode[] = [];

    for (const item of data) {
        const paths = item.split('/').filter(Boolean);
        let currentNode: TreeNode[] | string = root;
        for (let i = 0; i < paths.length; i++) {
            const path = paths[i];

            const isLastLevel = i === paths.length - 1;

            if (Array.isArray(currentNode)) {
                let childNode: any = currentNode.find(node => node.text === path);

                if (!childNode) {
                    if (i === 0) {
                        childNode = {text: path, activeMatch: `^/${path}/`};
                    } else {
                        childNode = {text: path};

                    }
                    currentNode.push(childNode);
                }
                if (isLastLevel) {
                    (childNode as TreeNode).link = item;
                } else {
                    if (!childNode.items) {
                        childNode.items = [];
                    }
                    currentNode = childNode.items;
                }
            }
        }
    }
    return root;
}


export const generateNav = (options: AutoNavSidebarOption) => {
    const folderPath = rootPath(options.basePath);

    // 获取所有md文件目录层级
    const allFiles = getAllFilesInFolder(folderPath, folderPath, options.whiteList);
    // 将allFiles最后.md去掉
    allFiles.forEach((item, index) => {
        allFiles[index] = item.replace('.md', '');
    });
    // console.log(JSON.stringify(nav, null, 2))
    return createNav(allFiles)
}

