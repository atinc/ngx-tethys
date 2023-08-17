/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { findInputsOnElementWithAttr, Migration, ResolvedResource, UpgradeData } from '@angular/cdk/schematics';
import { findWholeInputsNameAndValueOnElementWithAttr } from '../../core/html-parsing';

export class LabelRemovalRule extends Migration<UpgradeData> {
    enabled = true;

    visitTemplate(template: ResolvedResource): void {
        // 给 tag 插入 icon 时，需要用户确认下是否已经导入了 icon 模块
        findInputsOnElementWithAttr(template.content, 'thyBeforeIcon', ['thyLabel', '[thyLabel]']).forEach(offset => {
            this.failures.push({
                filePath: template.filePath,
                position: template.getCharacterAndLineOfPosition(offset),
                message: `Replace input "thyBeforeIcon" in deprecated thyLabel directive. Confirm whether the "ThyIconModule" is imported, if not, please import.`
            });
        });

        findInputsOnElementWithAttr(template.content, 'thyAfterIcon', ['thyLabel', '[thyLabel]']).forEach(offset => {
            this.failures.push({
                filePath: template.filePath,
                position: template.getCharacterAndLineOfPosition(offset),
                message: `Replace input "thyAfterIcon" in deprecated thyLabel directive. Confirm whether the "ThyIconModule" is imported, if not, please import.`
            });
        });

        // 提示给用户，移除了 thyLabel 的属性，thyTag 没有对应功能
        findInputsOnElementWithAttr(template.content, 'thyIconPrefix', ['thyLabel', '[thyLabel]']).forEach(offset => {
            this.failures.push({
                filePath: template.filePath,
                position: template.getCharacterAndLineOfPosition(offset),
                message: `Remove input "thyIconPrefix" in deprecated thyLabel directive. Please manually use "thy-icon" to instead.`
            });
        });

        findInputsOnElementWithAttr(template.content, 'thyBackgroundOpacity', ['thyLabel', '[thyLabel]']).forEach(offset => {
            this.failures.push({
                filePath: template.filePath,
                position: template.getCharacterAndLineOfPosition(offset),
                message: `Remove input "thyBackgroundOpacity" in deprecated thyLabel directive.`
            });
        });

        findInputsOnElementWithAttr(template.content, 'thyOnRemove', ['thyLabel', '[thyLabel]']).forEach(offset => {
            this.failures.push({
                filePath: template.filePath,
                position: template.getCharacterAndLineOfPosition(offset),
                message: `Remove input "thyOnRemove" in deprecated thyLabel directive. If it has a corresponding useless function, please manually delete it.`
            });
        });

        // 提示给用户，thyLabel 变成 thyTag 后大小有变化
        findWholeInputsNameAndValueOnElementWithAttr(template.content, 'thySize', 'default', ['thyLabel', '[thyLabel]']).forEach(offset => {
            this.failures.push({
                filePath: template.filePath,
                position: template.getCharacterAndLineOfPosition(offset.start),
                message: `Replace input "thySize" in deprecated thyLabel directive. Notice: default22(thyLabel) -> md24(thyTag).`
            });
        });

        findWholeInputsNameAndValueOnElementWithAttr(template.content, 'thySize', '', ['thyLabel', '[thyLabel]']).forEach(offset => {
            this.failures.push({
                filePath: template.filePath,
                position: template.getCharacterAndLineOfPosition(offset.start),
                message: `Replace input "thySize" in deprecated thyLabel directive. Notice: default22(thyLabel) -> md24(thyTag)`
            });
        });

        findWholeInputsNameAndValueOnElementWithAttr(template.content, 'thySize', 'xlg', ['thyLabel', '[thyLabel]']).forEach(offset => {
            this.failures.push({
                filePath: template.filePath,
                position: template.getCharacterAndLineOfPosition(offset.start),
                message: `Replace input "thySize" in deprecated thyLabel directive. Notice: xlg36(thyLabel) -> lg28(thyTag)`
            });
        });
    }
}
