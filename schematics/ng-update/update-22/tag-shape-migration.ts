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

function collectTagShapeEdits(content: string, filePath = 'test.html'): RelativeTemplateEdit[] {
    const parsed = parseTemplate(content, filePath, {
        preserveWhitespaces: true,
        preserveLineEndings: true
    });

    if (parsed.errors?.length) {
        return [];
    }

    const edits: RelativeTemplateEdit[] = [];
    tmplAstVisitAll(new TagShapeVisitor(edits), parsed.nodes);

    return edits;
}

export function migrateTagShape(content: string, filePath = 'test.html'): string {
    return applyEditsInMemory(content, collectTagShapeEdits(content, filePath));
}

class TagShapeVisitor extends TmplAstRecursiveVisitor {
    constructor(private readonly edits: RelativeTemplateEdit[]) {
        super();
    }

    override visitElement(element: TmplAstElement): void {
        if (isTagElement(element)) {
            this.migratePillShape(element);
        }

        super.visitElement(element);
    }

    private migratePillShape(element: TmplAstElement): void {
        for (const attribute of element.attributes) {
            if (attribute.name === 'thyShape' && attribute.value === 'pill') {
                this.replaceTextAttributeValue(attribute, 'ellipse');
            }
        }

        for (const input of element.inputs) {
            if (input.name !== 'thyShape') {
                continue;
            }

            const expression = input.value instanceof ASTWithSource ? input.value.ast : input.value;
            if (expression instanceof LiteralPrimitive && expression.value === 'pill') {
                this.replaceBoundLiteralValue(input, 'ellipse');
            }
        }
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

export class TagShapeMigration extends Migration<UpgradeData> {
    enabled = true;

    override visitTemplate(template: ResolvedResource): void {
        applyRelativeTemplateEdits(this, template, collectTagShapeEdits(template.content, template.filePath));
    }
}
