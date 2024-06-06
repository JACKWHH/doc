import path from "path";
import fs from "fs";

export const rootPath = (...args: string[]): string => {
    return path.join(__dirname, '..', ...args);
};

export function getAllFilesInFolder(dirPath: string, folderPath: string, whiteList: string[], filesList: string[] = []) {
    const files = fs.readdirSync(dirPath);
    files.forEach(file => {
        const filePath = path.join(dirPath, file);
        const stat = fs.statSync(filePath);


        if (stat.isDirectory()) {
            getAllFilesInFolder(filePath, folderPath, whiteList, filesList);
        } else {
            if (checkWhiteList(filePath, whiteList)) {
                filesList.push(filePath.replace(folderPath, ''));
            }
        }
    });
    return filesList;
}

/**
 * 检查白名单, 排除不需要生成导航的目录
 * @param filePath 文件路径
 * @param whiteList 白名单
 * @returns 是否在白名单中
 */
export const checkWhiteList = (filePath: string, whiteList: string[]): boolean => {
    for (let item of whiteList) {
        if (filePath.includes(item) || !filePath.endsWith('.md')) {
            return false;
        }
    }
    return true;
}