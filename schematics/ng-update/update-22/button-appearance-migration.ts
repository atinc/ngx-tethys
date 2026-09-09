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

interface CompoundButtonType {
    appearance: 'outline' | 'link' | 'fill';
    type: string;
}

/**
 * 旧复合 `thyButton`/`thyType` → 新 `thyAppearance` + 颜色 type。
 * `*-square` 与对应颜色视觉一致，统一去掉后缀。
 * `link-danger-weak` 不属于 Button 色板，迁移为 CSS `link-danger-weak`（见 CHANGELOG）。
 */
const COMPOUND_BUTTON_TYPES: Record<string, CompoundButtonType> = {
    secondary: { appearance: 'fill', type: 'primary' },
    'outline-primary': { appearance: 'outline', type: 'primary' },
    'outline-default': { appearance: 'outline', type: 'default' },
    'outline-info': { appearance: 'outline', type: 'info' },
    'outline-warning': { appearance: 'outline', type: 'warning' },
    'outline-danger': { appearance: 'outline', type: 'danger' },
    'outline-success': { appearance: 'outline', type: 'success' },
    link: { appearance: 'link', type: 'primary' },
    'link-secondary': { appearance: 'link', type: 'default' },
    'link-info': { appearance: 'link', type: 'info' },
    'link-warning': { appearance: 'link', type: 'warning' },
    'link-danger': { appearance: 'link', type: 'danger' },
    'link-success': { appearance: 'link', type: 'success' }
};

const PLAIN_BUTTON_TYPES = new Set(['primary', 'default', 'info', 'warning', 'danger', 'success']);

const TYPE_ATTR_NAMES = ['thyButton', 'thy-button', 'thyType'];

const OPEN_TAG_PATTERN = /<[A-Za-z][\w.-]*\b[^>]*?>/g;

const LINK_DANGER_WEAK_TEXT_PATTERNS = [
    /\s*thyButton="link-danger-weak"/g,
    /\s*thyType="link-danger-weak"/g,
    /\s*thy-button="link-danger-weak"/g
];

const LINK_DANGER_WEAK_BOUND_PATTERNS = [
    /\s*\[thyButton\]="'link-danger-weak'"/g,
    /\s*\[thyType\]="'link-danger-weak'"/g,
    /\s*\[thy-button\]="'link-danger-weak'"/g
];

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
    'thy-icon'
]);

interface TypeAttributeMatch {
    attrIndex: number;
    attrSource: string;
    attrName: string;
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

export function collectButtonAppearanceEdits(content: string): RelativeTemplateEdit[] {
    const edits: RelativeTemplateEdit[] = [];
    const regex = new RegExp(OPEN_TAG_PATTERN.source, OPEN_TAG_PATTERN.flags);
    let match: RegExpExecArray | null;

    while ((match = regex.exec(content)) !== null) {
        edits.push(...collectOpenTagEdits(match[0], match.index));
    }

    return edits;
}

export function migrateButtonAppearance(content: string): string {
    return applyEditsInMemory(content, collectButtonAppearanceEdits(content));
}

function collectOpenTagEdits(tag: string, tagOffset: number): RelativeTemplateEdit[] {
    if (!isButtonAppearanceTarget(tag)) {
        return [];
    }

    if (/\bthyButton="link-danger-weak"/.test(tag) || /\bthyType="link-danger-weak"/.test(tag)) {
        return collectLinkDangerWeakTextEdits(tag, tagOffset);
    }

    if (/\[[\w-]*\]="'link-danger-weak'"/.test(tag)) {
        return collectLinkDangerWeakBoundEdits(tag, tagOffset);
    }

    const typeAttributes = collectTypeAttributes(tag);
    const compoundAttributes = typeAttributes.filter(attribute => resolveButtonType(attribute.rawType));

    if (!compoundAttributes.length) {
        return [];
    }

    const [primaryAttribute, ...redundantAttributes] = compoundAttributes;
    const mapped = resolveButtonType(primaryAttribute.rawType)!;
    const edits: RelativeTemplateEdit[] = [];

    edits.push(...createCompoundAttributeReplacement(tagOffset, primaryAttribute, mapped));

    for (const redundantAttribute of redundantAttributes) {
        edits.push({
            start: tagOffset + redundantAttribute.attrIndex,
            remove: redundantAttribute.attrSource.length,
            insert: ''
        });
    }

    if (mapped.appearance !== 'fill' && !openingTagHasAttribute(tag, 'thyAppearance')) {
        edits.push({
            start: tagOffset + primaryAttribute.attrIndex + primaryAttribute.attrSource.length,
            remove: 0,
            insert: ` thyAppearance="${mapped.appearance}"`
        });
    }

    return edits;
}

function collectTypeAttributes(tag: string): TypeAttributeMatch[] {
    const matches: TypeAttributeMatch[] = [];

    for (const attrName of TYPE_ATTR_NAMES) {
        const textPattern = new RegExp(`\\s${attrName}="([^"]+)"`, 'g');
        let textMatch: RegExpExecArray | null;

        while ((textMatch = textPattern.exec(tag)) !== null) {
            if (textMatch.index !== undefined) {
                matches.push({
                    attrIndex: textMatch.index,
                    attrSource: textMatch[0],
                    attrName,
                    rawType: textMatch[1],
                    bound: false
                });
            }
        }

        const boundPattern = new RegExp(`\\s\\[${attrName}\\]="'([^']+)'"`, 'g');
        let boundMatch: RegExpExecArray | null;

        while ((boundMatch = boundPattern.exec(tag)) !== null) {
            if (boundMatch.index !== undefined) {
                matches.push({
                    attrIndex: boundMatch.index,
                    attrSource: boundMatch[0],
                    attrName,
                    rawType: boundMatch[1],
                    bound: true
                });
            }
        }
    }

    return matches.sort((left, right) => left.attrIndex - right.attrIndex);
}

function createCompoundAttributeReplacement(
    tagOffset: number,
    attribute: TypeAttributeMatch,
    mapped: CompoundButtonType
): RelativeTemplateEdit[] {
    const typeAttr = attribute.bound
        ? `[${attribute.attrName}]="'${mapped.type}'"`
        : `${attribute.attrName}="${mapped.type}"`;
    const leadingSpace = attribute.attrSource.startsWith(' ') ? ' ' : '';

    return [
        {
            start: tagOffset + attribute.attrIndex,
            remove: attribute.attrSource.length,
            insert: `${leadingSpace}${typeAttr}`
        }
    ];
}

function collectLinkDangerWeakTextEdits(tag: string, tagOffset: number): RelativeTemplateEdit[] {
    const edits: RelativeTemplateEdit[] = [];

    for (const pattern of LINK_DANGER_WEAK_TEXT_PATTERNS) {
        const regex = new RegExp(pattern.source, pattern.flags);
        const match = regex.exec(tag);

        if (match && match.index !== undefined) {
            edits.push({ start: tagOffset + match.index, remove: match[0].length, insert: '' });
        }
    }

    return [...edits, ...collectLinkDangerWeakClassEdits(tag, tagOffset)];
}

function collectLinkDangerWeakBoundEdits(tag: string, tagOffset: number): RelativeTemplateEdit[] {
    const edits: RelativeTemplateEdit[] = [];

    for (const pattern of LINK_DANGER_WEAK_BOUND_PATTERNS) {
        const regex = new RegExp(pattern.source, pattern.flags);
        const match = regex.exec(tag);

        if (match && match.index !== undefined) {
            edits.push({ start: tagOffset + match.index, remove: match[0].length, insert: '' });
        }
    }

    return [...edits, ...collectLinkDangerWeakClassEdits(tag, tagOffset)];
}

function collectLinkDangerWeakClassEdits(tag: string, tagOffset: number): RelativeTemplateEdit[] {
    const classMatch = tag.match(/\bclass="([^"]*)"/);

    if (classMatch && classMatch.index !== undefined) {
        const classes = classMatch[1];

        if (classes.includes('link-danger-weak')) {
            return [];
        }

        const valueStart = classMatch.index + 'class="'.length;

        return [
            {
                start: tagOffset + valueStart,
                remove: classes.length,
                insert: `${classes} link-danger-weak`.trim()
            }
        ];
    }

    const tagNameMatch = tag.match(/^(<[^\s/>]+)/);

    if (!tagNameMatch) {
        return [];
    }

    return [
        {
            start: tagOffset + tagNameMatch[1].length,
            remove: 0,
            insert: ' class="link-danger-weak"'
        }
    ];
}

/** 去掉无视觉差异的 `-square`，再解析 outline/link 复合 type */
export function resolveButtonType(rawType: string): CompoundButtonType | null {
    const withoutSquare = rawType.endsWith('-square') ? rawType.slice(0, -'-square'.length) : rawType;

    if (COMPOUND_BUTTON_TYPES[withoutSquare]) {
        return COMPOUND_BUTTON_TYPES[withoutSquare];
    }

    if (PLAIN_BUTTON_TYPES.has(withoutSquare) && withoutSquare !== rawType) {
        return { appearance: 'fill', type: withoutSquare };
    }

    return null;
}

export class ButtonAppearanceMigration extends Migration<UpgradeData> {
    enabled = true;

    override visitTemplate(template: TemplateResource): void {
        applyRelativeTemplateEdits(this, template, collectButtonAppearanceEdits(template.content));
    }
}
