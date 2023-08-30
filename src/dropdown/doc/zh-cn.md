---
category: nav
title: Dropdown
subtitle: 下拉菜单
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

## Active

<example name="thy-dropdown-active-example" />

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

## 组件菜单
业务中通常需要在多个地方弹出同一个菜单，那么定义个可以复用的菜单组件，然后通过`[thyDropdown]="menuComponent"`在多个地方使用就变得十分必要，自定义的菜单组件需要在外层加`thy-dropdown-menu`样式类，我们可以直接继承`ThyDropdownAbstractMenu`组件实现样式的自动添加。

```ts
@Component({
    selector: 'thy-custom-menu',
    template: `
        <a thyDropdownMenuItem href="javascript:;">
            <span>Menu Item1</span>
        </a>
    `
})
export class CustomMenuComponent extends ThyDropdownAbstractMenu {}
```

<example name="thy-dropdown-component-example" />

## 可传入popoverOptions
thyPopoverOptions默认值为`{ placement: 'bottom' }`

<example name="thy-dropdown-options-example" />

