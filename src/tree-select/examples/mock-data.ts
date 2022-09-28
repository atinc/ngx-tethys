import { ThyTreeSelectNode } from './tree-select.class';

const getBigData = (path = '0', level = 2, catalog = 30) => {
    const list: ThyTreeSelectNode[] = [];
    Array.from({ length: catalog }).forEach((v, k) => {
        const key = `${path}-${k}`;
        const treeNode = {
            name: key,
            expand: true,
            _id: key,
            ...(level > 0 && { children: getBigData(key, level - 1) })
        };
        list.push(treeNode);
    });
    return list;
};

export const bigTreeNodes: any[] = getBigData();

export const basicTreeSelectData: ThyTreeSelectNode[] = [
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

export const moreOptionTreeSelectData: ThyTreeSelectNode[] = [
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

export const hiddenOptionTreeSelectData: ThyTreeSelectNode[] = [
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

export const disabledOptionTreeSelectData: ThyTreeSelectNode[] = [
    {
        key: 'parent-001',
        title: 'parent-1',
        level: 0,
        icon: '',
        fnHidden: false,
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
        disabled: true,
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
    },
    {
        key: 'parent-003',
        title: 'parent-3',
        level: 0,
        icon: '',
        hidden: false,
        disabled: true,
        fnHidden: false
    }
];

export const searchTreeSelectData: ThyTreeSelectNode[] = [
    {
        _id: 'epic-001',
        name: '史诗1',
        level: 0,
        icon: 'epic-square-fill',
        children: [
            {
                _id: 'feature-001',
                name: '特性1',
                level: 1,
                icon: 'feature-square-fill',
                children: [
                    {
                        _id: 'user-story-001',
                        name: '用户故事1',
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
        name: '另一个史诗2',
        level: 0,
        icon: 'epic-square-fill',
        children: [
            {
                _id: 'feature-002-1',
                name: '特性2-1',
                level: 1,
                icon: 'feature-square-fill',
                children: [
                    {
                        _id: 'user-story-002-1',
                        name: '用户故事2-1-1',
                        level: 2,
                        icon: 'user-story-square-fill',
                        children: []
                    }
                ]
            },
            {
                _id: 'feature-002-2',
                name: '特性2-2',
                level: 1,
                icon: 'feature-square-fill',
                children: [
                    {
                        _id: 'user-story-002-2',
                        name: '用户故事2-2-1',
                        level: 2,
                        icon: 'user-story-square-fill',
                        children: []
                    },
                    {
                        _id: 'user-story-002-2',
                        name: '特性2-2-2',
                        level: 2,
                        icon: 'user-story-square-fill',
                        children: []
                    }
                ]
            }
        ]
    }
];
