import { Migration, ResolvedResource, WorkspacePath } from '@angular/cdk/schematics';
import { findWholeInputsOnElementWithAttrInputBrackets, findWholeInputsOnElementWithTagInputBrackets } from '../core/html-parsing';
import { TethysUpgradeData, getTethysVersionUpgradeData } from '../core/upgrade-data';
import { AfterInsertElementUpgradeData } from '../data/after-insert-element';

/**
 * Migration that walks through every template or stylesheet and replaces deprecated input
 * names.Then insert a new element after the last child node in the current element, and the attribute will be removed from the current element and placed on the inserted element
 * Selectors in stylesheets could also target input
 * bindings declared as static attribute. See for example:
 *
 * 迁移将遍历每个模板或样式表，并移除废弃的输入名称，并在当前元素的最后一个子节点后插入元素。
 */
export class AfterInsertElementMigration extends Migration<TethysUpgradeData> {
    data: AfterInsertElementUpgradeData[] = getTethysVersionUpgradeData(this, 'afterInsertElement');

    enabled = this.data.length !== 0;

    visitTemplate(template: ResolvedResource): void {
        this.data.forEach(name => {
            const limitedTo = name.limitedTo;
            const relativeOffsets: any[] = [];

            if (limitedTo.attributes) {
                relativeOffsets.push(
                    ...findWholeInputsOnElementWithAttrInputBrackets(template.content, name.replace, limitedTo.attributes)
                );
            }

            if (limitedTo.elements) {
                relativeOffsets.push(...findWholeInputsOnElementWithTagInputBrackets(template.content, name.replace, limitedTo.elements));
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
