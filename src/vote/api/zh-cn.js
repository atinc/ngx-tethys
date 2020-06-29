module.exports = [
    {
        type: 'component',
        name: 'thy-vote',
        description: '用于投票操作，和投票数据展示',
        properties: [
            {
                name: 'thyVote',
                description: '标签类型（primary、success、primary-weak、success-weak)',
                type: 'ThyVote',
                default: 'primary'
            },
            {
                name: 'thyLayout',
                description: '标签类型（horizontal、vertical)',
                type: 'thyLayout',
                default: 'horizontal'
            },
            {
                name: 'thySize',
                description: 'thyLayout="vertical"支持"sm"和"default"',
                type: 'string',
                default: 'default'
            },
            {
                name: 'thyHasVoted',
                description: '是否赞同',
                type: 'boolean',
                default: 'false'
            },
            {
                name: 'thyVoteCount',
                description: '赞同的数量',
                type: 'number | string',
                default: ''
            },
            {
                name: 'thyIcon',
                description: '图标',
                type: 'string',
                default: 'thumb-up'
            },
            {
                name: 'thyRound',
                description: '是否是偏圆型',
                type: 'boolean',
                default: 'false'
            }
        ]
    }
];
