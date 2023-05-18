import { Migration, ResolvedResource, WorkspacePath } from '@angular/cdk/schematics';
import { findWholeInputsOnElementWithAttr, findWholeInputsOnElementWithTag } from '../core/html-parsing';
import { TethysUpgradeData, getTethysVersionUpgradeData } from '../core/upgrade-data';
import { AfterInsertElementUpgradeData } from '../data/after-insert-element';

export class AfterInsertElementMigration extends Migration<TethysUpgradeData> {
    data: AfterInsertElementUpgradeData[] = getTethysVersionUpgradeData(this, 'afterInsertElement');

    enabled = this.data.length !== 0;

    visitTemplate(template: ResolvedResource): void {
        this.data.forEach(name => {
            const limitedTo = name.limitedTo;
            const relativeOffsets: any[] = [];

            if (limitedTo.attributes) {
                relativeOffsets.push(...findWholeInputsOnElementWithAttr(template.content, name.replace, limitedTo.attributes));
            }

            if (limitedTo.elements) {
                relativeOffsets.push(...findWholeInputsOnElementWithTag(template.content, name.replace, limitedTo.elements));
            }

            relativeOffsets
                .map(offset => {
                    return {
                        start: template.start + offset.start,
                        length: offset.end - offset.start,
                        endTagStart: template.start + offset.endTagStart,
                        replaceValue: offset.value
                    };
                })
                .forEach(value =>
                    this._afterInsertElement(
                        template.filePath,
                        value.start,
                        value.length,
                        name.insert,
                        value.endTagStart,
                        name.replace,
                        value.replaceValue
                    )
                );
        });
    }

    private _afterInsertElement(
        filePath: WorkspacePath,
        start: number,
        width: number,
        insert: string,
        endTagStart: number,
        replace: string,
        replaceValue: string
    ) {
        if (insert.includes(replace)) {
            const insertWithValue = insert.replace(replace, `'${replaceValue}'`);
            this.fileSystem.edit(filePath).remove(start, width).insertLeft(endTagStart, insertWithValue);
        } else {
            this.fileSystem.edit(filePath).remove(start, width).insertLeft(endTagStart, insert);
        }
    }
}
