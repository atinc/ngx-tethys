import { InputNameUpgradeData, TargetVersion, VersionChanges } from '@angular/cdk/schematics';

export const inputNames: VersionChanges<InputNameUpgradeData> = {
    [TargetVersion.V15]: [
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
