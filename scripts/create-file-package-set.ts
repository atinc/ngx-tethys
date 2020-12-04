import * as ts from 'typescript';
import * as path from 'path';
import * as fs from 'fs-extra';
const srcPath = path.resolve(__dirname, '../src');
function getDirFiles(fileName: string): string[];
// tslint:disable-next-line: unified-signatures
function getDirFiles(fileName: string, fileList: string[]): string[];
function getDirFiles(fileName: string, fileList: string[] = []): string[] {
    const list = fs.readdirSync(path.resolve(srcPath, fileName), { withFileTypes: true });
    for (const item of list) {
        if (item.isFile() && /(\.ts)$/.test(item.name) && !/\.spec\.ts$/.test(item.name)) {
            fileList.push(`${fileName}/${item.name}`);
            // fileList.push(`${fileName}/${item.name.replace('.ts', '')}`);
        } else if (item.isDirectory() && !/^(api|doc|examples|test)$/.test(item.name)) {
            fileList = getDirFiles(`${fileName}/${item.name}`, fileList);
        } else {
        }
    }
    return fileList;
}
function getExportDeclarations(pathName: string) {
    const fileContent = fs.readFileSync(path.resolve(srcPath, pathName));
    const sourceFile = ts.createSourceFile(pathName, fileContent.toString(), ts.ScriptTarget.Latest);
    const list: string[] = [];
    // console.log('-------', pathName);
    sourceFile.statements
        .filter(item => item.modifiers && item.modifiers.some(modifier => modifier.kind === ts.SyntaxKind.ExportKeyword))
        .forEach(node => {
            if (node && Object.prototype.hasOwnProperty.call(node, 'name')) {
                list.push(((node as any).name as ts.Identifier).text);
            } else if (ts.isVariableStatement(node)) {
                node.declarationList.forEachChild(node => {
                    if (ts.isVariableDeclaration(node)) {
                        list.push((node.name as ts.Identifier).text);
                    }
                });
            }
        });
    return list;
}
function main() {
    const map: any = {};
    let list = fs.readdirSync('../src', { withFileTypes: true });
    list = list.filter(item => item.isDirectory()).filter(item => item.name !== 'built');
    const allList: string[] = [];
    list.forEach(item => {
        const files = getDirFiles(item.name);
        allList.push(...files);
        files.forEach(key => {
            const declarations = getExportDeclarations(key);
            declarations.forEach(key => {
                if (map[key] === false) {
                    return;
                }
                if (map[key] && map[key] !== item.name) {
                    map[key] = false;
                } else if (!map[key]) {
                    map[key] = item.name;
                }
            });
        });
    });

    // allList.forEach(item => {});
    console.log(map);
    fs.writeFileSync('name-package-relation.json', JSON.stringify(map));
}
main();
