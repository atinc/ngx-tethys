import { AttributeSelectorUpgradeData } from '@angular/cdk/schematics';
import { TethysTargetVersion, TethysVersionChanges } from '../core/target-version';

export const attributeSelectors: TethysVersionChanges<AttributeSelectorUpgradeData> = {
    [TethysTargetVersion.V16]: [
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
