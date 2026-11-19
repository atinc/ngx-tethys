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

function isDoneValue(value: unknown): boolean {
    return value === '' || (!!value && value !== 'false');
}

function collectLoadingDoneEdits(content: string, filePath = 'test.html'): RelativeTemplateEdit[] {
    const parsed = parseTemplate(content, filePath, {
        preserveWhitespaces: true,
        preserveLineEndings: true
    });

    if (parsed.errors?.length) {
        return [];
    }

    const edits: RelativeTemplateEdit[] = [];
    tmplAstVisitAll(new LoadingDoneVisitor(content, edits), parsed.nodes);

    return edits;
}

export function migrateLoadingDone(content: string, filePath = 'test.html'): string {
    return applyEditsInMemory(content, collectLoadingDoneEdits(content, filePath));
}

class LoadingDoneVisitor extends TmplAstRecursiveVisitor {
    constructor(
        private readonly content: string,
        private readonly edits: RelativeTemplateEdit[]
    ) {
        super();
    }

    override visitElement(element: TmplAstElement): void {
        if (element.name === 'thy-loading') {
            this.migrateDone(element);
        }

        super.visitElement(element);
    }

    private migrateDone(element: TmplAstElement): void {
        const textAttr = element.attributes.find(attribute => attribute.name === 'thyDone');
        const boundAttr = element.inputs.find(input => input.name === 'thyDone');

        if (textAttr) {
            this.removeAttribute(element, 'thyLoading');
            this.migrateTextAttribute(textAttr);
            return;
        }

        if (boundAttr) {
            this.migrateBoundAttribute(element, boundAttr);
        }
    }

    private migrateTextAttribute(attribute: TmplAstTextAttribute): void {
        if (attribute.value === 'false') {
            this.removeSpan(attribute.sourceSpan.start.offset, attribute.sourceSpan.end.offset);
            return;
        }

        this.replaceSpan(attribute.sourceSpan.start.offset, attribute.sourceSpan.end.offset, '[thyLoading]="false"');
    }

    private migrateBoundAttribute(element: TmplAstElement, attribute: TmplAstBoundAttribute): void {
        const expression = attribute.value instanceof ASTWithSource ? attribute.value.ast : attribute.value;

        if (expression instanceof LiteralPrimitive && (expression.value === undefined || expression.value === null)) {
            this.removeSpan(attribute.sourceSpan.start.offset, attribute.sourceSpan.end.offset);
            return;
        }

        this.removeAttribute(element, 'thyLoading');

        if (expression instanceof LiteralPrimitive) {
            if (isDoneValue(expression.value)) {
                this.replaceSpan(attribute.sourceSpan.start.offset, attribute.sourceSpan.end.offset, '[thyLoading]="false"');
            } else {
                this.removeSpan(attribute.sourceSpan.start.offset, attribute.sourceSpan.end.offset);
            }
            return;
        }

        const expressionSource = attribute.value instanceof ASTWithSource ? attribute.value.source.trim() : attribute.value.toString();
        this.replaceSpan(
            attribute.sourceSpan.start.offset,
            attribute.sourceSpan.end.offset,
            `[thyLoading]="!(${expressionSource})"`
        );
    }

    private removeAttribute(element: TmplAstElement, name: string): void {
        const textAttr = element.attributes.find(attribute => attribute.name === name);
        const boundAttr = element.inputs.find(input => input.name === name);
        const attribute = textAttr ?? boundAttr;

        if (attribute) {
            this.removeSpan(attribute.sourceSpan.start.offset, attribute.sourceSpan.end.offset);
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

export class LoadingDoneMigration extends Migration<UpgradeData> {
    enabled = true;

    override visitTemplate(template: ResolvedResource): void {
        applyRelativeTemplateEdits(this, template, collectLoadingDoneEdits(template.content, template.filePath));
    }
}
