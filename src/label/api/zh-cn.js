module.exports = [
    {
        type: 'directive',
        name: 'thyLabel',
        properties: [
            {
                name: 'thyLabel',
                description: `标签常用类型，类型为\`'default'|'primary' | 'success' | 'info' | 'warning' | 'danger' | 'success' | 'emboss-default' | 'emboss-primary' | 'emboss-warning' | 'emboss-danger'| 'outline'\``,
                type: 'String',
                default: ''
            },
            {
                name: 'thySize',
                description: '标签大小，目前可传：sm | default | md | lg, 默认为 default',
                type: 'String',
                default: 'default'
            },
            {
                name: 'thyLabelType',
                description: '标签状态类型，目前支持 `state | pill`',
                type: 'String',
                default: 'state'
            },
            {
                name: 'thyBeforeIcon',
                description: '标签支持在显示文案前添加图标',
                type: 'String',
                default: ''
            },
            {
                name: 'thyAfterIcon',
                description: '标签支持在显示文案后添加图标',
                type: 'String',
                default: ''
            },
            {
                name: 'thyLabelColor',
                description: '标签支持自定义颜色，需要与`thyLabel`属性同时使用',
                type: 'String',
                default: ''
            },
            {
                name: 'thyBackgroundOpacity',
                description: '标签支持自定义背景颜色透明度，配合`thyLabelColor`使用，范围为：0～1',
                type: 'Number',
                default: 0.1
            },
            {
                name: 'thyHasHover',
                description: '标签是否支持鼠标滑过有效果，一般在标签有操作时使用',
                type: 'Boolean',
                default: 'false'
            },
            {
                name: 'thyOnRemove',
                description: '标签支持移除操作',
                type: 'EventEmitter',
                default: ''
            }
        ]
    }
];
