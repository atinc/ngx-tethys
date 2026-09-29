---
type: quickstart
title: 快速上手
description: 按要做的事打开对应专题：接入、主题、浮层、表单、迁移、测试和发布。
tags: [quickstart, index]
verified:
  - by: openwiki/0.6.0
    at: 2026-09-28T07:54:10.806Z
sources:
  - id: openwiki-source-ee48a60e3f29e233db382feb
    resource: repo://docs/guide/getting-started.md
  - id: openwiki-source-5b54a58d1b51cd490b0e7162
    resource: repo://package.json
  - id: openwiki-source-cdfd99fd7010fe28f99f9940
    resource: repo://src/public-api.ts
generated: { by: "cursor", at: "2026-09-28T07:54:10.806Z" }
---

按你要做的事打开对应页面。细节写在那些页面里。

## 在业务应用里使用

- 安装依赖、加样式、从次级路径导入组件，看 [在应用中接入](workflows/adopt.md)。
- 两个发布包和根入口导出什么，看 [包与入口](architecture/packages.md)。
- 一个组件目录里有源码、样式、文档和测试，看 [组件包结构](architecture/component-package.md)。

## 改外观和文案

- 样式入口和 `theme` 属性，看 [主题与样式](concepts/theming.md)。
- 图标注册和 svg 模式，看 [图标](concepts/icons.md)。
- 语言包和 `setLocale`，看 [国际化](concepts/i18n.md)。

## 做界面

- 对话框、弹出层、抽屉和指令浮层，看 [浮层体系](concepts/overlay.md)。
- 通知和全局消息，看 [瞬时反馈](concepts/transient-feedback.md)。
- 表单校验时机和错误展示，看 [表单与校验](concepts/forms.md)。
- 下拉、树选择和级联，看 [选择控件](concepts/selection.md)。
- 日期、时间和日历，看 [日期与时间](concepts/date-time.md)。
- 全局配置和 `provideTethys`，看 [核心服务与全局配置](concepts/core-services.md)。

## 用 CDK

- `actionBehavior` 和 `asyncBehavior`，看 [CDK 行为](cdk/behaviors.md)。
- DOM、事件、热键和不可变数据，看 [Utilities](cdk/utilities.md)。

## 升级、验证和发布

测试、文档站和发版是三条不同的命令，各自一页。

- `ng add` 和 v22 迁移，看 [脚手架与版本迁移](integrations/schematics.md)。
- 本地测试和 CI，看 [测试](operations/testing.md)。
- 库的构建和 npm 发布，看 [构建与发布](operations/build-release.md)。
- Docgeni 和站点，看 [文档站点](operations/docs-site.md)。
