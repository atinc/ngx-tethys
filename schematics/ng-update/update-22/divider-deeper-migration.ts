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

export function migrateDividerDeeper(content: string): string {
    return applyEditsInMemory(content, collectDividerDeeperEdits(content));
}

function collectDividerDeeperEdits(content: string): RelativeTemplateEdit[] {
    return collectPatternReplacementEdits(content, THY_DIVIDER_TAG_PATTERN, migrateDividerTag);
}

function migrateDividerColorDefault(tag: string): string {
    return tag
        .replace(/\bthyColor="default"/g, 'thyColor="lighter"')
        .replace(/\[thyColor\]="'default'"/g, `[thyColor]="'lighter'"`)
        .replace(/\[thyColor\]=""default""/g, `[thyColor]="'lighter'"`);
}

function migrateDividerTag(tag: string): string {
    let result = migrateDividerColorDefault(tag);

    if (!/\bthyDeeper\b/.test(result)) {
        return result;
    }

    const hasThyColor = /\b(?:\[thyColor\]|thyColor)\b/.test(result);
    result = result.replace(/\s*thyDeeper="false"/g, '').replace(/\s*\[thyDeeper\]="false"/g, '');

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
        .replace(/\s*\[thyDeeper\]="([^"]+)"/g, ` [thyColor]="$1 ? 'light' : 'lighter'"`);
}

export class DividerDeeperMigration extends Migration<UpgradeData> {
    enabled = true;

    override visitTemplate(template: TemplateResource): void {
        applyRelativeTemplateEdits(this, template, collectDividerDeeperEdits(template.content));
    }
}
