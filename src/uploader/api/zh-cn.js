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
                name: 'thySizeExceedsHandler',
                description: '文件上传超出限制处理事件,type:‘SiZE_LIMIT_EXCEEDS’表示超出文件大小限制',
                type: '(data: ErrorData)=>{}',
                default: ''
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
                name: 'thySizeThreshold',
                description: '文件上传大小限制,单位kb，默认为0，表示没有任何限制',
                type: 'number',
                default: '0'
            }
        ]
    }
];
