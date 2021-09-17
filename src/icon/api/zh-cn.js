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
                description: `添加SVG图标集，添加到默认命名空间`,
                type: '(url: SafeResourceUrl) => ThyIconRegistry',
                default: ''
            },
            {
                name: 'addSvgIconSet',
                description: `添加SVG图标集到指定的命名空间`,
                type: '(namespace:string, url: SafeResourceUrl) => ThyIconRegistry',
                default: ''
            },
            {
                name: 'addSvgIcon',
                description: `添加单个SVG图标`,
                type: '(iconName: string, url: SafeResourceUrl) => ThyIconRegistry',
                default: ''
            },
            {
                name: 'addSvgIconInNamespace',
                description: `添加单个SVG图标到指定的命名空间`,
                type: '(namespace: string, iconName: string, url: SafeResourceUrl) => ThyIconRegistry',
                default: ''
            },
            {
                name: 'addSvgIconLiteral',
                description: `添加单个SVG图标字符串，直接传入 SVG HTML 字符串`,
                type: '(iconName: string, literal: SafeHtml) => ThyIconRegistry',
                default: ''
            },
            {
                name: 'addSvgIconLiteralInNamespace',
                description: `添加单个SVG图标字符串到指定的命名空间，直接传入 SVG HTML 字符串`,
                type: '(namespace: string, iconName: string, literal: SafeHtml) => ThyIconRegistry',
                default: ''
            },
            {
                name: 'getSvgIcon',
                description: `获取某个图标`,
                type: `(name: string, namespace: string = '') => Observable<SVGElement>`,
                default: ''
            }
        ]
    }
];
