import { Migration, UpgradeData } from '@angular/cdk/schematics';

interface TemplateResource {
    filePath: string;
    start: number;
    content: string;
}

const TAG_WEAK_FILL_REPLACEMENTS: Array<[RegExp, string]> = [
    [/thyAppearance="weak-fill"/g, 'thyAppearance="subtle"'],
    [/thyTheme="weak-fill"/g, 'thyAppearance="subtle"'],
    [/\[thyAppearance\]="'weak-fill'"/g, `[thyAppearance]="'subtle'"`],
    [/\[thyTheme\]="'weak-fill'"/g, `[thyAppearance]="'subtle'"`]
];

export function migrateTagWeakFill(content: string): string {
    return TAG_WEAK_FILL_REPLACEMENTS.reduce(
        (result, [pattern, replacement]) => result.replace(pattern, replacement),
        content
    );
}

export class TagAppearanceMigration extends Migration<UpgradeData> {
    enabled = true;

    override visitTemplate(template: TemplateResource): void {
        const migratedContent = migrateTagWeakFill(template.content);

        if (migratedContent === template.content) {
            return;
        }

        const filePath = this.fileSystem.resolve(template.filePath);
        this.fileSystem
            .edit(filePath)
            .remove(template.start, template.content.length)
            .insertRight(template.start, migratedContent);
    }
}
