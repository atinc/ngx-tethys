---
title: 17.x 升级指南
path: 'migration-v17'
order: 990
hidden: false
---

<alert>本文档将帮助你从 ngx-tethys 和 @tethys/cdk 的 16.x 版本升级到 17.x 版本。</alert>

## 开始之前

- 首先确保你 `Node.js >= 18.10.0`
- 创建新的分支进行升级，或者把当前分支备份

## 自动升级
执行 `ng update ngx-tethys` 命令自动升级，这个命令核心处理如下事项：
- 升级 `ngx-tethys` 到 `17.x` 版本，并修改 package.json 中的依赖版本号。
- 自动把依赖的 CDK 和 Angular 库都升级到 `17.x` 版本，并修改 package.json 中的依赖版本号。
- 自动移除独立组件的 Component 后缀，比如：将 `ThyButtonComponent` 改成 `ThyButton`。
- 自动将「原生下拉选择组件」的类名由 `ThySelectComponent` 改成 `ThyNativeSelect`，相应的选择器由  `thy-select` 改成 `thy-native-select` 。
- 自动将「自定义下拉选择组件」的类名由 `ThySelectCustomComponent` 改成 `ThySelect`，相应的选择器由  `thy-custom-select` 改成 `thy-select` 。
