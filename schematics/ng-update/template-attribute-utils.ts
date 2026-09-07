import { TmplAstElement } from '@angular/compiler';
import { RelativeTemplateEdit } from './template-incremental-edits';

const OPEN_TAG_PATTERN = /<[A-Za-z][\w.-]*\b[^>]*?>/g;

const BUTTON_APPEARANCE_EXCLUDED_ELEMENTS = new Set([
    'thy-badge',
    'thy-tag',
    'thy-action',
    'thy-alert',
    'thy-dot',
    'thy-progress',
    'thy-table-column',
    'thy-dropdown-menu-item',
    'thy-icon-nav',
    'thy-nav',
    'thy-table',
    'thy-menu-item',
    'thy-switch',
    'thy-pagination',
    'thy-empty',
    'thy-collapse',
    'thy-sidebar',
    'thy-menu',
    'thy-divider',
    'thy-icon',
    'thy-dot'
]);

const DEDUPE_ATTRIBUTE_NAMES = ['thySize', 'thyAppearance', 'thyType', 'thyButton', 'thy-button'];

export function getOpenTagName(tag: string): string | null {
    const match = tag.match(/^<([^\s/>]+)/);
    return match?.[1] ?? null;
}

export function openingTagHasAttribute(openingTag: string, attributeName: string): boolean {
    const escaped = attributeName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return new RegExp(`\\s(?:\\[${escaped}\\]|${escaped})(?:=|\\]|\\s|>)`).test(openingTag);
}

export function elementHasAttribute(element: TmplAstElement, attributeName: string): boolean {
    return (
        element.attributes.some(attribute => attribute.name === attributeName) ||
        element.inputs.some(input => input.name === attributeName)
    );
}

export function isButtonAppearanceTarget(tag: string): boolean {
    if (/\bthy-button-group\b|\bthyButtonGroup\b|\bthy-button-icon\b|\bthyButtonIcon\b/.test(tag)) {
        return false;
    }

    const tagName = getOpenTagName(tag);
    if (tagName && BUTTON_APPEARANCE_EXCLUDED_ELEMENTS.has(tagName)) {
        return false;
    }

    if (/\bthyAction\b/.test(tag) && !/\b(?:\[?thyButton\]?|\[?thy-button\]?)\b/.test(tag)) {
        return false;
    }

    if (/\b(?:\[?thyButton\]?|\[?thy-button\]?)\b/.test(tag)) {
        return true;
    }

    if ((tagName === 'button' || tagName === 'thy-button') && /\b(?:\[?thyType\]?)\b/.test(tag)) {
        return true;
    }

    return false;
}

export function collectDuplicateAttributeDedupeEdits(content: string): RelativeTemplateEdit[] {
    const edits: RelativeTemplateEdit[] = [];
    const regex = new RegExp(OPEN_TAG_PATTERN.source, OPEN_TAG_PATTERN.flags);
    let match: RegExpExecArray | null;

    while ((match = regex.exec(content)) !== null) {
        const dedupedTag = dedupeOpenTagAttributes(match[0]);
        if (dedupedTag !== match[0]) {
            edits.push({
                start: match.index,
                remove: match[0].length,
                insert: dedupedTag
            });
        }
    }

    return edits;
}

export function dedupeOpenTagAttributes(tag: string): string {
    let result = tag;

    for (const attributeName of DEDUPE_ATTRIBUTE_NAMES) {
        result = dedupeAttributeOccurrences(result, attributeName);
    }

    return result;
}

function dedupeAttributeOccurrences(tag: string, attributeName: string): string {
    const escaped = attributeName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const patterns = [
        new RegExp(`(\\s)(${escaped})="([^"]*)"`, 'g'),
        new RegExp(`(\\s)\\[(${escaped})\\]="([^"]*)"`, 'g'),
        new RegExp(`(\\s)\\[(${escaped})\\]=('[^']*')`, 'g')
    ];

    const seen = new Set<string>();
    let result = tag;

    for (const pattern of patterns) {
        result = result.replace(pattern, (full, leadingSpace: string, name: string, value: string) => {
            const key = `${name}=${value}`;
            if (seen.has(key)) {
                return '';
            }
            seen.add(key);
            return full;
        });
    }

    return result;
}
