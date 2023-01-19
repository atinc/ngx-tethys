---
category: form
title: Cascader
subtitle: 级联选择菜单
---

<alert>当一个数据集合有清晰的层级结构时，可通过级联选择器逐级查看并选择。</alert>

## 组件概述

本组件提供如下用法：

- 基本用法（basic）
- 禁止选择(disable)
- 支持多选(multiple)
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

<examples />

