export const workItemResponseData: any = {
    value: [
        {
            _id: '5f4f4188b43569db7c4d2633',
            identifier: 1674,
            title: '登录注册页面',
            state_id: '5f0059c05cb6ab00182761e7',
            created_at: 1599029640
        },
        {
            _id: '5f4f4188b43569db7c4d26dd',
            identifier: 1675,
            title: '官网页面的修改',
            state_id: '5f0059c05cb6ab00182761e5',
            created_at: 1599029640
        },
        {
            _id: '5f4f4188b43569db7c4d26ff',
            identifier: 1676,
            title: '新增一个研发场景的页面',
            state_id: '5f0059c05cb6ab00182761e5',
            created_at: 1599029640
        },
        {
            _id: '5f4f4188b43569db7c4d2644',
            identifier: 1677,
            title: '设计稿',
            state_id: '5f0059c05cb6ab00182761e9',
            created_at: 1519029640
        },
        {
            _id: '5f4f4188b43569db7c4d2600',
            identifier: 1678,
            title: '博客增加三篇文章',
            state_id: '5f0059c05cb6ab00182761e9',
            created_at: 1529029640
        },
        {
            _id: '5f4f4188b43569db7c4d261d',
            identifier: 1679,
            title: '增加单元测试',
            state_id: '5f0059c05cb6ab00182761e7',
            created_at: 1539029640
        },
        {
            _id: '5f4f4188b43569db7c4d26ca',
            identifier: 1680,
            title: '修改颜色为 #333',
            state_id: '5f0059c05cb6ab00182761e5',
            created_at: 1549029640
        },
        {
            _id: '5f4f4188b43569db7c4d26dv',
            identifier: 1681,
            title: '添加埋点',
            state_id: '5f0059c05cb6ab00182761e7',
            created_at: 1596029640
        },
        {
            _id: '5f4f4188b43569db7c4d26ll',
            identifier: 1682,
            title: '统计数据错误Bug修复',
            state_id: '5f0059c05cb6ab00182761e9',
            created_at: 1579029640
        },
        {
            _id: '5f4f4188b43569db7c4d26vc',
            identifier: 1683,
            title: 'Plan介绍页',
            state_id: '5f0059c05cb6ab00182761e5',
            created_at: 1589029640
        },
        {
            _id: '5f4f4188b43569db7c4d26ff',
            identifier: 1684,
            title: 'Task 001',
            state_id: '5f0059c05cb6ab00182761e5',
            created_at: 1599029623
        }
    ],
    references: {
        states: [
            {
                _id: '5f0059c05cb6ab00182761e5',
                name: '新提交',
                color: '#56ABFB',
                type: 1
            },
            {
                _id: '5f0059c05cb6ab00182761e7',
                name: '已修复',
                color: '#73D897',
                type: 3
            },
            {
                _id: '5f0059c05cb6ab00182761e9',
                name: '已发布',
                color: '#73D897',
                type: 3
            },
            {
                _id: '5f276989beb6b5ec88bd5c10',
                name: '已验收',
                color: '#73D897',
                type: 3
            }
        ]
    },
    count: 60,
    page_index: 0,
    page_size: 10,
    page_count: 1
};

export const addWorkItemResponseData: any = {
    value: {
        _id: '5f4f4188b43569db7c4d269o',
        identifier: 1980,
        title: '【PingCode】登录注册修改',
        state_id: '5f0059c05cb6ab00182761ea',
        created_at: 1599029640
    },
    references: {
        states: [
            {
                _id: '5f0059c05cb6ab00182761ea',
                color: '#AAAAAA',
                name: '已拒绝',
                type: 4
            }
        ]
    }
};
