import { TargetVersion, UpgradeData } from '@angular/cdk/schematics';

export const upgradeData: UpgradeData = {
    classNames: {
        [TargetVersion.V22]: [
            {
                pr: 'https://github.com/atinc/ngx-tethys',
                changes: [
                    { replace: 'ButtonGroupSize', replaceWith: 'ThyButtonSize' },
                    { replace: 'TimePickerSize', replaceWith: 'ThyFormControlSize' },
                    { replace: 'InputSize', replaceWith: 'ThyFormControlSize' },
                    { replace: 'ThyInputSize', replaceWith: 'ThyFormControlSize' },
                    { replace: 'SelectControlSize', replaceWith: 'ThyFormControlSize' },
                    {
                        replace: 'ThyActiveTabInfo',
                        replaceWith: 'ThyActiveTabValue'
                    }
                ]
            }
        ]
    },
    elementSelectors: {},
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
                            attributes: ['thyAction'],
                            elements: ['thy-action']
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
                        replace: 'thyShowRemove',
                        replaceWith: 'thyRemovable',
                        limitedTo: {
                            elements: ['thy-avatar']
                        }
                    },
                    {
                        replace: 'thyAutocompleteComponent',
                        replaceWith: 'thyAutocomplete',
                        limitedTo: {
                            attributes: ['thyAutocompleteTrigger', 'thyAutocomplete']
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
                    }
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
                changes: [{ replace: 'dialog-supper-lg', replaceWith: 'dialog-super-lg' }]
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
                    }
                ]
            }
        ]
    },
    symbolRemoval: {}
};
