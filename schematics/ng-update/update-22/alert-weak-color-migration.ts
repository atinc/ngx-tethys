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

const WEAK_COLOR_MAP: Record<string, string> = {
    'primary-weak': 'primary',
    'success-weak': 'success',
    'warning-weak': 'warning',
    'danger-weak': 'danger'
};

const COLOR_ATTR_NAMES = new Set(['thyColor', 'thyType']);

function isAlertElement(element: TmplAstElement): boolean {
    return element.name === 'thy-alert';
}

function resolveWeakColor(value: string): string | null {
    return WEAK_COLOR_MAP[value] ?? null;
}

function collectAlertWeakColorEdits(content: string, filePath = 'test.html'): RelativeTemplateEdit[] {
    const parsed = parseTemplate(content, filePath, {
        preserveWhitespaces: true,
        preserveLineEndings: true
    });

    if (parsed.errors?.length) {
        return [];
    }

    const edits: RelativeTemplateEdit[] = [];
    tmplAstVisitAll(new AlertWeakColorVisitor(edits), parsed.nodes);

    return edits;
}

export function migrateAlertWeakColor(content: string, filePath = 'test.html'): string {
    return applyEditsInMemory(content, collectAlertWeakColorEdits(content, filePath));
}

class AlertWeakColorVisitor extends TmplAstRecursiveVisitor {
    constructor(private readonly edits: RelativeTemplateEdit[]) {
        super();
    }

    override visitElement(element: TmplAstElement): void {
        if (isAlertElement(element)) {
            this.migrateWeakColors(element);
        }

        super.visitElement(element);
    }

    private migrateWeakColors(element: TmplAstElement): void {
        let migrated = false;

        for (const attribute of element.attributes) {
            if (!COLOR_ATTR_NAMES.has(attribute.name)) {
                continue;
            }

            const mappedColor = resolveWeakColor(attribute.value);
            if (!mappedColor) {
                continue;
            }

            this.replaceColorTextAttribute(attribute, mappedColor);
            migrated = true;
        }

        for (const input of element.inputs) {
            if (!COLOR_ATTR_NAMES.has(input.name)) {
                continue;
            }

            const literalValue = this.getLiteralValue(input);
            const mappedColor = literalValue ? resolveWeakColor(literalValue) : null;
            if (!mappedColor) {
                continue;
            }

            this.replaceColorBoundAttribute(input, mappedColor);
            migrated = true;
        }

        if (migrated) {
            this.ensureBorderedAppearance(element);
        }
    }

    private getLiteralValue(input: TmplAstBoundAttribute): string | null {
        const expression = input.value instanceof ASTWithSource ? input.value.ast : input.value;
        return expression instanceof LiteralPrimitive && typeof expression.value === 'string' ? expression.value : null;
    }

    private replaceColorTextAttribute(attribute: TmplAstTextAttribute, mappedColor: string): void {
        const colorAttrName = attribute.name === 'thyType' ? 'thyColor' : attribute.name;

        this.edits.push({
            start: attribute.sourceSpan.start.offset,
            remove: attribute.sourceSpan.end.offset - attribute.sourceSpan.start.offset,
            insert: `${colorAttrName}="${mappedColor}"`
        });
    }

    private replaceColorBoundAttribute(input: TmplAstBoundAttribute, mappedColor: string): void {
        const colorAttrName = input.name === 'thyType' ? 'thyColor' : input.name;

        if (input.valueSpan) {
            this.edits.push({
                start: input.valueSpan.start.offset,
                remove: input.valueSpan.end.offset - input.valueSpan.start.offset,
                insert: `'${mappedColor}'`
            });
        }

        if (input.name === 'thyType') {
            this.edits.push({
                start: input.sourceSpan.start.offset + 1,
                remove: input.name.length,
                insert: colorAttrName
            });
        }
    }

    private ensureBorderedAppearance(element: TmplAstElement): void {
        const appearanceText = element.attributes.find(attribute => attribute.name === 'thyAppearance');
        const appearanceBound = element.inputs.find(input => input.name === 'thyAppearance');

        if (appearanceText) {
            this.replaceTextAttributeValue(appearanceText, 'bordered');
            return;
        }

        if (appearanceBound) {
            if (this.isBorderedLiteral(appearanceBound)) {
                return;
            }

            if (this.getLiteralValue(appearanceBound) !== null) {
                this.replaceBoundLiteralValue(appearanceBound, 'bordered');
            }

            return;
        }

        const insertOffset = element.startSourceSpan.start.offset + element.name.length + 1;
        this.edits.push({
            start: insertOffset,
            remove: 0,
            insert: ' thyAppearance="bordered"'
        });
    }

    private isBorderedLiteral(input: TmplAstBoundAttribute): boolean {
        return this.getLiteralValue(input) === 'bordered';
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

export class AlertWeakColorMigration extends Migration<UpgradeData> {
    enabled = true;

    override visitTemplate(template: ResolvedResource): void {
        applyRelativeTemplateEdits(this, template, collectAlertWeakColorEdits(template.content, template.filePath));
    }
}
