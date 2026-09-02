import { TargetVersion, UpgradeData } from '@angular/cdk/schematics';

export const upgradeData: UpgradeData = {
    classNames: {
        [TargetVersion.V22]: [
            {
                pr: 'https://github.com/atinc/ngx-tethys',
                changes: [
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
