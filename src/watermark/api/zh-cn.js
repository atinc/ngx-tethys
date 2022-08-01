module.exports = [
    {
        type: 'directive',
        name: 'thy-watermark',
        description: '用于水印渲染、实时预览',
        properties: [
            {
                name: 'thyWatermark',
                description: '水印内容，支持\\n换行',
                type: 'string',
                default: 'primary'
            },
            {
                name: 'thyWatermarkDisabled',
                description: '是否禁用',
                type: 'boolean',
                default: 'false'
            },
            {
                name: 'thyWatermarkCanvasConfig',
                description:
                    'canvas默认设置，可传递width(最小值已内置为水印内容宽度),height:(最小值已内置为水印内容高度),font, fillStyle,rotate(文本偏移角度)，textLineHeight(行高)',
                type: '{width?: string;height?: string;font?: string;fillStyle?: string;rotate?: number;textLineHeight?: number}',
                default:
                    '{width: "20px",height: "30px", font: "12px microsoft yahei",fillStyle: "rgba(184, 184, 184, 0.8)",rotate: -15,textLineHeight: 20}'
            }
        ]
    }
];
