import { TargetVersion, UpgradeData } from '@angular/cdk/schematics';

export const upgradeData: UpgradeData = {
    classNames: {},
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
