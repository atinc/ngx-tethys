---
category: other
title: DragDrop
subtitle: 拖拽
---

<alert>用于拖拽。</alert>

## 何时使用
当需要使用拖拽的场景使用。

## CdkDragDrop
一般情况下我们在业务中遇到拖拽的场景，我们会使用 `Angular Cdk` 中的 `DragDrop` 的解决方案  [CdkDragDrop](https://material.angular.io/cdk/categories)
>  @angular/cdk/drag-drop 模块为您提供了一种轻松且声明式地创建拖放界面的方法，并支持在其中自由拖动，在列表中进行排序，在列表，动画，触摸设备，自定义拖动手柄，预览和占位符之间传输项目,水平列表和沿轴锁定等功能

<example name="thy-drag-drop-cdk-drag-drop-example" />

## 基础使用
```html
<thy-list [thyDropContainer]="nodes" (thyDragDropped)="onDragDrop($event)">
  <thy-list-item *ngFor="let item of nodes" [thyDrag]="item">{{item.title}}</thy-list-item>
</thy-list>

```
展示效果:
<example name="thy-drag-drop-basic-example" />

## 禁用拖拽
`thyDragDisabled` 可以禁用某项拖拽，`thyDropContainerDisabled` 禁用整体拖拽
<example name="thy-drag-drop-disabled-example" />

## 自定义可拖拽区域内容
`thyDragHandle` 自定义可拖拽区域, 设置 `thyDragHandle` 之后，只能拖动其对列表进行拖动排序等操作。
<example name="thy-drag-drop-with-handle-example" />

## 自定义可放置区域
`thyDragContent` 自定义可放置区域
<example name="thy-drag-drop-with-content-example" />
