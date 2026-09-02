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
                        replace: 'thyHasBorder',
                        replaceWith: 'thyDivided',
                        limitedTo: {
                            attributes: ['thyHeader'],
                            elements: ['thy-header']
                        }
                    },
                    {
                        replace: 'thyShowRemove',
                        replaceWith: 'thyRemovable',
                        limitedTo: {
                            elements: ['thy-avatar']
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
                    }
                ]
            }
        ]
    },
    cssTokens: {},
    attributeSelectors: {},
    constructorChecks: {},
    cssSelectors: {},
    methodCallChecks: {},
    propertyNames: {},
    symbolRemoval: {}
};
