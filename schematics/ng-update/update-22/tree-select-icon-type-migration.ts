import { Migration, ResolvedResource, UpgradeData } from '@angular/cdk/schematics';
import {
    parseTemplate,
    TmplAstBoundAttribute,
    TmplAstElement,
    TmplAstRecursiveVisitor,
    TmplAstTextAttribute,
    tmplAstVisitAll
} from '@angular/compiler';

export class TreeSelectIconTypeMigration extends Migration<UpgradeData> {
    enabled = true;

    override visitTemplate(template: ResolvedResource): void {
        const parsed = parseTemplate(template.content, template.filePath, {
            preserveWhitespaces: true,
            preserveLineEndings: true
        });

        if (parsed.errors?.length) {
            return;
        }

        const migration = this;
        class Visitor extends TmplAstRecursiveVisitor {
            override visitElement(element: TmplAstElement): void {
                if (element.name === 'thy-tree-select') {
                    migration.removeIconType(element, template);
                }
                super.visitElement(element);
            }
        }

        tmplAstVisitAll(new Visitor(), parsed.nodes);
    }

    private removeIconType(element: TmplAstElement, template: ResolvedResource): void {
        const attributes = [
            element.attributes.find(attribute => attribute.name === 'thyIconType'),
            element.inputs.find(input => input.name === 'thyIconType')
        ].filter((attribute): attribute is TmplAstTextAttribute | TmplAstBoundAttribute => !!attribute);

        const sorted = [...attributes].sort(
            (left, right) => right.sourceSpan.start.offset - left.sourceSpan.start.offset
        );

        for (const attribute of sorted) {
            const start = template.start + attribute.sourceSpan.start.offset;
            const width = attribute.sourceSpan.end.offset - attribute.sourceSpan.start.offset;
            this.fileSystem.edit(template.filePath).remove(start, width);
        }
    }
}
