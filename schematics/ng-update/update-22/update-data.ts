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
                    }
                ]
            }
        ]
    },
    outputNames: {},
    cssTokens: {},
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
    cssSelectors: {},
    methodCallChecks: {},
    propertyNames: {},
    symbolRemoval: {}
};
