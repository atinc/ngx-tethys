---
type: operations
title: 文档站点
description: Docgeni 如何从 src 的 doc 与 examples 以及 docs 目录生成文档，本地 serve 和带 base-href 的生产构建有什么差别。
tags: [docgeni, docs, site]
verified:
  - by: openwiki/0.6.0
    at: 2026-09-28T07:54:10.806Z
sources:
  - id: openwiki-source-d27b27f8a24d9be321a99559
    resource: repo://.docgenirc.js
  - id: openwiki-source-73378d4ee3f791429188ddb5
    resource: repo://angular.json
  - id: openwiki-source-3ec2ec210b257aa5c573d15b
    resource: repo://docs/index.md
  - id: openwiki-source-5b54a58d1b51cd490b0e7162
    resource: repo://package.json
  - id: openwiki-source-f4cba6519abd5717a2cc5e67
    resource: repo://site/src/app/app.initializer.ts
  - id: openwiki-source-f275466b131ce2191d672f69
    resource: repo://src/button/doc/zh-cn.md
generated: { by: "cursor", at: "2026-09-28T07:54:10.806Z" }
---

文档站是 Angular 应用 `site`，由 Docgeni 收集内容后再交给 `ng build`。它不进 `pnpm run build` 的 npm 包产物。

## 内容从哪来

`.docgenirc.js` 把模式设为 `full`，站点工程名是 `site`。两个库：

- `ngx-tethys` 的根是 `./src`，排除 `core`。组件页来自各目录的 `doc/zh-cn.md`。frontmatter 里的 `category` 决定导航分组，例如按钮是 `general`。正文用 `<example name="thy-button-basic-example">` 指向同目录 `examples/` 里的示例组件。
- `tethys-cdk` 的根是 `./cdk`，排除 `event`。

`docs/` 是另一类页面：`docs/index.md` 是首页文案，`docs/guide/` 和 `docs/design/` 是指南和设计说明。这些不是组件 API 页。

站点默认语言是 `zh-cn`，另外配置了繁体、英文、日文和德文。这是文档站的 locale key，和组件库运行时的 `zh-hans` 不是同一个标识。

## 本地和构建

`pnpm start` 与 `pnpm run serve` 都是 `docgeni serve --configuration development`。

生产分两步。`build-docs` 执行 `docgeni build --skip-site`，只生成文档、不打站点包。`build-site` 先跑这一步，再 `ng build site --configuration production --base-href=/ngx-tethys/`，输出到 `dist/site`。`build-clean-site` 同样先生成文档，但生产构建不带这个 base href。`serve-demo` 用 http-server 在 8888 端口看 `dist/site`。

站点自己的样式是 `site/src/styles.scss`。图标资源在 `angular.json` 里把 `@tethys/icons` 拷到 `/assets/icons/`。启动时 `initializeApp` 注册 `assets/icons/defs/svg/sprite.defs.svg`，监听根元素的 `theme` 属性并写入 `ThyThemeStore`，再按路由第一段调用 `ThyI18nService.setLocale` 和 `TinyDate.setDefaultLocale`。

## 相关页面

- [组件包结构](../architecture/component-package.md)说明 `doc/zh-cn.md` 和 `examples` 放在组件目录里。
- [主题与样式](../concepts/theming.md)说明站点如何把 `theme` 属性同步进 store。
- [在应用中接入](../workflows/adopt.md)说明指南里的上手步骤和源码里的 `ng add` 是否一致。
- [构建与发布](build-release.md)说明库构建不包含这个站点。
