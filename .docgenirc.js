module.exports = {
    baseHref: '/',
    heads: [],
    mode: 'site',
    title: 'NgxTethys',
    docsPath: './docs',
    siteProjectName: 'site',
    output: 'dist/docs-site',
    repoUrl: 'https://github.com/docgeni/docgeni',
    logoUrl: 'https://cdn.worktile.com/open-sources/ngx-tethys/logos/tethys.png',
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
            title: 'Legacy Docs',
            path: 'https://lib.worktile.live/ngx-tethys/legacy/',
            isExternal: true
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
            exclude: [],
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
            ]
        }
    ],
    locales: [
        {
            key: 'zh-cn',
            name: 'ZH'
        }
    ]
};
