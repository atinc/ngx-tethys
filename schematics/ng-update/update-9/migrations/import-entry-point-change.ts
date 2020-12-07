import ts from 'typescript';
import { ContentChange, ReplaceContentChange } from '../../../types';
import { MigrationBase } from './base';

export class ImportEntryPointChangeMigration extends MigrationBase {
    readonly changeModulePackageGroup: { [name: string]: { with: string; replace: string } } = {
        Id: {
            with: 'ngx-tethys/types',
            replace: 'ngx-tethys/store'
        },
        PaginationInfo: {
            with: 'ngx-tethys/types',
            replace: 'ngx-tethys/store'
        },
        UpdateHostClassService: {
            with: 'ngx-tethys/core',
            replace: 'ngx-tethys/shared'
        }
    };
    readonly changePackageGroup = {
        'ngx-tethys/typings': 'ngx-tethys/types',
        'ngx-tethys/directives': 'ngx-tethys/shared'
    };

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
                        changeModulePackageNodeResult.addOldNode && importDeclaration,
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
            importDeclaration.moduleSpecifier = this.createStringLiteral(this.changePackageGroup[importPackageName]);
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
            importDeclaration.importClause.namedBindings = this.createNamedImports(list);
            addOldNode = true;
        } else if (!list.length && importDeclaration?.importClause?.name) {
            addOldNode = true;
        }
        return {
            addOldNode,
            node: !!appendImportNameList.length && this.createImportDeclaration(appendImportNameList, newPackageName)
        };
    }
}
