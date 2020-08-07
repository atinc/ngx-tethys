export const basicTreeSelectData = [
    {
        _id: 'epic-001',
        name: '史诗',
        level: 0,
        icon: 'epic-square-fill',
        children: [
            {
                _id: 'feature-001',
                name: '特性',
                level: 1,
                icon: 'feature-square-fill',
                children: [
                    {
                        _id: 'user-story-001',
                        name: '用户故事',
                        level: 2,
                        icon: 'user-story-square-fill',
                        children: []
                    }
                ]
            }
        ]
    },
    {
        _id: 'epic-002',
        name: '另一个史诗',
        level: 0,
        icon: 'epic-square-fill',
        children: []
    }
];

export const moreOptionTreeSelectData = [
    {
        key: 'parent-001',
        title: 'parent-1',
        level: 0,
        icon: '',
        children: [
            {
                key: 'parent-001-a',
                title: 'parent-1-1',
                level: 1,
                icon: '',
                children: [
                    {
                        key: 'child-001',
                        title: 'child-1',
                        level: 2,
                        icon: ''
                    },
                    {
                        key: 'child-002',
                        title: 'chile-2',
                        level: 2,
                        icon: ''
                    }
                ]
            },
            {
                key: 'parent-001-b',
                title: 'parent-1-2',
                level: 1,
                icon: '',
                children: []
            }
        ]
    },
    {
        key: 'parent-002',
        title: 'parent-2',
        level: 0,
        icon: '',
        hidden: false,
        children: [
            {
                key: 'parent-002-a',
                title: 'parent-2-1',
                level: 1,
                icon: '',
                children: []
            }
        ]
    }
];

export const hiddenOptionTreeSelectData = [
    {
        key: 'parent-001',
        title: 'parent-1',
        level: 0,
        icon: '',
        fnHidden: true,
        children: [
            {
                key: 'parent-001-a',
                title: 'parent-1-1',
                level: 1,
                icon: '',
                children: [
                    {
                        key: 'child-001',
                        title: 'child-1',
                        level: 2,
                        icon: ''
                    },
                    {
                        key: 'child-002',
                        title: 'chile-2',
                        level: 2,
                        icon: ''
                    }
                ]
            },
            {
                key: 'parent-001-b',
                title: 'parent-1-2',
                level: 1,
                icon: '',
                children: []
            }
        ]
    },
    {
        key: 'parent-002',
        title: 'parent-2',
        level: 0,
        icon: '',
        hidden: false,
        disabled: false,
        fnHidden: false,
        children: [
            {
                key: 'parent-002-a',
                title: 'parent-2-1',
                level: 1,
                icon: '',
                children: []
            }
        ]
    }
];

export const disabledOptionTreeSelectData = [
    {
        key: 'parent-001',
        title: 'parent-1',
        level: 0,
        icon: '',
        fnHidden: true,
        children: [
            {
                key: 'parent-001-a',
                title: 'parent-1-1',
                level: 1,
                icon: '',
                children: [
                    {
                        key: 'child-001',
                        title: 'child-1',
                        level: 2,
                        icon: ''
                    },
                    {
                        key: 'child-002',
                        title: 'chile-2',
                        level: 2,
                        icon: ''
                    }
                ]
            },
            {
                key: 'parent-001-b',
                title: 'parent-1-2',
                level: 1,
                icon: '',
                children: []
            }
        ]
    },
    {
        key: 'parent-002',
        title: 'parent-2',
        level: 0,
        icon: '',
        hidden: false,
        disabled: false,
        fnHidden: false,
        children: [
            {
                key: 'parent-002-a',
                title: 'parent-2-1',
                level: 1,
                icon: '',
                children: []
            }
        ]
    }
];
