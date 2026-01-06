---
title: 21.x 升级指南
path: 'migration-v21'
order: 986
---

<alert>本文档将帮助你从 ngx-tethys 20.x 版本升级到 21.x 版本。</alert>

## 开始之前

- 首先确保你 `Node.js ^20.19.0 || ^22.12.0 || >=24.0.0`
- 创建新的分支进行升级，或者把当前分支备份

## 自动升级
执行 `ng update ngx-tethys` 命令自动升级，这个命令核心处理如下事项：
- 升级 `ngx-tethys` 到 `21.x` 版本，并修改 package.json 中的依赖版本号
- 会自动把依赖的 CDK 和 Angular 库都升级到 `21.x` 版本，并修改 package.json 中的依赖版本号
