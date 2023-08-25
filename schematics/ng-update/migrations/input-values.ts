import { Migration, ResolvedResource, WorkspacePath } from '@angular/cdk/schematics';
import { findWholeInputsNameAndValueOnElementWithAttr, findWholeInputsNameAndValueOnElementWithTag } from '../core/html-parsing';
import { TethysUpgradeData, getTethysVersionUpgradeData } from '../core/upgrade-data';
import { InputValueUpgradeData } from '../data';

/**
 * Migration that walks through every template or stylesheet and replaces deprecated input
 * name and value to the new input names and values. Selectors in stylesheets could also target input
 * bindings declared as static attribute. See for example:
 *
 * 迁移将遍历每个模板或样式表，并将废弃的输入名称与值替换为新的输入名称与值。
 */
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
            let lastWidth = 0;
            for (const inputName of Object.keys(newValue)) {
                if (lastWidth) {
                    // 替换的非第一个属性，之前的属性已经在替换第一个的时候删除完了，直接插入新属性
                    newValue[inputName]
                        ? this.fileSystem.edit(filePath).insertRight(start + lastWidth, `${inputName}="${newValue[inputName]}" `)
                        : this.fileSystem.edit(filePath).insertRight(start + lastWidth, `${inputName} `);
                } else {
                    // 替换的第一个属性，删除之前的属性，插入新属性
                    newValue[inputName]
                        ? this.fileSystem.edit(filePath).remove(start, width).insertRight(start, `${inputName}="${newValue[inputName]}" `)
                        : this.fileSystem.edit(filePath).remove(start, width).insertRight(start, `${inputName} `);
                }
                lastWidth = newValue[inputName] ? `${inputName}="${newValue[inputName]}"`.length : `${inputName}`.length;
            }
        } else {
            this.fileSystem.edit(filePath).remove(start, width);
        }
    }
}
