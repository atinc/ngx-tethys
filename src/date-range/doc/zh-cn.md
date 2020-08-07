---
category: form
title: DateRange
subtitle: 时间区间
order: 1
---

## 预设及自定义时间区间选择组件

用于通过下拉菜单选择预设好的时间区间以及自定义时间段选择。  
如果单纯的是时间段选择，请使用 [thy-range-picker](http://lib.worktile.live/ngx-tethys/components/date-picker/overview) 时间段选择组件或相关的 [Directive](https://angular.cn/guide/attribute-directives).  
## 简单使用

```html
<thy-date-range [(ngModel)]="date" (ngModelChange)="changeDate()"></thy-date-range>
```  
使用上述代码就可以使用预设的日期段（本周 / 本月 / 自定义）进行日期范围的选择：
<example name="thy-date-range-basic-example" />
