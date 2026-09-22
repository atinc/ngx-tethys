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
import { applyEditsInMemory, applyRelativeTemplateEdits, RelativeTemplateEdit } from '../template-incremental-edits';

const SELECT_ELEMENTS = new Set(['thy-select', 'thy-custom-select']);

function isSelectElement(element: TmplAstElement): boolean {
    if (SELECT_ELEMENTS.has(element.name)) {
        return true;
    }

    return (
        element.attributes.some(attribute => attribute.name === 'thySelectControl') ||
        element.inputs.some(input => input.name === 'thySelectControl')
    );
}

function collectSelectBorderlessEdits(content: string, filePath = 'test.html'): RelativeTemplateEdit[] {
    const parsed = parseTemplate(content, filePath, {
        preserveWhitespaces: true,
        preserveLineEndings: true
    });

    if (parsed.errors?.length) {
        return [];
    }

    const edits: RelativeTemplateEdit[] = [];
    tmplAstVisitAll(new SelectBorderlessVisitor(content, edits), parsed.nodes);

    return edits;
}

export function migrateSelectBorderless(content: string, filePath = 'test.html'): string {
    return applyEditsInMemory(content, collectSelectBorderlessEdits(content, filePath));
}

class SelectBorderlessVisitor extends TmplAstRecursiveVisitor {
    constructor(
        private readonly content: string,
        private readonly edits: RelativeTemplateEdit[]
    ) {
        super();
    }

    override visitElement(element: TmplAstElement): void {
        if (isSelectElement(element)) {
            this.migrateBorderless(element);
        }

        super.visitElement(element);
    }

    private migrateBorderless(element: TmplAstElement): void {
        const textAttr = element.attributes.find(attribute => attribute.name === 'thyBorderless');
        const boundAttr = element.inputs.find(input => input.name === 'thyBorderless');

        if (!textAttr && !boundAttr) {
            return;
        }

        const hasAppearance =
            element.attributes.some(attribute => attribute.name === 'thyAppearance') ||
            element.inputs.some(input => input.name === 'thyAppearance');

        if (textAttr) {
            this.migrateTextAttribute(textAttr, hasAppearance);
            return;
        }

        if (boundAttr) {
            this.migrateBoundAttribute(boundAttr, hasAppearance);
        }
    }

    private migrateTextAttribute(attribute: TmplAstTextAttribute, hasAppearance: boolean): void {
        const borderless = attribute.value === '' || attribute.value === 'true';

        if (!borderless) {
            this.removeSpan(attribute.sourceSpan.start.offset, attribute.sourceSpan.end.offset);
            return;
        }

        if (hasAppearance) {
            this.removeSpan(attribute.sourceSpan.start.offset, attribute.sourceSpan.end.offset);
        } else {
            this.replaceSpan(attribute.sourceSpan.start.offset, attribute.sourceSpan.end.offset, 'thyAppearance="ghost"');
        }
    }

    private migrateBoundAttribute(attribute: TmplAstBoundAttribute, hasAppearance: boolean): void {
        const expression = attribute.value instanceof ASTWithSource ? attribute.value.ast : attribute.value;

        if (!(expression instanceof LiteralPrimitive) || typeof expression.value !== 'boolean') {
            return;
        }

        if (!expression.value) {
            this.removeSpan(attribute.sourceSpan.start.offset, attribute.sourceSpan.end.offset);
            return;
        }

        if (hasAppearance) {
            this.removeSpan(attribute.sourceSpan.start.offset, attribute.sourceSpan.end.offset);
        } else {
            this.replaceSpan(attribute.sourceSpan.start.offset, attribute.sourceSpan.end.offset, 'thyAppearance="ghost"');
        }
    }

    private replaceSpan(start: number, end: number, insert: string): void {
        this.edits.push({ start, remove: end - start, insert });
    }

    private removeSpan(start: number, end: number): void {
        if (start > 0 && /\s/.test(this.content[start - 1])) {
            start -= 1;
        }

        this.edits.push({
            start,
            remove: end - start,
            insert: ''
        });
    }
}

export class SelectBorderlessMigration extends Migration<UpgradeData> {
    enabled = true;

    override visitTemplate(template: ResolvedResource): void {
        applyRelativeTemplateEdits(this, template, collectSelectBorderlessEdits(template.content, template.filePath));
    }
}
