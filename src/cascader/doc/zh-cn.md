---
category: form
title: Cascader
subtitle: 级联选择菜单
---

<alert>当一个数据集合有清晰的层级结构时，可通过级联选择器逐级查看并选择。</alert>

## 组件概述

本组件提供如下7种用法：

- 基本用法（basic）
- 禁止选择(disable)
- 鼠标移入自动展开菜单(move-unfold)
- 鼠标移入自动展开菜单+移入触发对应项(move-unfold-trigger)
- 选择即改变(select-changed)
- 选择器型号大小(size)
- Label 使用自定义模板，如：追加邮政编码（add-code）

## 何时使用
- 需要从一组相关联的数据集合进行选择，例如省市区，层级，分类等。

- 在一个较大的数据集合中进行选择时，用多级分类进行分隔。

## 模块导入

```ts
import { ThyCascaderModule } from 'ngx-tethys/cascader';
```


## 基础使用
通过`thyOptions`传入所要展示的数据集，`ngModel`绑定当前选中的值，`ngModelChange`绑定点击事件。
```html
<thy-cascader [thyOptions]="areaCode" [(ngModel)]="values" (ngModelChange)="onChanges($event)" thyPlaceHolder="自定义PlaceHolder">
</thy-cascader>
```

展示效果如下：
<example name='thy-cascader-basic-example'>

## 自定义模版

通过`thyLabelRender`传入用户自定义模版,如：追加邮政编码（add-code）。

```html
<thy-cascader
  [thyOptions]="thyCustomerOptions"
  (ngModelChange)="onChanges($event)"
  [(ngModel)]="curVal"
  style="width:400px;"
  [thyLabelRender]="renderTpl"
>
</thy-cascader>
<ng-template #renderTpl let-labels="labels" let-selectedOptions="selectedOptions">
  <ng-container>
    <ng-container *ngFor="let label of labels; let i = index; let isLast = last">
      <span *ngIf="!isLast">{{ label }} / </span>
      <span *ngIf="isLast">
        {{ label }} (
        <a href="javascript:;" (click)="handleAreaClick($event, label, selectedOptions[i])">
          {{ selectedOptions[i].code }}
        </a>
        )
      </span>
    </ng-container>
  </ng-container>
</ng-template>
```

展示效果如下：
<example name='thy-cascader-add-code-example'>
