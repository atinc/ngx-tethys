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
                    { replace: 'SelectControlSize', replaceWith: 'ThyFormControlSize' }
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
                    }
                ]
            }
        ]
    },
    outputNames: {},
    cssTokens: {},
    attributeSelectors: {},
    constructorChecks: {},
    cssSelectors: {},
    methodCallChecks: {},
    propertyNames: {},
    symbolRemoval: {}
};
