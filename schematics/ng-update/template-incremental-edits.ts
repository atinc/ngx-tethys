import { Migration, UpgradeData } from '@angular/cdk/schematics';

export interface RelativeTemplateEdit {
    start: number;
    remove: number;
    insert: string;
}

interface TemplateResource {
    filePath: string;
    start: number;
    content: string;
}

export function applyRelativeTemplateEdits(
    migration: Migration<UpgradeData>,
    template: TemplateResource,
    edits: RelativeTemplateEdit[]
): void {
    if (!edits.length) {
        return;
    }

    const filePath = migration.fileSystem.resolve(template.filePath);
    const sortedEdits = [...edits].sort((left, right) => right.start - left.start);

    for (const edit of sortedEdits) {
        const start = template.start + edit.start;
        migration.fileSystem.edit(filePath).remove(start, edit.remove).insertRight(start, edit.insert);
    }
}

export function collectRegexReplacementEdits(
    content: string,
    replacements: Array<[RegExp, string]>
): RelativeTemplateEdit[] {
    const edits: RelativeTemplateEdit[] = [];

    for (const [pattern, replacement] of replacements) {
        const regex = new RegExp(pattern.source, pattern.flags);
        let match: RegExpExecArray | null;

        while ((match = regex.exec(content)) !== null) {
            edits.push({ start: match.index, remove: match[0].length, insert: replacement });
        }
    }

    return edits;
}

export function collectPatternReplacementEdits(
    content: string,
    pattern: RegExp,
    migrate: (matched: string) => string
): RelativeTemplateEdit[] {
    const edits: RelativeTemplateEdit[] = [];
    const regex = new RegExp(pattern.source, pattern.flags);
    let match: RegExpExecArray | null;

    while ((match = regex.exec(content)) !== null) {
        const migrated = migrate(match[0]);

        if (migrated !== match[0]) {
            edits.push({ start: match.index, remove: match[0].length, insert: migrated });
        }
    }

    return edits;
}

export function applyEditsInMemory(content: string, edits: RelativeTemplateEdit[]): string {
    if (!edits.length) {
        return content;
    }

    return [...edits]
        .sort((left, right) => right.start - left.start)
        .reduce((result, edit) => {
            return result.slice(0, edit.start) + edit.insert + result.slice(edit.start + edit.remove);
        }, content);
}
