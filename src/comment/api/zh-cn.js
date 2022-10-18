module.exports = [
    {
        type: 'component',
        name: 'thy-comment',
        description: '用于内容的评论、反馈',
        properties: [
            {
                name: 'thyAuthor',
                description: '展示评论作者',
                type: 'string',
                default: ''
            },
            {
                name: 'thyAvatar',
                description: '展示评论作者头像',
                type: 'string',
                default: ''
            },
            {
                name: 'thyDate',
                description: '展示评论时间',
                type: 'string',
                default: ''
            }
        ]
    }
];
