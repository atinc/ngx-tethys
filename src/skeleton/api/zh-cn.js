module.exports = [
    {
        type: 'component',
        name: 'Thy-skeleton 参数列表',
        description: '用于骨架屏的宽高, 动画, 颜色, 透明度等属性',
        properties: [
            {
                name: 'thyWidth',
                description: '宽度',
                type: 'string | number',
                default: '100%'
            },
            {
                name: 'thyHeight',
                description: '高度',
                type: 'string | number',
                default: '100%'
            },
            {
                name: 'thyViewBoxWidth',
                description: 'SVG viewBox 宽度',
                type: 'string | number',
                default: '400'
            },
            {
                name: 'thyViewBoxHeight',
                description: 'SVG viewBox 高度',
                type: 'string | number',
                default: '130'
            },
            {
                name: 'thyAnimate',
                description: '是否有动画',
                type: 'boolean',
                default: 'true'
            },
            {
                name: 'thySpeed',
                description: '动画速度',
                type: 'number',
                default: '2'
            },
            {
                name: 'thyPreserveAspectRatio',
                description: 'SVG preserveAspectRatio, none | xMidYMid meet',
                type: 'string',
                default: 'none'
            },
            {
                name: 'thyPrimaryColor',
                description: '主要颜色',
                type: 'string',
                default: '#f0f0f0'
            },
            {
                name: 'thySecondaryColor',
                description: '次要颜色',
                type: 'string',
                default: '#e0e0e0'
            },
            {
                name: 'thyLoadingDone',
                description: '是否加载完毕，加载完毕后隐藏骨架屏加载状态',
                type: 'boolean',
                default: 'false'
            }
        ]
    }
];
