import { Migration, ResolvedResource, UpgradeData, WorkspacePath } from '@angular/cdk/schematics';

/**
 * v22 删除了无尺寸后缀的默认 Sass 变量（旧版对应 36px 视觉），统一替换为 -lg 版本以保持旧视觉。
 */
const SCSS_SIZE_VARIABLE_REPLACEMENTS = new Map([
    // Input / FormControl
    ['input-btn-height', 'input-btn-height-lg'],
    ['input-btn-line-height', 'input-btn-line-height-lg'],
    ['input-btn-padding-x', 'input-btn-padding-x-lg'],
    ['input-btn-padding-y', 'input-btn-padding-y-lg'],
    ['input-padding-x', 'input-padding-x-lg'],
    ['input-padding-y', 'input-padding-y-lg'],
    ['input-border-radius', 'input-border-radius-lg'],
    ['input-font-size', 'input-font-size-lg'],
    // Button
    ['btn-line-height', 'btn-line-height-lg'],
    ['btn-padding-x', 'btn-padding-x-lg'],
    ['btn-padding-y', 'btn-padding-y-lg'],
    ['btn-icon-circle-padding-base', 'btn-icon-circle-padding-lg'],
    ['btn-icon-only-padding-x', 'btn-icon-only-padding-x-lg'],
    // SelectControl
    ['select-control-height-default', 'select-control-height-lg'],
    ['select-control-padding-y-default', 'select-control-padding-y-lg']
]);

const IGNORED_STYLE_DIRECTORIES = new Set(['.git', '.angular', 'coverage', 'dist', 'node_modules']);

export class ScssSizeVariableMigration extends Migration<UpgradeData> {
    enabled = true;

    override visitStylesheet(stylesheet: ResolvedResource): void {
        // 外部 Sass 文件统一在 postAnalysis 中处理，以覆盖全局样式及未被组件直接引用的样式文件。
        if (stylesheet.inline) {
            this.migrateSassVariables(stylesheet.content, stylesheet.filePath, stylesheet.start);
        }
    }

    override postAnalysis(): void {
        this.visitStyleDirectory(this.fileSystem.resolve('/'));
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

            for (const [oldName, newName] of SCSS_SIZE_VARIABLE_REPLACEMENTS) {
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
