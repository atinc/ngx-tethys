---
title: 16.x 升级指南
path: 'migration-v16'
order: 991
hidden: false
---

<alert>本文档将帮助你从 ngx-tethys 15.x 版本升级到 16.x 版本。</alert>

## 开始之前

- 首先确保你 `Node.js 16 版本大于 v16.14.0 或 18 版本大于 v18.10.0`
- 创建新的分支进行升级，或者把当前分支备份

## 自动升级
执行 `ng update ngx-tethys` 命令自动升级, 这个命令核心处理如下事项：
- 升级 `ngx-tethys` 到 `16.x` 版本，并修改 package.json 中的依赖版本号
- 会自动把依赖的 CDK 和 Angular 库都升级到 `16.x` 版本，并修改 package.json 中的依赖版本号
- 自动修改 `thyLabelModule` 模块内容为 `thyTagModule` 模块内容
- 自动修改 `ThyActionMenuModule` 模块内容为 `ThyDropdownModule` 模块内容
- 上面两点中未修改全面或不完全对应的自动修改部分，会给出提示，用户需要根据提示，参考下面的对照表手动修改

## 破坏性修改

- `thyLabelModule` 模块下的所有内容从组件库中移除，使用 `thyTagModule` 模块下内容代替
- `ThyActionMenuModule` 模块下的内容从组件库中移除，使用 `ThyDropdownModule` 模块下内容代替

<label type="info">附录1</label> 所有 `thyLabelModule` 与 `thyTagModule` 对应的修改列表


- 模板
   - thyLabel -> thyTag
   - thySize:
      - sm20、md24、lg28 -> 不变
      - 不设置值（default22）-> md24 
      - default22 -> md24
      - xlg36 -> lg28
   - thyHasHover -> thyHoverable
   - thyIconPrefix -> 删除
   - thyBeforeIcon -> 前插入个名字是 thyBeforeIcon 值的 icon  ```<thy-icon  thyIconName="smile">```
   - thyAfterIcon -> 后插入个名字是 thyAfterIcon 值的 icon  ```<thy-icon  thyIconName="smile" class="ml-1">```
   - thyLabel: default | primary | success | info | warning | danger  | emboss-default | emboss-primary | emboss-warning | emboss-danger | outline
      - thyLabel=default -> thyColor=default
      - thyLabel=primary -> thyColor=primary
      - thyLabel=success -> thyColor=success
      - thyLabel=info -> thyColor=info
      - thyLabel=warning -> thyColor=warning
      - thyLabel=danger -> thyColor=danger
      - thyLabel=emboss-default -> thyColor=default  thyTheme=weak-fill
      - thyLabel=emboss-primary -> thyColor=primary  thyTheme=weak-fill
      - thyLabel=emboss-warning -> thyColor=warning  thyTheme=weak-fill
      - thyLabel=emboss-danger -> thyColor=danger  thyTheme=weak-fill
      - thyLabel=outline -> thyTheme=outline 
   - thyLabelColor -> thyColor
   - thyBackgroundOpacity -> 删除
   - thyLabelType: state | pill
      - thyLabelType=state -> thyShape=rectangle
      - thyLabelType=pill -> thyShape=pill
   - thyOnRemove -> 删除
- ts
   - ThyLabelTypeSize -> ThyTagSize
   - ThyLabelType -> ThyTagColor
   - ThyLabelComponent -> ThyTagComponent
   - ThyLabelModule -> ThyTagModule
   - 导入路径
- stylesheets
   - .thy-label -> .thy-tag
   - .thy-label-default -> .thy-tag-default
   - .thy-label-primary -> .thy-tag-primary
   - .thy-label-success -> .thy-tag-success
   - .thy-label-info -> .thy-tag-info
   - .thy-label-warning -> .thy-tag-warning
   - .thy-label-danger -> .thy-tag-danger
   - .thy-label-sm -> .thy-tag-sm
   - .thy-label-md -> .thy-tag-md
   - .thy-label-lg -> .thy-tag-lg
   - .thy-label-pill -> .thy-tag-pill
   - .thy-label-emboss-default -> .thy-tag-weak-fill-default
   - .thy-label-emboss-primary -> .thy-tag-weak-fill-primary
   - .thy-label-emboss-warning -> .thy-tag-tag-weak-fill-warning
   - .thy-label-emboss-danger -> .thy-tag-tag-weak-fill-danger
   - .thy-label-outline -> .thy-tag-outline

<label type="info">附录2</label> 所有 `ThyActionMenuModule` 与 `ThyDropdownModule` 对应的修改列表

- 模板
   - thyActionMenuItem[指令] -> thyDropdownMenuItem
      - thyDisabled -> 不变
      - thyType -> 不变
   - thyActionMenuItemIcon[指令] -> thyDropdownMenuItemIcon
   - thyActionMenuItemName[指令] -> thyDropdownMenuItemName
   - thyActionMenuItemMeta[指令] -> thyDropdownMenuItemMeta
   - thyActionMenuItemInfo[指令] -> thyDropdownMenuItemDesc
   - thyActionMenuItemExtendIcon[指令] -> thyDropdownMenuItemExtendIcon
   - thyActionMenuItemActive[指令] -> thyDropdownMenuItemActive
   - thyActionMenuSubItem[指令] -> thyDropdownSubmenu + thyDirection
   - thyActionMenuToggle[指令] -> thyDropdown
      - thyPlacement -> 不变
      - thyAction -> thyTrigger
      - thyStopPropagation -> 删除
      - thyContainerClass -> thyPanelClass
      - thyOriginActiveClass -> thyActiveClass
   - thy-action-menu[组件] -> thy-dropdown-menu
      - thyTheme -> 删除，提示
      - thyWidth -> 删除，提示
   - thy-action-menu-group[组件] -> thy-dropdown-menu-group
      - thyTitle -> 不变
   - thy-action-menu-divider[组件] -> thy-divider
      - thyTitle -> thyText
      - thyType=crossing -> thyTextDirection=center
- ts
   - ThyActionMenuModule -> ThyDropdownModule
   - ThyActionMenuTheme -> 删除
   - ThyActionMenuDividerType -> 删除
   - ThyActionMenuComponent -> ThyDropdownMenuComponent
   - ThyActionMenuGroupComponent -> ThyDropdownMenuGroupComponent
   - ThyActionMenuDividerComponent -> ThyDropdownMenuDividerComponent
   - ThyActionMenuDividerTitleDirective -> 删除
   - ActionEnum -> ThyDropdownTrigger
   - ThyActionMenuToggleDirective -> ThyDropdownDirective
   - ThyActionMenuSubItemDirective -> ThyDropdownSubmenuDirective
   - ThyActionMenuItemType -> ThyDropdownMenuItemType
   - ThyActionMenuItemDirective -> ThyDropdownMenuItemDirective
   - ThyActionMenuItemIconDirective -> ThyDropdownMenuItemIconDirective
   - ThyActionMenuItemNameDirective -> ThyDropdownMenuItemNameDirective
   - ThyActionMenuItemMetaDirective -> ThyDropdownMenuItemMetaDirective
   - ThyActionMenuItemInfoDirective -> ThyDropdownMenuItemDescDirective
   - ThyActionMenuItemExtendIconDirective -> ThyDropdownMenuItemExtendIconDirective
   - ThyActionMenuItemActiveDirective -> ThyDropdownMenuItemActiveDirective
   - ThyActionMenuModule -> ThyDropdownModule
   - 导入路径
- stylesheets
   - .action-menu -> .thy-dropdown-menu
