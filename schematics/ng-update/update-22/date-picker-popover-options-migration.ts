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

const PICKER_DIRECTIVES = new Set(['thyDatePicker', 'thyRangePicker']);

const DEFAULT_OFFSET = 4;

export class DatePickerPopoverOptionsMigration extends Migration<UpgradeData> {
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
                if (migration.isPickerElement(element)) {
                    migration.migratePopoverOptions(element, template);
                }
                super.visitElement(element);
            }
        }

        tmplAstVisitAll(new Visitor(), parsed.nodes);
    }

    private isPickerElement(element: TmplAstElement): boolean {
        return [...element.attributes, ...element.inputs].some(attribute => PICKER_DIRECTIVES.has(attribute.name));
    }

    private migratePopoverOptions(element: TmplAstElement, template: ResolvedResource): void {
        const offsetText = element.attributes.find(attribute => attribute.name === 'thyOffset');
        const offsetBound = element.inputs.find(input => input.name === 'thyOffset');
        const backdropText = element.attributes.find(attribute => attribute.name === 'thyHasBackdrop');
        const backdropBound = element.inputs.find(input => input.name === 'thyHasBackdrop');

        if (!offsetText && !offsetBound && !backdropText && !backdropBound) {
            return;
        }

        const hasPopoverOptions =
            element.attributes.some(attribute => attribute.name === 'thyPopoverOptions') ||
            element.inputs.some(input => input.name === 'thyPopoverOptions');

        if (hasPopoverOptions) {
            if (offsetText) {
                this.removeAttribute(offsetText, template);
            }
            if (offsetBound) {
                this.removeBoundAttribute(offsetBound, template);
            }
            if (backdropText) {
                this.removeAttribute(backdropText, template);
            }
            if (backdropBound) {
                this.removeBoundAttribute(backdropBound, template);
            }
            return;
        }

        const optionsParts: string[] = [];

        const offsetValue = this.getOffsetMigrationValue(offsetText, offsetBound, template);
        if (offsetValue) {
            optionsParts.push(`offset: ${offsetValue}`);
        }

        const backdropValue = this.getHasBackdropMigrationValue(backdropText, backdropBound, template);
        if (backdropValue) {
            optionsParts.push(`hasBackdrop: ${backdropValue}`);
        }

        const attributesToRemove: Array<TmplAstTextAttribute | TmplAstBoundAttribute> = [];
        if (offsetText) {
            attributesToRemove.push(offsetText);
        }
        if (offsetBound) {
            attributesToRemove.push(offsetBound);
        }
        if (backdropText) {
            attributesToRemove.push(backdropText);
        }
        if (backdropBound) {
            attributesToRemove.push(backdropBound);
        }

        this.removeAttributes(attributesToRemove, template);

        if (optionsParts.length) {
            this.insertPopoverOptions(element, template, optionsParts.join(', '));
        }
    }

    private getOffsetMigrationValue(
        textAttr: TmplAstTextAttribute | undefined,
        boundAttr: TmplAstBoundAttribute | undefined,
        template: ResolvedResource
    ): string | null {
        if (textAttr) {
            const value = textAttr.value;
            if (value === String(DEFAULT_OFFSET)) {
                return null;
            }
            return value;
        }

        if (boundAttr) {
            const expression = boundAttr.value instanceof ASTWithSource ? boundAttr.value.ast : boundAttr.value;
            if (expression instanceof LiteralPrimitive && expression.value === DEFAULT_OFFSET) {
                return null;
            }
            return this.getBoundValueSource(boundAttr, template);
        }

        return null;
    }

    private getHasBackdropMigrationValue(
        textAttr: TmplAstTextAttribute | undefined,
        boundAttr: TmplAstBoundAttribute | undefined,
        template: ResolvedResource
    ): string | null {
        if (textAttr) {
            const value = textAttr.value;
            if (value === '' || value === 'true') {
                return null;
            }
            if (value === 'false') {
                return 'false';
            }
            return value;
        }

        if (boundAttr) {
            const expression = boundAttr.value instanceof ASTWithSource ? boundAttr.value.ast : boundAttr.value;
            if (expression instanceof LiteralPrimitive && expression.value === true) {
                return null;
            }
            if (expression instanceof LiteralPrimitive && expression.value === false) {
                return 'false';
            }
            return this.getBoundValueSource(boundAttr, template);
        }

        return null;
    }

    private getBoundValueSource(attribute: TmplAstBoundAttribute, template: ResolvedResource): string {
        return attribute.valueSpan
            ? template.content.slice(attribute.valueSpan.start.offset, attribute.valueSpan.end.offset)
            : 'true';
    }

    private removeAttributes(attributes: Array<TmplAstTextAttribute | TmplAstBoundAttribute>, template: ResolvedResource): void {
        const sorted = [...attributes].sort(
            (left, right) => right.sourceSpan.start.offset - left.sourceSpan.start.offset
        );

        for (const attribute of sorted) {
            if (attribute instanceof TmplAstTextAttribute) {
                this.removeAttribute(attribute, template);
            } else {
                this.removeBoundAttribute(attribute, template);
            }
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

    private insertPopoverOptions(element: TmplAstElement, template: ResolvedResource, options: string): void {
        const openingTag = template.content.slice(element.startSourceSpan.start.offset, element.startSourceSpan.end.offset);
        const closingLength = openingTag.endsWith('/>') ? 2 : 1;
        const insertAt = template.start + element.startSourceSpan.end.offset - closingLength;
        this.fileSystem.edit(template.filePath).insertRight(insertAt, ` [thyPopoverOptions]="{ ${options} }"`);
    }
}
