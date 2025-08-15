import {
    ClassNameUpgradeData,
    getExportDeclaration,
    getImportDeclaration,
    getVersionUpgradeData,
    isExportSpecifierNode,
    isImportSpecifierNode,
    isNamespaceImportNode,
    Migration,
    UpgradeData
} from '@angular/cdk/schematics';
import * as ts from 'typescript';

export class ClassNamesMigration extends Migration<UpgradeData> {
    data: ClassNameUpgradeData[] = getVersionUpgradeData(this, 'classNames');

    trustedIdentifiers: Set<string> = new Set<string>();

    trustedNamespaces: Set<string> = new Set<string>();

    enabled = this.data.length !== 0;

    override visitNode(node: ts.Node): void {
        if (ts.isIdentifier(node)) {
            this.visitIdentifier(node);
        }
    }

    private visitIdentifier(identifier: ts.Identifier) {
        if (!this.data.some(data => data.replace === identifier.text)) {
            return;
        }

        if (isNamespaceImportNode(identifier) && this.isNgxTethysDeclaration(getImportDeclaration(identifier))) {
            this.trustedNamespaces.add(identifier.text);

            return this.createFailureWithReplacement(identifier);
        }

        if (isExportSpecifierNode(identifier) && this.isNgxTethysDeclaration(getExportDeclaration(identifier))) {
            return this.createFailureWithReplacement(identifier);
        }

        if (isImportSpecifierNode(identifier) && this.isNgxTethysDeclaration(getImportDeclaration(identifier))) {
            this.trustedIdentifiers.add(identifier.text);

            return this.createFailureWithReplacement(identifier);
        }

        if (ts.isPropertyAccessExpression(identifier.parent)) {
            const expression = identifier.parent.expression;

            if (ts.isIdentifier(expression) && this.trustedNamespaces.has(expression.text)) {
                return this.createFailureWithReplacement(identifier);
            }
        } else if (this.trustedIdentifiers.has(identifier.text)) {
            return this.createFailureWithReplacement(identifier);
        }
    }

    private isNgxTethysDeclaration(declaration: ts.ImportDeclaration | ts.ExportDeclaration): boolean {
        if (!declaration.moduleSpecifier) {
            return false;
        }

        const ngxTethysModuleSpecifier = 'ngx-tethys';
        const moduleSpecifier = declaration.moduleSpecifier.getText();
        return moduleSpecifier.indexOf(ngxTethysModuleSpecifier) !== -1;
    }

    private createFailureWithReplacement(identifier: ts.Identifier) {
        const classData = this.data.find(data => data.replace === identifier.text)!;
        const filePath = this.fileSystem.resolve(identifier.getSourceFile().fileName);

        this.fileSystem
            .edit(filePath)
            .remove(identifier.getStart(), identifier.getWidth())
            .insertRight(identifier.getStart(), classData.replaceWith);
    }
}
