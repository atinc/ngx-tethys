import { ElementSelectorUpgradeData, VersionChanges } from '@angular/cdk/schematics';
import { TethysTargetVersion } from '../core/target-version';

export const elementSelectors: VersionChanges<ElementSelectorUpgradeData> = {
    [TethysTargetVersion.V16]: [
        {
            pr: '',
            changes: [
                {
                    replace: 'thy-action-menu',
                    replaceWith: 'thy-dropdown-menu'
                }
            ]
        }
    ]
};
