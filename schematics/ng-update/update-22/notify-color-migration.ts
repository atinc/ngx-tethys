import { Migration, UpgradeData } from '@angular/cdk/schematics';
import * as ts from 'typescript';
import { applyEditsInMemory, RelativeTemplateEdit } from '../template-incremental-edits';

const NOTIFY_MODULE = 'ngx-tethys/notify';
const NOTIFY_CONFIG_KEYS = new Set(['title', 'placement', 'detail', 'actions', 'contentInitialState', 'html']);
const NOTIFY_METHODS = new Set(['show', 'success', 'info', 'warning', 'error']);

function isNotifyImport(sourceFile: ts.SourceFile): boolean {
    return sourceFile.statements.some(statement => {
        return (
            ts.isImportDeclaration(statement) &&
            ts.isStringLiteral(statement.moduleSpecifier) &&
            statement.moduleSpecifier.text.includes(NOTIFY_MODULE)
        );
    });
}

function getPropertyName(property: ts.ObjectLiteralElementLike): string | null {
    if (!ts.isPropertyAssignment(property)) {
        return null;
    }

    if (ts.isIdentifier(property.name) || ts.isStringLiteral(property.name)) {
        return property.name.text;
    }

    return null;
}

function isNotifyConfigObject(node: ts.ObjectLiteralExpression): boolean {
    if (node.properties.some(property => getPropertyName(property) && NOTIFY_CONFIG_KEYS.has(getPropertyName(property)!))) {
        return true;
    }

    const parent = node.parent;
    if (ts.isCallExpression(parent) && parent.arguments.includes(node)) {
        const expression = parent.expression;
        if (ts.isPropertyAccessExpression(expression) && NOTIFY_METHODS.has(expression.name.text)) {
            return true;
        }
    }

    if (ts.isVariableDeclaration(parent) && parent.initializer === node) {
        return parent.type?.getText().includes('ThyNotifyConfig') ?? false;
    }

    if (ts.isAsExpression(parent) && parent.expression === node) {
        return parent.type.getText().includes('ThyNotifyConfig');
    }

    return false;
}

function collectNotifyColorEdits(sourceFile: ts.SourceFile): RelativeTemplateEdit[] {
    const edits: RelativeTemplateEdit[] = [];

    const visit = (node: ts.Node): void => {
        if (ts.isObjectLiteralExpression(node) && isNotifyConfigObject(node)) {
            const hasColor = node.properties.some(property => getPropertyName(property) === 'color');

            if (!hasColor) {
                for (const property of node.properties) {
                    if (!ts.isPropertyAssignment(property)) {
                        continue;
                    }

                    const name = property.name;
                    if ((ts.isIdentifier(name) || ts.isStringLiteral(name)) && name.text === 'type') {
                        edits.push({
                            start: name.getStart(sourceFile),
                            remove: name.getWidth(sourceFile),
                            insert: ts.isStringLiteral(name) ? "'color'" : 'color'
                        });
                    }
                }
            }
        }

        ts.forEachChild(node, visit);
    };

    visit(sourceFile);
    return edits;
}

export function migrateNotifyConfigColor(content: string, fileName = 'test.ts'): string {
    const sourceFile = ts.createSourceFile(fileName, content, ts.ScriptTarget.Latest, true);

    if (!isNotifyImport(sourceFile)) {
        return content;
    }

    return applyEditsInMemory(content, collectNotifyColorEdits(sourceFile));
}

export class NotifyColorMigration extends Migration<UpgradeData> {
    enabled = true;

    override visitNode(node: ts.Node): void {
        if (!ts.isSourceFile(node) || !isNotifyImport(node)) {
            return;
        }

        const edits = collectNotifyColorEdits(node);
        if (!edits.length) {
            return;
        }

        const filePath = this.fileSystem.resolve(node.fileName);
        const sortedEdits = [...edits].sort((left, right) => right.start - left.start);

        for (const edit of sortedEdits) {
            this.fileSystem.edit(filePath).remove(edit.start, edit.remove).insertRight(edit.start, edit.insert);
        }
    }
}
