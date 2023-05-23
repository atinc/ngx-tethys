import { ClassNameUpgradeData, VersionChanges } from '@angular/cdk/schematics';
import { TethysTargetVersion } from '../core/target-version';

export const classNames: VersionChanges<ClassNameUpgradeData> = {
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
