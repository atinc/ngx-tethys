import ts from 'typescript';
import { ContentChange, ReplaceContentChange } from '../../../types';
import { MigrationBase } from './base';

export class ImportEntryPointTrimMigration extends MigrationBase {
    run() {
        const importDeclarationList: ts.ImportDeclaration[] = this.getImportDeclarationList();

        const contentChangeList: ContentChange[] = [];

        for (const importDeclaration of importDeclarationList) {
            const packagePathList = this.getImportDeclarationPackageName(importDeclaration)
                .split('/')
                .filter(item => item);
            if (packagePathList.length > 2) {
                importDeclaration.moduleSpecifier = this.createStringLiteral(packagePathList.slice(0, 2).join('/'));
                contentChangeList.push(
                    new ReplaceContentChange(
                        importDeclaration.getStart(),
                        importDeclaration.getWidth(),
                        this.printNodeContent(importDeclaration)
                    )
                );
            }
        }
        this.updateFileService.change(this.sourceFile.fileName, contentChangeList);
    }
}
