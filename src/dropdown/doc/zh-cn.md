---
category: nav
title: Dropdown
subtitle: 下拉菜单
---

<div class="dg-alert dg-alert-info">向下弹出的列表。</div>

## 何时使用
当页面上的操作命令过多时，用此组件可以收纳操作元素。点击触点，会出现一个下拉菜单。可在列表中进行选择，并执行相应的命令。

+ 用于收罗一组命令操作。
+ Select 用于选择，而 Dropdown 是命令集合。

## 模块导入
```ts
import { ThyDropdownModule } from "ngx-tethys/dropdown";
```

## 模块概述
基于 [button](http://lib.worktile.live/ngx-tethys/components/button/overview) 上增加 `thyDropDown` 或者 `thyDropDownSplit` 来实现的，icon 与大小都是通过 button 的 `thyIcon` 与 [thySize](http://lib.worktile.live/ngx-tethys/components/button/examples) 来控制。


## 如何使用

```html
<button thyDropdown thyButton="primary" thyIcon="wtf-upload" [thyActionMenuToggle]="menuList">下拉菜单</button>
<ng-template #menuList>
  <thy-action-menu>
    <a thyActionMenuItem href="javascript:;">
      <span>Dropdown link</span>
    </a>
    <a thyActionMenuItem href="javascript:;">
      <span>Dropdown link</span>
    </a>
  </thy-action-menu>
</ng-template>

```

## 基本使用
<example name="thy-dropdown-basic-example" />

## 分列式下拉菜单
`thyDropdownSplit` 与 `thy-button-group` 一同使用，可以达成分列式下拉菜单的效果。
<br/>
**注意**：本指令通过修改 `thy-button-group` 后置 `button`的样式来实现，所以使用时需要将
  `thyDropdownSplit` 添加到 `thy-button-group` 后置的 `button` 元素上。
<example name="thy-dropdown-split-example" />