import { Migration, ResolvedResource, UpgradeData } from '@angular/cdk/schematics';
import { parseTemplate, TmplAstElement, TmplAstRecursiveVisitor, tmplAstVisitAll } from '@angular/compiler';

const DEPRECATED_INPUTS = ['thyIsDot', 'thyIsHollow'];

function isBadgeElement(element: TmplAstElement): boolean {
    if (element.name === 'thy-badge') {
        return true;
    }

    return (
        element.attributes.some(attribute => attribute.name === 'thyBadge') ||
        element.inputs.some(input => input.name === 'thyBadge')
    );
}

export class BadgeDotHollowMigration extends Migration<UpgradeData> {
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
                if (isBadgeElement(element)) {
                    migration.removeDeprecatedInputs(element, template);
                }
                super.visitElement(element);
            }
        }

        tmplAstVisitAll(new Visitor(), parsed.nodes);
    }

    private removeDeprecatedInputs(element: TmplAstElement, template: ResolvedResource): void {
        const spans: Array<{ start: number; width: number }> = [];

        for (const inputName of DEPRECATED_INPUTS) {
            const textAttr = element.attributes.find(attribute => attribute.name === inputName);
            if (textAttr) {
                spans.push({
                    start: template.start + textAttr.sourceSpan.start.offset,
                    width: textAttr.sourceSpan.end.offset - textAttr.sourceSpan.start.offset
                });
            }

            const boundAttr = element.inputs.find(input => input.name === inputName);
            if (boundAttr) {
                spans.push({
                    start: template.start + boundAttr.sourceSpan.start.offset,
                    width: boundAttr.sourceSpan.end.offset - boundAttr.sourceSpan.start.offset
                });
            }
        }

        spans.sort((a, b) => b.start - a.start);

        for (const span of spans) {
            let start = span.start;
            let width = span.width;
            const relativeStart = start - template.start;

            if (relativeStart > 0 && /\s/.test(template.content[relativeStart - 1])) {
                start -= 1;
                width += 1;
            }

            this.fileSystem.edit(template.filePath).remove(start, width);
        }
    }
}
