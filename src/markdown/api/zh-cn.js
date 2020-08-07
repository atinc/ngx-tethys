module.exports = [
    {
        type: 'DIRECTIVE',
        name: 'Markdown',
        description: 'markdown 解析器',
        properties: [
            {
                name: 'thyMarkdownParser',
                type: 'string',
                default: '-',
                description: 'markdown 文档解析展示'
            },
            {
                name: 'thyMarkdownPlanText',
                type: 'string',
                default: '-',
                description: 'markdown 纯文本展示'
            },
            {
                name: 'thyBypassSecurityTrustHtml',
                type: 'boolean',
                default: 'false',
                description: '是否绕过HTML安全信任机制'
            }
        ]
    }
];
