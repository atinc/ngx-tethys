/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { findInputsOnElementWithTag, Migration, ResolvedResource, UpgradeData } from '@angular/cdk/schematics';
import * as ts from 'typescript';
import { findWholeInputsNameAndValueOnElementWithTag } from '../../core/html-parsing';

export class ActionMenuRemovalRule extends Migration<UpgradeData> {
    enabled = true;

    visitTemplate(template: ResolvedResource): void {
        findInputsOnElementWithTag(template.content, 'thyWidth', ['thy-action-menu']).forEach(offset => {
            this.failures.push({
                filePath: template.filePath,
                position: template.getCharacterAndLineOfPosition(offset),
                message: `Remove input "thyWidth" in deprecated thy-action-menu component. Please manually use thy-dropdown-menu input "thyPopoverOptions" to instead.`
            });
        });

        findWholeInputsNameAndValueOnElementWithTag(template.content, 'thyTheme', 'group', ['thy-action-menu']).forEach(offset => {
            this.failures.push({
                filePath: template.filePath,
                position: template.getCharacterAndLineOfPosition(offset.start),
                message: `Remove deprecated thy-action-menu component with input "thyTheme". Please manually use "thy-dropdown-menu-group" to instead.`
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
