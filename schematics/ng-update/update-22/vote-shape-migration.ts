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
function isVoteElement(element: TmplAstElement): boolean {
    if (element.name === 'thy-vote') {
        return true;
    }

    return (
        element.attributes.some(attribute => attribute.name === 'thyVote') ||
        element.inputs.some(input => input.name === 'thyVote')
    );
}

function openingTagHasAttribute(element: TmplAstElement, attributeName: string): boolean {
    return (
        element.attributes.some(attribute => attribute.name === attributeName) ||
        element.inputs.some(input => input.name === attributeName)
    );
}

function collectVoteShapeEdits(content: string, filePath = 'test.html'): RelativeTemplateEdit[] {
    const parsed = parseTemplate(content, filePath, {
        preserveWhitespaces: true,
        preserveLineEndings: true
    });

    if (parsed.errors?.length) {
        return [];
    }

    const edits: RelativeTemplateEdit[] = [];
    tmplAstVisitAll(new VoteShapeVisitor(content, edits), parsed.nodes);

    return edits;
}

export function migrateVoteShape(content: string, filePath = 'test.html'): string {
    return applyEditsInMemory(content, collectVoteShapeEdits(content, filePath));
}

class VoteShapeVisitor extends TmplAstRecursiveVisitor {
    constructor(
        private readonly content: string,
        private readonly edits: RelativeTemplateEdit[]
    ) {
        super();
    }

    override visitElement(element: TmplAstElement): void {
        if (isVoteElement(element)) {
            this.migrateRound(element);
        }

        super.visitElement(element);
    }

    private migrateRound(element: TmplAstElement): void {
        const textAttr = element.attributes.find(attribute => attribute.name === 'thyRound');
        const boundAttr = element.inputs.find(input => input.name === 'thyRound');

        if (!textAttr && !boundAttr) {
            return;
        }

        const hasShape = openingTagHasAttribute(element, 'thyShape');

        if (textAttr) {
            this.migrateTextAttribute(textAttr, hasShape);
            return;
        }

        if (boundAttr) {
            this.migrateBoundAttribute(boundAttr, hasShape);
        }
    }

    private migrateTextAttribute(attribute: TmplAstTextAttribute, hasShape: boolean): void {
        const round = attribute.value === '' || attribute.value === 'true';

        if (!round) {
            this.removeSpan(attribute.sourceSpan.start.offset, attribute.sourceSpan.end.offset);
            return;
        }

        if (hasShape) {
            this.removeSpan(attribute.sourceSpan.start.offset, attribute.sourceSpan.end.offset);
        } else {
            this.replaceSpan(attribute.sourceSpan.start.offset, attribute.sourceSpan.end.offset, 'thyShape="ellipse"');
        }
    }

    private migrateBoundAttribute(attribute: TmplAstBoundAttribute, hasShape: boolean): void {
        const expression = attribute.value instanceof ASTWithSource ? attribute.value.ast : attribute.value;

        if (!(expression instanceof LiteralPrimitive) || typeof expression.value !== 'boolean') {
            return;
        }

        if (!expression.value) {
            this.removeSpan(attribute.sourceSpan.start.offset, attribute.sourceSpan.end.offset);
            return;
        }

        if (hasShape) {
            this.removeSpan(attribute.sourceSpan.start.offset, attribute.sourceSpan.end.offset);
        } else {
            this.replaceSpan(attribute.sourceSpan.start.offset, attribute.sourceSpan.end.offset, 'thyShape="ellipse"');
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

export class VoteShapeMigration extends Migration<UpgradeData> {
    enabled = true;

    override visitTemplate(template: ResolvedResource): void {
        applyRelativeTemplateEdits(this, template, collectVoteShapeEdits(template.content, template.filePath));
    }
}
