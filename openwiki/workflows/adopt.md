---
type: workflow
title: 在应用中接入
description: ng add 实际写入哪些依赖、样式和图标，以及组件必须从次级路径导入；手动安装文档的 date-fns 已是 4.1.0，但仍缺时区包和 CDK。
tags: [ng-add, install, styles, icons]
sources:
  - id: openwiki-source-ee48a60e3f29e233db382feb
    resource: repo://docs/guide/getting-started.md
  - id: openwiki-source-14d7c63fe78db8c38058b813
    resource: repo://schematics/dependencies.ts
  - id: openwiki-source-d7379e502b9d927a0920cb5f
    resource: repo://schematics/ng-add/index.ts
  - id: openwiki-source-965d527d360a7a1a453066c4
    resource: repo://schematics/ng-add/schema.json
  - id: openwiki-source-c3577e881522cf261d60c37e
    resource: repo://schematics/utils/package-config.ts
  - id: openwiki-source-595456b861487ef5de1c5b43
    resource: repo://src/button/index.ts
  - id: openwiki-source-a2c92554b62aced54e9db682
    resource: repo://src/package.json
  - id: openwiki-source-cdfd99fd7010fe28f99f9940
    resource: repo://src/public-api.ts
generated: { by: "cursor", at: "2026-09-29T01:54:27.255Z" }
verified:
  - by: openwiki/0.6.0
    at: 2026-09-29T01:54:27.255Z
---

接入有两条路：`ng add ngx-tethys`，或按发布包的 peer 自己装依赖并改 `angular.json`。组件都从 `ngx-tethys/<目录>` 导入，根入口不导出组件。

## ng add 实际做的事

`ng add ngx-tethys` 只在目标 `package.json` 的 `dependencies` 里补缺失项，已有同名依赖不会被改写。它写入：

- `@angular/cdk`：`^22.0.0`
- `date-fns`：`4.1.0`（精确版本，不是范围）
- `@tethys/icons`：`^1.4.50`

如果 CLI 还没写入 `ngx-tethys`，示意图会按当前构建版本补上。然后安排一次包安装。

样式总会追加到指定工程的 `build.options.styles`，路径是 `./node_modules/ngx-tethys/styles/index.scss`，列表里已有则跳过。`icon` 默认为 `true`，为真时把 `@tethys/icons` 整包拷到 `/assets/icons/`。传 `icon: false` 则不拷。找不到工程时抛出 `Could not find project in workspace`。

这两项 peer 不会被 ng-add 写进 `package.json`，需要自己装：`@tethys/cdk`（peer 是 `*`）和 `@date-fns/tz@1.2.0`。发布包里 `@tethys/icons` 的 peer 是 `^1.4.23`，ng-add 写入的是更窄的 `^1.4.50`。

## 文档里的手动安装

`docs/guide/getting-started.md` 的手动安装已经写成 `date-fns@4.1.0`，和发布包 peer 的精确版本一致。这条命令仍然不包含 `@date-fns/tz@1.2.0` 和 `@tethys/cdk`。图标只写了包名，没有写成 peer 的 `^1.4.23`。

样式路径和文档一致：`angular.json` 的 styles 加 `node_modules/ngx-tethys/styles/index.scss`，或在样式文件里 `@use 'ngx-tethys/styles/index.scss'`。图标 assets 的 `input` / `output` 也和 ng-add 相同。

## 在代码里用组件

根 `public-api` 只导出版本、全局配置和 `provideTethys`。按钮从 `ngx-tethys/button` 导入 `ThyButton` 或 `ThyButtonModule`。模块只是再导出独立组件。不要从包根或组件目录的 `index.ts` 桶文件导入内部实现。

CDK 行为、热键等从 `@tethys/cdk` 导入。`dom` 不在这个桶里，要用次级入口。

图标注册表需要 `HttpClient`。默认模式是 svg，资源在 `/assets/icons/`。主题靠应用自己在根元素上设置 `theme` 属性，库的 store 不会写这个属性。

## 相关页面

- [包与入口](../architecture/packages.md)说明根入口和次级入口分别导出什么。
- [图标](../concepts/icons.md)说明注册表和默认 svg 模式。
- [主题与样式](../concepts/theming.md)说明样式入口和 `theme` 属性。
- [脚手架与版本迁移](../integrations/schematics.md)说明 ng-add 失败时的异常，以及 `ng update` 的 v22 迁移。
