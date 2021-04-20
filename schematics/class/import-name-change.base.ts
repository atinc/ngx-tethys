import { MigrationBase } from './base';
import ts from 'typescript';
import { ContentChange, ReplaceContentChange } from '../types';
import { createCssSelectorForTs } from 'cyia-code-util';
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
            for (let index = 0; index < importSpecifierList.length; index++) {
                const importSpecifier = importSpecifierList[index];
                const replaceName = this.relation[importSpecifier.name.text];
                if (replaceName) {
                    this.changeRelationIdentifier(importSpecifier.name.text, replaceName, contentChangeList);
                }
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
        const replaceNodeList: ts.Identifier[] = selector
            .queryAll(`Identifier`)
            .filter(item => (item as any).text && (item as any).text === oldNamed) as any;
        replaceNodeList.forEach(item => {
            const symbol = checker.getSymbolAtLocation(item);
            const type = checker.getTypeOfSymbolAtLocation(symbol, item);
            const str = checker.typeToString(type);
            if (str === `"__hook${oldNamed}"`) {
                list.push(new ReplaceContentChange(item.getStart(), item.getWidth(), newNamed));
            }
        });
    }
}
