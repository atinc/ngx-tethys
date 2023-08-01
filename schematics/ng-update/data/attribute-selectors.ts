import { AttributeSelectorUpgradeData, TargetVersion, VersionChanges } from '@angular/cdk/schematics';

export const attributeSelectors: VersionChanges<AttributeSelectorUpgradeData> = {
    [TargetVersion.V15]: [
        {
            pr: '',
            changes: [
                {
                    replace: '[thyLabel]',
                    replaceWith: '[thyTag]'
                },
                {
                    replace: 'thyLabel ',
                    replaceWith: 'thyTag '
                },
                {
                    replace: 'thyLabel\n',
                    replaceWith: 'thyTag '
                }
            ]
        }
    ]
};
