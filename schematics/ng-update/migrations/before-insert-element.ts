import { Migration, ResolvedResource, WorkspacePath } from '@angular/cdk/schematics';
import { findWholeInputsOnElementWithAttr, findWholeInputsOnElementWithTag } from '../core/html-parsing';
import { TethysUpgradeData, getTethysVersionUpgradeData } from '../core/upgrade-data';
import { BeforeInsertElementUpgradeData } from '../data/before-insert-element';

export class BeforeInsertElementMigration extends Migration<TethysUpgradeData> {
    data: BeforeInsertElementUpgradeData[] = getTethysVersionUpgradeData(this, 'beforeInsertElement');

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
                        startTagEnd: template.start + offset.startTagEnd,
                        replaceValue: offset.value
                    };
                })
                .forEach(value =>
                    this._beforeInsertElement(
                        template.filePath,
                        value.start,
                        value.length,
                        name.insert,
                        value.startTagEnd,
                        name.replace,
                        value.replaceValue
                    )
                );
        });
    }

    private _beforeInsertElement(
        filePath: WorkspacePath,
        start: number,
        width: number,
        insert: string,
        startTagEnd: number,
        replace: string,
        replaceValue: string
    ) {
        if (insert.includes(replace)) {
            const insertWithValue = insert.replace(replace, `'${replaceValue}'`);
            this.fileSystem.edit(filePath).remove(start, width).insertRight(startTagEnd, insertWithValue);
        } else {
            this.fileSystem.edit(filePath).remove(start, width).insertRight(startTagEnd, insert);
        }
    }
}
