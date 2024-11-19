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
    dateRange: {
        custom: '自定义',
        currentWeek: '本周',
        currentMonth: '本月'
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
    strength: {
        highest: '最高',
        high: '高',
        medium: '中',
        low: '低'
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
    select: {
        placeholder: '请选择节点',
        empty: '暂时没有数据可选'
    },
    treeSelect: {
        placeholder: '请选择节点',
        empty: '暂时没有数据可选'
    },
    cascader: {
        placeholder: '请选择',
        empty: '暂无可选项'
    },
    pagination: {
        page: '页',
        order: '第',
        total: '共',
        totalCount: '共{total}页',
        jumpTo: '跳至',
        firstPage: '第一页',
        lastPage: '最后一页',
        defaultUnit: '条'
    },
    form: {
        required: '该选项不能为空',
        maxlength: '该选项输入值长度不能大于{maxlength}',
        minlength: '该选项输入值长度不能小于{minlength}',
        uniqueCheck: '输入值已经存在，请重新输入',
        email: '输入邮件的格式不正确',
        confirm: '两次输入不一致',
        pattern: '该选项输入格式不正确',
        number: '必须输入数字',
        url: '输入URL格式不正确',
        max: '该选项输入值不能大于{max}',
        min: '该选项输入值不能小于{min}'
    },
    empty: {
        text: '暂无数据'
    }
};
