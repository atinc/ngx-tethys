import { Migration, UpgradeData } from '@angular/cdk/schematics';
import { applyEditsInMemory, applyRelativeTemplateEdits, RelativeTemplateEdit } from '../template-incremental-edits';

interface TemplateResource {
    filePath: string;
    start: number;
    content: string;
}

type AlertWeakColor = 'primary' | 'success' | 'warning' | 'danger';

const ALERT_WEAK_TYPE_MAP: Record<string, AlertWeakColor> = {
    'primary-weak': 'primary',
    'success-weak': 'success',
    'warning-weak': 'warning',
    'danger-weak': 'danger'
};

const TYPE_ATTR_NAMES = ['thyColor', 'thyType'];

const OPEN_TAG_PATTERN = /<[A-Za-z][\w.-]*\b[^>]*?>/g;

interface TypeAttributeMatch {
    attrIndex: number;
    attrSource: string;
    rawType: string;
    bound: boolean;
}

function getOpenTagName(tag: string): string | null {
    const match = tag.match(/^<([^\s/>]+)/);
    return match?.[1] ?? null;
}

function openingTagHasAttribute(openingTag: string, attributeName: string): boolean {
    const escaped = attributeName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return new RegExp(`\\s(?:\\[${escaped}\\]|${escaped})(?:=|\\]|\\s|>)`).test(openingTag);
}

export function isAlertAppearanceTarget(tag: string): boolean {
    return getOpenTagName(tag) === 'thy-alert';
}

export function collectAlertAppearanceEdits(content: string): RelativeTemplateEdit[] {
    const edits: RelativeTemplateEdit[] = [];
    const regex = new RegExp(OPEN_TAG_PATTERN.source, OPEN_TAG_PATTERN.flags);
    let match: RegExpExecArray | null;

    while ((match = regex.exec(content)) !== null) {
        edits.push(...collectOpenTagEdits(match[0], match.index));
    }

    return edits;
}

export function migrateAlertAppearance(content: string): string {
    return applyEditsInMemory(content, collectAlertAppearanceEdits(content));
}

function collectOpenTagEdits(tag: string, tagOffset: number): RelativeTemplateEdit[] {
    if (!isAlertAppearanceTarget(tag)) {
        return [];
    }

    const typeAttribute = collectTypeAttribute(tag);
    if (!typeAttribute) {
        return [];
    }

    const mappedColor = ALERT_WEAK_TYPE_MAP[typeAttribute.rawType];
    if (!mappedColor) {
        return [];
    }

    const leadingSpace = typeAttribute.attrSource.startsWith(' ') ? ' ' : '';
    const appearanceSuffix =
        !openingTagHasAttribute(tag, 'thyAppearance') ? ` thyAppearance="bordered"` : '';
    const colorAttr = typeAttribute.bound ? `[thyColor]="'${mappedColor}'"` : `thyColor="${mappedColor}"`;

    return [
        {
            start: tagOffset + typeAttribute.attrIndex,
            remove: typeAttribute.attrSource.length,
            insert: `${leadingSpace}${colorAttr}${appearanceSuffix}`
        }
    ];
}

function collectTypeAttribute(tag: string): TypeAttributeMatch | null {
    for (const attrName of TYPE_ATTR_NAMES) {
        const textPattern = new RegExp(`\\s${attrName}="([^"]+)"`);
        const textMatch = textPattern.exec(tag);
        if (textMatch && textMatch.index !== undefined) {
            return {
                attrIndex: textMatch.index,
                attrSource: textMatch[0],
                rawType: textMatch[1],
                bound: false
            };
        }

        const boundPattern = new RegExp(`\\s\\[${attrName}\\]="'([^']+)'"`);
        const boundMatch = boundPattern.exec(tag);
        if (boundMatch && boundMatch.index !== undefined) {
            return {
                attrIndex: boundMatch.index,
                attrSource: boundMatch[0],
                rawType: boundMatch[1],
                bound: true
            };
        }
    }

    return null;
}

export class AlertAppearanceMigration extends Migration<UpgradeData> {
    enabled = true;

    override visitTemplate(template: TemplateResource): void {
        applyRelativeTemplateEdits(this, template, collectAlertAppearanceEdits(template.content));
    }
}
