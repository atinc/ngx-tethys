import { ClassNameUpgradeData, TargetVersion, VersionChanges } from '@angular/cdk/schematics';

export const classNames: VersionChanges<ClassNameUpgradeData> = {
    ['version 16']: [
        {
            pr: '',
            changes: [
                {
                    replace: 'ThyLabelTypeSize',
                    replaceWith: 'ThyTagSize'
                },
                {
                    replace: 'ThyLabelType',
                    replaceWith: 'ThyTagColor'
                },
                {
                    replace: 'ThyLabelComponent',
                    replaceWith: 'ThyTagComponent'
                },
                {
                    replace: 'ThyLabelModule',
                    replaceWith: 'ThyTagModule'
                },
                {
                    replace: 'ThyActionMenuModule',
                    replaceWith: 'ThyDropdownModule'
                },
                {
                    replace: 'ThyActionMenuTheme',
                    replaceWith: ''
                },
                {
                    replace: 'ThyActionMenuDividerType',
                    replaceWith: ''
                },
                {
                    replace: 'ThyActionMenuComponent',
                    replaceWith: 'ThyDropdownMenuComponent'
                },
                {
                    replace: 'ThyActionMenuGroupComponent',
                    replaceWith: 'ThyDropdownMenuGroupComponent'
                },
                {
                    replace: 'ThyActionMenuDividerComponent',
                    replaceWith: 'ThyDropdownMenuDividerComponent'
                },
                {
                    replace: 'ThyActionMenuDividerTitleDirective',
                    replaceWith: ''
                },
                {
                    replace: 'ActionEnum',
                    replaceWith: 'ThyDropdownTrigger'
                },
                {
                    replace: 'ThyActionMenuToggleDirective',
                    replaceWith: 'ThyDropdownDirective'
                },
                {
                    replace: 'ThyActionMenuSubItemDirective',
                    replaceWith: 'ThyDropdownSubmenuDirective'
                },
                {
                    replace: 'ThyActionMenuItemType',
                    replaceWith: 'ThyDropdownMenuItemType'
                },
                {
                    replace: 'ThyActionMenuItemDirective',
                    replaceWith: 'ThyDropdownMenuItemDirective'
                },
                {
                    replace: 'ThyActionMenuItemIconDirective',
                    replaceWith: 'ThyDropdownMenuItemIconDirective'
                },
                {
                    replace: 'ThyActionMenuItemNameDirective',
                    replaceWith: 'ThyDropdownMenuItemNameDirective'
                },
                {
                    replace: 'ThyActionMenuItemMetaDirective',
                    replaceWith: 'ThyDropdownMenuItemMetaDirective'
                },
                {
                    replace: 'ThyActionMenuItemInfoDirective',
                    replaceWith: 'ThyDropdownMenuItemDescDirective'
                },
                {
                    replace: 'ThyActionMenuItemExtendIconDirective',
                    replaceWith: 'ThyDropdownMenuItemExtendIconDirective'
                },
                {
                    replace: 'ThyActionMenuItemActiveDirective',
                    replaceWith: 'ThyDropdownMenuItemActiveDirective'
                }
            ]
        }
    ]
};
