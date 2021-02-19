import ts, { ImportDeclaration, SourceFile, StringLiteral, factory } from 'typescript';
import { UpdateFileService } from '../../../utils';

export abstract class MigrationBase {
    private printer = ts.createPrinter();
    abstract run(): void;
    constructor(protected sourceFile: SourceFile, protected updateFileService: UpdateFileService) {}

    createImportDeclaration(
        importNameList: string[],
        importPackageName: string,
        commentOptions?: {
            kind?: ts.SyntaxKind.SingleLineCommentTrivia | ts.SyntaxKind.MultiLineCommentTrivia;
            content: string;
            newLine?: boolean;
        }
    ) {
        const node = ts.createImportDeclaration(
            undefined,
            undefined,
            ts.createImportClause(
                undefined,
                ts.createNamedImports(
                    importNameList.map(importName => ts.createImportSpecifier(undefined, ts.createIdentifier(importName)))
                ),
                false
            ),
            ts.createStringLiteral(importPackageName)
        );
        if (commentOptions && commentOptions.content !== undefined) {
            return ts.addSyntheticLeadingComment(
                node,
                commentOptions.kind || ts.SyntaxKind.SingleLineCommentTrivia,
                commentOptions.content,
                commentOptions.newLine
            );
        }
        return node;
    }

    createNamedImports(importSpecifierList: ts.ImportSpecifier[]) {
        return ts.createNamedImports(importSpecifierList);
    }

    printNodeContent(node: ts.Node) {
        return this.printer.printNode(ts.EmitHint.Unspecified, node, undefined);
    }

    createStringLiteral(string: string) {
        return ts.createStringLiteral(string);
    }

    getImportDeclarationList(): ts.ImportDeclaration[] {
        return this.sourceFile.statements
            .filter(item => ts.isImportDeclaration(item))
            .filter((item: ts.ImportDeclaration) => this.getImportDeclarationPackageName(item).startsWith('ngx-tethys')) as any[];
    }

    getImportDeclarationPackageName(importDeclaration: ts.ImportDeclaration) {
        return (importDeclaration.moduleSpecifier as ts.StringLiteral).text;
    }

    getImportDeclarationImportSpecifierList(importDeclaration: ImportDeclaration): ts.ImportSpecifier[] {
        if (
            importDeclaration.importClause &&
            importDeclaration.importClause.namedBindings &&
            ts.isNamedImports(importDeclaration.importClause.namedBindings)
        ) {
            return importDeclaration.importClause.namedBindings.elements.slice();
        }
        return [];
    }

    addComment(
        node: ts.Node,
        commentOptions: {
            kind?: ts.SyntaxKind.SingleLineCommentTrivia | ts.SyntaxKind.MultiLineCommentTrivia;
            content: string;
            newLine?: boolean;
        }
    ) {
        if (commentOptions.content !== undefined) {
            return ts.addSyntheticLeadingComment(
                node,
                commentOptions.kind || ts.SyntaxKind.SingleLineCommentTrivia,
                commentOptions.content,
                commentOptions.newLine
            );
        }
        return node;
    }
    /** 更新引入声明,因为ts 4.0设置为readonly的原因,无法直接赋值 */
    updateImportDeclaration(node: ts.ImportDeclaration, moduleSpecifier?: StringLiteral, importClause?: ts.ImportClause) {
        return factory.updateImportDeclaration(
            node,
            node.decorators,
            node.modifiers,
            importClause || node.importClause,
            moduleSpecifier || node.moduleSpecifier
        );
    }
    /** 更新引入声明,因为ts 4.0设置为readonly的原因,无法直接赋值 */
    updateImportClause(node: ts.ImportClause, namedImports: ts.NamedImportBindings) {
        return factory.updateImportClause(node, false, node.name, namedImports || node.namedBindings);
    }
}
