import { ElementSelectorUpgradeData, TargetVersion, VersionChanges } from '@angular/cdk/schematics';

export const elementSelectors: VersionChanges<ElementSelectorUpgradeData> = {
    [TargetVersion.V17]: [
        {
            pr: '',
            changes: [
                {
                    replace: '<thy-action-menu ',
                    replaceWith: '<thy-dropdown-menu thyImmediateRender '
                },
                {
                    replace: '<thy-action-menu>',
                    replaceWith: '<thy-dropdown-menu thyImmediateRender>'
                },
                {
                    replace: '</thy-action-menu>',
                    replaceWith: '</thy-dropdown-menu>'
                },
                {
                    replace: 'thy-action-menu-group',
                    replaceWith: 'thy-dropdown-menu-group'
                },
                {
                    replace: 'thy-action-menu-divider',
                    replaceWith: 'thy-divider'
                }
            ]
        }
    ]
};
