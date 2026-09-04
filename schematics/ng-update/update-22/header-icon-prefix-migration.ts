import { Migration, ResolvedResource, UpgradeData } from '@angular/cdk/schematics';
import {
    parseTemplate,
    TmplAstBoundAttribute,
    TmplAstElement,
    TmplAstRecursiveVisitor,
    TmplAstTextAttribute,
    tmplAstVisitAll
} from '@angular/compiler';

export class HeaderIconPrefixMigration extends Migration<UpgradeData> {
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
                if (element.name === 'thy-header') {
                    migration.migrateIconPrefix(element, template);
                }
                super.visitElement(element);
            }
        }

        tmplAstVisitAll(new Visitor(), parsed.nodes);
    }

    private migrateIconPrefix(element: TmplAstElement, template: ResolvedResource): void {
        const textAttr = element.attributes.find(attribute => attribute.name === 'thyIconPrefix');
        const boundAttr = element.inputs.find(input => input.name === 'thyIconPrefix');

        if (textAttr) {
            this.warnIfWtfIcon(element, template);
            this.removeAttribute(textAttr, template);
        } else if (boundAttr) {
            this.warnIfWtfIcon(element, template);
            this.removeBoundAttribute(boundAttr, template);
        }
    }

    private warnIfWtfIcon(element: TmplAstElement, template: ResolvedResource): void {
        const iconTextAttr = element.attributes.find(attribute => attribute.name === 'thyIcon');
        const iconBoundAttr = element.inputs.find(input => input.name === 'thyIcon');

        const iconValue = iconTextAttr?.value ?? '';
        const hasWtfIcon =
            iconValue.includes('wtf') ||
            (iconBoundAttr?.valueSpan &&
                template.content.slice(iconBoundAttr.valueSpan.start.offset, iconBoundAttr.valueSpan.end.offset).includes('wtf'));

        if (hasWtfIcon) {
            this.logger.warn(
                `thy-header 已移除 thyIconPrefix 和字体图标支持，请将 ${template.filePath} 中的 thyIcon 替换为 SVG 图标名称。`
            );
        }
    }

    private removeAttribute(attribute: TmplAstTextAttribute, template: ResolvedResource): void {
        const start = template.start + attribute.sourceSpan.start.offset;
        const width = attribute.sourceSpan.end.offset - attribute.sourceSpan.start.offset;
        this.fileSystem.edit(template.filePath).remove(start, width);
    }

    private removeBoundAttribute(attribute: TmplAstBoundAttribute, template: ResolvedResource): void {
        const start = template.start + attribute.sourceSpan.start.offset;
        const width = attribute.sourceSpan.end.offset - attribute.sourceSpan.start.offset;
        this.fileSystem.edit(template.filePath).remove(start, width);
    }
}
