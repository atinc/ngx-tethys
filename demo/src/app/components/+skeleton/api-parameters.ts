export const apiSkeletonParameters = [
    {
        property: 'thyWidth',
        description: '宽度',
        type: 'string | number',
        default: '100%'
    },
    {
        property: 'thyHeight',
        description: '高度',
        type: 'string | number',
        default: '100%'
    },
    {
        property: 'thyViewBoxWidth',
        description: 'SVG viewBox 宽度',
        type: 'string | number',
        default: '400'
    },
    {
        property: 'thyViewBoxHeight',
        description: 'SVG viewBox 高度',
        type: 'string | number',
        default: '130'
    },
    {
        property: 'thyAnimate',
        description: '是否有动画',
        type: 'boolean',
        default: 'true'
    },
    {
        property: 'thySpeed',
        description: '动画速度',
        type: 'number',
        default: '2'
    },
    {
        property: 'thyPreserveAspectRatio',
        description: 'SVG preserveAspectRatio, none | xMidYMid meet',
        type: 'string',
        default: 'none'
    },
    {
        property: 'thyPrimaryColor',
        description: '主要颜色',
        type: 'string',
        default: '#f0f0f0'
    },
    {
        property: 'thySecondaryColor',
        description: '次要颜色',
        type: 'string',
        default: '#e0e0e0'
    },
    {
        property: 'thyLoadingDone',
        description: '是否加载完毕，加载完毕后隐藏骨架屏加载状态',
        type: 'boolean',
        default: 'false'
    }
];
