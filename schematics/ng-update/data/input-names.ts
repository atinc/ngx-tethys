import { InputNameUpgradeData, VersionChanges } from '@angular/cdk/schematics';
import { TethysTargetVersion } from '../core/target-version';

export const inputNames: VersionChanges<InputNameUpgradeData> = {
    [TethysTargetVersion.V16]: [
        {
            pr: '',
            changes: [
                {
                    replace: 'thyHasHover',
                    replaceWith: 'thyHoverable',
                    limitedTo: {
                        attributes: ['thyLabel', '[thyLabel]']
                    }
                },
                {
                    replace: 'thyLabelColor',
                    replaceWith: 'thyColor',
                    limitedTo: {
                        attributes: ['thyLabel', '[thyLabel]']
                    }
                }
            ]
        }
    ]
};
