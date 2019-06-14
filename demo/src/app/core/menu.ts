export const allMenus = [
    {
        name: 'Introduction',
        zhName: '介绍',
        routePath: 'introduction'
    },
    {
        name: 'Principles',
        zhName: '原则',
        routePath: 'principles',
        noSubGroups: true,
        children: [
            {
                name: 'easy-use',
                zhName: '易用',
                routePath: 'easy-use',
                description: ''
            },
            {
                name: 'light',
                zhName: '轻量',
                routePath: 'light',
                description: ''
            }
        ]
    },
    {
        name: 'Global',
        zhName: '全局',
        routePath: 'global',
        children: [
            {
                name: 'Style',
                zhName: '样式',
                children: [
                    {
                        name: 'Reboot',
                        zhName: '通用',
                        routePath: 'reboot'
                    },
                    {
                        name: 'Link',
                        zhName: '链接',
                        routePath: 'link'
                    }
                ]
            },
            {
                name: 'CDK',
                zhName: '',
                children: [
                    {
                        name: 'dropdrag',
                        zhName: '拖拽',
                        routePath: 'dropdrag'
                    }
                ]
            }
        ]
    },
    {
        name: 'Components',
        zhName: '组件',
        routePath: 'components',
        children: [
            {
                name: 'General',
                zhName: '通用',
                children: [
                    {
                        name: 'Button',
                        zhName: '按钮',
                        routePath: 'button'
                    },
                    {
                        name: 'Icon',
                        zhName: '图标',
                        routePath: 'icon'
                    },
                    {
                        name: 'Dropdown',
                        zhName: '下拉菜单',
                        routePath: 'dropdown'
                    },
                    {
                        name: 'Cascader',
                        zhName: '下拉菜单',
                        routePath: '级联选择'
                    },
                    {
                        name: 'Property Operation',
                        zhName: '属性操作',
                        routePath: 'property-operation'
                    },
                    {
                        name: 'arrow-switcher',
                        zhName: '上下条切换',
                        routePath: 'arrow-switcher'
                    }
                ]
            },
            {
                name: 'Layout',
                zhName: '布局',
                children: [
                    {
                        name: 'Layout',
                        zhName: '布局',
                        routePath: 'layout'
                    },
                    {
                        name: 'Card',
                        zhName: '卡片',
                        routePath: 'card'
                    },
                    {
                        name: 'List',
                        zhName: '列表',
                        routePath: 'list'
                    },
                    {
                        name: 'Empty',
                        zhName: '空状态',
                        routePath: 'empty'
                    }
                ]
            },
            {
                name: 'Navigation',
                zhName: '导航',
                children: [
                    {
                        name: 'Nav',
                        zhName: '导航',
                        routePath: 'nav'
                    },
                    {
                        name: 'Breadcrumb',
                        zhName: '面包屑',
                        routePath: 'breadcrumb'
                    },
                    {
                        name: 'Menu',
                        zhName: '菜单',
                        routePath: 'menu'
                    },
                    {
                        name: 'ActionMenu',
                        zhName: '下拉菜单',
                        routePath: 'action-menu'
                    }
                ]
            },
            {
                name: 'Data Entry',
                zhName: '数据入口',
                children: [
                    { name: 'Transfer', zhName: '穿梭框', routePath: 'transfer' },
                    { name: 'Switch', zhName: '开关', routePath: 'switch' },
                    { name: 'Form', zhName: '表单', routePath: 'form' },
                    { name: 'DatePicker', zhName: '日期选择', routePath: 'datepicker' },
                    { name: 'DatepickerNext', zhName: '日期选择 NEXT', routePath: 'datepicker-next' },
                    { name: 'DateRange', zhName: '时间段选择', routePath: 'date-range' },
                    { name: 'Input', zhName: '输入框', routePath: 'input' },
                    { name: 'Checkbox', zhName: '多选项', routePath: 'checkbox' },
                    { name: 'Radio', zhName: '单选项', routePath: 'radio' },
                    { name: 'Select', zhName: '下拉选择', routePath: 'select' },
                    { name: 'Tree Select', zhName: '树选择', routePath: 'tree-select' }
                ]
            },
            {
                name: 'Data Display',
                zhName: '数据展示',
                children: [
                    { name: 'Avatar', zhName: '头像', routePath: 'avatar' },
                    { name: 'Badge', zhName: '徽标', routePath: 'badge' },
                    { name: 'Grid', zhName: '列表', routePath: 'grid' },
                    { name: 'Pagination', zhName: '分页', routePath: 'pagination' },
                    { name: 'Label', zhName: '标签', routePath: 'label' },
                    { name: 'Table', zhName: '表格', routePath: 'table' },
                    { name: 'Tree', zhName: '树', routePath: 'tree' },
                    { name: 'Stepper', zhName: '步骤条', routePath: 'stepper' },
                    { name: 'Progress', zhName: '进度条', routePath: 'progress' }
                ]
            },
            {
                name: 'FeedBack',
                zhName: '反馈',
                children: [
                    { name: 'Alert', zhName: '警告框', routePath: 'alert' },
                    { name: 'Confirm', zhName: '确认消息框', routePath: 'confirm' },
                    { name: 'Loading', zhName: '加载中', routePath: 'loading' },
                    { name: 'Modal', zhName: '弹框', routePath: 'modal' },
                    { name: 'Dialog', zhName: '弹框 New', routePath: 'dialog' },
                    { name: 'Tooltip', zhName: '文字提示', routePath: 'tooltip' },
                    { name: 'Overlay', zhName: '浮层', routePath: 'overlay' },
                    { name: 'Notify', zhName: '通知', routePath: 'notify' },
                    { name: 'PopBox', zhName: '弹出框', routePath: 'pob-box' },
                    { name: 'Slide', zhName: '滑动弹出框', routePath: '<a routerLink=' },
                    { name: 'Uploader', zhName: '上传', routePath: '<a routerLink=' },
                    { name: 'Editor', zhName: '编辑器', routePath: '<a href=' },
                    { name: 'Markdown', zhName: 'Markdown解析', routePath: '<a routerLink=' },
                    { name: 'Key Select', zhName: '按键上下选择', routePath: '<a routerLink=' },
                    { name: 'Strength', zhName: '强度', routePath: '<a routerLink=' }
                ]
            }
        ]
    }
];
