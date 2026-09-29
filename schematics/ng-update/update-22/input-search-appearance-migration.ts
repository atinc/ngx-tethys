import { Migration, ResolvedResource, UpgradeData } from '@angular/cdk/schematics';
import {
    ASTWithSource,
    LiteralPrimitive,
    parseTemplate,
    TmplAstBoundAttribute,
    TmplAstElement,
    TmplAstRecursiveVisitor,
    tmplAstVisitAll
} from '@angular/compiler';
import { applyEditsInMemory, applyRelativeTemplateEdits, RelativeTemplateEdit } from '../template-incremental-edits';

const TRANSPARENT_ATTR_NAMES = new Set(['thyTheme', 'thyVariant']);

function isInputSearchElement(element: TmplAstElement): boolean {
    return element.name === 'thy-input-search';
}

function collectInputSearchTransparentEdits(content: string, filePath = 'test.html'): RelativeTemplateEdit[] {
    const parsed = parseTemplate(content, filePath, {
        preserveWhitespaces: true,
        preserveLineEndings: true
    });

    if (parsed.errors?.length) {
        return [];
    }

    const edits: RelativeTemplateEdit[] = [];
    tmplAstVisitAll(new InputSearchTransparentVisitor(content, edits), parsed.nodes);

    return edits;
}

export function migrateInputSearchTransparent(content: string, filePath = 'test.html'): string {
    return applyEditsInMemory(content, collectInputSearchTransparentEdits(content, filePath));
}

class InputSearchTransparentVisitor extends TmplAstRecursiveVisitor {
    constructor(
        private readonly content: string,
        private readonly edits: RelativeTemplateEdit[]
    ) {
        super();
    }

    override visitElement(element: TmplAstElement): void {
        if (isInputSearchElement(element)) {
            this.migrateTransparent(element);
        }

        super.visitElement(element);
    }

    private migrateTransparent(element: TmplAstElement): void {
        let hasAppearance =
            element.attributes.some(attribute => attribute.name === 'thyAppearance') ||
            element.inputs.some(input => input.name === 'thyAppearance');

        for (const attribute of element.attributes) {
            if (!TRANSPARENT_ATTR_NAMES.has(attribute.name) || attribute.value !== 'transparent') {
                continue;
            }

            if (hasAppearance) {
                this.removeSpan(attribute.sourceSpan.start.offset, attribute.sourceSpan.end.offset);
            } else {
                this.replaceSpan(attribute.sourceSpan.start.offset, attribute.sourceSpan.end.offset, 'thyAppearance="ghost"');
                hasAppearance = true;
            }
        }

        for (const input of element.inputs) {
            if (!TRANSPARENT_ATTR_NAMES.has(input.name) || !this.isTransparentLiteral(input)) {
                continue;
            }

            if (hasAppearance) {
                this.removeSpan(input.sourceSpan.start.offset, input.sourceSpan.end.offset);
            } else {
                this.replaceSpan(input.sourceSpan.start.offset, input.sourceSpan.end.offset, `[thyAppearance]="'ghost'"`);
                hasAppearance = true;
            }
        }
    }

    private isTransparentLiteral(input: TmplAstBoundAttribute): boolean {
        const expression = input.value instanceof ASTWithSource ? input.value.ast : input.value;
        return expression instanceof LiteralPrimitive && expression.value === 'transparent';
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

export class InputSearchAppearanceMigration extends Migration<UpgradeData> {
    enabled = true;

    override visitTemplate(template: ResolvedResource): void {
        applyRelativeTemplateEdits(this, template, collectInputSearchTransparentEdits(template.content, template.filePath));
    }
}
