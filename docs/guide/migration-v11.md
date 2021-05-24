---
title: 11.x 升级指南
path: 'migration-v11'
order: 997
---

本文档将帮助你从 ngx-tethys 10.x 版本升级到 11.x 版本。

## 开始之前

- 首先确保你 `Node.js >= 12.14` || `Node.js >= 14.0`
- 创建新的分支进行升级，或者把当前分支备份

## 自动升级
 执行 `ng update ngx-tethys` 命令自动升级, 这个命令主要做了一下几件事：
- 升级 `ngx-tethys` 到 `11.x` 版本，修改 package.json。
- 会自动把依赖的 CDK 和 Angular 库都升级到 `11.x` 版本。
- `thy-grid` 组件改为 `thy-table`，`thy-grid-column` 改为 `thy-table-column`。代码中引用 `ThyGridModule` 改为 `ThyTableModule`，其他类型定义 `ThyGrid*` 改为 `ThyTable*`。

## 破坏性修改
- `thy-grid` 组件改为 `thy-table`，`thy-grid-column` 改为 `thy-table-column`。代码中引用 `ThyGridModule` 改为 `ThyTableModule`，其他类型定义 `ThyGrid*` 改为 `ThyTable*`。使用命令自动升级时会自动修改。
- `thy-badge` 组件中 `thyColor` 需修改为 `thyBackgroundColor`。
- `thy-card-content` 组件中 `thyAlign` 需移除。
- `thy-dialog-footer` 组件中 `thyShowBorderTop` 需修改为 `thyDivided`。
- `thy-selection-list` 组件中 `thyFirstItemDefaultActive` 需修改为 `thyAutoActiveFirstItem`。
- `ThyNotifyService` 服务中 `removeItemById()` 需修改为 `removeNotifyById()`。
- `ThyNotifyOption` 类型需修改为 `ThyNotifyOptions`。
- `ThySlideConfig` 类型中 `key` 需修改为 `id`、`class` 需修改为 `panelClass`。
- `ThySlideService` 服务中 `show()` 需修改为 `open()`、`hide()` 需修改为 `close()`。
- 按钮组件样式变量修改：
  ``` css
  $btn-border-radius: 1.25rem !default;
  $btn-border-radius-lg: 1.65rem !default;
  $btn-border-radius-sm: 1rem !default;
  $btn-border-radius-xs: 0.75rem !default;
  ```
  改为
  ```css
  $btn-border-radius: 4px !default;
  $btn-border-radius-lg: 4px !default;
  $btn-border-radius-sm: 4px !default;
  $btn-border-radius-xs: 4px !default;
  ```


