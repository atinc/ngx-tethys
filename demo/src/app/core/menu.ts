import * as q from '../../../../package.json';

export const allMenus = [
    {
        name: 'Introduction',
        zhName: '介绍',
        routePath: 'introduction'
    },
    // {
    //     name: 'Principles',
    //     zhName: '原则',
    //     routePath: 'principles',
    //     noSubGroups: true,
    //     children: [
    //         { name: 'Easy-Use', zhName: '易用', routePath: 'easy-use', description: '' },
    //         { name: 'Light', zhName: '轻量', routePath: 'light', description: '' }
    //     ]
    // },
    {
        name: 'Changelog',
        zhName: '更新日志',
        routePath: 'changelog',
        state: q.default.version
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
                    { name: 'Variables', zhName: '变量', routePath: 'variables' },
                    { name: 'Reboot', zhName: '通用', routePath: 'reboot' },
                    { name: 'Link', zhName: '链接', routePath: 'link' },
                    { name: 'Typography', zhName: '排版', routePath: 'typography' }
                ]
            },
            {
                name: 'Interactions',
                zhName: '交互',
                children: [
                    { name: 'DropDrag', zhName: '拖拽', routePath: 'drop-drag' },
                    { name: 'Copy', zhName: '复制', routePath: 'copy' }
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
                    { name: 'Button', zhName: '按钮', routePath: 'button' },
                    { name: 'Icon', zhName: '图标', routePath: 'icon' }
                ]
            },
            {
                name: 'Layout',
                zhName: '布局',
                children: [
                    { name: 'Layout', zhName: '布局', routePath: 'layout' },
                    { name: 'Card', zhName: '卡片', routePath: 'card' },
                    { name: 'Stepper', zhName: '步骤条', routePath: 'stepper' }
                ]
            },
            {
                name: 'Navigation',
                zhName: '导航',
                children: [
                    { name: 'Nav', zhName: '导航', routePath: 'nav' },
                    { name: 'Breadcrumb', zhName: '面包屑', routePath: 'breadcrumb' },
                    { name: 'ActionMenu', zhName: '下拉菜单', routePath: 'action-menu' },
                    { name: 'Dropdown', zhName: '下拉菜单', routePath: 'dropdown' },
                    { name: 'ArrowSwitcher', zhName: '上下条切换', routePath: 'arrow-switcher' },
                    { name: 'Menu', zhName: '菜单', routePath: 'menu' }
                ]
            },
            {
                name: 'Data Entry',
                zhName: '数据录入',
                children: [
                    { name: 'Form', zhName: '表单', routePath: 'form' },
                    { name: 'Input', zhName: '输入框', routePath: 'input' },
                    { name: 'Radio', zhName: '单选项', routePath: 'radio' },
                    { name: 'Checkbox', zhName: '多选项', routePath: 'checkbox' },
                    { name: 'DatePicker', zhName: '日期选择', routePath: 'date-picker', state: 'new' },
                    { name: 'Select', zhName: '下拉选择', routePath: 'select' },

                    { name: 'TreeSelect', zhName: '树选择', routePath: 'tree-select' },
                    { name: 'Cascader', zhName: '级联选择菜单', routePath: 'cascader' },

                    { name: 'DateRange', zhName: '时间段选择', routePath: 'date-range' },
                    { name: 'PropertyOperation', zhName: '属性操作', routePath: 'property-operation' },
                    { name: 'Transfer', zhName: '穿梭框', routePath: 'transfer' },
                    { name: 'Mention', zhName: '提及', routePath: 'mention' },
                    { name: 'Switch', zhName: '开关', routePath: 'switch' },
                    { name: 'Uploader', zhName: '上传', routePath: 'uploader' },

                    { name: 'Datepicker', zhName: '日期选择', routePath: 'datepicker', deprecated: true }
                ]
            },
            {
                name: 'Data Display',
                zhName: '数据展示',
                children: [
                    { name: 'Avatar', zhName: '头像', routePath: 'avatar' },
                    { name: 'Badge', zhName: '徽标', routePath: 'badge' },
                    { name: 'Label', zhName: '标签', routePath: 'label' },

                    { name: 'Grid', zhName: '列表', routePath: 'grid' },
                    { name: 'List', zhName: '列表', routePath: 'list' },
                    { name: 'Table', zhName: '表格', routePath: 'table' },
                    { name: 'Pagination', zhName: '分页', routePath: 'pagination' },

                    { name: 'Tree', zhName: '树', routePath: 'tree' },
                    { name: 'Strength', zhName: '强度', routePath: 'strength' },
                    { name: 'Progress', zhName: '进度条', routePath: 'progress' },
                    { name: 'Vote', zhName: '投票', routePath: 'vote' },
                    { name: 'Markdown', zhName: 'markdown 解析', routePath: 'markdown' }
                ]
            },
            {
                name: 'FeedBack',
                zhName: '反馈',
                children: [
                    { name: 'Alert', zhName: '警告框', routePath: 'alert' },
                    { name: 'Notify', zhName: '通知', routePath: 'notify' },

                    { name: 'Loading', zhName: '加载中', routePath: 'loading' },
                    { name: 'Empty', zhName: '空状态', routePath: 'empty' },
                    { name: 'Result', zhName: '结果页', routePath: 'result' },
                    { name: 'Skeleton', zhName: '骨架屏', routePath: 'skeleton' },

                    { name: 'Overlay', zhName: '浮层', routePath: 'overlay' },
                    { name: 'Popover', zhName: '悬浮层', routePath: 'popover', state: 'new' },
                    { name: 'Dialog', zhName: '弹框', routePath: 'dialog', state: 'new' },
                    { name: 'Slide', zhName: '滑动弹出框', routePath: 'slide' },

                    { name: 'Tooltip', zhName: '文字提示', routePath: 'tooltip' },
                    { name: 'FlexibleText', zhName: '文本提示', routePath: 'flexible-text' },

                    { name: 'Confirm', zhName: '确认消息框', routePath: 'confirm', deprecated: true },
                    { name: 'Modal', zhName: '弹框', routePath: 'modal', deprecated: true },
                    { name: 'PopBox', zhName: '弹出框', routePath: 'pob-box', deprecated: true }
                ]
            }
        ]
    }
];
