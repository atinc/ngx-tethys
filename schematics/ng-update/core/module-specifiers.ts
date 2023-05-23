import { getExportDeclaration, getImportDeclaration } from '@angular/cdk/schematics';
import * as ts from 'typescript';

export const ngxTethysModuleSpecifier = 'ngx-tethys';

export function isNgxTethysImportDeclaration(node: ts.Node): boolean {
    return isNgxTethysDeclaration(getImportDeclaration(node));
}

export function isNgxTethysExportDeclaration(node: ts.Node): boolean {
    return isNgxTethysDeclaration(getExportDeclaration(node));
}

function isNgxTethysDeclaration(declaration: ts.ImportDeclaration | ts.ExportDeclaration): boolean {
    if (!declaration.moduleSpecifier) {
        return false;
    }

    const moduleSpecifier = declaration.moduleSpecifier.getText();
    return moduleSpecifier.indexOf(ngxTethysModuleSpecifier) !== -1;
}
