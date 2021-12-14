---
category: display
title: List
subtitle: 列表
description: 通用的列表组件。
---

<alert>通用的列表组件</alert>

## 何时使用
基础的列表展示，可承载文字、列表、图片、段落，用于展示多条结构类似的数据。

## 模块导入
```ts
import { ThyListModule } from "ngx-tethys/list";
```

## 如何使用
`thy-list`与`thy-list-item`组件一起配合使用，基本的使用如下：
```html
<thy-list>
  <thy-list-item>
    Item 1
  </thy-list-item>
  <thy-list-item>
    Item 2
  </thy-list-item>
  <thy-list-item>
    Item 3
  </thy-list-item>
</thy-list>
```  
展示效果：
<example name="thy-list-basic-example" />  

`thy-selection-list` 与 `thy-list-option` 一起组合使用，提供多选、grid 样式展示等多种可选功能，使用如下：
```html
  <thy-selection-list
    [(ngModel)]="selectionModel.selectedValues"
    [thyMultiple]="isMultiple"
    [thyBeforeKeydown]="thyBeforeKeydown"
    [thyBindKeyEventContainer]="body"
    (thySelectionChange)="selectionChange($event)"
  >
    <thy-list-option *ngFor="let item of items" [thyDisabled]="item.id === 3" [thyValue]="item?.id">
      {{ item.name }}
    </thy-list-option>
  </thy-selection-list>
```  
展示效果：
<example name="thy-list-selection-example" />  
