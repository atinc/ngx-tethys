import { Migration, ResolvedResource, UpgradeData, WorkspacePath } from '@angular/cdk/schematics';
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

/**
 * Components whose old implicit/default size was 36px and whose new default is md (32px).
 * Keep this list explicit because thySize is shared by unrelated components such as avatar.
 */
const SIZE_AFFECTED_ELEMENTS = new Set([
    'thy-button',
    'thy-button-group',
    'thy-button-icon',
    'thy-input',
    'thy-input-group',
    'thy-input-search',
    'thy-input-number',
    'thy-select',
    'thy-custom-select',
    'thy-native-select',
    'thy-tree-select',
    'thy-cascader',
    'thy-date-picker',
    'thy-range-picker',
    'thy-month-picker',
    'thy-quarter-picker',
    'thy-week-picker',
    'thy-year-picker',
    'thy-time-picker'
]);

const SIZE_AFFECTED_DIRECTIVES = new Set(['thyButton', 'thy-button', 'thyButtonIcon', 'thy-button-icon', 'thyInput']);

/**
 * Removed public Sass variables that are consumed by downstream projects.
 * Their replacements use the lg variants because the removed defaults represented
 * the old 36px visual size.
 */
const SASS_VARIABLE_REPLACEMENTS = new Map([
    ['input-btn-height', 'input-btn-height-lg'],
    ['input-padding-x', 'input-padding-x-lg'],
    ['input-padding-y', 'input-padding-y-lg'],
    ['btn-icon-circle-padding-base', 'btn-icon-circle-padding-lg'],
    ['input-border-radius', 'input-border-radius-lg']
]);

const IGNORED_STYLE_DIRECTORIES = new Set(['.git', '.angular', 'coverage', 'dist', 'node_modules']);

export class InputControlSizeMigration extends Migration<UpgradeData> {
    enabled = true;

    override visitStylesheet(stylesheet: ResolvedResource): void {
        // External Sass files are handled by postAnalysis so that global and otherwise
        // unreferenced stylesheets are migrated as well.
        if (stylesheet.inline) {
            this.migrateSassVariables(stylesheet.content, stylesheet.filePath, stylesheet.start);
        }
    }

    override postAnalysis(): void {
        this.visitStyleDirectory(this.fileSystem.resolve('/'));
    }

    override visitTemplate(template: ResolvedResource): void {
        const parsed = parseTemplate(template.content, template.filePath, {
            preserveWhitespaces: true,
            preserveLineEndings: true
        });

        if (parsed.errors?.length) {
            return;
        }

        const migration = this;
        class Visitor extends TmplAstRecursiveVisitor {
            override visitElement(element: TmplAstElement): void {
                if (migration.isAffectedElement(element)) {
                    migration.migrateSize(element, template);
                }
                super.visitElement(element);
            }
        }

        tmplAstVisitAll(new Visitor(), parsed.nodes);
    }

    private isAffectedElement(element: TmplAstElement): boolean {
        if (SIZE_AFFECTED_ELEMENTS.has(element.name)) {
            return true;
        }

        return [...element.attributes, ...element.inputs].some(attribute => SIZE_AFFECTED_DIRECTIVES.has(attribute.name));
    }

    private migrateSize(element: TmplAstElement, template: ResolvedResource): void {
        const textSize = element.attributes.find(attribute => attribute.name === 'thySize');
        const boundSize = element.inputs.find(input => input.name === 'thySize');

        if (!textSize && !boundSize) {
            this.addLargeSize(element, template);
        } else if (textSize && (textSize.value === '' || textSize.value === 'default')) {
            this.replaceTextSize(textSize, template);
        } else if (boundSize) {
            this.replaceBoundLiteralSize(boundSize, template);
        }
    }

    private addLargeSize(element: TmplAstElement, template: ResolvedResource): void {
        const openingTag = template.content.slice(element.startSourceSpan.start.offset, element.startSourceSpan.end.offset);
        const closingLength = openingTag.endsWith('/>') ? 2 : 1;
        const insertAt = template.start + element.startSourceSpan.end.offset - closingLength;
        this.fileSystem.edit(template.filePath).insertRight(insertAt, ' thySize="lg"');
    }

    private replaceTextSize(attribute: TmplAstTextAttribute, template: ResolvedResource): void {
        if (attribute.valueSpan) {
            const start = template.start + attribute.valueSpan.start.offset;
            this.fileSystem
                .edit(template.filePath)
                .remove(start, attribute.valueSpan.end.offset - attribute.valueSpan.start.offset)
                .insertRight(start, 'lg');
        } else {
            const insertAt = template.start + attribute.keySpan!.end.offset;
            this.fileSystem.edit(template.filePath).insertRight(insertAt, '="lg"');
        }
    }

    private replaceBoundLiteralSize(attribute: TmplAstBoundAttribute, template: ResolvedResource): void {
        const expression = attribute.value instanceof ASTWithSource ? attribute.value.ast : attribute.value;
        if (!(expression instanceof LiteralPrimitive) || (expression.value !== '' && expression.value !== 'default')) {
            return;
        }

        if (!attribute.valueSpan) {
            return;
        }

        const start = template.start + attribute.valueSpan.start.offset;
        const width = attribute.valueSpan.end.offset - attribute.valueSpan.start.offset;
        this.fileSystem.edit(template.filePath).remove(start, width).insertRight(start, "'lg'");
    }

    private visitStyleDirectory(directory: WorkspacePath): void {
        const entry = this.fileSystem.readDirectory(directory);

        entry.files
            .filter(fileName => fileName.endsWith('.scss') || fileName.endsWith('.sass'))
            .forEach(fileName => {
                const filePath = this.fileSystem.resolve(directory, fileName);
                const content = this.fileSystem.read(filePath);
                if (content !== null) {
                    this.migrateSassVariables(content, filePath, 0);
                }
            });

        entry.directories
            .filter(directoryName => !IGNORED_STYLE_DIRECTORIES.has(directoryName))
            .forEach(directoryName => this.visitStyleDirectory(this.fileSystem.resolve(directory, directoryName)));
    }

    private migrateSassVariables(content: string, filePath: WorkspacePath, startOffset: number): void {
        const replacements = this.findSassVariableReplacements(content);
        if (!replacements.length) {
            return;
        }

        const recorder = this.fileSystem.edit(filePath);
        replacements.forEach(({ start, oldName, newName }) => {
            recorder.remove(startOffset + start, oldName.length + 1);
            recorder.insertRight(startOffset + start, `$${newName}`);
        });
    }

    private findSassVariableReplacements(content: string): Array<{ start: number; oldName: string; newName: string }> {
        const replacements: Array<{ start: number; oldName: string; newName: string }> = [];
        let quote: "'" | '"' | null = null;
        let inBlockComment = false;
        let inLineComment = false;

        for (let index = 0; index < content.length; index++) {
            const character = content[index];
            const nextCharacter = content[index + 1];

            if (inLineComment) {
                if (character === '\n' || character === '\r') {
                    inLineComment = false;
                }
                continue;
            }

            if (inBlockComment) {
                if (character === '*' && nextCharacter === '/') {
                    inBlockComment = false;
                    index++;
                }
                continue;
            }

            if (quote) {
                if (character === '\\') {
                    index++;
                } else if (character === quote) {
                    quote = null;
                }
                continue;
            }

            if (character === '/' && nextCharacter === '/') {
                inLineComment = true;
                index++;
                continue;
            }

            if (character === '/' && nextCharacter === '*') {
                inBlockComment = true;
                index++;
                continue;
            }

            if (character === "'" || character === '"') {
                quote = character;
                continue;
            }

            if (character !== '$') {
                continue;
            }

            for (const [oldName, newName] of SASS_VARIABLE_REPLACEMENTS) {
                if (!content.startsWith(oldName, index + 1)) {
                    continue;
                }

                const characterAfterName = content[index + oldName.length + 1];
                if (characterAfterName && /[A-Za-z0-9_-]/.test(characterAfterName)) {
                    continue;
                }

                replacements.push({ start: index, oldName, newName });
                index += oldName.length;
                break;
            }
        }

        return replacements;
    }
}
