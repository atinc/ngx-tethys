import { AttributeSelectorUpgradeData, VersionChanges } from '@angular/cdk/schematics';
import { TethysTargetVersion } from '../core/target-version';

export const attributeSelectors: VersionChanges<AttributeSelectorUpgradeData> = {
    [TethysTargetVersion.V16]: [
        {
            pr: '',
            changes: [
                {
                    replace: '[thyLabel]',
                    replaceWith: 'thyTag]'
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
