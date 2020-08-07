---
category: display
title: List
subtitle: 列表
order: 1
---

## 介绍
最基础的列表展示，可承载文字、列表、图片、段落。提供多选、grid 样式展示等多种可选功能。

## 基础使用
通过 `thy-list` 包裹相应的 `thy-list-item` 即可展示基本的列表：
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
<example name="thy-list-basic-example" />  

## 展示 Grid 模式
还可以使用 `thy-selection-list` 展示 Grid 模式的列表：
```html
  <thy-selection-list
    [(ngModel)]="selectedValues"
    [thyBindKeyEventContainer]="body"
    [thyLayout]="'grid'"
    (thySelectionChange)="selectionChange($event)"
  >
    <thy-list-option *ngFor="let item of gridItems" [thyValue]="item?.id">
      <thy-icon thyIconName="app-agile-fill" class="thy-grid-option-icon"></thy-icon>
      <div class="thy-grid-option-name">{{ item.name }}</div>
    </thy-list-option>
  </thy-selection-list>
```
<example name="thy-list-grid-example" />  

## 展示预设的 list 样式
使用 `thy-list-item-meta` 来展示预设样式的列表：
```html
<thy-list [thyDivided]="true">
  <thy-list-item *ngFor="let item of listItems">
    <thy-list-item-meta [thyTitle]="item.title" [thyAvatar]="item.avatar" [thyDescription]="item.description"> </thy-list-item-meta>
  </thy-list-item>
</thy-list>

```
<example name="thy-list-item-meta-example" />