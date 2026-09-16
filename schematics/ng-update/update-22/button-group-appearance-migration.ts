import { Migration, ResolvedResource, UpgradeData } from '@angular/cdk/schematics';
import {
    ASTWithSource,
    LiteralPrimitive,
    parseTemplate,
    TmplAstBoundAttribute,
    TmplAstElement,
    TmplAstRecursiveVisitor,
    TmplAstTextAttribute,
    tmplAstVisitAll
} from '@angular/compiler';
import { applyEditsInMemory, applyRelativeTemplateEdits, RelativeTemplateEdit } from '../template-incremental-edits';

interface GroupTypeMapping {
    appearance: 'outline' | 'fill';
    ensurePrimaryChildren: boolean;
}

/**
 * 旧 `thy-button-group` `thyType` → 新 `thyAppearance`。
 * `outline-primary` / `primary` 会尽量给子按钮补 primary，以保持旧 `btn-group-*` 视觉。
 */
const GROUP_TYPE_MAP: Record<string, GroupTypeMapping> = {
    'outline-default': { appearance: 'outline', ensurePrimaryChildren: false },
    'outline-primary': { appearance: 'outline', ensurePrimaryChildren: true },
    primary: { appearance: 'fill', ensurePrimaryChildren: true }
};

const BUTTON_COLOR_ATTRS = ['thyButton', 'thy-button', 'thyColor', 'thyType'];

function isButtonGroupElement(element: TmplAstElement): boolean {
    return element.name === 'thy-button-group';
}

function isButtonLikeElement(element: TmplAstElement): boolean {
    if (element.name === 'button' || element.name === 'thy-button' || element.name === 'a') {
        return true;
    }

    return (
        element.attributes.some(attribute => BUTTON_COLOR_ATTRS.includes(attribute.name)) ||
        element.inputs.some(input => BUTTON_COLOR_ATTRS.includes(input.name))
    );
}

function getLiteralValue(input: TmplAstBoundAttribute): string | null {
    const expression = input.value instanceof ASTWithSource ? input.value.ast : input.value;
    return expression instanceof LiteralPrimitive && typeof expression.value === 'string' ? expression.value : null;
}

function collectButtonGroupAppearanceEdits(content: string, filePath = 'test.html'): RelativeTemplateEdit[] {
    const parsed = parseTemplate(content, filePath, {
        preserveWhitespaces: true,
        preserveLineEndings: true
    });

    if (parsed.errors?.length) {
        return [];
    }

    const edits: RelativeTemplateEdit[] = [];
    tmplAstVisitAll(new ButtonGroupAppearanceVisitor(edits), parsed.nodes);
    return edits;
}

export function migrateButtonGroupAppearance(content: string, filePath = 'test.html'): string {
    return applyEditsInMemory(content, collectButtonGroupAppearanceEdits(content, filePath));
}

function resolvePrimaryColorAttribute(element: TmplAstElement, currentName?: string): string {
    if (element.name === 'thy-button' && currentName !== 'thyButton' && currentName !== 'thy-button') {
        return 'thyColor';
    }
    return currentName === 'thy-button' ? 'thy-button' : 'thyButton';
}

class ButtonGroupAppearanceVisitor extends TmplAstRecursiveVisitor {
    constructor(private readonly edits: RelativeTemplateEdit[]) {
        super();
    }

    override visitElement(element: TmplAstElement): void {
        if (isButtonGroupElement(element)) {
            this.migrateButtonGroup(element);
        }

        super.visitElement(element);
    }

    private migrateButtonGroup(element: TmplAstElement): void {
        const textType = element.attributes.find(attribute => attribute.name === 'thyType');
        const boundType = element.inputs.find(input => input.name === 'thyType');
        const hasAppearance =
            element.attributes.some(attribute => attribute.name === 'thyAppearance') ||
            element.inputs.some(input => input.name === 'thyAppearance');

        let mapping: GroupTypeMapping | null = null;

        if (textType) {
            mapping = GROUP_TYPE_MAP[textType.value] ?? null;
            if (mapping) {
                this.replaceOrRemoveTypeAttribute(textType, mapping.appearance, hasAppearance, false);
            }
        } else if (boundType) {
            const literal = getLiteralValue(boundType);
            mapping = literal ? GROUP_TYPE_MAP[literal] ?? null : null;
            if (mapping) {
                this.replaceOrRemoveTypeAttribute(boundType, mapping.appearance, hasAppearance, true);
            }
        }

        if (mapping?.ensurePrimaryChildren) {
            this.ensurePrimaryChildren(element);
        }
    }

    private replaceOrRemoveTypeAttribute(
        attribute: TmplAstTextAttribute | TmplAstBoundAttribute,
        appearance: 'outline' | 'fill',
        hasAppearance: boolean,
        bound: boolean
    ): void {
        const start = attribute.sourceSpan.start.offset;
        const remove = attribute.sourceSpan.end.offset - attribute.sourceSpan.start.offset;
        let insert = '';

        if (!hasAppearance) {
            insert = bound ? `[thyAppearance]="'${appearance}'"` : `thyAppearance="${appearance}"`;
        }

        // 吃掉属性前的空白，避免残留双空格
        if (start > 0) {
            this.edits.push({
                start: start - 1,
                remove: remove + 1,
                insert: insert ? ` ${insert}` : ''
            });
            return;
        }

        this.edits.push({ start, remove, insert });
    }

    private ensurePrimaryChildren(group: TmplAstElement): void {
        for (const child of group.children) {
            if (!(child instanceof TmplAstElement) || !isButtonLikeElement(child)) {
                continue;
            }
            this.ensurePrimaryOnButton(child);
        }
    }

    private ensurePrimaryOnButton(element: TmplAstElement): void {
        const textColor = element.attributes.find(attribute => BUTTON_COLOR_ATTRS.includes(attribute.name));
        if (textColor) {
            if (!textColor.value || textColor.value === 'default') {
                const colorAttr = resolvePrimaryColorAttribute(element, textColor.name);
                this.edits.push({
                    start: textColor.sourceSpan.start.offset,
                    remove: textColor.sourceSpan.end.offset - textColor.sourceSpan.start.offset,
                    insert: `${colorAttr}="primary"`
                });
            }
            return;
        }

        const boundColor = element.inputs.find(input => BUTTON_COLOR_ATTRS.includes(input.name));
        if (boundColor) {
            const literal = getLiteralValue(boundColor);
            if (literal === 'default') {
                const colorAttr = resolvePrimaryColorAttribute(element, boundColor.name);
                this.edits.push({
                    start: boundColor.sourceSpan.start.offset,
                    remove: boundColor.sourceSpan.end.offset - boundColor.sourceSpan.start.offset,
                    insert: `[${colorAttr}]="'primary'"`
                });
            }
            return;
        }

        // 无颜色属性：在开标签名后插入 thyButton="primary"
        const tagNameEnd = element.startSourceSpan.start.offset + 1 + element.name.length;
        this.edits.push({
            start: tagNameEnd,
            remove: 0,
            insert: ' thyButton="primary"'
        });
    }
}

export class ButtonGroupAppearanceMigration extends Migration<UpgradeData> {
    enabled = true;

    override visitTemplate(template: ResolvedResource): void {
        applyRelativeTemplateEdits(this, template, collectButtonGroupAppearanceEdits(template.content, template.filePath));
    }
}
