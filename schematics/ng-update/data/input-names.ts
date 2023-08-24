import { InputNameUpgradeData, TargetVersion, VersionChanges } from '@angular/cdk/schematics';

export const inputNames: VersionChanges<InputNameUpgradeData> = {
    [TargetVersion.V16]: [
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
                },
                {
                    replace: 'thyActionMenuToggle',
                    replaceWith: 'thyDropdown',
                    limitedTo: {
                        attributes: ['thyActionMenuToggle', '[thyActionMenuToggle]']
                    }
                },
                {
                    replace: 'thyAction',
                    replaceWith: 'thyTrigger',
                    limitedTo: {
                        attributes: ['thyActionMenuToggle', '[thyActionMenuToggle]']
                    }
                },
                {
                    replace: 'thyContainerClass',
                    replaceWith: 'thyPanelClass',
                    limitedTo: {
                        attributes: ['thyActionMenuToggle', '[thyActionMenuToggle]']
                    }
                },
                {
                    replace: 'thyOriginActiveClass',
                    replaceWith: 'thyActiveClass',
                    limitedTo: {
                        attributes: ['thyActionMenuToggle', '[thyActionMenuToggle]']
                    }
                },
                {
                    replace: 'thyActionMenuItemInfo',
                    replaceWith: 'Desc',
                    limitedTo: {
                        attributes: ['thyActionMenuItemInfo', '[thyActionMenuItemInfo]']
                    }
                },
                {
                    replace: 'thyTitle',
                    replaceWith: 'thyText',
                    limitedTo: {
                        elements: ['thy-action-menu-divider']
                    }
                }
            ]
        }
    ]
};
