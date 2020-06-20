module.exports = [
    {
        type: 'component',
        name: 'thyButton',
        description: '操作按钮，支持组件`thy-button`和`<button thyButton="primary">Button</button>`两种形式',
        properties: [
            {
                name: 'thyButton',
                description: `按钮类型，类型为\`'primary' | 'info' | 'warning' | 'danger'\`,支持添加前缀\`outline-\`实现线框按钮，支持添加前缀\`link-\`实现按钮链接`,
                type: 'string',
                default: 'primary'
            },
            {
                name: 'thyType',
                description: `和\`thyButton\`参与一样，一般使用\`thyButton\`，为了减少参数输入, 当通过\`thy-button\`使用时，只能使用该参数控制类型`,
                type: 'string',
                default: 'primary'
            },
            {
                name: 'thySize',
                description: `按钮大小，目前可传的大小为：xs | sm | md | default | lg`,
                type: 'string',
                default: 'default'
            },
            {
                name: 'thySquare',
                description: `按钮圆角恢复正常的方形，可以通过在\`buttonType\`后加上 -square 达到同样的效果，比如设置按钮类型为\`outline-primary-square\``,
                type: 'boolean',
                default: 'false'
            },
            {
                name: 'thyIcon',
                description: `按钮中显示的图标，支持SVG图标名称，比如\`angle-left\`，也支持传之前的 wtf 字体，比如: wtf-plus`,
                type: 'string'
            },
            {
                name: 'thyLoading',
                description: `加载状态`,
                type: 'boolean',
                default: 'false'
            },
            {
                name: 'thyLoadingText',
                description: `加载状态时显示的文案`,
                type: 'string',
                default: '-'
            }
        ]
    },
    {
        type: 'directive',
        name: 'thyButtonIcon',
        description: '操作按钮图标，支持组件`thy-button-icon`形式和`thyButtonIcon`指令形式',
        properties: [
            {
                name: 'thyButtonIcon',
                description: `图标按钮的图标`,
                type: 'string',
                default: '-'
            },
            {
                name: 'thyIcon',
                description: `图标, 和\`thyButtonIcon\`相同，当使用\`thy-button-icon\`时，只能使用 thyIcon 设置图标`,
                type: 'string',
                default: '-'
            },
            {
                name: 'thyShape',
                description: `展示的形状，默认只显示字体图标图标，circle-dashed, circle-solid 展示成虚线,实线边框圆形图标, circle-thick-dashed, circle-thick-solid 边框加粗`,
                type: 'string',
                default: '-'
            },
            {
                name: 'thyTheme',
                description: `按钮展示类型，默认图标移上去显示主色， danger-weak 鼠标移上去显示 danger 红色`,
                type: 'string',
                default: '-'
            },
            {
                name: 'thySize',
                description: `大小，\`xs | sm | lg | 'md'\``,
                type: 'string',
                default: 'md'
            },
            {
                name: 'thyLight',
                description: `亮色，颜色更浅，适合左侧导航顶部的按钮`,
                type: 'boolean',
                default: 'false'
            },
            {
                name: 'thyActive',
                description: `设置为选中状态`,
                type: 'boolean',
                default: 'false'
            }
        ]
    },
    {
        type: 'component',
        name: 'thy-button-group',
        description: '按钮组',
        properties: [
            {
                name: 'thySize',
                description: `大小，xs | sm | md | lg`,
                type: 'string',
                default: 'md'
            },
            {
                name: 'thyType',
                description: `\`default | info | primary | warning | danger\`，支持\`outline-\`前缀实现线框按钮组`,
                type: 'string',
                default: 'default'
            },

            {
                name: 'thyClearMinWidth',
                description: `是否需要最小宽度，默认按钮最小宽度为80px`,
                type: 'string',
                default: 'false'
            }
        ]
    }
];
