module.exports = [
    {
        type: 'component',
        name: 'ThyIcon',
        description: '',
        properties: [
            {
                name: 'thyIconName',
                description: `icon 的名字`,
                type: 'string'
            },
            {
                name: 'thyIconType',
                description: `icon 的类型，类型支持 'outline' | 'fill' | 'twotone' `,
                type: 'string',
                default: 'outline'
            },
            {
                name: 'thyIconRotate',
                description: `图标旋转角度`,
                type: 'string',
                default: '0'
            },
            {
                name: 'thyIconLegging',
                description: `图标打底色，镂空的图标，会透过颜色来`,
                type: 'string'
            }
        ]
    },
    {
        type: 'service',
        name: 'ThyIconRegistry',
        description: '',
        properties: [
            {
                name: 'addSvgIconSet',
                description: `添加SVG图标集`,
                type: 'function',
                default: ''
            },
            {
                name: 'addSvgIcon',
                description: `添加单个SVG图标`,
                type: 'function',
                default: ''
            }
        ]
    }
];
