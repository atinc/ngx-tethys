---
type: architecture
title: 组件包结构
description: 单个 ngx-tethys 组件如何以 standalone 类、兼容 NgModule、ng-packagr 次级入口、全局样式、文档示例和测试组成。
tags: [component, ng-packagr, standalone, secondary-entry]
verified:
  - by: openwiki/0.6.0
    at: 2026-09-28T07:54:10.806Z
sources:
  - id: openwiki-source-d27b27f8a24d9be321a99559
    resource: repo://.docgenirc.js
  - id: openwiki-source-23775c3de52f3ab95a13cb8b
    resource: repo://README.md
  - id: openwiki-source-3e327a710db849a7c0acba9b
    resource: repo://src/button/button-group.component.ts
  - id: openwiki-source-52062044d541226a4f4e562c
    resource: repo://src/button/button.component.ts
  - id: openwiki-source-5ace8344f8f84d895cf6df27
    resource: repo://src/button/button.module.ts
  - id: openwiki-source-f275466b131ce2191d672f69
    resource: repo://src/button/doc/zh-cn.md
  - id: openwiki-source-595456b861487ef5de1c5b43
    resource: repo://src/button/index.ts
  - id: openwiki-source-9e973de20e086546dd832f79
    resource: repo://src/button/ng-package.json
  - id: openwiki-source-09973aeca071e2d7aa5c0cb9
    resource: repo://src/button/styles/button.scss
  - id: openwiki-source-93380d1e9146673c6f553e69
    resource: repo://src/button/test/button.spec.ts
  - id: openwiki-source-2d4a34ff0e8329c43274f7e4
    resource: repo://src/ng-package.json
  - id: openwiki-source-cdfd99fd7010fe28f99f9940
    resource: repo://src/public-api.ts
  - id: openwiki-source-f753ce51f73355fa48cb1029
    resource: repo://src/styles/index.scss
  - id: openwiki-source-98d5ddb014a0fd4d678f6f2a
    resource: repo://tsconfig.json
generated: { by: "cursor", at: "2026-09-28T07:54:10.806Z" }
---

`src/` 下的一个组件目录就是一个可独立导入的包。应用从 `ngx-tethys/<目录名>` 拿到组件类和兼容用的 `NgModule`，样式则从库的全局 SCSS 入口进入，不挂在组件的 `styleUrls` 上。下面以 `src/button` 代表这套约定。

## 次级入口

根包 `src/ng-package.json` 的入口是 `src/public-api.ts`，它只导出版本、全局配置和 `provideTethys`。组件不从这里再导出。

每个组件目录放一份自己的 `ng-package.json`，把同目录的 `index.ts` 标成 ng-packagr 次级入口。`src/button/index.ts` 再导出模块、组件类和仅供包内使用的 token。TypeScript 路径 `ngx-tethys/*` 映射到 `./src/*`，所以库内和测试里的 `ngx-tethys/button` 都落到这个入口。

贡献者约定是：包内组合时导入具体文件，不要导入本目录的 `index.ts`。`ThyButtonModule` 分别从 `button.component`、`button-icon.component` 和 `button-group.component` 引入类。跨目录依赖走另一个次级路径，例如按钮组件从 `ngx-tethys/icon` 引入 `ThyIcon`。

## 组件与模块

编译选项打开了 `strictStandalone`。`ThyButton`、`ThyButtonIcon`、`ThyButtonGroup` 都是带 `imports` 的 standalone 类，选择器前缀是 `thy`。

`ThyButtonModule` 不再声明这些类，而是把它们放进 `imports` 再 `exports`。文档和测试仍写 `import { ThyButtonModule } from "ngx-tethys/button"`，新代码也可以直接导入 standalone 类。

同一目录里的类用注入令牌协作，而不是互相导入对方的模板。`ThyButtonGroup` 用 `useExisting` 提供 `THY_BUTTON_GROUP`，`ThyButton` 以 `optional: true` 注入它，这样单独使用的按钮不会要求外层分组。

## 样式

三个类都是 `ViewEncapsulation.None`，没有 `styleUrls`。视觉类名写在 `src/button/styles/`，由 `src/styles/index.scss` 用 `@forward` 收进公开发布的样式入口：按钮本体和按钮组各转发一次。图标按钮的样式不单独转发，由 `button.scss` 末尾 `meta.load-css('./button-icon')` 拉进来。根包构建把 `src/**/*.scss` 作为资源拷进 `dist/tethys`，应用侧只引入 `ngx-tethys/styles/index`。

## 文档、示例与测试

这些文件不参与组件运行时。

- `doc/zh-cn.md` 用 frontmatter 声明分类、标题和排序。Docgeni 把 `./src` 当作 `ngx-tethys` 库根，并排除 `core`，所以按钮文档会出现在组件导航里，核心服务不会。
- `examples/<name>/` 放示例组件和一段 `index.md`。文档正文用 `<example name="thy-button-basic-example">` 引用它们。
- `test/button.spec.ts` 和 `button-icon.spec.ts` 从 `ngx-tethys/button` 导入模块，在测试夹具的 `imports` 里挂上 `ThyButtonModule`，再断言宿主类名、禁用和加载行为。

## 相关页面

- [包与入口](packages.md)说明根包、CDK 和 schematics 如何分开发布。
- [在应用中接入](../workflows/adopt.md)说明应用如何安装并按次级路径导入。
- [主题与样式](../concepts/theming.md)说明变量覆盖和主题入口。
- [文档站点](../operations/docs-site.md)说明 Docgeni 如何收集这些文档和示例。
