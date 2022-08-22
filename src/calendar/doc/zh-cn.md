---
category: display
title: Calendar
subtitle: 日历
---

<alert>按照日历形式展示数据的容器。</alert>

## 何时使用
当数据是日期或按照日期划分时，例如日程、课表、价格日历等，农历等。目前支持年/月切换。

## 如何使用
最基本的使用如下
```html
<thy-calendar [thyValue]="date" (thySelectChange)="onValueChange($event)"></thy-calendar>
```
展示效果：
<example name="thy-calendar-basic-example" />

## 按年切换的
<example name="thy-calendar-basic-year-example" />

## 自定义不可选中的日期
按月切换的，自定义不可选中的日期
<example name="thy-calendar-disabled-mode-month-example" />

按年切换的，自定义不可选中的日期
<example name="thy-calendar-disabled-mode-year-example" />

## 自定义需要渲染的数据模板
一个复杂的应用示例，用 `thyDateCell` 模版来自定义需要渲染的数据，用 `thyCalendarHeaderOperation` 来自定义右上角显示

```html
<thy-calendar>
  <ul *thyDateCell="let date">
    <ng-container [ngSwitch]="date.getDate()">
      <ng-container *ngSwitchCase="8">
        <li *ngFor="let item of listDataMap.eight">
          {{ item.content }}
        </li>
      </ng-container>
      <ng-container *ngSwitchCase="10">
        <li *ngFor="let item of listDataMap.ten">
          {{ item.content }}
        </li>
      </ng-container>
      <ng-container *ngSwitchCase="11">
        <li *ngFor="let item of listDataMap.eleven">
          {{ item.content }}
        </li>
      </ng-container>
    </ng-container>
  </ul>
  <div *thyCalendarHeaderOperation>
    <span class="app-sign"><span class="app-color-agile mr-2"></span>Agile</span>
    <span class="app-sign"><span class="app-color-plan mr-2"></span>Plan</span>
    <span class="app-sign"><span class="app-color-prod mr-2"></span>Prod</span>
  </div>
</thy-calendar>
```
展示效果：
<example name="thy-calendar-custom-cell-example" />
