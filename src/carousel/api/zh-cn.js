module.exports = [
    {
        type: 'component',
        name: 'thy-carousel',
        properties: [
            {
                name: 'thyAutoPlay',
                type: 'boolean',
                default: 'false',
                description: '是否自动切换'
            },
            {
                name: 'thyAutoPlaySpeed',
                type: 'number',
                default: '3000',
                description: '间隔切换时间（毫秒）'
            },
            {
                name: 'thyEffect',
                type: 'thyEffectType',
                default: 'slide',
                description: '动画切换样式, 支持 `"slide" | "fade" | "noop"`'
            },
            {
                name: 'thyShowDot',
                type: 'boolean',
                default: 'true',
                description: '是否显示指示点'
            },
            {
                name: 'thyDotTemplate',
                type: 'TemplateRef',
                default: '-',
                description: 'Dot 渲染模板'
            },
            {
                name: 'thyShowArrow',
                type: 'boolean',
                default: 'true',
                description: '是否显示前进后退按钮'
            },
            {
                name: 'thyArrowTemplate',
                type: 'TemplateRef',
                default: '-',
                description: '前进后退按钮渲染模板'
            },
            {
                name: 'thyTouchable',
                type: 'boolean',
                default: 'true',
                description: '是否支持手势滑动'
            },
            {
                name: 'thyTrigger',
                type: 'string',
                default: 'click',
                description: '在 dot 上切换走马灯的触发方式, 支持 `click` | `trigger`'
            },
            {
                name: '(thyAfterChange)',
                type: 'number',
                default: '',
                description: '切换面板后回调,返回当前帧索引'
            },
            {
                name: '(thyBeforeChange)',
                type: 'FromTo',
                default: 'true',
                description: '触发切换面板前 `FromTo` 类型为 `{from:number, to:number}`'
            }
        ]
    }
];
