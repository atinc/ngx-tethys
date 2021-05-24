---
title: 10.x 升级指南
path: 'migration-v10'
order: 998
---

本文档将帮助你从 ngx-tethys 9.x 版本升级到 10.x 版本。

## 开始之前

- 首先确保你 Node.js >= 10.13
- 创建新的分支进行升级，或者把当前分支备份
- 删除项目下 package-lock.json 文件

## 自动升级
 执行 `ng update ngx-tethys` 命令自动升级, 这个命令主要做了一下几件事：
- 升级 `ngx-tethys` 到 `10.x` 版本，修改 package.json
- 会自动把依赖的 CDK 和 Angular 库都升级到 `10.x` 版本

