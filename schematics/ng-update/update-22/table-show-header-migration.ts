import { Migration, ResolvedResource, UpgradeData } from '@angular/cdk/schematics';
import {
    ASTWithSource,
    LiteralPrimitive,
    parseTemplate,
    TmplAstBoundAttribute,
    TmplAstElement,
    TmplAstRecursiveVisitor,
    TmplAstTextAttribute,
    tmplAstVisitAll
} from '@angular/compiler';

export class TableShowHeaderMigration extends Migration<UpgradeData> {
    enabled = true;

    override visitTemplate(template: ResolvedResource): void {
        const parsed = parseTemplate(template.content, template.filePath, {
            preserveWhitespaces: true,
            preserveLineEndings: true
        });

        if (parsed.errors?.length) {
            return;
        }

        const migration = this;
        class Visitor extends TmplAstRecursiveVisitor {
            override visitElement(element: TmplAstElement): void {
                if (element.name === 'thy-table') {
                    migration.migrateShowHeader(element, template);
                }
                super.visitElement(element);
            }
        }

        tmplAstVisitAll(new Visitor(), parsed.nodes);
    }

    private migrateShowHeader(element: TmplAstElement, template: ResolvedResource): void {
        const textAttr = element.attributes.find(attribute => attribute.name === 'thyShowHeader');
        const boundAttr = element.inputs.find(input => input.name === 'thyShowHeader');

        if (textAttr) {
            this.migrateTextAttribute(textAttr, template);
        } else if (boundAttr) {
            this.migrateBoundAttribute(boundAttr, template);
        }
    }

    private migrateTextAttribute(attribute: TmplAstTextAttribute, template: ResolvedResource): void {
        const showHeader = attribute.value === '' || attribute.value === 'true';
        const start = template.start + attribute.sourceSpan.start.offset;
        const width = attribute.sourceSpan.end.offset - attribute.sourceSpan.start.offset;

        if (showHeader) {
            this.fileSystem.edit(template.filePath).remove(start, width);
        } else {
            this.fileSystem.edit(template.filePath).remove(start, width).insertRight(start, 'thyHeadless');
        }
    }

    private migrateBoundAttribute(attribute: TmplAstBoundAttribute, template: ResolvedResource): void {
        const expression = attribute.value instanceof ASTWithSource ? attribute.value.ast : attribute.value;

        if (expression instanceof LiteralPrimitive && typeof expression.value === 'boolean') {
            const start = template.start + attribute.sourceSpan.start.offset;
            const width = attribute.sourceSpan.end.offset - attribute.sourceSpan.start.offset;

            if (expression.value) {
                this.fileSystem.edit(template.filePath).remove(start, width);
            } else {
                this.fileSystem.edit(template.filePath).remove(start, width).insertRight(start, 'thyHeadless');
            }
            return;
        }

        const keyStart = template.start + attribute.keySpan.start.offset;
        const keyWidth = attribute.keySpan.end.offset - attribute.keySpan.start.offset;
        this.fileSystem.edit(template.filePath).remove(keyStart, keyWidth).insertRight(keyStart, 'thyHeadless');

        if (attribute.valueSpan) {
            const valueStart = template.start + attribute.valueSpan.start.offset;
            const valueWidth = attribute.valueSpan.end.offset - attribute.valueSpan.start.offset;
            const valueSource = template.content.slice(attribute.valueSpan.start.offset, attribute.valueSpan.end.offset);
            this.fileSystem.edit(template.filePath).remove(valueStart, valueWidth).insertRight(valueStart, `!(${valueSource})`);
        }
    }
}
