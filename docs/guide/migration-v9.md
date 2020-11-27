---
title: 9.x 升级指南
path: 'migration-v9'
order: 10
---

本文档将帮助你从 ngx-tethys 8.x 版本升级到 9.x 版本。

## 开始之前

- 首先确保你 Node.js >= 10.13
- 创建新的分支进行升级，或者把当前分支备份
- 删除项目下 package-lock.json 文件

## 升级依赖
### 官方依赖升级
- `ng update @angular/cli^9 @angular/core@^9 @angular/cdk^9 --force`

### 第三方依赖升级
- `ngx-bootstrap`升级到v6.2.0

### 升级 ngx-tethys
- 修改 `ngx-tethys` 版本为 `9.0.0`

## 引入修改
- 多级引入改为二级或者三级(一般为二级)
- 尽量避免使用`ngx-tethys`的一级模块
### 三级入口
- `ngx-tethys/util/helpers`
- `ngx-tethys/core/logger`

## todo
- 未来正式版可能通过`ng add`,`ng update`支持自动化安装/升级依赖,所以不需要目前把所有项目都升级,除非是最近必须用项目
- 调用umd.js实现cdn式的模块引入