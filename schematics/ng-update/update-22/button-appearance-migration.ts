import { Migration, UpgradeData } from '@angular/cdk/schematics';

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

const TYPE_ATTR_NAMES = ['thyButton', 'thy-button', 'thyType'];

const OPEN_TAG_PATTERN = /<[A-Za-z][\w.-]*\b[^>]*?>/g;

export function migrateButtonAppearance(content: string): string {
    return content.replace(OPEN_TAG_PATTERN, tag => migrateButtonTag(tag));
}

function migrateButtonTag(tag: string): string {
    if (/\bthy-button-group\b|\bthyButtonGroup\b|\bthy-button-icon\b|\bthyButtonIcon\b/.test(tag)) {
        return tag;
    }

    if (!TYPE_ATTR_NAMES.some(name => new RegExp(`\\b(?:\\[?${name}\\]?)\\b`).test(tag))) {
        return tag;
    }

    // link-danger-weak → CSS utility（非 Button 色板）
    if (/\bthyButton="link-danger-weak"/.test(tag) || /\bthyType="link-danger-weak"/.test(tag)) {
        return migrateLinkDangerWeak(tag);
    }
    if (/\[[\w-]*\]="'link-danger-weak'"/.test(tag)) {
        return migrateLinkDangerWeakBound(tag);
    }

    for (const attrName of TYPE_ATTR_NAMES) {
        const textMatch = tag.match(new RegExp(`\\b${attrName}="([^"]+)"`));
        if (textMatch) {
            const mapped = COMPOUND_BUTTON_TYPES[textMatch[1]];
            if (!mapped) {
                continue;
            }
            return applyCompoundMigration(tag, attrName, textMatch[0], mapped, false);
        }

        const boundMatch = tag.match(new RegExp(`\\[${attrName}\\]="'([^']+)'"`));
        if (boundMatch) {
            const mapped = COMPOUND_BUTTON_TYPES[boundMatch[1]];
            if (!mapped) {
                continue;
            }
            return applyCompoundMigration(tag, attrName, boundMatch[0], mapped, true);
        }
    }

    return tag;
}

function applyCompoundMigration(
    tag: string,
    attrName: string,
    attrSource: string,
    mapped: CompoundButtonType,
    bound: boolean
): string {
    const typeAttr = bound ? `[${attrName}]="'${mapped.type}'"` : `${attrName}="${mapped.type}"`;
    let result = tag.replace(attrSource, typeAttr);

    if (mapped.appearance !== 'fill' && !/\bthyAppearance\b/.test(result) && !/\[thyAppearance\]/.test(result)) {
        result = result.replace(typeAttr, `${typeAttr} thyAppearance="${mapped.appearance}"`);
    }

    return result;
}

function migrateLinkDangerWeak(tag: string): string {
    const result = tag
        .replace(/\s*thyButton="link-danger-weak"/g, '')
        .replace(/\s*thyType="link-danger-weak"/g, '')
        .replace(/\s*thy-button="link-danger-weak"/g, '');

    return ensureLinkDangerWeakClass(result);
}

function migrateLinkDangerWeakBound(tag: string): string {
    const result = tag
        .replace(/\s*\[thyButton\]="'link-danger-weak'"/g, '')
        .replace(/\s*\[thyType\]="'link-danger-weak'"/g, '')
        .replace(/\s*\[thy-button\]="'link-danger-weak'"/g, '');

    return ensureLinkDangerWeakClass(result);
}

function ensureLinkDangerWeakClass(tag: string): string {
    if (/\bclass="/.test(tag)) {
        return tag.replace(/\bclass="([^"]*)"/, (_m, classes: string) => {
            const next = classes.includes('link-danger-weak') ? classes : `${classes} link-danger-weak`.trim();
            return `class="${next}"`;
        });
    }

    return tag.replace(/^(<[^\s/>]+)/, `$1 class="link-danger-weak"`);
}

export class ButtonAppearanceMigration extends Migration<UpgradeData> {
    enabled = true;

    override visitTemplate(template: TemplateResource): void {
        const migratedContent = migrateButtonAppearance(template.content);

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
