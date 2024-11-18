export default {
    // The locale parameter of Angular formatDate function does not support zh-cn, zh_CN
    id: 'zh-Hans',
    datePicker: {
        yearFormat: 'yyyy年', // Used in header of month picker
        monthFormat: 'MMM', // Used in header of date picker, advanced range picker （2月）
        zhMonthFormat: 'MMMM', // Used in month picker （二月）
        weekFormat: 'EEEEE', // Used in date picker table （六）
        fullWeekFormat: 'EE', // Used in calendar (周六)
        weekThFormat: 'yyyy-ww周', // Used in week picker
        dateFormat: 'yyyy年MM月dd日'
    },
    timePicker: {
        placeholder: '选择时间',
        now: '此刻',
        ok: '确定'
    },
    calendar: {
        today: '今天',
        yearMonthFormat: 'yyyy年MM月'
    },
    transfer: {
        maxLimit: '(上限{max}个)',
        maxLockLimit: '锁定 (上限{maxLock}个)',
        unlocked: '未锁定'
    },
    colorPicker: {
        defaultColor: '默认颜色',
        noFillColor: '无填充色',
        recentUsedColor: '最近使用自定义颜色',
        customColor: '自定义颜色',
        none: '暂无'
    },
    guider: {
        skip: '跳过',
        prev: '上一步',
        next: '下一步',
        finish: '完成'
    },
    copy: {
        tips: '点击复制',
        success: '复制成功',
        error: '复制失败'
    },
    treeSelect: {
        placeholder: '请选择节点',
        empty: '暂时没有数据可选'
    },
    cascader: {
        placeholder: '请选择',
        empty: '暂无可选项'
    }
};
