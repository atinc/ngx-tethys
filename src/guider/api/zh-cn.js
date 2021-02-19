module.exports = [
    {
        type: 'service',
        name: 'thy-guider',
        description: '新手引导服务',
        properties: [
            {
                name: 'config',
                description: 'Guider 的配置项',
                type: 'ThyGuiderConfig',
                default: '-'
            }
        ]
    },
    {
        type: 'class',
        name: 'config参数',
        description: '新手引导服务的配置项',
        properties: [
            {
                name: 'hintComponent',
                description: '新手引导内容组件',
                type: 'component',
                default: 'ThyGuiderHintComponent'
            },
            {
                name: 'steps',
                description: '新手引导步骤信息',
                type: 'ThyGuiderStep[]',
                default: ''
            },
            {
                name: 'hintPlacement',
                description: '新手引导内容组件基于 target 元素的方位',
                type: 'ThyPlacement',
                default: 'rightBottom'
            },
            {
                name: 'hintOffset',
                description: '新手引导内容组件基于位置的偏移量（与 popover 中 offset 相同作用）',
                type: 'number',
                default: '4'
            },
            {
                name: 'pointOffset',
                description: '新手引导高亮圆圈基于默认位置的偏移量',
                type: '[number,number]',
                default: '[0,0]'
            },
            {
                name: 'defaultPosition',
                description: '新手引导内容组件默认位置（基于浏览器视窗，优先级小于 hintPlacement',
                type: '[number,number]',
                default: '[0,0]'
            },
            {
                name: 'hintClass',
                description: '新手引导弹窗的自定义类',
                type: 'string | string[]',
                default: ''
            }
        ]
    },
    {
        type: 'interface',
        name: 'ThyGuiderStep',
        description: '新手引导步骤的详细设置',
        properties: [
            {
                name: 'key',
                description: '步骤的唯一标识符',
                type: 'string',
                default: ''
            },
            {
                name: 'target',
                description: '步骤的目标DOM selectors，如果为 [number,number] 类型则是相对浏览器视窗的位置',
                type: 'string | [number,number]',
                default: ''
            },
            {
                name: 'data',
                description: '新手引导内容组件的值',
                type: 'TData',
                default: ''
            },
            {
                name: 'route',
                description: '步骤对应的路由',
                type: 'string',
                default: ''
            },
            {
                name: 'hintPlacement',
                description: '当前步骤内容组件基于 target 元素的方位',
                type: 'ThyPlacement',
                default: 'rightBottom'
            },
            {
                name: 'hintOffset',
                description: '当前步骤内容组件基于位置的偏移量（与 popover 中 offset 相同作用）',
                type: 'number',
                default: '4'
            },
            {
                name: 'pointOffset',
                description: '当前步骤高亮圆圈基于默认位置的偏移量',
                type: '[number,number]',
                default: '[0,0]'
            },
            {
                name: 'defaultPosition',
                description: '新手引导内容组件默认位置（基于浏览器视窗，优先级小于 hintPlacement',
                type: '[number,number]',
                default: '[0,0]'
            }
        ]
    },
    {
        type: 'directive',
        name: 'thyGuiderTarget',
        description: '标记新手引导的步骤的target，使用指令方式的新手引导支持多路由跳转。',
        properties: [
            {
                name: 'thyGuiderTarget',
                description: '标记当前元素对应的新手引导中 step 的 key',
                type: 'string',
                default: ''
            }
        ]
    },
    {
        type: 'class',
        name: 'ThyGuiderStepRef',
        description: '当前执行的新手引导的 ref，用于操作新手引导',
        properties: [
            {
                name: 'start',
                description: '开始新手引导，接收步骤的 index 值，从某一步骤开始新手引导',
                type: 'function'
            },
            {
                name: 'stepChange',
                description: '步骤发生变化时，通过此方法获取通知',
                type: 'function'
            },
            {
                name: 'ended',
                description: '新手引导完成（跳过）时，通过此方法获取通知',
                type: 'function'
            },
            {
                name: 'closed',
                description: '新手引导关闭时，通过此方法获取通知',
                type: 'function'
            },
            {
                name: 'targetClicked',
                description: '当前步骤的新手引导所依靠的 target DOM 被点击时发出通知',
                type: 'function'
            },
            {
                name: 'next',
                description: '进入新手引导的下一步，通常在提示组件中使用',
                type: 'function'
            },
            {
                name: 'previous',
                description: '进入新手引导的上一步，通常在提示组件中使用',
                type: 'function'
            },
            {
                name: 'active',
                description: '跳转入新手引导的某一步，支持 index 以及 key 两种方式',
                type: 'function'
            },
            {
                name: 'close',
                description: '关闭当前新手引导步骤',
                type: 'function'
            },
            {
                name: 'end',
                description: '完成/跳过当前新手引导',
                type: 'function'
            }
        ]
    }
];
