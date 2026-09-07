import { Migration, UpgradeData } from '@angular/cdk/schematics';
import {
    applyEditsInMemory,
    applyRelativeTemplateEdits,
    collectPatternReplacementEdits,
    RelativeTemplateEdit
} from '../template-incremental-edits';

interface TemplateResource {
    filePath: string;
    start: number;
    content: string;
}

const THY_DIVIDER_TAG_PATTERN = /<thy-divider\b[^>]*>/g;

export function collectDividerDeeperEdits(content: string): RelativeTemplateEdit[] {
    return collectPatternReplacementEdits(content, THY_DIVIDER_TAG_PATTERN, migrateDividerTag);
}

export function migrateDividerDeeper(content: string): string {
    return applyEditsInMemory(content, collectDividerDeeperEdits(content));
}

function migrateDividerColorDeeper(tag: string): string {
    return tag
        .replace(/\sthyColor="deeper"/g, ' thyColor="light"')
        .replace(/\s\[thyColor\]="'deeper'"/g, ` [thyColor]="'light'"`);
}

function migrateDividerTag(tag: string): string {
    const tagWithColor = migrateDividerColorDeeper(tag);

    if (!/\bthyDeeper\b/.test(tagWithColor)) {
        return tagWithColor;
    }

    const hasThyColor = /\b(?:\[thyColor\]|thyColor)\b/.test(tagWithColor);
    let result = tagWithColor.replace(/\s*thyDeeper="false"/g, '').replace(/\s*\[thyDeeper\]="false"/g, '');

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
        applyRelativeTemplateEdits(this, template, collectDividerDeeperEdits(template.content));
    }
}
