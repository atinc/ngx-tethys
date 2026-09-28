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
const LOAD_STATE_ELEMENTS = new Set(['thy-select', 'thy-custom-select', 'thy-tree-select']);

function collectSelectPropsEdits(content: string, filePath = 'test.html'): RelativeTemplateEdit[] {
    const parsed = parseTemplate(content, filePath, {
        preserveWhitespaces: true,
        preserveLineEndings: true
    });

    if (parsed.errors?.length) {
        return [];
    }

    const edits: RelativeTemplateEdit[] = [];
    tmplAstVisitAll(new SelectPropsVisitor(content, edits), parsed.nodes);

    return edits;
}

export function migrateSelectProps(content: string, filePath = 'test.html'): string {
    return applyEditsInMemory(content, collectSelectPropsEdits(content, filePath));
}

class SelectPropsVisitor extends TmplAstRecursiveVisitor {
    constructor(
        private readonly content: string,
        private readonly edits: RelativeTemplateEdit[]
    ) {
        super();
    }

    override visitElement(element: TmplAstElement): void {
        if (SELECT_ELEMENTS.has(element.name)) {
            this.migrateMode(element);
        }

        if (LOAD_STATE_ELEMENTS.has(element.name)) {
            this.migrateLoadState(element);
        }

        super.visitElement(element);
    }

    private migrateMode(element: TmplAstElement): void {
        const textAttr = element.attributes.find(attribute => attribute.name === 'thyMode');
        const boundAttr = element.inputs.find(input => input.name === 'thyMode');

        if (textAttr) {
            this.migrateModeTextAttribute(textAttr);
            return;
        }

        if (boundAttr) {
            this.migrateModeBoundAttribute(boundAttr);
        }
    }

    private migrateModeTextAttribute(attribute: TmplAstTextAttribute): void {
        if (attribute.value === 'multiple') {
            this.replaceSpan(attribute.sourceSpan.start.offset, attribute.sourceSpan.end.offset, 'thyMultiple');
            return;
        }

        this.removeSpan(attribute.sourceSpan.start.offset, attribute.sourceSpan.end.offset);
    }

    private migrateModeBoundAttribute(attribute: TmplAstBoundAttribute): void {
        const expression = attribute.value instanceof ASTWithSource ? attribute.value.ast : attribute.value;

        if (expression instanceof LiteralPrimitive) {
            if (expression.value === 'multiple') {
                this.replaceSpan(attribute.sourceSpan.start.offset, attribute.sourceSpan.end.offset, 'thyMultiple');
            } else {
                this.removeSpan(attribute.sourceSpan.start.offset, attribute.sourceSpan.end.offset);
            }
            return;
        }

        const expressionSource =
            attribute.value instanceof ASTWithSource ? attribute.value.source.trim() : attribute.value.toString();
        this.replaceSpan(
            attribute.sourceSpan.start.offset,
            attribute.sourceSpan.end.offset,
            `[thyMultiple]="${expressionSource} === 'multiple'"`
        );
    }

    private migrateLoadState(element: TmplAstElement): void {
        const textAttr = element.attributes.find(attribute => attribute.name === 'thyLoadState');
        const boundAttr = element.inputs.find(input => input.name === 'thyLoadState');

        if (textAttr) {
            this.migrateLoadStateTextAttribute(textAttr);
            return;
        }

        if (boundAttr) {
            this.migrateLoadStateBoundAttribute(boundAttr);
        }
    }

    private migrateLoadStateTextAttribute(attribute: TmplAstTextAttribute): void {
        const loaded = attribute.value === '' || attribute.value === 'true';

        if (loaded) {
            this.removeSpan(attribute.sourceSpan.start.offset, attribute.sourceSpan.end.offset);
            return;
        }

        this.replaceSpan(attribute.sourceSpan.start.offset, attribute.sourceSpan.end.offset, 'thyLoading');
    }

    private migrateLoadStateBoundAttribute(attribute: TmplAstBoundAttribute): void {
        const expression = attribute.value instanceof ASTWithSource ? attribute.value.ast : attribute.value;

        if (expression instanceof LiteralPrimitive && typeof expression.value === 'boolean') {
            if (expression.value) {
                this.removeSpan(attribute.sourceSpan.start.offset, attribute.sourceSpan.end.offset);
            } else {
                this.replaceSpan(attribute.sourceSpan.start.offset, attribute.sourceSpan.end.offset, 'thyLoading');
            }
            return;
        }

        const expressionSource =
            attribute.value instanceof ASTWithSource ? attribute.value.source.trim() : attribute.value.toString();
        this.replaceSpan(
            attribute.sourceSpan.start.offset,
            attribute.sourceSpan.end.offset,
            `[thyLoading]="!(${expressionSource})"`
        );
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

export class SelectPropsMigration extends Migration<UpgradeData> {
    enabled = true;

    override visitTemplate(template: ResolvedResource): void {
        applyRelativeTemplateEdits(this, template, collectSelectPropsEdits(template.content, template.filePath));
    }
}
