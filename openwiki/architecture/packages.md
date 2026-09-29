---
type: architecture
title: 包与入口
description: ngx-tethys、@tethys/cdk 与内嵌 schematics 的发布边界、peer 依赖，以及根入口和次级入口如何分工。
tags: [packages, ng-packagr, peer-dependencies, public-api]
verified:
  - by: openwiki/0.6.0
    at: 2026-09-28T07:54:10.806Z
sources:
  - id: openwiki-source-73378d4ee3f791429188ddb5
    resource: repo://angular.json
  - id: openwiki-source-ae0368f059678f49f58beed1
    resource: repo://cdk/dom/ng-package.json
  - id: openwiki-source-96a0dbf32ffe8acb7d902575
    resource: repo://cdk/ng-package.json
  - id: openwiki-source-3d241992b174214c933815e4
    resource: repo://cdk/package.json
  - id: openwiki-source-03ac3b3d3876279d5b46f3a2
    resource: repo://cdk/public-api.ts
  - id: openwiki-source-5b54a58d1b51cd490b0e7162
    resource: repo://package.json
  - id: openwiki-source-da81ad78358bd380aa9163a5
    resource: repo://schematics/tsconfig.json
  - id: openwiki-source-52062044d541226a4f4e562c
    resource: repo://src/button/button.component.ts
  - id: openwiki-source-2d4a34ff0e8329c43274f7e4
    resource: repo://src/ng-package.json
  - id: openwiki-source-a2c92554b62aced54e9db682
    resource: repo://src/package.json
  - id: openwiki-source-cdfd99fd7010fe28f99f9940
    resource: repo://src/public-api.ts
  - id: openwiki-source-9114a8122dd976bfa887f356
    resource: repo://src/version.ts
  - id: openwiki-source-98d5ddb014a0fd4d678f6f2a
    resource: repo://tsconfig.json
generated: { by: "cursor", at: "2026-09-28T07:54:10.806Z" }
---

这个仓库发布两个 npm 包，文档站不发布。组件库 `ngx-tethys` 把脚手架打进同一个包；无 UI 的工具库 `@tethys/cdk` 单独发布，并由组件库声明为 peer。

## 工作区里的三个工程

`angular.json` 定义三个工程：

| 工程 | 类型 | 源码根 | 构建产物 |
| --- | --- | --- | --- |
| `ngx-tethys` | library | `src` | `dist/tethys` |
| `cdk` | library | `cdk` | `dist/cdk` |
| `site` | application | `site` | `dist/site` |

两个库都用 `@angular/build:ng-packagr`。`site` 是 Docgeni 演示应用，`pnpm run build` 不会构建它；站点走单独的 `build-site`。

本地路径把 `ngx-tethys` 指到 `src/public-api`，把 `ngx-tethys/*` 指到 `src/*`，把 `@tethys/cdk` 和 `@tethys/cdk/*` 指到 `cdk`。因此库内源码和测试可以直接写发布后的导入路径。

## ngx-tethys

发布元数据在 `src/package.json`，当前版本 `22.0.2`，与 `src/version.ts` 里的 `VERSION` 一致。根 `package.json` 是工作区的开发依赖清单，不是发布清单。

运行时依赖只有 `tslib`。Angular、Angular CDK、`@tethys/cdk`、`date-fns@4.1.0`、`@date-fns/tz@1.2.0`、`@tethys/icons` 和 `rxjs` 都是 peer。其中 `date-fns` 锁死补丁版本，`@tethys/cdk` 写成 `*`，由使用方自己安装对齐的 CDK 包。

根入口 `src/public-api.ts` 只导出 `VERSION`、全局配置和 `provideTethys`。组件、测试工具和 `core` 都是次级入口：目录里的 `ng-package.json` 把该目录的 `index.ts` 标成入口，导入路径是 `ngx-tethys/<目录名>`。Sass 的 `exports` 只公开 `styles/*`，组件目录里的 scss 不作为包导出路径。

`schematics` 字段和 `ng-update.migrations` 都指向包内的 `schematics/`。`tsc -p ./schematics` 把它们编译到 `dist/tethys/schematics`，所以 `ng add ngx-tethys` 和 `ng update` 跟随组件包，而不是第三个 npm 包。

## @tethys/cdk

`cdk/package.json` 的包名是 `@tethys/cdk`，peer 是 `@angular/common`、`@angular/core` 和 `@angular/cdk` 的 `^22.0.0`。它不依赖 `date-fns` 或图标库。

根入口 `cdk/public-api.ts` 再导出 `is`、`logger`、`immutable`、`event`、`hotkey` 和 `behaviors`。`dom` 有自己的次级入口，但没有放进这个桶。组件需要宿主渲染时直接写 `@tethys/cdk/dom`。`cdk/testing` 没有 `ng-package.json`，只服务库自己的测试。

## 构建与发布顺序

`pnpm run build` 先 `ng build cdk`，再 `ng build ngx-tethys`，最后编译 schematics 进 `dist/tethys`。`pub-only` 分别在 `dist/tethys` 和 `dist/cdk` 执行 `npm publish`。两个包版本号都写在各自的 `package.json` 里，目前同为 `22.0.2`。

## 相关页面

- [组件包结构](component-package.md)说明单个次级入口里有什么。
- [CDK 工具](../cdk/utilities.md)说明 `is`、`dom` 等工具的职责。
- [脚手架与版本迁移](../integrations/schematics.md)说明打进 `ngx-tethys` 的 ng-add 和 ng-update。
- [构建与发布](../operations/build-release.md)说明发版分支和 CI 发布。
