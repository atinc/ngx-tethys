---
category: display
title: Collapse
subtitle: 折叠面板
order: 1
---

<div class="dg-alert dg-alert-info">可折叠展开的内容区域</div>

# 何时使用

对于复杂区域进行分组和隐藏

## 模块导入
```ts
import { ThyCollapseModule } from "ngx-tethys/collapse";
```

## 基本使用
`thy-collapse`组件需要与`thy-collapse-panel`组件一起配合使用，基本的使用如下：
```html
<thy-collapse>
  <thy-collapse-panel thyTitle="这是一个头部标题" [thyActive]="true">内容区域</thy-collapse-panel>
  <thy-collapse-panel thyTitle="这是一个头部标题2">内容区域2</thy-collapse-panel>
  <thy-collapse-panel thyTitle="这是一个头部标题2">内容区域3</thy-collapse-panel>
</thy-collapse>
```
展示效果：
<example name="thy-collapse-basic-example">

## 手风琴
只允许展开一个内容区域

```html
<thy-collapse [thyAccordion]="true">
  <thy-collapse-panel thyTitle="这是一个头部标题" [thyActive]="true">内容区域1</thy-collapse-panel>
  <thy-collapse-panel thyTitle="这是一个头部标题2">内容区域2</thy-collapse-panel>
  <thy-collapse-panel thyTitle="这是一个头部标题3">内容区域3</thy-collapse-panel>
</thy-collapse>
```
展示效果：
<example name="thy-collapse-accordion-example">


## 自定义

折叠面板可以自定义各个面板的背景色、圆角、边距和图标，右上角展示内容

```html
<thy-collapse [thyBordered]="false">
  <thy-collapse-panel
    *ngFor="let item of panels"
    [thyTitle]="item.name"
    [thyExpandedIcon]="item.icon"
    [ngStyle]="item.customStyle"
    [thyExtraTemplate]="extra"
    >{{ item.name + 'content' }}</thy-collapse-panel
  >
</thy-collapse>

<ng-template #extra>
  <thy-icon thyIconName="settings" (click)="$event.stopPropagation()"></thy-icon>
</ng-template>

```
展示效果：
<example name="thy-collapse-custom-example">

## 嵌套

折叠面板可以嵌套折叠面板
```html
<thy-collapse>
  <thy-collapse-panel *ngFor="let item of panels" [thyTitle]="item.name" [thyExpandedIcon]="item.icon" [thyActive]="item.active">
    内容区域
    <ng-container *ngIf="item.children && item.children.length">
      <thy-collapse>
        <thy-collapse-panel
          *ngFor="let childPanel of item.children"
          [thyTitle]="childPanel.name"
          [thyExpandedIcon]="childPanel.icon"
          [thyActive]="childPanel.active"
          >子内容
        </thy-collapse-panel>
      </thy-collapse>
    </ng-container>
  </thy-collapse-panel>
</thy-collapse>

```
展示效果：
<example name="thy-collapse-tree-example">

## 幽灵面板

将折叠面板的背景变成透明且无边框
```html
<thy-collapse [thyGhost]="true">
  <thy-collapse-panel thyTitle="这是一个头部标题" [thyActive]="true">内容区域</thy-collapse-panel>
  <thy-collapse-panel thyTitle="这是一个头部标题2">内容区域2</thy-collapse-panel>
  <thy-collapse-panel thyTitle="这是一个头部标题2">内容区域3</thy-collapse-panel>
</thy-collapse>

```
展示效果：
<example name="thy-collapse-ghost-example">


