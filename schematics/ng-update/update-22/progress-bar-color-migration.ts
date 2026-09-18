import { Migration, ResolvedResource, UpgradeData } from '@angular/cdk/schematics';
import {
    parseTemplate,
    ParseSourceSpan,
    TmplAstBoundAttribute,
    TmplAstElement,
    TmplAstRecursiveVisitor,
    TmplAstTextAttribute,
    tmplAstVisitAll
} from '@angular/compiler';
import { applyEditsInMemory, applyRelativeTemplateEdits, RelativeTemplateEdit } from '../template-incremental-edits';

function collectProgressBarColorEdits(content: string, filePath = 'test.html'): RelativeTemplateEdit[] {
    const parsed = parseTemplate(content, filePath, {
        preserveWhitespaces: true,
        preserveLineEndings: true
    });

    if (parsed.errors?.length) {
        return [];
    }

    const edits: RelativeTemplateEdit[] = [];
    tmplAstVisitAll(new ProgressBarColorVisitor(content, edits), parsed.nodes);
    return edits;
}

export function migrateProgressBarColor(content: string, filePath = 'test.html'): string {
    return applyEditsInMemory(content, collectProgressBarColorEdits(content, filePath));
}

class ProgressBarColorVisitor extends TmplAstRecursiveVisitor {
    constructor(
        private readonly content: string,
        private readonly edits: RelativeTemplateEdit[]
    ) {
        super();
    }

    override visitElement(element: TmplAstElement): void {
        if (element.name === 'thy-progress-bar') {
            this.migrateElement(element);
        }

        super.visitElement(element);
    }

    private migrateElement(element: TmplAstElement): void {
        const typeAttrs = [
            ...element.attributes.filter(attribute => attribute.name === 'thyType'),
            ...element.inputs.filter(input => input.name === 'thyType')
        ];

        if (!typeAttrs.length) {
            return;
        }

        const hasColor =
            element.attributes.some(attribute => attribute.name === 'thyColor') ||
            element.inputs.some(input => input.name === 'thyColor');

        for (const attribute of typeAttrs) {
            if (hasColor) {
                this.removeAttribute(attribute);
            } else {
                this.renameTypeToColor(attribute);
            }
        }
    }

    private renameTypeToColor(attribute: TmplAstTextAttribute | TmplAstBoundAttribute): void {
        const keySpan = attribute.keySpan as ParseSourceSpan | undefined;
        if (keySpan) {
            this.edits.push({
                start: keySpan.start.offset,
                remove: keySpan.end.offset - keySpan.start.offset,
                insert: 'thyColor'
            });
            return;
        }

        const start = attribute.sourceSpan.start.offset;
        const raw = this.content.slice(start, attribute.sourceSpan.end.offset);
        const index = raw.indexOf('thyType');
        if (index < 0) {
            return;
        }

        this.edits.push({
            start: start + index,
            remove: 'thyType'.length,
            insert: 'thyColor'
        });
    }

    private removeAttribute(attribute: TmplAstTextAttribute | TmplAstBoundAttribute): void {
        let start = attribute.sourceSpan.start.offset;
        let remove = attribute.sourceSpan.end.offset - attribute.sourceSpan.start.offset;

        if (start > 0 && /\s/.test(this.content[start - 1])) {
            start -= 1;
            remove += 1;
        }

        this.edits.push({ start, remove, insert: '' });
    }
}

export class ProgressBarColorMigration extends Migration<UpgradeData> {
    enabled = true;

    override visitTemplate(template: ResolvedResource): void {
        applyRelativeTemplateEdits(this, template, collectProgressBarColorEdits(template.content, template.filePath));
    }
}
