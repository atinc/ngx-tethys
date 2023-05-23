import { ClassNameUpgradeData } from '@angular/cdk/schematics';
import { TethysTargetVersion, TethysVersionChanges } from '../core/target-version';

export const classNames: TethysVersionChanges<ClassNameUpgradeData> = {
    [TethysTargetVersion.V16]: [
        {
            pr: '',
            changes: [
                {
                    replace: 'ThyLabelTypeSize',
                    replaceWith: 'ThyTagSize'
                },
                {
                    replace: 'ThyLabelType',
                    replaceWith: 'ThyTagColor'
                },
                {
                    replace: 'ThyLabelComponent',
                    replaceWith: 'ThyTagComponent'
                },
                {
                    replace: 'ThyLabelModule',
                    replaceWith: 'ThyTagModule'
                }
            ]
        }
    ]
};
