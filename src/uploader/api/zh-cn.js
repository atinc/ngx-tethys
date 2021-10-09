module.exports = [
    {
        type: 'component',
        name: 'thy-file-select, thyFileSelect',
        description: '通过点击或者拖拽上传文件',
        properties: [
            {
                name: '(thyOnFileSelect)',
                description: '文件选择事件',
                type: 'EventEmitter<{ files: File[], nativeEvent: Event}>',
                default: ''
            },
            {
                name: 'thySizeExceedsHandler',
                description: '文件上传超出限制处理事件',
                type: '(data: ThyFileSizeExceedsContext) => File[] | undefined | void',
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
                description: '文件上传大小限制,单位`kb`，`0`表示没有任何限制',
                type: 'number',
                default: 0
            }
        ]
    },
    {
        type: 'service',
        name: 'ThyUploaderService',
        description: '文件远程上传服务',
        properties: [
            {
                name: 'upload',
                description: '单个文件上传方法',
                type: 'upload(uploadFile: ThyUploadFile): Observable<ThyUploadResponse>',
                default: ''
            },
            {
                name: 'uploadBulk',
                description: '批量上传方法，`concurrent`为并发上传最大限制数，默认为`5`',
                type:
                    'uploadBulk(uploadFiles: ThyUploadFile[], concurrent = 5, options?: ThyUploadFilesOptions): Observable<ThyUploadResponse>',
                default: ''
            }
        ]
    },
    {
        type: 'interface',
        name: 'ThyUploadFile',
        description: '文件上传对象',
        properties: [
            {
                name: 'method',
                description: '上传方法',
                type: '`POST | PUT`',
                default: ''
            },
            {
                name: 'url',
                description: '远程上传地址',
                type: 'string',
                default: ''
            },
            {
                name: 'nativeFile',
                description: '原始文件',
                type: 'File',
                default: ''
            },
            {
                name: 'identifier',
                description: '文件唯一标识',
                type: 'string',
                default: ''
            },
            {
                name: 'withCredentials',
                description: '是否携带认证信息',
                type: 'boolean',
                default: ''
            },
            {
                name: 'fileName',
                description: '文件名',
                type: 'string',
                default: 'nativeFile.name'
            },
            {
                name: 'fileField',
                description: '文件字段',
                type: 'string',
                default: 'file'
            },
            {
                name: 'headers',
                description: '请求头',
                type: 'Record<string, string>',
                default: ''
            },
            {
                name: 'data',
                description: '请求数据',
                type: 'Record<string, string>',
                default: ''
            },
            {
                name: 'response',
                description: '上传响应结果',
                type: 'Response',
                default: ''
            },
            {
                name: 'progress',
                description: '上传进度',
                type: `{
                    status: ThyUploadStatus;
                    percentage: number;
                    speed?: number;
                    speedHuman?: string;
                    startTime: number | null;
                    endTime?: number | null;
                    estimatedTime?: number | null;
                    estimatedTimeHuman?: string | null;
                }`,
                default: ''
            }
        ]
    }
];
