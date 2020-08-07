---
category: nav
title: Dropdown
subtitle: 下拉菜单
order: 60
---
  
向下弹出的列表。  
  
基于 [button](http://lib.worktile.live/ngx-tethys/components/button/overview) 上增加 `thyDropDown` or `thyDropDownSplit` 来实现的，icon 与大小都是通过 button 的 `thyIcon` 与 [thySize](http://lib.worktile.live/ngx-tethys/components/button/examples) 来控制。

简单的使用：
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

<example name="thy-dropdown-basic-example" />