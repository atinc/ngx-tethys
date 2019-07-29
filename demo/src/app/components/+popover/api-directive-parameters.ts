export const apiPopoverParameters = [
    {
        property: 'thyPopover',
        description: '弹出的悬浮层内容',
        type: 'ComponentType | TemplateRef',
        default: ''
    },
    {
        property: 'thyTrigger',
        description: `触发方式，hover, focus, click`,
        type: 'string',
        default: 'click'
    },
    {
        property: 'thyPlacement',
        description: `弹出位置，'top' | 'topLeft' | 'topRight' | 'bottom' | 'bottomLeft' | 'bottomRight' | 'left' | 'leftTop' | 'leftBottom' | 'right' | 'rightTop' | 'rightBottom'`,
        type: 'string',
        default: 'bottom'
    },
    {
        property: 'thyOffset',
        description: '弹出 Popover 的偏移量',
        type: 'number',
        default: '4'
    }
    // {
    //     property: 'thyConfig',
    //     description: '传入的配置文件, 参考 Config 参数列表',
    //     type: 'any',
    //     default: 'null'
    // }
];
