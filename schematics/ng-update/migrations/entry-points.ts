import { Migration } from '@angular/cdk/schematics';

import * as ts from 'typescript';
import { TethysUpgradeData, getTethysVersionUpgradeData } from '../core/upgrade-data';
import { EntryPointUpgradeData } from '../data/entry-points';

/**
 * Migration that walks through every ts file
 * and replaces the outdated entry points with the new one if specified in the upgrade data.
 *
 * 本迁移将遍历每个 ts 文件，并按升级数据的规定，用新的导入入口替换过时的导入入口。
 *
 */
export class EntryPointsMigration extends Migration<TethysUpgradeData> {
    data: EntryPointUpgradeData[] = getTethysVersionUpgradeData(this, 'entryPoints');

    enabled = this.data.length !== 0;

    visitNode(node: ts.Node): void {
        if (!ts.isImportDeclaration(node) || !ts.isStringLiteralLike(node.moduleSpecifier)) {
            return;
        }

        const importLocation = node.moduleSpecifier.text;

        this.data.forEach(name => {
            if (importLocation === name.replace) {
                this._replace(node, name.replaceWith);
            }
        });
    }

    private _replace(node: ts.ImportDeclaration, newValue: string) {
        const filePath = this.fileSystem.resolve(node.getSourceFile().fileName);
        const replaceWith = this.fileSystem.read(filePath).indexOf(newValue);
        // 当前文件之前有替换后的导入路径，避免重复，要把相同的导入合并
        if (replaceWith >= 0) {
            const leftBrackets = this.fileSystem.read(filePath).lastIndexOf('{', replaceWith);
            const rightBrackets = this.fileSystem.read(filePath).lastIndexOf('}', replaceWith);
            const replaceWithImports = this.fileSystem.read(filePath).substring(leftBrackets + 1, rightBrackets);
            const replaceWithStart = this.fileSystem.read(filePath).lastIndexOf('import', replaceWith);
            const replaceWithEnd = this.fileSystem.read(filePath).indexOf(';', replaceWith);

            if (replaceWithImports.indexOf(newValue)) {
                // 当前文件之前有替换后的导入内容，使用之前的就可以，不需要再次添加。例：之前有 tag 模块，label 替换完会重复：import { ThyTagModule , ThyTagModule } from 'ngx-tethys/tag';
                this.fileSystem
                    .edit(filePath)
                    .remove(replaceWithStart, replaceWithEnd - replaceWithStart + 1)
                    .remove(node.moduleSpecifier.getStart() + 1, node.moduleSpecifier.getWidth() - 2)
                    .insertRight(node.moduleSpecifier.getStart() + 1, newValue);
            } else {
                // 当前文件之前没有替换后的导入内容，追加上替换后的导入内容
                this.fileSystem
                    .edit(filePath)
                    .remove(replaceWithStart, replaceWithEnd - replaceWithStart + 1)
                    .insertRight(node.importClause.getStart() + 1, replaceWithImports + ',')
                    .remove(node.moduleSpecifier.getStart() + 1, node.moduleSpecifier.getWidth() - 2)
                    .insertRight(node.moduleSpecifier.getStart() + 1, newValue);
            }
        } else {
            // 当前文件之前没有替换后的导入路径，直接替换
            this.fileSystem
                .edit(filePath)
                .remove(node.moduleSpecifier.getStart() + 1, node.moduleSpecifier.getWidth() - 2)
                .insertRight(node.moduleSpecifier.getStart() + 1, newValue);
        }
    }
}
