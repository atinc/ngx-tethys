import ts from 'typescript';
import { ContentChange, RemoveContentChange, ReplaceContentChange, UpdateContentChange } from '../types';

import { MigrationBase } from './base';

export abstract class ImportEntryPointClassifyMigrationBase extends MigrationBase {
    abstract readonly relation: Record<string, string>;

    run() {
        const importDeclarationList: ts.ImportDeclaration[] = this.getImportDeclarationList().filter(
            item => this.getImportDeclarationPackageName(item) === 'ngx-tethys'
        );
        if (!importDeclarationList.length) {
            return;
        }
        const contentChangeList: ContentChange[] = [];
        for (const importDeclaration of importDeclarationList) {
            const newImportDeclarationSourceGroup: { [name: string]: string[] } = {};
            const warningList: string[] = [];
            this.getImportDeclarationImportSpecifierList(importDeclaration).forEach(item => {
                if (this.relation[item.name.text] !== undefined) {
                    const list = newImportDeclarationSourceGroup[this.relation[item.name.text]] || [];
                    list.push(item.name.text);
                    newImportDeclarationSourceGroup[this.relation[item.name.text]] = list;
                } else {
                    warningList.push(item.name.text);
                }
            });
            if (Object.entries(newImportDeclarationSourceGroup).length) {
                contentChangeList.push(
                    new ReplaceContentChange(
                        importDeclaration.getStart(),
                        importDeclaration.getWidth(),
                        Object.entries(newImportDeclarationSourceGroup)
                            .map(([key, value], index) =>
                                this.printNodeContent(
                                    this.createImportDeclaration(value, ['ngx-tethys', key].filter(a => !!a).join('/'), {
                                        content:
                                            warningList.length && !index
                                                ? ` WARN: ${warningList.join(',')}没有找到对应的二级入口点`
                                                : undefined
                                    })
                                )
                            )
                            .join('\n')
                    )
                );
            } else if (warningList.length) {
                contentChangeList.push(
                    new ReplaceContentChange(
                        importDeclaration.getStart(),
                        importDeclaration.getWidth(),
                        `// WARN: ${warningList.join(',')}没有找到对应的二级入口点`
                    )
                );
            }
        }
        if (!contentChangeList.length) {
            return;
        }
        this.updateFileService.change(this.sourceFile.fileName, contentChangeList);
    }
}
