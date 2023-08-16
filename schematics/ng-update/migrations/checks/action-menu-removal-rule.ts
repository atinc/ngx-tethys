/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { findInputsOnElementWithAttr, findInputsOnElementWithTag, Migration, ResolvedResource, UpgradeData } from '@angular/cdk/schematics';
import * as ts from 'typescript';
import { findWholeInputsNameAndValueOnElementWithTag } from '../../core/html-parsing';

export class ActionMenuRemovalRule extends Migration<UpgradeData> {
    enabled = true;

    visitTemplate(template: ResolvedResource): void {
        findInputsOnElementWithTag(template.content, 'thyWidth', ['thy-action-menu']).forEach(offset => {
            this.failures.push({
                filePath: template.filePath,
                position: template.getCharacterAndLineOfPosition(offset),
                message: `Remove input "thyWidth" in deprecated thy-action-menu component. Please manually use thy-dropdown-menu input "thyPopoverOptions" to instead. If it has a corresponding useless variable value, please manually delete it.`
            });
        });

        findWholeInputsNameAndValueOnElementWithTag(template.content, 'thyTheme', 'group', ['thy-action-menu']).forEach(offset => {
            this.failures.push({
                filePath: template.filePath,
                position: template.getCharacterAndLineOfPosition(offset.start),
                message: `Remove deprecated thy-action-menu component with input "thyTheme". Please manually use "thy-dropdown-menu-group" to instead.If it has a corresponding useless variable value, please manually delete it.`
            });
        });

        // 提示给用户，移除了 action-menu 的属性，dropdown-menu 没有对应功能；移除的属性如果是变量赋值，提示用户手动删除无用变量
        findInputsOnElementWithAttr(template.content, 'thyStopPropagation', ['thyActionMenuToggle', '[thyActionMenuToggle]']).forEach(
            offset => {
                this.failures.push({
                    filePath: template.filePath,
                    position: template.getCharacterAndLineOfPosition(offset),
                    message: `Remove input "thyStopPropagation" in deprecated thyActionMenuToggle directive. If it has a corresponding useless variable value, please manually delete it.`
                });
            }
        );

        findInputsOnElementWithTag(template.content, 'thyTitle', ['thy-action-menu-divider']).forEach(offset => {
            this.failures.push({
                filePath: template.filePath,
                position: template.getCharacterAndLineOfPosition(offset),
                message: `Remove input "thyTitle" in deprecated thy-action-menu-divider component. If it has a corresponding useless variable value, please manually delete it.`
            });
        });

        findInputsOnElementWithTag(template.content, 'thyType', ['thy-action-menu-divider']).forEach(offset => {
            this.failures.push({
                filePath: template.filePath,
                position: template.getCharacterAndLineOfPosition(offset),
                message: `Remove input "thyType" in deprecated thy-action-menu-divider component. If it has a corresponding useless variable value, please manually delete it.`
            });
        });
    }

    // 提示给用户，删除的导出类
    visitNode(node: ts.Node): void {
        if (ts.isIdentifier(node)) {
            this._visitIdentifier(node);
        }
    }

    private _visitIdentifier(identifier: ts.Identifier): void {
        if (identifier.getText() === 'ThyActionMenuTheme') {
            this.createFailureAtNode(identifier, `Remove deprecated "ThyActionMenuTheme".`);
        }

        if (identifier.getText() === 'ThyActionMenuDividerType') {
            this.createFailureAtNode(identifier, `Remove deprecated "ThyActionMenuDividerType".`);
        }

        if (identifier.getText() === 'ThyActionMenuDividerTitleDirective') {
            this.createFailureAtNode(identifier, `Remove deprecated "ThyActionMenuDividerTitleDirective".`);
        }
    }
}