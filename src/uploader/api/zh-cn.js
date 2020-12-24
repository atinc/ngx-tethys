module.exports = [
    {
        type: 'component',
        name: 'thy-file-select, thyFileSelect',
        description: '通过点击或者拖拽上传文件',
        properties: [
            {
                name: 'thyOnFileSelect',
                description: '文件选择事件',
                type: 'EventEmitter',
                default: '$event: { files: File[], nativeEvent: Event}'
            },
            {
                name: 'thyMultiple',
                description: '文件是否多选',
                type: 'boolean',
                default: 'false'
            },
            {
                name: 'thyAcceptType',
                description: '指定文件后缀类型（MIME_Map），例如".xls,xlsx"，"[".doc",".docx"]" ',
                type: 'string | string[]',
                default: ''
            },
            {
                name: 'thyAcceptMaxSize',
                description: '文件上传大小限制',
                type: 'number',
                default: '200M'
            }
        ]
    }
];
