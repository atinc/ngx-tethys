import { Migration, UpgradeData } from '@angular/cdk/schematics';
import { applyRelativeTemplateEdits } from '../template-incremental-edits';
import { collectDuplicateAttributeDedupeEdits } from '../template-attribute-utils';

interface TemplateResource {
    filePath: string;
    start: number;
    content: string;
}

/**
 * Removes duplicate identical attributes on the same opening tag.
 * This is a safety net for idempotent re-runs and overlapping migration rules.
 */
export class TemplateDuplicateAttributeMigration extends Migration<UpgradeData> {
    enabled = true;

    override visitTemplate(template: TemplateResource): void {
        applyRelativeTemplateEdits(this, template, collectDuplicateAttributeDedupeEdits(template.content));
    }
}
