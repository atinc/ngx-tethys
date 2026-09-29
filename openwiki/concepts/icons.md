---
type: concept
title: 图标
description: ThyIcon 如何从 ThyIconRegistry 取 SVG 或字体类，找不到图标时如何报错，以及测试和 ng add 如何对待 @tethys/icons。
tags: [icon, registry, svg]
sources:
  - id: openwiki-source-d7379e502b9d927a0920cb5f
    resource: repo://schematics/ng-add/index.ts
  - id: openwiki-source-fa7edc9ed4d3e2c88ba504c9
    resource: repo://src/icon/config.ts
  - id: openwiki-source-a327e16fa5bb832b286becea
    resource: repo://src/icon/icon-registry.ts
  - id: openwiki-source-54c523a3c3a5803f7eaa5e50
    resource: repo://src/icon/icon.component.ts
  - id: openwiki-source-a2c92554b62aced54e9db682
    resource: repo://src/package.json
  - id: openwiki-source-7fa97f5752425a4288f27401
    resource: repo://src/test.ts
generated: { by: "cursor", at: "2026-09-29T01:54:27.255Z" }
verified:
  - by: openwiki/0.6.0
    at: 2026-09-29T01:54:27.255Z
---

`thy-icon` 不内置图形。默认图标模式是 `svg`，图形来自应用注册的 SVG 集。`@tethys/icons` 是 peer，版本 `^1.4.23`，包里是静态资源，不是 Angular 服务。

## 注册

`ThyIconRegistry` 是根服务，并且无条件注入 `HttpClient`。`addSvgIconSet` 把 URL 放进空命名空间；`addSvgIconSetInNamespace` 放进指定命名空间。同一 URL 的请求会 `share`，避免重复下载。URL 必须能被 `DomSanitizer` 当成资源 URL，开发模式下不受信任的 URL 会抛错。字面量 SVG 不受信任时抛出 `The literal provided to ThyIconRegistry was not trusted as safe HTML`。

文档要求应用在启动时注册两份精灵图：`assets/icons/defs/svg/sprite.defs.svg` 和 `assets/icons/symbol/svg/sprite.symbol.svg`。`ng add` 只有在 `icon` 为真时，才把 `./node_modules/@tethys/icons` 整目录拷到构建资源的 `/assets/icons/`。样式入口仍会单独加进 `angular.json`，和图标资源无关。

## 渲染与失败

名字优先用 `thyName`，没有时用已废弃的 `thyIconName`。两者都空时不渲染。名字像图片路径时直接画 `image`，不查注册表。否则按命名空间拆开。

外观优先用 `thyAppearance`，否则用已废弃的 `thyIconType`，再否则是 `outline`。`fill` 和 `twotone` 会给图标名补上对应后缀，名字里已经有该后缀则不重复加。`outline` 不改名字。旋转、图标集、镂空底色和线性渐变同样是新输入优先：`thyRotate`、`thySet`、`thyLegging`、`thyLinearGradient` 盖过 `thyIconRotate`、`thyIconSet`、`thyIconLegging`、`thyIconLinearGradient`。这些旧输入都标明将在 v23 删除。

SVG 模式下调用 `getSvgIcon`。单个图标配置优先于图标集。两者都没有时，Observable 抛出 `Unable to find icon with the name "<key>"`。组件订阅失败后，若 `getWhetherPrintErrorWhenIconNotFound()` 为真，向控制台打印 `Error retrieving icon: ...`。这个开关默认是真。无论请求是否成功，宿主类名都会先更新成 `thy-icon-<namespace>-<name>`。

`setIconMode('font')` 后不再取 SVG，而是使用字体类。图标集优先用 `thySet`。默认字体集类名是 `wt-icon`，可用别名替换。

## 测试

`src/test.ts` 在启动 Karma 前调用 `setPrintErrorWhenIconNotFound(false)`。缺失图标的 Observable 仍然失败，但组件不会把错误打到控制台。图标规格用伪造的 SVG URL 断言 `addSvgIconSet` 和“找不到名字”的错误文本。

## 相关页面

- [在应用中接入](../workflows/adopt.md)说明 `ng add` 的图标开关。
- [组件包结构](../architecture/component-package.md)说明按钮等组件如何依赖 `ThyIcon`。
- [测试](../operations/testing.md)说明全局测试入口还关掉了哪些警告。
