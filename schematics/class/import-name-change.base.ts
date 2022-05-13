import { createCssSelectorForTs } from 'cyia-code-util';
import ts from 'typescript';

import { ContentChange, ReplaceContentChange } from '../types';
import { MigrationBase } from './base';

export abstract class ImportNameChangeBase extends MigrationBase {
    private changeNodeMap = new Set<ts.Node>();

    private changeNodeTextMap = new Map<string, ts.Node>();

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
            for (let index = 0; index < importSpecifierList.length; index++) {
                const importSpecifier = importSpecifierList[index];
                const isAlias = !!importSpecifier.propertyName;
                const oldName = (importSpecifier.propertyName || importSpecifier.name).text;
                const replaceName = this.relation[oldName];
                if (!replaceName) {
                    continue;
                }

                if (this.changeNodeTextMap.has(oldName)) {
                    continue;
                }

                this.changeNodeTextMap.set(oldName, importSpecifier.name);
                this.changeRelationIdentifier(oldName, replaceName, contentChangeList);
            }
        }
        if (!contentChangeList.length) {
            return;
        }
        this.updateFileService.change(this.sourceFile.fileName, contentChangeList);
    }

    changeRelationIdentifier(oldNamed: string, newNamed: string, list: ContentChange[]) {
        const checker = this.program.getTypeChecker();
        const selector = createCssSelectorForTs(this.sourceFile);
        const replaceNodeList: ts.Identifier[] = selector.queryAll(`Identifier`).filter(item => (item as any)?.text === oldNamed) as any;

        replaceNodeList.forEach(item => {
            const type = checker.getTypeAtLocation(item);
            const str = checker.typeToString(type);
            list.push(new ReplaceContentChange(item.getStart(), item.getWidth(), newNamed));
        });
    }
}
