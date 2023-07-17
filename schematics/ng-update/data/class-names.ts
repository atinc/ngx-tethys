import { ClassNameUpgradeData, TargetVersion, VersionChanges } from '@angular/cdk/schematics';

export const classNames: VersionChanges<ClassNameUpgradeData> = {
    [TargetVersion.V15]: [
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
