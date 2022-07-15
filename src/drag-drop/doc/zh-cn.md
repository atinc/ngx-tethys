---
category: other
title: DragDrop
subtitle: 拖拽
label: new
---

<alert>用于Tree结构的拖拽，支持拖入拖出更改层级结构，也支持同级的排序。</alert>
## CdkDragDrop
一般情况下我们在业务中遇到拖拽的场景，我们会使用 `Angular Cdk` 中的 `DragDrop` 的解决方案  [CdkDragDrop](https://material.angular.io/cdk/categories)
>  @angular/cdk/drag-drop 模块为您提供了一种轻松且声明式地创建拖放界面的方法，并支持在其中自由拖动，在列表中进行排序，在列表，动画，触摸设备，自定义拖动手柄，预览和占位符之间传输项目,水平列表和沿轴锁定等功能

<example name="thy-drag-drop-cdk-drag-drop-example" />

## 基础使用
<example name="thy-drag-drop-basic-example" />

## 自定义可拖拽区域内容和可放置区域
thyDragHandle自定义可拖拽区域，thyDragContent自定义可放置区域
<example name="thy-drag-drop-with-handle-example" />