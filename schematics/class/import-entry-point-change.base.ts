import ts from 'typescript';
import { ContentChange, ReplaceContentChange } from '../types';
import { MigrationBase } from './base';

export abstract class ImportEntryPointChangeMigrationBase extends MigrationBase {
    abstract readonly changeModulePackageGroup: Record<string, { with: string; replace: string }>;
    abstract readonly changePackageGroup: Record<string, string>;

    run() {
        const importDeclarationList: ts.ImportDeclaration[] = this.getImportDeclarationList();
        const contentChangeList: ContentChange[] = [];
        for (const importDeclaration of importDeclarationList) {
            const changeModulePackageNodeResult = this.generateChangeModulePackageNode(importDeclaration);
            const changePackageNodeResult = this.generateChangePackageNode(importDeclaration);
            if (!changePackageNodeResult.node && !changeModulePackageNodeResult.node) {
                continue;
            }
            contentChangeList.push(
                new ReplaceContentChange(
                    importDeclaration.getStart(),
                    importDeclaration.getWidth(),
                    [
                        changeModulePackageNodeResult.addOldNode && changeModulePackageNodeResult.importDeclaration,
                        changePackageNodeResult.node,
                        changeModulePackageNodeResult.node
                    ]
                        .filter(e => !!e)
                        .map(node => this.printNodeContent(node))
                        .join('\n')
                )
            );
        }
        this.updateFileService.change(this.sourceFile.fileName, contentChangeList);
    }

    generateChangePackageNode(importDeclaration: ts.ImportDeclaration) {
        const importPackageName = this.getImportDeclarationPackageName(importDeclaration);
        if (this.changePackageGroup[importPackageName]) {
            importDeclaration = this.updateImportDeclaration(
                importDeclaration,
                this.createStringLiteral(this.changePackageGroup[importPackageName])
            );
            return {
                node: importDeclaration
            };
        }
        return {
            node: undefined
        };
    }

    generateChangeModulePackageNode(importDeclaration: ts.ImportDeclaration) {
        const importPackageName = this.getImportDeclarationPackageName(importDeclaration);
        const appendImportNameList: string[] = [];
        let newPackageName: string;
        let addOldNode = false;
        const importSpecifierList = this.getImportDeclarationImportSpecifierList(importDeclaration);

        const list = importSpecifierList.filter(importSpecifier => {
            const importName = importSpecifier.name.text;
            if (this.changeModulePackageGroup[importName] && this.changeModulePackageGroup[importName].replace === importPackageName) {
                newPackageName = this.changeModulePackageGroup[importName].with;
                appendImportNameList.push(importName);
                return false;
            }
            return true;
        });
        if (list.length && list.length !== list.length) {
            importDeclaration = this.updateImportDeclaration(
                importDeclaration,
                undefined,
                this.updateImportClause(importDeclaration.importClause, this.createNamedImports(list))
            );
            addOldNode = true;
        } else if (!list.length && importDeclaration?.importClause?.name) {
            addOldNode = true;
        }
        return {
            addOldNode,
            node: !!appendImportNameList.length && this.createImportDeclaration(appendImportNameList, newPackageName),
            importDeclaration
        };
    }
}
