import { createCssSelectorForTs } from 'cyia-code-util';
import ts, { factory, ImportDeclaration, Program, SourceFile, StringLiteral } from 'typescript';

import { UpdateFileService } from '../utils';

export abstract class MigrationBase {
    constructor(protected sourceFile: SourceFile, protected updateFileService: UpdateFileService, protected program: Program) {
        this.selector = createCssSelectorForTs(this.sourceFile);
    }
    private printer = ts.createPrinter();
    protected selector: ReturnType<typeof createCssSelectorForTs>;
    abstract run(): void;

    createImportDeclaration(
        importNameList: string[],
        importPackageName: string,
        commentOptions?: {
            kind?: ts.SyntaxKind.SingleLineCommentTrivia | ts.SyntaxKind.MultiLineCommentTrivia;
            content: string;
            newLine?: boolean;
        }
    ) {
        const node = factory.createImportDeclaration(
            /* modifiers */ undefined,
            factory.createImportClause(
                /* isTypeOnly */ false,
                /* name */ undefined,
                factory.createNamedImports(importNameList.map(importName => createImportSpecifier(importName)))
            ),
            factory.createStringLiteral(importPackageName, true)
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
        return factory.createNamedImports(importSpecifierList);
    }

    printNodeContent(node: ts.Node) {
        return this.printer.printNode(ts.EmitHint.Unspecified, node, undefined);
    }

    createStringLiteral(string: string) {
        return factory.createStringLiteral(string, true);
    }

    getImportDeclarationList(): ts.ImportDeclaration[] {
        return this.selector
            .queryAll('ImportDeclaration')
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
        return updateImportDeclaration(node, moduleSpecifier, importClause);
    }

    /** 更新引入声明,因为ts 4.0设置为readonly的原因,无法直接赋值 */
    updateImportClause(node: ts.ImportClause, namedImports: ts.NamedImportBindings) {
        return factory.updateImportClause(node, false, node.name, namedImports || node.namedBindings);
    }
}

/**
 * Backwards-compatible version of `ts.updateImportDeclaration`
 * to handle a breaking change between 4.4 and 4.5.
 */
function updateImportDeclaration(
    node: ts.ImportDeclaration,
    moduleSpecifier?: StringLiteral,
    importClause?: ts.ImportClause
): ts.ImportDeclaration {
    return factory.updateImportDeclaration.length === 5
        ? (factory.createImportSpecifier as any)(
              node,
              ts.canHaveDecorators(node) ? ts.getDecorators(node) : undefined,
              node.modifiers,
              importClause || node.importClause,
              moduleSpecifier || node.moduleSpecifier
          )
        : // The new implementation also accepts `ts.AssertClause` as the last argument.
          factory.updateImportDeclaration(
              node,
              node.modifiers,
              importClause || node.importClause,
              moduleSpecifier || node.moduleSpecifier,
              node.assertClause
          );
}

/**
 * Backwards-compatible version of `ts.createImportSpecifier`
 * to handle a breaking change between 4.4 and 4.5.
 */
function createImportSpecifier(propertyName: string): ts.ImportSpecifier {
    const isTypeOnly = false;
    const identifier = factory.createIdentifier(propertyName);

    return factory.createImportSpecifier.length === 3
        ? // This is the new implementation that contains breaking change.
          factory.createImportSpecifier(isTypeOnly, /* propertyName */ undefined, identifier)
        : (factory.createImportSpecifier as any)(isTypeOnly, identifier);
}
