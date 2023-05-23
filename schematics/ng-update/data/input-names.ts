import { InputNameUpgradeData } from '@angular/cdk/schematics';
import { TethysTargetVersion, TethysVersionChanges } from '../core/target-version';

export const inputNames: TethysVersionChanges<InputNameUpgradeData> = {
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
