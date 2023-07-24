import { Migration, ResolvedResource, WorkspacePath } from '@angular/cdk/schematics';
import { findWholeInputsOnElementWithAttr, findWholeInputsOnElementWithTag } from '../core/html-parsing';
import { TethysUpgradeData, getTethysVersionUpgradeData } from '../core/upgrade-data';
import { InputNameRemovalUpgradeData } from '../data';

/**
 * Migration that walks through every template or stylesheet and removes deprecated input
 * names. Selectors in stylesheets could also target input
 * bindings declared as static attribute. See for example:
 *
 * 迁移将遍历每个模板或样式表，并将废弃的输入名称移除。
 */
export class InputNamesRemovalMigration extends Migration<TethysUpgradeData> {
    data: InputNameRemovalUpgradeData[] = getTethysVersionUpgradeData(this, 'inputNamesRemoval');

    enabled = this.data.length !== 0;

    visitTemplate(template: ResolvedResource): void {
        this.data.forEach(name => {
            const limitedTo = name.limitedTo;
            const relativeOffsets: any[] = [];

            if (limitedTo.attributes) {
                relativeOffsets.push(...findWholeInputsOnElementWithAttr(template.content, name.remove, limitedTo.attributes));
            }
            if (limitedTo.elements) {
                relativeOffsets.push(...findWholeInputsOnElementWithTag(template.content, name.remove, limitedTo.elements));
            }

            relativeOffsets
                .map(offset => {
                    return { start: template.start + offset.start, length: offset.end - offset.start };
                })
                .forEach(value => {
                    this._removeInputName(template.filePath, value.start, value.length);
                });
        });
    }

    private _removeInputName(filePath: WorkspacePath, start: number, width: number) {
        this.fileSystem.edit(filePath).remove(start, width);
    }
}
