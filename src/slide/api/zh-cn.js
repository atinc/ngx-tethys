module.exports = [
    {
        type: 'service',
        name: 'ThySlideService',
        properties: [
            {
                name: 'open',
                description: '打开 Slide',
                type: `( componentOrTemplateRef: ComponentTypeOrTemplateRef<T>, config: ThySlideConfig) => ThySlideRef`,
                default: ''
            },
            {
                name: 'afterOpened',
                description: 'Slide 打开后的回调',
                type: '() => Subject',
                default: ''
            },
            {
                name: 'close',
                description: '关闭 Slide',
                type: '() => void',
                default: ''
            },
            {
                name: 'closeAll',
                description: '关闭所有打开的 Slide',
                type: '() => void',
                default: ''
            },
            {
                name: 'afterAllClosed',
                description: '所有 Slide 完全关闭后的回调',
                type: '() => Subject',
                default: ''
            }
        ]
    },
    {
        type: 'interface',
        name: 'ThySlideConfig',
        description: '用于设置滑动方向,id,幕布等属性',
        properties: [
            {
                name: 'id',
                description: 'Slide 的唯一标识，相同 id 控制是否弹出 slide',
                type: 'string',
                default: ''
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
            },
            {
                name: 'viewContainerRef',
                description:
                    '附加到组件应该位于 Angular 的逻辑组件树中。这会影响注入时的可用内容以及在对话框中实例化的组件的变更检测顺序。这不会影响对象内容的渲染位置。',
                type: 'ViewContainerRef',
                default: ''
            },
            {
                name: 'backdropClass',
                description: '背景板的自定义类。',
                type: 'string | string[]',
                default: 'thy-slide-backdrop'
            },
            {
                name: 'backdropClosable',
                description: '点击背景板是否关闭弹出框',
                type: 'boolean',
                default: 'true'
            },
            {
                name: 'width',
                description: '弹出框宽度',
                type: 'string',
                default: ''
            },
            {
                name: 'height',
                description: '弹出框高度',
                type: 'string',
                default: ''
            },
            {
                name: 'minWidth',
                description: '弹出框最小宽度',
                type: 'number | string',
                default: ''
            },
            {
                name: 'minHeight',
                description: '弹出框最小高度',
                type: 'number | string',
                default: ''
            },
            {
                name: 'maxWidth',
                description: '弹出框最大宽度',
                type: 'number | string',
                default: ''
            },
            {
                name: 'maxHeight',
                description: '弹出框最大高度',
                type: 'number | string',
                default: ''
            },
            {
                name: 'initialState',
                description: '注入到弹出框的值最大高度',
                type: ' TData | null',
                default: ''
            },
            {
                name: 'config',
                description: '是否关闭上一个已打开的slideRef',
                type: 'boolean',
                default: 'true'
            }
        ]
    },
    {
        type: 'interface',
        name: 'ThySlideRef',
        properties: [
            {
                name: 'close',
                description: '关闭当前 Slide',
                type: '() => void',
                default: ''
            },
            {
                name: 'afterOpened',
                description: 'Slide 打开后的回调',
                type: '() => Observable',
                default: ''
            },
            {
                name: 'beforeClosed',
                description: 'Slide 关闭前的回调',
                type: '() => Observable',
                default: ''
            },
            {
                name: 'afterClosed',
                description: 'Slide 关闭后的回调',
                type: '() => Observable',
                default: ''
            },
            {
                name: 'backdropClick',
                description: '点击 Slide 遮罩层的回调',
                type: '() => Observable',
                default: ''
            },
            {
                name: 'getOverlayRef',
                description: '获取 ThySlideRef',
                type: '() => ThySlideRef',
                default: ''
            },
            {
                name: 'updatePosition',
                description: '更新 Slide 位置',
                type: '() => ThySlideRef',
                default: ''
            }
        ]
    },
    {
        type: 'component',
        name: 'thy-slide-header',
        description: '用于设置头部标题,图标,模板等',
        properties: [
            {
                name: 'thyTitle',
                description: 'Slide 标题',
                type: 'string',
                default: ''
            },
            {
                name: 'thyIcon',
                description: 'Slide 标题的图标',
                type: 'string',
                default: ''
            },
            {
                name: 'thyHeader',
                description: '自定义头模板',
                type: 'ContentChild<TemplateRef>',
                default: ''
            },
            {
                name: 'thyHeaderOperate',
                description: '头部操作区域模板',
                type: 'ContentChild<TemplateRef>',
                default: ''
            }
        ]
    },
    {
        type: 'component',
        name: 'thy-slide-body-section',
        properties: [
            {
                name: 'thyDividerBorder',
                description: '是否有分割线',
                type: 'boolean',
                default: 'false'
            }
        ]
    }
];
