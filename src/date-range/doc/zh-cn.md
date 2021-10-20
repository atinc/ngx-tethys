---
category: form
title: DateRange
subtitle: 时间区间
order: 1
---

<div class="dg-alert dg-alert-info">预设及自定义时间区间选择组件</div>

## 何时使用
- 需要通过下拉菜单选择预设好的时间区间。  
- 需要选择自定义时间段。

## 模块导入
```ts
import { ThyDateRangeModule } from "ngx-tethys/date-range";
```

## 基本使用

```html
<thy-date-range [(ngModel)]="date" (ngModelChange)="changeDate()"></thy-date-range>
```  
使用上述代码就可以使用预设的日期段（本周 / 本月 / 自定义）进行日期范围的选择：
<example name="thy-date-range-basic-example" />
