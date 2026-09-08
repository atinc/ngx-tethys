import { isImportSpecifierNode, Migration, UpgradeData, WorkspacePath } from '@angular/cdk/schematics';
import * as ts from 'typescript';

const OLD_SIZE_TYPES = new Set(['TimePickerSize', 'InputSize', 'ThyInputSize', 'SelectControlSize']);
const NEW_TYPE = 'ThyFormControlSize';
const CORE_MODULE = 'ngx-tethys/core';

export class FormControlSizeTypeMigration extends Migration<UpgradeData> {
    enabled = true;

    private trustedIdentifiers = new Set<string>();

    override visitNode(node: ts.Node): void {
        if (ts.isSourceFile(node)) {
            this.migrateSourceFile(node);
        }
    }

    private migrateSourceFile(sourceFile: ts.SourceFile): void {
        const filePath = this.fileSystem.resolve(sourceFile.fileName);
        const importDeclarations = sourceFile.statements.filter(ts.isImportDeclaration);
        this.trustedIdentifiers.clear();
        let needsCoreImport = false;

        for (const importDeclaration of importDeclarations) {
            if (!this.isNgxTethysModule(importDeclaration.moduleSpecifier)) {
                continue;
            }

            const namedBindings = importDeclaration.importClause?.namedBindings;
            if (!namedBindings || !ts.isNamedImports(namedBindings)) {
                continue;
            }

            const oldSpecifiers = namedBindings.elements.filter(element => OLD_SIZE_TYPES.has(element.name.text));
            if (oldSpecifiers.length === 0) {
                continue;
            }

            needsCoreImport = true;

            for (const specifier of oldSpecifiers) {
                this.trustedIdentifiers.add(specifier.name.text);
            }

            if (oldSpecifiers.length === namedBindings.elements.length) {
                this.removeImportDeclaration(importDeclaration, filePath);
            } else {
                for (const specifier of oldSpecifiers) {
                    this.removeImportSpecifier(specifier, namedBindings, filePath);
                }
            }
        }

        if (needsCoreImport) {
            this.ensureCoreImport(sourceFile, filePath);
        }

        this.renameIdentifiers(sourceFile, filePath);
    }

    private renameIdentifiers(sourceFile: ts.SourceFile, filePath: WorkspacePath): void {
        const visit = (node: ts.Node): void => {
            if (ts.isIdentifier(node) && OLD_SIZE_TYPES.has(node.text) && this.trustedIdentifiers.has(node.text)) {
                if (isImportSpecifierNode(node)) {
                    return;
                }

                this.fileSystem
                    .edit(filePath)
                    .remove(node.getStart(), node.getWidth())
                    .insertRight(node.getStart(), NEW_TYPE);
            }

            ts.forEachChild(node, visit);
        };

        visit(sourceFile);
    }

    private ensureCoreImport(sourceFile: ts.SourceFile, filePath: WorkspacePath): void {
        for (const statement of sourceFile.statements) {
            if (!ts.isImportDeclaration(statement) || !this.isCoreModule(statement.moduleSpecifier)) {
                continue;
            }

            const namedBindings = statement.importClause?.namedBindings;
            if (!namedBindings || !ts.isNamedImports(namedBindings)) {
                continue;
            }

            const hasTargetType = namedBindings.elements.some(element => element.name.text === NEW_TYPE);
            if (!hasTargetType) {
                const lastElement = namedBindings.elements[namedBindings.elements.length - 1];
                this.fileSystem.edit(filePath).insertRight(lastElement.end, `, ${NEW_TYPE}`);
            }

            return;
        }

        const insertPosition = this.findImportInsertPosition(sourceFile);
        this.fileSystem.edit(filePath).insertRight(insertPosition, `\nimport { ${NEW_TYPE} } from '${CORE_MODULE}';\n`);
    }

    private removeImportDeclaration(importDeclaration: ts.ImportDeclaration, filePath: WorkspacePath): void {
        const start = importDeclaration.getStart();
        let width = importDeclaration.getWidth();

        const nextToken = importDeclaration.getSourceFile().text.slice(start + width).match(/^\s*\n/);
        if (nextToken) {
            width += nextToken[0].length;
        }

        this.fileSystem.edit(filePath).remove(start, width);
    }

    private removeImportSpecifier(
        specifier: ts.ImportSpecifier,
        namedBindings: ts.NamedImports,
        filePath: WorkspacePath
    ): void {
        const elements = namedBindings.elements;
        const index = elements.indexOf(specifier);

        if (elements.length === 1) {
            const importDeclaration = specifier.parent.parent.parent as ts.ImportDeclaration;
            this.removeImportDeclaration(importDeclaration, filePath);
            return;
        }

        if (index === 0) {
            const nextElement = elements[1];
            const removeWidth = nextElement.getStart() - specifier.getStart();
            this.fileSystem.edit(filePath).remove(specifier.getStart(), removeWidth);
            return;
        }

        const previousElement = elements[index - 1];
        const removeStart = previousElement.end;
        const removeWidth = specifier.end - removeStart;
        this.fileSystem.edit(filePath).remove(removeStart, removeWidth);
    }

    private findImportInsertPosition(sourceFile: ts.SourceFile): number {
        let lastImportEnd = 0;

        for (const statement of sourceFile.statements) {
            if (ts.isImportDeclaration(statement)) {
                lastImportEnd = statement.end;
            }
        }

        if (lastImportEnd > 0) {
            return lastImportEnd;
        }

        return 0;
    }

    private isNgxTethysModule(moduleSpecifier: ts.Expression): boolean {
        return moduleSpecifier.getText().includes('ngx-tethys');
    }

    private isCoreModule(moduleSpecifier: ts.Expression): boolean {
        return moduleSpecifier.getText().includes(CORE_MODULE);
    }
}
