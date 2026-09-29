---
type: integration
title: 脚手架与版本迁移
description: ng add 写入哪些依赖和样式，以及 v22 迁移如何先提交 CDK 规则、再跑自定义模板规则，失败时如何继续。
tags: [schematics, ng-add, ng-update, migration]
verified:
  - by: openwiki/0.6.0
    at: 2026-09-28T07:54:10.806Z
sources:
  - id: openwiki-source-14d7c63fe78db8c38058b813
    resource: repo://schematics/dependencies.ts
  - id: openwiki-source-07d62c018189a4cbadf0e3ef
    resource: repo://schematics/migrate-22/index.ts
  - id: openwiki-source-d7379e502b9d927a0920cb5f
    resource: repo://schematics/ng-add/index.ts
  - id: openwiki-source-965d527d360a7a1a453066c4
    resource: repo://schematics/ng-add/schema.json
  - id: openwiki-source-118b389cf2e272faa3271888
    resource: repo://schematics/ng-update/core/complete.ts
  - id: openwiki-source-260f5bb720c365e0080c4514
    resource: repo://schematics/ng-update/migration-collection.json
  - id: openwiki-source-740ff2ce376a084ab195440f
    resource: repo://schematics/ng-update/two-phase-migration-rule.ts
  - id: openwiki-source-79a60be2779a861daacdb978
    resource: repo://schematics/ng-update/update-22/index.ts
  - id: openwiki-source-62cac766b8b04a559a874cb5
    resource: repo://schematics/utils/get-project.ts
  - id: openwiki-source-c3577e881522cf261d60c37e
    resource: repo://schematics/utils/package-config.ts
generated: { by: "cursor", at: "2026-09-28T07:54:10.806Z" }
---

脚手架打在 `ngx-tethys` 包里，不是单独发布的包。`ng add ngx-tethys` 做初始化。`ng update ngx-tethys` 走到 `migration-v22`，版本标记是 `22.0.0`。另有一条 `migrate-22`，只跑同样的代码改写，不负责升级包版本。

## ng add

规则先把尚未出现在 `dependencies` 里的 peer 写进 `package.json`：`@angular/cdk@^22.0.0`、`date-fns@4.1.0`、`@tethys/icons@^1.4.50`。已有的依赖不会被改版本。`ngx-tethys` 本身只在 `package.json` 里还没有它时才写入当前构建版本；Angular CLI 通常已经先加过这一项。

然后安排一次 `NodePackageInstallTask`。`icon` 默认是真，为真时把 `@tethys/icons` 整目录拷到构建资源的 `/assets/icons/`。无论图标开关如何，都会把 `node_modules/ngx-tethys/styles/index.scss` 加进目标工程的 `styles`，已存在则不重复添加。工程名缺省用工作区的 `defaultProject`；找不到该工程时抛出 `Could not find project in workspace`。

文档里的 `ng g ngx-tethys:[schematic]` 仍标着 WIP，`collection.json` 里没有对应的生成器。

## 两阶段迁移

`migration-v22` 和 `migrate-22` 都调用 `createTwoPhaseMigrationSchematicRule`。计划固定成两段：先 `CDK rules`（Angular CDK 自带的 `cdkMigrations`），再 `Custom rules`（本仓库的类）。空的一段会被滤掉。

找不到工作区配置时只打错误日志并返回，不做改写。某个工程既没有 build tsconfig 也没有 test tsconfig 时，警告并跳过该工程。有的话，build 和 test 各跑一遍，并额外扫工程根下的样式文件。同一阶段里用一个 `analyzedFiles` 集合记住已分析路径，避免 monorepo 里同一份模板被两个工程各改一次。每个工程结束后 `fileSystem.commitEdits()`，下一段才能读到上一段已经落盘的结果。自定义规则因此要求按属性或标签做增量修改，不能整份替换模板。

CDK 阶段用 `upgradeData` 做数据驱动的重命名，例如类名 `ThyButtonType` 到 `ThyButtonColor`、元素选择器 `thy-link` 到 `thy-anchor-link`，以及一批输入名。自定义阶段是点状规则，覆盖输入尺寸、按钮和标签外观、导航可关闭、表格表头、分割线、徽标、卡片废弃属性、日期弹出选项和树选择图标等。这里不逐条列出替换表。

某一规则失败不会停掉后续阶段。`hasFailures` 一直或到结束。两条入口的完成回调都先打印成功句，再在有失败时警告：有些问题没能自动修好，需要按上面的输出手工改。`ng update` 的句子是 `Updated NGX-TETHYS to 22`；`migrate-22` 的句子是 `Completed NGX-TETHYS v22 code migration`。若某条迁移的 `globalPostMigration` 要求装包，结束时再加一次 `NodePackageInstallTask`。

## 相关页面

- [在应用中接入](../workflows/adopt.md)说明应用侧如何执行 `ng add`。
- [主题与样式](../concepts/theming.md)说明被写进 `styles` 的总入口。
- [表单与校验](../concepts/forms.md)说明控件尺寸类型，v22 有对应迁移。
- [构建与发布](../operations/build-release.md)说明 schematics 如何被编译进 `dist/tethys`。
- [测试](../operations/testing.md)说明迁移规格如何用 Jasmine 跑。
