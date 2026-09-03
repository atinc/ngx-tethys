import { Migration, UpgradeData } from '@angular/cdk/schematics';

interface TemplateResource {
    filePath: string;
    start: number;
    content: string;
}

const THY_DIVIDER_TAG_PATTERN = /<thy-divider\b[^>]*>/g;

export function migrateDividerDeeper(content: string): string {
    return content.replace(THY_DIVIDER_TAG_PATTERN, tag => migrateDividerTag(tag));
}

function migrateDividerTag(tag: string): string {
    if (!/\bthyDeeper\b/.test(tag)) {
        return tag;
    }

    const hasThyColor = /\b(?:\[thyColor\]|thyColor)\b/.test(tag);
    let result = tag.replace(/\s*thyDeeper="false"/g, '').replace(/\s*\[thyDeeper\]="false"/g, '');

    if (hasThyColor) {
        return result
            .replace(/\s*thyDeeper="true"/g, '')
            .replace(/\s*thyDeeper(?=[\s/>])/g, '')
            .replace(/\s*\[thyDeeper\]="[^"]*"/g, '');
    }

    return result
        .replace(/\s*thyDeeper="true"/g, ' thyColor="light"')
        .replace(/\s*thyDeeper(?=[\s/>])/g, ' thyColor="light"')
        .replace(/\s*\[thyDeeper\]="true"/g, ' thyColor="light"')
        .replace(/\s*\[thyDeeper\]="'true'"/g, ` thyColor="light"`)
        .replace(/\s*\[thyDeeper\]="([^"]+)"/g, ` [thyColor]="$1 ? 'light' : 'default'"`);
}

export class DividerDeeperMigration extends Migration<UpgradeData> {
    enabled = true;

    override visitTemplate(template: TemplateResource): void {
        const migratedContent = migrateDividerDeeper(template.content);

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
