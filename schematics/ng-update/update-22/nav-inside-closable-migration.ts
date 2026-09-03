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

export class NavInsideClosableMigration extends Migration<UpgradeData> {
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
                if (element.name === 'thy-nav') {
                    migration.migrateInsideClosable(element, template);
                }
                super.visitElement(element);
            }
        }

        tmplAstVisitAll(new Visitor(), parsed.nodes);
    }

    private migrateInsideClosable(element: TmplAstElement, template: ResolvedResource): void {
        const textAttr = element.attributes.find(attribute => attribute.name === 'thyInsideClosable');
        const boundAttr = element.inputs.find(input => input.name === 'thyInsideClosable');

        if (!textAttr && !boundAttr) {
            return;
        }

        const hasPopoverOptions =
            element.attributes.some(attribute => attribute.name === 'thyPopoverOptions') ||
            element.inputs.some(input => input.name === 'thyPopoverOptions');

        if (hasPopoverOptions) {
            if (textAttr) {
                this.removeAttribute(textAttr, template);
            }
            if (boundAttr) {
                this.removeBoundAttribute(boundAttr, template);
            }
            return;
        }

        if (textAttr) {
            this.migrateTextAttribute(textAttr, template);
        } else if (boundAttr) {
            this.migrateBoundAttribute(boundAttr, template);
        }
    }

    private removeAttribute(attribute: TmplAstTextAttribute, template: ResolvedResource): void {
        const start = template.start + attribute.sourceSpan.start.offset;
        const width = attribute.sourceSpan.end.offset - attribute.sourceSpan.start.offset;
        this.fileSystem.edit(template.filePath).remove(start, width);
    }

    private removeBoundAttribute(attribute: TmplAstBoundAttribute, template: ResolvedResource): void {
        const start = template.start + attribute.sourceSpan.start.offset;
        const width = attribute.sourceSpan.end.offset - attribute.sourceSpan.start.offset;
        this.fileSystem.edit(template.filePath).remove(start, width);
    }

    private migrateTextAttribute(attribute: TmplAstTextAttribute, template: ResolvedResource): void {
        const insideClosable = attribute.value === '' || attribute.value === 'true';
        const start = template.start + attribute.sourceSpan.start.offset;
        const width = attribute.sourceSpan.end.offset - attribute.sourceSpan.start.offset;

        if (insideClosable) {
            this.fileSystem.edit(template.filePath).remove(start, width);
        } else {
            this.fileSystem
                .edit(template.filePath)
                .remove(start, width)
                .insertRight(start, '[thyPopoverOptions]="{ insideClosable: false }"');
        }
    }

    private migrateBoundAttribute(attribute: TmplAstBoundAttribute, template: ResolvedResource): void {
        const expression = attribute.value instanceof ASTWithSource ? attribute.value.ast : attribute.value;
        const start = template.start + attribute.sourceSpan.start.offset;
        const width = attribute.sourceSpan.end.offset - attribute.sourceSpan.start.offset;

        if (expression instanceof LiteralPrimitive && typeof expression.value === 'boolean') {
            if (expression.value) {
                this.fileSystem.edit(template.filePath).remove(start, width);
            } else {
                this.fileSystem
                    .edit(template.filePath)
                    .remove(start, width)
                    .insertRight(start, '[thyPopoverOptions]="{ insideClosable: false }"');
            }
            return;
        }

        const valueSource = attribute.valueSpan
            ? template.content.slice(attribute.valueSpan.start.offset, attribute.valueSpan.end.offset)
            : 'true';
        this.fileSystem
            .edit(template.filePath)
            .remove(start, width)
            .insertRight(start, `[thyPopoverOptions]="{ insideClosable: ${valueSource} }"`);
    }
}
