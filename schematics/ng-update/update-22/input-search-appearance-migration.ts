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

const LEGACY_ATTR_NAMES = new Set(['thyTheme']);

function isInputSearchElement(element: TmplAstElement): boolean {
    return element.name === 'thy-input-search';
}

function collectInputSearchAppearanceEdits(content: string, filePath = 'test.html'): RelativeTemplateEdit[] {
    const parsed = parseTemplate(content, filePath, {
        preserveWhitespaces: true,
        preserveLineEndings: true
    });

    if (parsed.errors?.length) {
        return [];
    }

    const edits: RelativeTemplateEdit[] = [];
    tmplAstVisitAll(new InputSearchAppearanceVisitor(content, edits), parsed.nodes);

    return edits;
}

/** @deprecated use migrateInputSearchAppearance */
export function migrateInputSearchTransparent(content: string, filePath = 'test.html'): string {
    return migrateInputSearchAppearance(content, filePath);
}

export function migrateInputSearchAppearance(content: string, filePath = 'test.html'): string {
    return applyEditsInMemory(content, collectInputSearchAppearanceEdits(content, filePath));
}

class InputSearchAppearanceVisitor extends TmplAstRecursiveVisitor {
    constructor(
        private readonly content: string,
        private readonly edits: RelativeTemplateEdit[]
    ) {
        super();
    }

    override visitElement(element: TmplAstElement): void {
        if (isInputSearchElement(element)) {
            this.migrateLegacyAttrs(element);
        }

        super.visitElement(element);
    }

    private migrateLegacyAttrs(element: TmplAstElement): void {
        let hasAppearance =
            element.attributes.some(attribute => attribute.name === 'thyAppearance') ||
            element.inputs.some(input => input.name === 'thyAppearance');
        let hasShape =
            element.attributes.some(attribute => attribute.name === 'thyShape') ||
            element.inputs.some(input => input.name === 'thyShape');

        for (const attribute of element.attributes) {
            if (!LEGACY_ATTR_NAMES.has(attribute.name)) {
                continue;
            }

            const value = attribute.value;
            if (value === 'transparent') {
                if (hasAppearance) {
                    this.removeSpan(attribute.sourceSpan.start.offset, attribute.sourceSpan.end.offset);
                } else {
                    this.replaceSpan(attribute.sourceSpan.start.offset, attribute.sourceSpan.end.offset, 'thyAppearance="ghost"');
                    hasAppearance = true;
                }
            } else if (value === 'ellipse') {
                const parts: string[] = [];
                if (!hasShape) {
                    parts.push('thyShape="ellipse"');
                    hasShape = true;
                }
                if (!hasAppearance) {
                    parts.push('thyAppearance="fill"');
                    hasAppearance = true;
                }
                if (parts.length) {
                    this.replaceSpan(attribute.sourceSpan.start.offset, attribute.sourceSpan.end.offset, parts.join(' '));
                } else {
                    this.removeSpan(attribute.sourceSpan.start.offset, attribute.sourceSpan.end.offset);
                }
            } else if (value === 'default' || value === '') {
                this.removeSpan(attribute.sourceSpan.start.offset, attribute.sourceSpan.end.offset);
            }
        }

        for (const input of element.inputs) {
            if (!LEGACY_ATTR_NAMES.has(input.name)) {
                continue;
            }

            const literal = this.getLiteralValue(input);
            if (literal === 'transparent') {
                if (hasAppearance) {
                    this.removeSpan(input.sourceSpan.start.offset, input.sourceSpan.end.offset);
                } else {
                    this.replaceSpan(input.sourceSpan.start.offset, input.sourceSpan.end.offset, `[thyAppearance]="'ghost'"`);
                    hasAppearance = true;
                }
            } else if (literal === 'ellipse') {
                const parts: string[] = [];
                if (!hasShape) {
                    parts.push(`[thyShape]="'ellipse'"`);
                    hasShape = true;
                }
                if (!hasAppearance) {
                    parts.push(`[thyAppearance]="'fill'"`);
                    hasAppearance = true;
                }
                if (parts.length) {
                    this.replaceSpan(input.sourceSpan.start.offset, input.sourceSpan.end.offset, parts.join(' '));
                } else {
                    this.removeSpan(input.sourceSpan.start.offset, input.sourceSpan.end.offset);
                }
            } else if (literal === 'default' || literal === '') {
                this.removeSpan(input.sourceSpan.start.offset, input.sourceSpan.end.offset);
            }
            // dynamic bindings ([thyTheme]="theme") are left for manual migration
        }
    }

    private getLiteralValue(input: TmplAstBoundAttribute): string | undefined {
        const expression = input.value instanceof ASTWithSource ? input.value.ast : input.value;
        if (expression instanceof LiteralPrimitive && typeof expression.value === 'string') {
            return expression.value;
        }
        return undefined;
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
        applyRelativeTemplateEdits(this, template, collectInputSearchAppearanceEdits(template.content, template.filePath));
    }
}
