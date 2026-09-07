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

function isTagElement(element: TmplAstElement): boolean {
    if (element.name === 'thy-tag') {
        return true;
    }

    return element.attributes.some(attribute => attribute.name === 'thyTag') || element.inputs.some(input => input.name === 'thyTag');
}

function collectTagWeakFillEdits(content: string, filePath = 'test.html'): RelativeTemplateEdit[] {
    const parsed = parseTemplate(content, filePath, {
        preserveWhitespaces: true,
        preserveLineEndings: true
    });

    if (parsed.errors?.length) {
        return [];
    }

    const edits: RelativeTemplateEdit[] = [];
    tmplAstVisitAll(new TagWeakFillVisitor(edits), parsed.nodes);

    return edits;
}

export function migrateTagWeakFill(content: string, filePath = 'test.html'): string {
    return applyEditsInMemory(content, collectTagWeakFillEdits(content, filePath));
}

class TagWeakFillVisitor extends TmplAstRecursiveVisitor {
    constructor(private readonly edits: RelativeTemplateEdit[]) {
        super();
    }

    override visitElement(element: TmplAstElement): void {
        if (isTagElement(element)) {
            this.migrateWeakFill(element);
        }

        super.visitElement(element);
    }

    private migrateWeakFill(element: TmplAstElement): void {
        for (const attribute of element.attributes) {
            if (attribute.name === 'thyAppearance' && attribute.value === 'weak-fill') {
                this.replaceTextAttributeValue(attribute, 'subtle');
            } else if (attribute.name === 'thyTheme' && attribute.value === 'weak-fill') {
                this.replaceThemeTextAttribute(attribute);
            }
        }

        for (const input of element.inputs) {
            if (!this.isWeakFillLiteral(input)) {
                continue;
            }

            if (input.name === 'thyTheme') {
                this.replaceThemeBoundAttribute(input);
            } else if (input.name === 'thyAppearance') {
                this.replaceBoundLiteralValue(input, 'subtle');
            }
        }
    }

    private isWeakFillLiteral(input: TmplAstBoundAttribute): boolean {
        const expression = input.value instanceof ASTWithSource ? input.value.ast : input.value;
        return expression instanceof LiteralPrimitive && expression.value === 'weak-fill';
    }

    private replaceTextAttributeValue(attribute: TmplAstTextAttribute, value: string): void {
        if (!attribute.valueSpan) {
            return;
        }

        this.edits.push({
            start: attribute.valueSpan.start.offset,
            remove: attribute.valueSpan.end.offset - attribute.valueSpan.start.offset,
            insert: value
        });
    }

    private replaceThemeTextAttribute(attribute: TmplAstTextAttribute): void {
        this.edits.push({
            start: attribute.sourceSpan.start.offset,
            remove: attribute.sourceSpan.end.offset - attribute.sourceSpan.start.offset,
            insert: 'thyAppearance="subtle"'
        });
    }

    private replaceThemeBoundAttribute(input: TmplAstBoundAttribute): void {
        this.edits.push({
            start: input.sourceSpan.start.offset,
            remove: input.sourceSpan.end.offset - input.sourceSpan.start.offset,
            insert: `[thyAppearance]="'subtle'"`
        });
    }

    private replaceBoundLiteralValue(input: TmplAstBoundAttribute, value: string): void {
        if (!input.valueSpan) {
            return;
        }

        this.edits.push({
            start: input.valueSpan.start.offset,
            remove: input.valueSpan.end.offset - input.valueSpan.start.offset,
            insert: `'${value}'`
        });
    }
}

export class TagAppearanceMigration extends Migration<UpgradeData> {
    enabled = true;

    override visitTemplate(template: ResolvedResource): void {
        applyRelativeTemplateEdits(this, template, collectTagWeakFillEdits(template.content, template.filePath));
    }
}
