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
