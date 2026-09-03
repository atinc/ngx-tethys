import { Migration, ResolvedResource, UpgradeData } from '@angular/cdk/schematics';
import {
    parseTemplate,
    TmplAstBoundAttribute,
    TmplAstElement,
    TmplAstRecursiveVisitor,
    TmplAstTextAttribute,
    tmplAstVisitAll
} from '@angular/compiler';

interface TemplateEdit {
    start: number;
    remove: number;
    insert: string;
}

const CARD_CHILD_ELEMENTS = new Set(['thy-card-header', 'thy-card-content']);

export function migrateCardDeprecatedProps(content: string, filePath = 'test.html'): string {
    const parsed = parseTemplate(content, filePath, {
        preserveWhitespaces: true,
        preserveLineEndings: true
    });

    if (parsed.errors?.length) {
        return content;
    }

    const edits: TemplateEdit[] = [];
    const visitor = new CardDeprecatedPropsVisitor(content, edits);
    tmplAstVisitAll(visitor, parsed.nodes);

    if (!edits.length) {
        return content;
    }

    return applyEdits(content, edits);
}

function applyEdits(content: string, edits: TemplateEdit[]): string {
    return edits
        .sort((left, right) => right.start - left.start)
        .reduce((result, edit) => {
            return result.slice(0, edit.start) + edit.insert + result.slice(edit.start + edit.remove);
        }, content);
}

class CardDeprecatedPropsVisitor extends TmplAstRecursiveVisitor {
    constructor(
        private readonly content: string,
        private readonly edits: TemplateEdit[]
    ) {
        super();
    }

    override visitElement(element: TmplAstElement): void {
        if (element.name === 'thy-card') {
            this.migrateCard(element);
        }

        if (CARD_CHILD_ELEMENTS.has(element.name)) {
            this.removeChildSize(element);
        }

        super.visitElement(element);
    }

    private migrateCard(element: TmplAstElement): void {
        this.migrateHasLeftRightPadding(element);
        this.migrateChildSizeToCard(element);
    }

    private migrateHasLeftRightPadding(element: TmplAstElement): void {
        const textAttr = element.attributes.find(attribute => attribute.name === 'thyHasLeftRightPadding');
        const boundAttr = element.inputs.find(input => input.name === 'thyHasLeftRightPadding');

        if (textAttr) {
            this.removeSpan(textAttr.sourceSpan.start.offset, textAttr.sourceSpan.end.offset);
            return;
        }

        if (boundAttr) {
            this.removeSpan(boundAttr.sourceSpan.start.offset, boundAttr.sourceSpan.end.offset);
        }
    }

    private migrateChildSizeToCard(element: TmplAstElement): void {
        if (this.hasCardSize(element)) {
            return;
        }

        const childSize = this.findChildSize(element);
        if (!childSize) {
            return;
        }

        this.insertCardSize(element, childSize);
    }

    private hasCardSize(element: TmplAstElement): boolean {
        return (
            element.attributes.some(attribute => attribute.name === 'thySize') ||
            element.inputs.some(input => input.name === 'thySize')
        );
    }

    private findChildSize(element: TmplAstElement): TmplAstTextAttribute | TmplAstBoundAttribute | null {
        for (const child of element.children) {
            if (!(child instanceof TmplAstElement) || !CARD_CHILD_ELEMENTS.has(child.name)) {
                continue;
            }

            const textSize = child.attributes.find(attribute => attribute.name === 'thySize');
            if (textSize) {
                return textSize;
            }

            const boundSize = child.inputs.find(input => input.name === 'thySize');
            if (boundSize) {
                return boundSize;
            }
        }

        return null;
    }

    private insertCardSize(
        element: TmplAstElement,
        sizeAttribute: TmplAstTextAttribute | TmplAstBoundAttribute
    ): void {
        if (sizeAttribute instanceof TmplAstTextAttribute) {
            this.insertBeforeTagEnd(element, `thySize="${sizeAttribute.value}"`);
            return;
        }

        const valueSource = sizeAttribute.valueSpan
            ? this.slice(sizeAttribute.valueSpan.start.offset, sizeAttribute.valueSpan.end.offset)
            : 'size';
        this.insertBeforeTagEnd(element, `[thySize]="${valueSource}"`);
    }

    private removeChildSize(element: TmplAstElement): void {
        const textSize = element.attributes.find(attribute => attribute.name === 'thySize');
        if (textSize) {
            this.removeSpan(textSize.sourceSpan.start.offset, textSize.sourceSpan.end.offset);
            return;
        }

        const boundSize = element.inputs.find(input => input.name === 'thySize');
        if (boundSize) {
            this.removeSpan(boundSize.sourceSpan.start.offset, boundSize.sourceSpan.end.offset);
        }
    }

    private insertBeforeTagEnd(element: TmplAstElement, attributeText: string): void {
        const openingTag = this.slice(element.startSourceSpan.start.offset, element.startSourceSpan.end.offset);
        const closingLength = openingTag.endsWith('/>') ? 2 : 1;
        const insertAt = element.startSourceSpan.end.offset - closingLength;
        this.addEdit(insertAt, 0, ` ${attributeText}`);
    }

    private removeSpan(start: number, end: number): void {
        let removeStart = start;
        if (removeStart > 0 && this.content[removeStart - 1] === ' ') {
            removeStart -= 1;
        }
        this.addEdit(removeStart, end - removeStart, '');
    }

    private addEdit(start: number, remove: number, insert: string): void {
        this.edits.push({ start, remove, insert });
    }

    private slice(start: number, end: number): string {
        return this.content.slice(start, end);
    }
}

export class CardDeprecatedPropsMigration extends Migration<UpgradeData> {
    enabled = true;

    override visitTemplate(template: ResolvedResource): void {
        const migratedContent = migrateCardDeprecatedProps(template.content, template.filePath);

        if (migratedContent === template.content) {
            return;
        }

        const filePath = this.fileSystem.resolve(template.filePath);
        this.fileSystem
            .edit(filePath)
            .remove(template.start, template.content.length)
            .insertRight(template.start, migratedContent);
    }
}
