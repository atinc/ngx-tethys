import { Migration, UpgradeData } from '@angular/cdk/schematics';
import {
    applyEditsInMemory,
    applyRelativeTemplateEdits,
    RelativeTemplateEdit
} from '../template-incremental-edits';

interface TemplateResource {
    filePath: string;
    start: number;
    content: string;
}

const MENU_TAG_PATTERN = /<(?:thy-menu|[\w-]*thyMenu[\w-]*)\b[^>]*>/g;
const LEGACY_VARIANT_VALUES = new Set(['compact', 'loose']);

function getOpenTagName(tag: string): string | null {
    const match = tag.match(/^<([^\s/>]+)/);
    return match?.[1] ?? null;
}

function isMenuTarget(tag: string): boolean {
    const tagName = getOpenTagName(tag)?.toLowerCase();
    return tagName === 'thy-menu' || /\bthyMenu\b/.test(tag);
}

function openingTagHasAttribute(openingTag: string, attributeName: string): boolean {
    const escaped = attributeName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return new RegExp(`\\s(?:\\[${escaped}\\]|${escaped})(?:=|\\]|\\s|>)`).test(openingTag);
}

export function migrateMenuTheme(content: string): string {
    return applyEditsInMemory(content, collectMenuThemeEdits(content));
}

export function collectMenuThemeEdits(content: string): RelativeTemplateEdit[] {
    const edits: RelativeTemplateEdit[] = [];
    const regex = new RegExp(MENU_TAG_PATTERN.source, MENU_TAG_PATTERN.flags);
    let match: RegExpExecArray | null;

    while ((match = regex.exec(content)) !== null) {
        edits.push(...collectMenuTagEdits(match[0], match.index));
    }

    return edits;
}

function collectMenuTagEdits(tag: string, tagOffset: number): RelativeTemplateEdit[] {
    if (!isMenuTarget(tag)) {
        return [];
    }

    const edits: RelativeTemplateEdit[] = [];

    edits.push(...collectLegacyTextThemeEdits(tag, tagOffset));
    edits.push(...collectLegacyBoundThemeEdits(tag, tagOffset));

    return edits;
}

function collectLegacyTextThemeEdits(tag: string, tagOffset: number): RelativeTemplateEdit[] {
    const edits: RelativeTemplateEdit[] = [];
    const pattern = /\sthyTheme="(compact|loose|dark)"/g;
    let match: RegExpExecArray | null;

    while ((match = pattern.exec(tag)) !== null) {
        if (match.index === undefined) {
            continue;
        }

        const value = match[1];
        const replacement = createLegacyThemeReplacement(tag, value, false);

        if (replacement === null) {
            edits.push({ start: tagOffset + match.index, remove: match[0].length, insert: '' });
        } else {
            edits.push({ start: tagOffset + match.index, remove: match[0].length, insert: ` ${replacement}` });
        }
    }

    return edits;
}

function collectLegacyBoundThemeEdits(tag: string, tagOffset: number): RelativeTemplateEdit[] {
    const edits: RelativeTemplateEdit[] = [];
    const pattern = /\s\[thyTheme\]="'([^']+)'"/g;
    let match: RegExpExecArray | null;

    while ((match = pattern.exec(tag)) !== null) {
        if (match.index === undefined) {
            continue;
        }

        const value = match[1];
        if (!LEGACY_VARIANT_VALUES.has(value) && value !== 'dark') {
            continue;
        }

        const replacement = createLegacyThemeReplacement(tag, value, true);
        if (replacement === null) {
            edits.push({ start: tagOffset + match.index, remove: match[0].length, insert: '' });
        } else {
            edits.push({ start: tagOffset + match.index, remove: match[0].length, insert: ` ${replacement}` });
        }
    }

    return edits;
}

function createLegacyThemeReplacement(tag: string, value: string, bound: boolean): string | null {
    if (value === 'compact') {
        return null;
    }

    if (value === 'loose') {
        if (openingTagHasAttribute(tag, 'thyVariant')) {
            return null;
        }

        return bound ? `[thyVariant]="'loose'"` : `thyVariant="loose"`;
    }

    if (value === 'dark') {
        return bound ? `[thyTheme]="'dark'"` : `thyTheme="dark"`;
    }

    return null;
}

export class MenuThemeMigration extends Migration<UpgradeData> {
    enabled = true;

    override visitTemplate(template: TemplateResource): void {
        applyRelativeTemplateEdits(this, template, collectMenuThemeEdits(template.content));
    }
}
