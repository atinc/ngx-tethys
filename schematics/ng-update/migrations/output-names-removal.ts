import { Migration, ResolvedResource, WorkspacePath } from '@angular/cdk/schematics';
import { findWholeOutputsOnElementWithAttr, findWholeOutputsOnElementWithTag } from '../core/html-parsing';
import { TethysUpgradeData, getTethysVersionUpgradeData } from '../core/upgrade-data';
import { OutputNameRemovalUpgradeData } from '../data';

export class OutputNamesRemovalMigration extends Migration<TethysUpgradeData> {
    data: OutputNameRemovalUpgradeData[] = getTethysVersionUpgradeData(this, 'outputNamesRemoval');

    enabled = this.data.length !== 0;

    visitTemplate(template: ResolvedResource): void {
        this.data.forEach(name => {
            const limitedTo = name.limitedTo;
            const relativeOffsets: any[] = [];

            if (limitedTo.attributes) {
                relativeOffsets.push(...findWholeOutputsOnElementWithAttr(template.content, name.remove, limitedTo.attributes));
            }
            if (limitedTo.elements) {
                relativeOffsets.push(...findWholeOutputsOnElementWithTag(template.content, name.remove, limitedTo.elements));
            }

            relativeOffsets
                .map(offset => {
                    return { start: template.start + offset.start, length: offset.end - offset.start };
                })
                .forEach(value => {
                    this._removeOutputName(template.filePath, value.start, value.length);
                });
        });
    }

    private _removeOutputName(filePath: WorkspacePath, start: number, width: number) {
        this.fileSystem.edit(filePath).remove(start, width);
    }
}
