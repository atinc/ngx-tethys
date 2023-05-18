import { Migration, ResolvedResource, WorkspacePath } from '@angular/cdk/schematics';
import { findWholeInputsNameAndValueOnElementWithAttr, findWholeInputsNameAndValueOnElementWithTag } from '../core/html-parsing';
import { TethysUpgradeData, getTethysVersionUpgradeData } from '../core/upgrade-data';
import { InputValueUpgradeData } from '../data';

export class InputValuesMigration extends Migration<TethysUpgradeData> {
    data: InputValueUpgradeData[] = getTethysVersionUpgradeData(this, 'inputValues');

    enabled = this.data.length !== 0;

    visitTemplate(template: ResolvedResource): void {
        this.data.forEach(name => {
            const limitedTo = name.limitedTo;
            const relativeOffsets: any[] = [];

            for (const inputName of Object.keys(name.replace)) {
                if (limitedTo.attributes) {
                    relativeOffsets.push(
                        ...findWholeInputsNameAndValueOnElementWithAttr(
                            template.content,
                            inputName,
                            name.replace[inputName],
                            limitedTo.attributes
                        )
                    );
                }

                if (limitedTo.elements) {
                    relativeOffsets.push(
                        ...findWholeInputsNameAndValueOnElementWithTag(
                            template.content,
                            inputName,
                            name.replace[inputName],
                            limitedTo.elements
                        )
                    );
                }
            }

            relativeOffsets
                .map(offset => {
                    return { start: template.start + offset.start, length: offset.end - offset.start };
                })
                .forEach(value => {
                    this._replaceInput(template.filePath, value.start, value.length, name.replaceWith);
                });
        });
    }

    private _replaceInput(filePath: WorkspacePath, start: number, width: number, newValue: Record<string, string>) {
        if (Object.keys(newValue).length) {
            for (const inputName of Object.keys(newValue)) {
                newValue[inputName]
                    ? this.fileSystem.edit(filePath).remove(start, width).insertRight(start, `${inputName}="${newValue[inputName]}" `)
                    : this.fileSystem.edit(filePath).remove(start, width).insertRight(start, `${inputName} `);
            }
        } else {
            this.fileSystem.edit(filePath).remove(start, width);
        }
    }
}
