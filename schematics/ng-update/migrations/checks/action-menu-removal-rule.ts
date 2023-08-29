/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { findAllSubstringIndices, findInputsOnElementWithAttr, Migration, ResolvedResource, UpgradeData } from '@angular/cdk/schematics';
import * as ts from 'typescript';
import { findWholeInputsNameAndValueOnElementWithTag } from '../../core/html-parsing';

export class ActionMenuRemovalRule extends Migration<UpgradeData> {
    enabled = true;

    visitTemplate(template: ResolvedResource): void {
        findWholeInputsNameAndValueOnElementWithTag(template.content, 'thyTheme', 'group', ['thy-action-menu']).forEach(offset => {
            this.failures.push({
                filePath: template.filePath,
                position: template.getCharacterAndLineOfPosition(offset.start),
                message: `Remove deprecated thy-action-menu component with input "thyTheme". Please manually use "thy-dropdown-menu-group" to instead.`
            });
        });

        findInputsOnElementWithAttr(template.content, 'thyPlacement', ['thyActionMenuToggle', '[thyActionMenuToggle]']).forEach(offset => {
            this.failures.push({
                filePath: template.filePath,
                position: template.getCharacterAndLineOfPosition(offset),
                message: `Found input "thyPlacement" in deprecated thyActionMenuToggle directive. Please manually use camel case. (eg.right bottom to rightBottom)`
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

    visitStylesheet(stylesheet: ResolvedResource): void {
        findAllSubstringIndices(stylesheet.content, '$action-menu-divider-margin-y')
            .map(offset => stylesheet.start + offset)
            .forEach(start => {
                this.failures.push({
                    filePath: stylesheet.filePath,
                    position: stylesheet.getCharacterAndLineOfPosition(start),
                    message: `Replace $action-menu-divider-margin-y(5px) with $dropdown-menu-divider-margin-y(4px)`
                });
            });

        findAllSubstringIndices(stylesheet.content, '$action-menu-group-name-padding-y')
            .map(offset => stylesheet.start + offset)
            .forEach(start => {
                this.failures.push({
                    filePath: stylesheet.filePath,
                    position: stylesheet.getCharacterAndLineOfPosition(start),
                    message: `Replace $action-menu-group-name-padding-y(5px) with $dropdown-menu-group-name-padding-y(2px)`
                });
            });

        findAllSubstringIndices(stylesheet.content, '$label-')
            .map(offset => stylesheet.start + offset)
            .forEach(start => {
                this.failures.push({
                    filePath: stylesheet.filePath,
                    position: stylesheet.getCharacterAndLineOfPosition(start),
                    message: `Found deprecated label style variables`
                });
            });
    }
}
