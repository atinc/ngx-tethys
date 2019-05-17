export const treeSelectNodes = [
    {
        key: '01',
        title: 'root1',
        level: 0,
        icon: 'wtf wtf-drive-o',
        children: [
            {
                key: '0101',
                title: 'child1',
                level: 1,
                icon: 'wtf wtf-file-text',
                children: [
                    {
                        key: '010101',
                        title: 'child11',
                        disabled: 'true',
                        level: 2,
                        icon: 'wtf wtf-file-text',
                        children: []
                    }
                ]
            },
            {
                key: '0102',
                title: 'child2',
                level: 1,
                icon: 'wtf wtf-file-text',
                children: []
            }
        ]
    },
    {
        key: '02',
        title: 'root2',
        level: 0,
        icon: 'wtf wtf-drive-o',
        children: []
    },
    {
        key: '03',
        title: 'root3',
        hidden: true,
        level: 0,
        icon: 'wtf wtf-drive-o',
        children: []
    },
    {
        key: '04',
        title: 'root4',
        hidden: false,
        level: 0,
        icon: 'wtf wtf-drive-o',
        children: []
    },
    {
        key: '05',
        title: 'root5',
        hidden: false,
        level: 0,
        icon: 'wtf wtf-drive-o',
        children: []
    },
    {
        key: '06',
        title: 'root6',
        hidden: false,
        level: 0,
        icon: 'wtf wtf-drive-o',
        children: []
    }
];
