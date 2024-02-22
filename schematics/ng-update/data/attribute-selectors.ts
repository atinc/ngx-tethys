import { AttributeSelectorUpgradeData, TargetVersion, VersionChanges } from '@angular/cdk/schematics';

export const attributeSelectors: VersionChanges<AttributeSelectorUpgradeData> = {
    [TargetVersion.V17]: [
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
                    replaceWith: 'thyTag\n'
                },
                {
                    replace: 'thyLabel>',
                    replaceWith: 'thyTag>'
                },
                {
                    replace: 'thyActionMenuDividerTitle',
                    replaceWith: ''
                },
                {
                    replace: '[thyActionMenuDividerTitle]',
                    replaceWith: ''
                },
                {
                    replace: 'thyActionMenuSubItem',
                    replaceWith: 'thyDropdownSubmenu '
                },
                {
                    replace: 'thyActionMenuSubItem=',
                    replaceWith: 'thyDropdownSubmenu thyDirection='
                },
                {
                    replace: '[thyActionMenuSubItem]=',
                    replaceWith: 'thyDropdownSubmenu [thyDirection]='
                },
                {
                    replace: 'thyActionMenuItem',
                    replaceWith: 'thyDropdownMenuItem'
                }
            ]
        }
    ]
};
