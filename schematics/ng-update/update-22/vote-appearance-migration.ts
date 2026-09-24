import { Migration, UpgradeData } from '@angular/cdk/schematics';
import { applyEditsInMemory, applyRelativeTemplateEdits, RelativeTemplateEdit } from '../template-incremental-edits';

interface TemplateResource {
    filePath: string;
    start: number;
    content: string;
}

interface VoteTypeMapping {
    color: 'primary' | 'success';
    appearance: 'fill' | 'subtle';
}

const VOTE_TYPE_MAP: Record<string, VoteTypeMapping> = {
    primary: { color: 'primary', appearance: 'fill' },
    success: { color: 'success', appearance: 'fill' },
    'primary-weak': { color: 'primary', appearance: 'subtle' },
    'success-weak': { color: 'success', appearance: 'subtle' }
};

const OPEN_TAG_PATTERN = /<[A-Za-z][\w.-]*\b[^>]*?>/g;

interface VoteAttributeMatch {
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

export function isVoteAppearanceTarget(tag: string): boolean {
    const tagName = getOpenTagName(tag);
    if (tagName === 'thy-vote') {
        return true;
    }

    return /\b(?:\[?thyVote\]?)\b/.test(tag);
}

export function collectVoteAppearanceEdits(content: string): RelativeTemplateEdit[] {
    const edits: RelativeTemplateEdit[] = [];
    const regex = new RegExp(OPEN_TAG_PATTERN.source, OPEN_TAG_PATTERN.flags);
    let match: RegExpExecArray | null;

    while ((match = regex.exec(content)) !== null) {
        edits.push(...collectOpenTagEdits(match[0], match.index));
    }

    return edits;
}

export function migrateVoteAppearance(content: string): string {
    return applyEditsInMemory(content, collectVoteAppearanceEdits(content));
}

function collectOpenTagEdits(tag: string, tagOffset: number): RelativeTemplateEdit[] {
    if (!isVoteAppearanceTarget(tag)) {
        return [];
    }

    const voteAttribute = collectVoteAttribute(tag);
    if (!voteAttribute) {
        return [];
    }

    const mapped = VOTE_TYPE_MAP[voteAttribute.rawType];
    if (!mapped) {
        return [];
    }

    const tagName = getOpenTagName(tag);
    const isComponent = tagName === 'thy-vote';
    const leadingSpace = voteAttribute.attrSource.startsWith(' ') ? ' ' : '';
    const colorAttr = voteAttribute.bound ? `[thyColor]="'${mapped.color}'"` : `thyColor="${mapped.color}"`;
    const appearanceSuffix =
        mapped.appearance !== 'fill' && !openingTagHasAttribute(tag, 'thyAppearance')
            ? ` thyAppearance="${mapped.appearance}"`
            : '';

    // Component: replace thyVote input with thyColor (+ thyAppearance when needed)
    // Directive: keep bare thyVote selector and add thyColor (+ thyAppearance)
    const insert = isComponent
        ? `${leadingSpace}${colorAttr}${appearanceSuffix}`
        : `${leadingSpace}thyVote ${colorAttr}${appearanceSuffix}`;

    return [
        {
            start: tagOffset + voteAttribute.attrIndex,
            remove: voteAttribute.attrSource.length,
            insert
        }
    ];
}

function collectVoteAttribute(tag: string): VoteAttributeMatch | null {
    const textPattern = /\sthyVote="([^"]+)"/;
    const textMatch = textPattern.exec(tag);
    if (textMatch && textMatch.index !== undefined) {
        return {
            attrIndex: textMatch.index,
            attrSource: textMatch[0],
            rawType: textMatch[1],
            bound: false
        };
    }

    const boundPattern = /\s\[thyVote\]="'([^']+)'"/;
    const boundMatch = boundPattern.exec(tag);
    if (boundMatch && boundMatch.index !== undefined) {
        return {
            attrIndex: boundMatch.index,
            attrSource: boundMatch[0],
            rawType: boundMatch[1],
            bound: true
        };
    }

    return null;
}

export class VoteAppearanceMigration extends Migration<UpgradeData> {
    enabled = true;

    override visitTemplate(template: TemplateResource): void {
        applyRelativeTemplateEdits(this, template, collectVoteAppearanceEdits(template.content));
    }
}
