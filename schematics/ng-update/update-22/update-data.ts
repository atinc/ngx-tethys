import { TargetVersion, UpgradeData } from '@angular/cdk/schematics';

export const upgradeData: UpgradeData = {
    classNames: {
        [TargetVersion.V22]: [
            {
                pr: 'https://github.com/atinc/ngx-tethys',
                changes: [
                    { replace: 'ButtonGroupSize', replaceWith: 'ThyButtonSize' },
                    { replace: 'ThyButtonType', replaceWith: 'ThyButtonColor' },
                    { replace: 'InputGroupSize', replaceWith: 'ThyInputGroupSize' },
                    {
                        replace: 'ThyActiveTabInfo',
                        replaceWith: 'ThyActiveTabValue'
                    },
                    { replace: 'ThyNavType', replaceWith: 'ThyNavVariant' },
                    { replace: 'ThyTabsType', replaceWith: 'ThyTabsVariant' },
                    { replace: 'ThySliderType', replaceWith: 'ThySliderColor' },
                    { replace: 'ThyActionType', replaceWith: 'ThyActionColor' },
                    {
                        replace: 'ThyStackedValue',
                        replaceWith: 'ThyProgressStackedValue'
                    },
                    {
                        replace: 'CompatibleDate',
                        replaceWith: 'ThyCompatibleDate'
                    },
                    { replace: 'ThyDividerStyle', replaceWith: 'ThyDividerAppearance' },
                    { replace: 'ThyInputSearchTheme', replaceWith: 'ThyInputSearchAppearance' }
                ]
            }
        ]
    },
    elementSelectors: {
        [TargetVersion.V22]: [
            {
                pr: 'https://github.com/atinc/ngx-tethys',
                changes: [{ replace: 'thy-link', replaceWith: 'thy-anchor-link' }]
            }
        ]
    },
    inputNames: {
        [TargetVersion.V22]: [
            {
                pr: 'https://github.com/atinc/ngx-tethys',
                changes: [
                    {
                        replace: 'type',
                        replaceWith: 'thyType',
                        limitedTo: {
                            elements: ['thy-input']
                        }
                    },
                    {
                        replace: 'thyTheme',
                        replaceWith: 'thyAppearance',
                        limitedTo: {
                            elements: ['thy-collapse']
                        }
                    },
                    {
                        replace: 'thyTheme',
                        replaceWith: 'thyAppearance',
                        limitedTo: {
                            attributes: ['thyAction'],
                            elements: ['thy-action']
                        }
                    },
                    {
                        replace: 'thyTheme',
                        replaceWith: 'thyAppearance',
                        limitedTo: {
                            attributes: ['thyDot', 'thy-dot'],
                            elements: ['thy-dot']
                        }
                    },
                    {
                        replace: 'thyTheme',
                        replaceWith: 'thyAppearance',
                        limitedTo: {
                            attributes: ['thyTag'],
                            elements: ['thy-tag']
                        }
                    },
                    {
                        replace: 'thyTheme',
                        replaceWith: 'thyAppearance',
                        limitedTo: {
                            elements: ['thy-alert']
                        }
                    },
                    {
                        replace: 'thyTheme',
                        replaceWith: 'thyAppearance',
                        limitedTo: {
                            elements: ['thy-input-search']
                        }
                    },
                    {
                        replace: 'thyType',
                        replaceWith: 'thyColor',
                        limitedTo: {
                            elements: ['thy-alert']
                        }
                    },
                    {
                        replace: 'thyType',
                        replaceWith: 'thyColor',
                        limitedTo: {
                            elements: ['thy-button']
                        }
                    },
                    {
                        replace: 'thyType',
                        replaceWith: 'thyColor',
                        limitedTo: {
                            elements: ['thy-slider']
                        }
                    },
                    {
                        replace: 'thyType',
                        replaceWith: 'thyColor',
                        limitedTo: {
                            elements: ['thy-switch']
                        }
                    },
                    {
                        replace: 'thyType',
                        replaceWith: 'thyColor',
                        limitedTo: {
                            elements: ['thy-badge']
                        }
                    },
                    {
                        replace: 'thyType',
                        replaceWith: 'thyColor',
                        limitedTo: {
                            attributes: ['thyBadge']
                        }
                    },
                    {
                        replace: 'thyType',
                        replaceWith: 'thyColor',
                        limitedTo: {
                            attributes: ['thyAction'],
                            elements: ['thy-action']
                        }
                    },
                    {
                        replace: 'thyContext',
                        replaceWith: 'thyContent',
                        limitedTo: {
                            elements: ['thy-badge']
                        }
                    },
                    {
                        replace: 'thyContext',
                        replaceWith: 'thyContent',
                        limitedTo: {
                            attributes: ['thyBadge']
                        }
                    },
                    {
                        replace: 'thyHasBorder',
                        replaceWith: 'thyDivided',
                        limitedTo: {
                            attributes: ['thyHeader'],
                            elements: ['thy-header']
                        }
                    },
                    {
                        replace: 'thyNavLinkActive',
                        replaceWith: 'thyNavItemActive',
                        limitedTo: {
                            attributes: ['thyNavItem']
                        }
                    },
                    {
                        replace: 'thyType',
                        replaceWith: 'thyVariant',
                        limitedTo: {
                            elements: ['thy-nav']
                        }
                    },
                    {
                        replace: 'thyType',
                        replaceWith: 'thyVariant',
                        limitedTo: {
                            elements: ['thy-tabs']
                        }
                    },
                    {
                        replace: 'thyShowRemove',
                        replaceWith: 'thyRemovable',
                        limitedTo: {
                            elements: ['thy-avatar']
                        }
                    },
                    {
                        replace: 'placeholder',
                        replaceWith: 'thyPlaceholder',
                        limitedTo: {
                            elements: ['thy-input', 'thy-input-search']
                        }
                    },
                    {
                        replace: 'thyPlaceHolder',
                        replaceWith: 'thyPlaceholder',
                        limitedTo: {
                            elements: [
                                'thy-select',
                                'thy-custom-select',
                                'thy-date-picker',
                                'thy-range-picker',
                                'thy-month-picker',
                                'thy-quarter-picker',
                                'thy-year-picker',
                                'thy-week-picker'
                            ],
                            attributes: ['thyDatePicker', 'thyRangePicker']
                        }
                    },
                    {
                        replace: 'thyAutocompleteComponent',
                        replaceWith: 'thyAutocomplete',
                        limitedTo: {
                            attributes: ['thyAutocompleteTrigger', 'thyAutocomplete']
                        }
                    },
                    {
                        replace: 'thyStyle',
                        replaceWith: 'thyAppearance',
                        limitedTo: {
                            elements: ['thy-divider']
                        }
                    }
                ]
            }
        ]
    },
    outputNames: {
        [TargetVersion.V22]: [
            {
                pr: 'https://github.com/atinc/ngx-tethys',
                changes: [
                    {
                        replace: 'thyOnRemove',
                        replaceWith: 'thyRemove',
                        limitedTo: {
                            elements: ['thy-avatar']
                        }
                    },
                    {
                        replace: 'clear',
                        replaceWith: 'thyClear',
                        limitedTo: {
                            elements: ['thy-input-search']
                        }
                    }
                ]
            }
        ]
    },
    cssTokens: {
        [TargetVersion.V22]: [
            {
                pr: 'https://github.com/atinc/ngx-tethys',
                changes: [
                    // Input / FormControl
                    { replace: '$input-btn-height', replaceWith: '$input-btn-height-lg', replaceIn: { stylesheet: true } },
                    { replace: '$input-btn-line-height', replaceWith: '$input-btn-line-height-lg', replaceIn: { stylesheet: true } },
                    { replace: '$input-btn-padding-x', replaceWith: '$input-btn-padding-x-lg', replaceIn: { stylesheet: true } },
                    { replace: '$input-btn-padding-y', replaceWith: '$input-btn-padding-y-lg', replaceIn: { stylesheet: true } },
                    { replace: '$input-padding-x', replaceWith: '$input-padding-x-lg', replaceIn: { stylesheet: true } },
                    { replace: '$input-padding-y', replaceWith: '$input-padding-y-lg', replaceIn: { stylesheet: true } },
                    { replace: '$input-border-radius', replaceWith: '$input-border-radius-lg', replaceIn: { stylesheet: true } },
                    { replace: '$input-font-size', replaceWith: '$input-font-size-lg', replaceIn: { stylesheet: true } },
                    // Button
                    { replace: '$btn-line-height', replaceWith: '$btn-line-height-lg', replaceIn: { stylesheet: true } },
                    { replace: '$btn-padding-x', replaceWith: '$btn-padding-x-lg', replaceIn: { stylesheet: true } },
                    { replace: '$btn-padding-y', replaceWith: '$btn-padding-y-lg', replaceIn: { stylesheet: true } },
                    {
                        replace: '$btn-icon-circle-padding-base',
                        replaceWith: '$btn-icon-circle-padding-lg',
                        replaceIn: { stylesheet: true }
                    },
                    { replace: '$btn-icon-only-padding-x', replaceWith: '$btn-icon-only-padding-x-lg', replaceIn: { stylesheet: true } },
                    // SelectControl
                    {
                        replace: '$select-control-height-default',
                        replaceWith: '$select-control-height-lg',
                        replaceIn: { stylesheet: true }
                    },
                    {
                        replace: '$select-control-padding-y-default',
                        replaceWith: '$select-control-padding-y-lg',
                        replaceIn: { stylesheet: true }
                    },
                    // Divider
                    { replace: '$divider-deeper-color', replaceWith: '$gray-300', replaceIn: { stylesheet: true } }
                ]
            }
        ]
    },
    attributeSelectors: {
        [TargetVersion.V22]: [
            {
                pr: 'https://github.com/atinc/ngx-tethys',
                changes: [
                    {
                        replace: 'thyNavLink',
                        replaceWith: 'thyNavItem'
                    },
                    {
                        replace: 'thyLink',
                        replaceWith: 'thyAnchorLink'
                    }
                ]
            }
        ]
    },
    constructorChecks: {},
    cssSelectors: {
        [TargetVersion.V22]: [
            {
                pr: 'https://github.com/atinc/ngx-tethys',
                changes: [
                    { replace: 'dialog-supper-lg', replaceWith: 'dialog-super-lg' },
                    { replace: 'thy-divider-deeper', replaceWith: 'thy-divider-light' }
                ]
            }
        ]
    },
    methodCallChecks: {},
    propertyNames: {
        [TargetVersion.V22]: [
            {
                pr: 'https://github.com/atinc/ngx-tethys',
                changes: [
                    {
                        replace: 'supperLg',
                        replaceWith: 'superLg',
                        limitedTo: {
                            classes: ['ThyDialogSizes']
                        }
                    },
                    {
                        replace: 'setKeepEditing',
                        replaceWith: 'setEditing',
                        limitedTo: {
                            classes: ['ThyPropertyItem']
                        }
                    },
                    {
                        replace: 'avatarSrcTransform',
                        replaceWith: 'srcTransform',
                        limitedTo: {
                            classes: ['ThyAvatarService']
                        }
                    }
                ]
            }
        ]
    },
    symbolRemoval: {
        [TargetVersion.V22]: [
            {
                pr: 'https://github.com/atinc/ngx-tethys',
                changes: [
                    {
                        module: 'ngx-tethys/tree-select',
                        name: 'ThyTreeSelectType',
                        message: 'ThyTreeSelectType has been removed along with thy-tree-select thyIconType.'
                    }
                ]
            }
        ]
    }
};
