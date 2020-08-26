---
category: form
title: DatePick
subtitle: 日期选择
order: 1
---

# 时间选择组件

通过下拉出现的日期列表选择日期，或者日期区间。

# 简单实用

```html
<thy-date-picker  [(ngModel)]="date" (ngModelChange)="onChange($event)"></thy-date-picker>
```

实用上述代码就可以实现日期的选择

<example name="thy-date-picker-basic-example" />  

同时，我们也支持使用指令实现该组件。

```html
<thy-property-operation
  class="w-100 mb-3"
  thyLabelText="开始时间"
  [thyValue]="date | thyDatePickerFormat"
  thyIcon="calendar-check"
  thyDatePicker
  [(ngModel)]="date"
></thy-property-operation>
```

<example name="thy-date-picker-directive-example" />  

我们也支持更加准确的时间选择。

<example name="thy-date-picker-time-example" />  

了解更多使用场景请查看示例：[示例](http://lib.worktile.live/ngx-tethys/components/date-picker/examples)