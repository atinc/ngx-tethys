---
type: operations
title: 测试
description: 组件库 Karma、CDK Karma 和 schematics Jasmine 如何启动，全局测试桩改了什么，以及 CI 比本地 pnpm test 多跑什么。
tags: [testing, karma, jasmine, ci]
verified:
  - by: openwiki/0.6.0
    at: 2026-09-28T07:54:10.806Z
sources:
  - id: openwiki-source-ee3ea3bd39689f7e4f5dc7c6
    resource: repo://.github/workflows/main.yml
  - id: openwiki-source-73378d4ee3f791429188ddb5
    resource: repo://angular.json
  - id: openwiki-source-4ecc8eec522b417edea4aac9
    resource: repo://cdk/test.ts
  - id: openwiki-source-6cce09702b8571c89cae64dd
    resource: repo://karma.conf.js
  - id: openwiki-source-5b54a58d1b51cd490b0e7162
    resource: repo://package.json
  - id: openwiki-source-7fa97f5752425a4288f27401
    resource: repo://src/test.ts
generated: { by: "cursor", at: "2026-09-28T07:54:10.806Z" }
---

测试分成三套，入口和全局桩并不相同。`pnpm test` 只跑组件库和 schematics，不跑 CDK。

## 组件库

`pnpm run test-tethys` 是 `ng test ngx-tethys`。Karma 配置默认浏览器是 `Chrome`，`autoWatch` 为真，所以本地会停在监视模式。`src/test.ts` 在加载规格之前做四件事：

- 把每个 `TestBed.configureTestingModule` 都加上 `provideZoneChangeDetection()`。
- 把 `DebounceTimeWrapper.debounceTime` 换成 `debounce(() => interval(time))`，避开 Angular 对 `debounceTime` 的已知测试问题。
- `setPrintErrorWhenIconNotFound(false)`，缺失图标不再打到控制台。
- `setWarnDeprecation(false)`，废弃警告不再打印。

然后用 `BrowserTestingModule` 初始化，并 `destroyAfterEach: true`。

规格从 `ngx-tethys/<组件>` 导入。按钮测试把 `ThyButtonModule` 放进夹具的 `imports`。需要图标时调用 `ngx-tethys/testing` 的 `injectDefaultSvgIconSet`，它向注册表塞入一份内联 SVG，而不是请求 `@tethys/icons`。同一入口还导出事件分发、焦点、输入和 XHR mock。覆盖率排除 `src/testing` 和各组件的 `test` 目录。

## CDK

`pnpm run test-cdk` 使用 `cdk/test.ts` 和 `cdk/karma.conf.js`。它只初始化测试平台，同样 `destroyAfterEach`，没有组件库那四项桩。behavior 测试自己用 `runInInjectionContext` 包住 `actionBehavior` 和 `asyncBehavior` 的创建。

## schematics

`pnpm run test-schematics` 先 `tsc` 编译 schematics，再用 Jasmine 跑 `dist/tethys/schematics/**/*.spec.js`。它不经过 Karma。`schematics/testing` 用 `SchematicTestRunner` 在内存里跑 `@schematics/angular` 的 workspace 示意图，给 ng-add 和迁移规格一个假的 `angular.json`。

## CI 和本地的差别

`main.yml` 在推送到 `master` 或针对 `master` 的 pull request 上运行。环境是 `zh_CN.UTF-8`、时区 `Asia/Shanghai`、Node 22、`pnpm install --frozen-lockfile`。顺序是 lint、`test-tethys`、`test-cdk`、`test-schematics`。前两个 Karma 命令加上 `--no-watch --no-progress --browsers=ChromeHeadlessCI --source-map=false`。`ChromeHeadlessCI` 基于 `ChromeHeadless`，并带 `--no-sandbox`。

因此 CI 会跑 CDK 测试并在无头 Chrome 里单次结束；本地 `pnpm test` 既不包含 CDK，组件测试也会停在监视模式，除非同样加上 `--no-watch`。

## 相关页面

- [组件包结构](../architecture/component-package.md)说明规格文件放在组件目录的 `test/` 里。
- [CDK 行为](../cdk/behaviors.md)说明 behavior 测试为什么要注入上下文。
- [脚手架与版本迁移](../integrations/schematics.md)说明这些 Jasmine 规格在验证什么。
- [构建与发布](build-release.md)说明发布工作流不替代这套测试。
