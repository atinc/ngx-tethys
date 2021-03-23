import { MigrationBase } from './base';
import ts from 'typescript';
import { ContentChange, ReplaceContentChange } from '../types';

export abstract class ImportNameChangeBase extends MigrationBase {
    abstract readonly relation: Record<string, string>;
    run() {
        const importDeclarationList: ts.ImportDeclaration[] = this.getImportDeclarationList().filter(item =>
            this.getImportDeclarationPackageName(item).includes('ngx-tethys')
        );
        if (!importDeclarationList.length) {
            return;
        }
        const contentChangeList: ContentChange[] = [];

        for (const importDeclaration of importDeclarationList) {
            const importSpecifierList = this.getImportDeclarationImportSpecifierList(importDeclaration);
            const importNameList: string[] = [];
            for (let index = 0; index < importSpecifierList.length; index++) {
                const importSpecifier = importSpecifierList[index];
                const replaceName = this.relation[importSpecifier.name.text];
                if (replaceName) {
                    importNameList.push(replaceName);
                } else {
                    importNameList.push(importSpecifier.name.text);
                }
            }
            const newImportDeclaration = this.createImportDeclaration(
                importNameList,
                (importDeclaration.moduleSpecifier as ts.StringLiteral).text
            );
            contentChangeList.push(
                new ReplaceContentChange(
                    importDeclaration.getStart(),
                    importDeclaration.getWidth(),
                    this.printNodeContent(newImportDeclaration)
                )
            );
        }
        if (!contentChangeList.length) {
            return;
        }
        this.updateFileService.change(this.sourceFile.fileName, contentChangeList);
    }
}
