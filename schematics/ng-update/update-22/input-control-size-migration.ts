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

/**
 * Components whose old implicit/default size was 36px and whose new default is md (32px).
 * Keep this list explicit because thySize is shared by unrelated components such as avatar.
 */
const SIZE_AFFECTED_ELEMENTS = new Set([
    'thy-button',
    'thy-button-group',
    'thy-button-icon',
    'thy-input',
    'thy-input-group',
    'thy-input-search',
    'thy-input-number',
    'thy-select',
    'thy-custom-select',
    'thy-native-select',
    'thy-tree-select',
    'thy-cascader',
    'thy-date-picker',
    'thy-range-picker',
    'thy-month-picker',
    'thy-quarter-picker',
    'thy-week-picker',
    'thy-year-picker',
    'thy-time-picker'
]);

const SIZE_AFFECTED_DIRECTIVES = new Set(['thyButton', 'thy-button', 'thyButtonIcon', 'thy-button-icon', 'thyInput']);

export class InputControlSizeMigration extends Migration<UpgradeData> {
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
                if (migration.isAffectedElement(element)) {
                    migration.migrateSize(element, template);
                }
                super.visitElement(element);
            }
        }

        tmplAstVisitAll(new Visitor(), parsed.nodes);
    }

    private isAffectedElement(element: TmplAstElement): boolean {
        if (SIZE_AFFECTED_ELEMENTS.has(element.name)) {
            return true;
        }

        return [...element.attributes, ...element.inputs].some(attribute => SIZE_AFFECTED_DIRECTIVES.has(attribute.name));
    }

    private migrateSize(element: TmplAstElement, template: ResolvedResource): void {
        const textSize = element.attributes.find(attribute => attribute.name === 'thySize');
        const boundSize = element.inputs.find(input => input.name === 'thySize');

        if (!textSize && !boundSize) {
            this.addLargeSize(element, template);
        } else if (textSize && (textSize.value === '' || textSize.value === 'default')) {
            this.replaceTextSize(textSize, template);
        } else if (boundSize) {
            this.replaceBoundLiteralSize(boundSize, template);
        }
    }

    private addLargeSize(element: TmplAstElement, template: ResolvedResource): void {
        const openingTag = template.content.slice(element.startSourceSpan.start.offset, element.startSourceSpan.end.offset);
        const closingLength = openingTag.endsWith('/>') ? 2 : 1;
        const insertAt = template.start + element.startSourceSpan.end.offset - closingLength;
        this.fileSystem.edit(template.filePath).insertRight(insertAt, ' thySize="lg"');
    }

    private replaceTextSize(attribute: TmplAstTextAttribute, template: ResolvedResource): void {
        if (attribute.valueSpan) {
            const start = template.start + attribute.valueSpan.start.offset;
            this.fileSystem
                .edit(template.filePath)
                .remove(start, attribute.valueSpan.end.offset - attribute.valueSpan.start.offset)
                .insertRight(start, 'lg');
        } else {
            const insertAt = template.start + attribute.keySpan!.end.offset;
            this.fileSystem.edit(template.filePath).insertRight(insertAt, '="lg"');
        }
    }

    private replaceBoundLiteralSize(attribute: TmplAstBoundAttribute, template: ResolvedResource): void {
        const expression = attribute.value instanceof ASTWithSource ? attribute.value.ast : attribute.value;
        if (!(expression instanceof LiteralPrimitive) || (expression.value !== '' && expression.value !== 'default')) {
            return;
        }

        if (!attribute.valueSpan) {
            return;
        }

        const start = template.start + attribute.valueSpan.start.offset;
        const width = attribute.valueSpan.end.offset - attribute.valueSpan.start.offset;
        this.fileSystem.edit(template.filePath).remove(start, width).insertRight(start, "'lg'");
    }
}
