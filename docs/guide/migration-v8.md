---
title: 8.x 升级指南
path: 'migration-v8'
order: 10
---

本文档将帮助你从 ngx-tethys 7.x 版本升级到 8.x 版本。

## 开始之前

- 首先确保你 Node.js >= 10.13
- 创建新的分支进行升级，或者把当前分支备份
- 删除项目下 package-lock.json 文件

## 升级依赖

- 前往 https://update.angular.io/ 将项目升级到 Angular 8。
- 如果你有单独使用 @angular/cdk 请执行 ng update @angular/cdk@^8
- 去除 `angular-sortablejs` 依赖，新增 `"ngx-sortablejs": "^3.1.4"`

## 升级 ngx-tethys
- 修改 ngx-tethys 版本为 8.0.0-alpha.0
