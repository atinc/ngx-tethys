module.exports = [
    {
        type: 'component',
        name: 'Config 参数列表',
        description: '用于设置滑动方向,id,幕布等属性',
        properties: [
            {
                name: 'id',
                description: 'Slide 的唯一标识，相同 id 控制是否弹出 slide',
                type: 'string',
                default: 'null'
            },
            {
                name: 'from',
                description: 'slide 进场的方向,可选 left | right | top | bottom',
                type: 'string',
                default: 'right'
            },
            {
                name: 'mode',
                description: 'slide 进场的方向,可选  push | over | slide',
                type: 'string',
                default: 'over'
            },
            {
                name: 'panelClass',
                description: 'slide 上的样式,可以控制 Slide 的 height,width,top,left...',
                type: 'string',
                default: 'thy-slide'
            },
            {
                name: 'hasBackdrop',
                description: 'slide 弹出时，是否有幕布',
                type: 'boolean',
                default: 'true'
            },
            {
                name: 'offset',
                description: 'slide 弹出时，是否有偏移',
                type: 'number',
                default: '0'
            },
            {
                name: 'drawerContainer',
                description: 'slide 弹出的容器，可传入id,HTMLElement or ElementRef<HTMLElement>',
                type: 'string | HTMLElement | ElementRef<HTMLElement>',
                default: ''
            }
        ]
    },
    {
        type: 'component',
        name: 'Thy-slide-header 参数列表',
        description: '用于设置头部标题,图标,模板等',
        properties: [
            {
                name: 'thyTitle',
                description: 'Slide 标题',
                type: 'string',
                default: 'null'
            },
            {
                name: 'thyIcon',
                description: 'Slide 标题的图标',
                type: 'string',
                default: 'null'
            },
            {
                name: 'thyHeader',
                description: '自定义头模板',
                type: 'TemplateRef',
                default: 'null'
            },
            {
                name: 'thyHeaderOperate',
                description: '头部操作区域模板',
                type: 'TemplateRef',
                default: 'null'
            }
        ]
    }
];
