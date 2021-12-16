---
title: 12.x 升级指南
path: 'migration-v12'
order: 996
---

本文档将帮助你从 ngx-tethys 11.x 版本升级到 12.x 版本。

## 开始之前

- 首先确保你 `Node.js >= 12.14`
- 创建新的分支进行升级，或者把当前分支备份

## 自动升级
 执行 `ng update ngx-tethys` 命令自动升级, 这个命令主要做了一下几件事：
- 升级 `ngx-tethys` 到 `12.x` 版本，修改 package.json。
- 会自动把依赖的 CDK 和 Angular 库都升级到 `12.x` 版本。

## 破坏性修改
- `thy-grid` 组件改为 `thy-table`，`thy-grid-column` 改为 `thy-table-column`。代码中引用 `ThyGridModule` 改为 `ThyTableModule`，其他类型定义 `ThyGrid*` 改为 `ThyTable*`。
- `thy-alert` 组件中参数 `thyType` 的可选值废弃 `*-week` 需修改为 `*-weak`。

## 过渡
- `ngx-tethys` 内部现在使用新的 [Sass 模块系统](https://sass-lang.com/blog/the-module-system-is-launched)。可使用基于 `@use` 引用组件库中的变量、function 和 mixin。
- 状态管理使用 [@tethys/store](https://github.com/tethys-org/store) 替代 ngx-tethys/store。
