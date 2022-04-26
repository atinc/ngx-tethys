---
category: nav
title: Dropdown
subtitle: 下拉菜单
label: new
---

<alert>向下弹出的菜单或者列表。</alert>

## 何时使用
当页面上的操作命令过多时，用此组件可以收纳操作元素。点击或者移入触点，会出现一个下拉菜单。可在列表中进行选择，并执行相应的命令。
<alert>Select 用于下拉选择，而 Dropdown 是命令集合。</alert>

## 模块导入
```ts
import { ThyDropdownModule } from "ngx-tethys/dropdown";
```
## 基本使用

<example name="thy-dropdown-basic-example" />

## 图标菜单
菜单项可以包含图标，后置图标，子标题，描述等元素，为了方便使用，Dropdown 模块提供了如下指令: 
- `thyDropdownMenuItem`: 菜单项
- `thyDropdownMenuItemIcon`: 菜单项的前置图标
- `thyDropdownMenuItemName`: 菜单项的显示名称
- `thyDropdownMenuItemExtendIcon`: 菜单项的后置扩展图标，用于显示是否选中或者子菜单示意
- `thyDropdownMenuItemMeta`: 菜单项名称后的补充信息
- `thyDropdownMenuItemDesc`: 菜单项的描述


<example name="thy-dropdown-icon-example" />

## 分组菜单

<example name="thy-dropdown-group-example" />

## 分割菜单

<example name="thy-dropdown-group-example" />

## 菜单禁用

<example name="thy-dropdown-disabled-example" />

## 多级菜单

<example name="thy-dropdown-submenu-example" />

## 触发方式

<example name="thy-dropdown-trigger-example" />

## 菜单类型

<example name="thy-dropdown-type-example" />

## 可传入popoverOptions
thyPopoverOptions默认值为`{ placement: 'bottom', width: '240px' }`

<example name="thy-dropdown-options-example" />

