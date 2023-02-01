/**
 * @type {import('@docgeni/core').DocgeniConfig}
 */
module.exports = {
    mode: 'full',
    title: 'TETHYS',
    siteProjectName: 'site',
    repoUrl: 'https://github.com/atinc/ngx-tethys',
    logoUrl: 'https://cdn.worktile.com/open-sources/ngx-tethys/logos/tethys.png?100',
    navs: [
        null,
        {
            title: '组件',
            path: 'components',
            lib: 'ngx-tethys',
            locales: {
                'en-us': {
                    title: 'Components'
                }
            }
        },
        {
            title: 'CDK',
            path: 'cdk',
            lib: 'tethys-cdk',
            locales: {
                'en-us': {
                    title: 'Components'
                }
            }
        },
        {
            title: 'GitHub',
            path: 'https://github.com/atinc/ngx-tethys',
            isExternal: true
        },
        {
            title: '更新日志',
            path: 'https://github.com/atinc/ngx-tethys/blob/master/CHANGELOG.md',
            isExternal: true,
            locales: {
                'en-us': {
                    title: 'Changelog'
                }
            }
        }
    ],
    libs: [
        {
            name: 'ngx-tethys',
            abbrName: 'thy',
            rootDir: './src',
            exclude: ['core'],
            apiMode: 'compatible',
            categories: [
                {
                    id: 'general',
                    title: '通用',
                    locales: {
                        'en-us': {
                            title: 'General'
                        }
                    }
                },
                {
                    id: 'layout',
                    title: '布局',
                    locales: {
                        'en-us': {
                            title: 'Layout'
                        }
                    }
                },
                {
                    id: 'nav',
                    title: '导航',
                    locales: {
                        'en-us': {
                            title: 'Navigation'
                        }
                    }
                },
                {
                    id: 'form',
                    title: '数据录入',
                    locales: {
                        'en-us': {
                            title: 'Data Input'
                        }
                    }
                },
                {
                    id: 'display',
                    title: '数据展示',
                    locales: {
                        'en-us': {
                            title: 'Data Show'
                        }
                    }
                },
                {
                    id: 'feedback',
                    title: '反馈',
                    locales: {
                        'en-us': {
                            title: 'Feedback'
                        }
                    }
                },
                {
                    id: 'other',
                    title: '其他',
                    locales: {
                        'en-us': {
                            title: 'Others'
                        }
                    }
                }
            ],
            labels: {
                'lack-doc': {
                    text: 'Lack Doc',
                    color: '#2dbcff'
                }
            }
        },
        {
            name: 'tethys-cdk',
            abbrName: 'thy',
            rootDir: './cdk',
            exclude: ['event'],
            apiMode: 'compatible',
            categories: []
        }
    ],
    footer: "Copyright © 2020-present Powered by <a href='https://worktile.com' target='_blank' >Worktile</a>",
    locales: [
        {
            key: 'zh-cn',
            name: 'ZH'
        }
    ],
    defaultLocale: 'zh-cn'
};
