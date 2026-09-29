---
type: concept
title: 核心服务与全局配置
description: ngx-tethys/core 里被多个组件共用的全局配置、主题信号、表单尺寸、滚动和 mixin，以及只被时间选择器使用的 MiniStore。
tags: [core, providers, theme, form-control]
verified:
  - by: openwiki/0.6.0
    at: 2026-09-28T07:54:10.806Z
sources:
  - id: openwiki-source-d27b27f8a24d9be321a99559
    resource: repo://.docgenirc.js
  - id: openwiki-source-79622dd6088ca72f3c7b465e
    resource: repo://src/core/behaviors/mixin.ts
  - id: openwiki-source-2279ba94b8328596e167f800
    resource: repo://src/core/behaviors/tabindex.ts
  - id: openwiki-source-cd36e3d22238f8df003ef225
    resource: repo://src/core/form-control-size.ts
  - id: openwiki-source-fe81bd2dfe0c63a56273cd3b
    resource: repo://src/core/global-config.ts
  - id: openwiki-source-465bb371c5e6e4ca12ed34b2
    resource: repo://src/core/provide.ts
  - id: openwiki-source-a6c799960b34407a02cca592
    resource: repo://src/core/scroll.ts
  - id: openwiki-source-9bd5aaf376a0e9fa8a68b78d
    resource: repo://src/core/store/store.ts
  - id: openwiki-source-1d206342c5702083c71250d3
    resource: repo://src/core/theme/enum.ts
  - id: openwiki-source-d1aafc4a7cb23671a30bedaf
    resource: repo://src/core/theme/store.ts
  - id: openwiki-source-5620bbd8e103a77090e198c1
    resource: repo://src/core/theme/theme.ts
  - id: openwiki-source-a8781ebcb4a3f6a57177558d
    resource: repo://src/core/update-host-class.service.ts
  - id: openwiki-source-59764ff4139b5f14fa647ac0
    resource: repo://src/input/input.component.ts
  - id: openwiki-source-cdfd99fd7010fe28f99f9940
    resource: repo://src/public-api.ts
  - id: openwiki-source-b55aefb1cae8f30b01457d84
    resource: repo://src/select/custom-select/custom-select.component.ts
  - id: openwiki-source-764eeeac72c3da198939eab8
    resource: repo://src/table/table.component.ts
  - id: openwiki-source-73411d03d41837fe76a50fa5
    resource: repo://src/time-picker/inner/inner-time-picker.store.ts
generated: { by: "cursor", at: "2026-09-28T07:54:10.806Z" }
---

`ngx-tethys/core` 是组件之间的共享层，不是组件次级入口那种 UI 包。根包 `ngx-tethys` 只再导出全局配置和 `provideTethys`。主题、滚动、mixin 和浮层基类都从 `ngx-tethys/core` 导入。Docgeni 生成组件文档时排除 `core`。

## 全局配置

`ThyGlobalConfig` 目前只有 `overlay`：`flexiblePosition` 表示首选位置放不下时能否改用备选位置，`canPush` 表示所有位置都放不下时能否把浮层推回视口。令牌是 `THY_GLOBAL_CONFIG`。

`provideTethys(...features)` 只是 `makeEnvironmentProviders`。`withGlobalConfig(config)` 用 `useValue` 提供该令牌。组件侧用 `inject(THY_GLOBAL_CONFIG, { optional: true })`，缺省时 `getOverlayGlobalConfig` 返回 `{}`。自定义选择把 `flexiblePosition !== false` 当成开启，所以不提供配置时自动换位是开的。浮层基类如何消费这两个开关，见[浮层体系](overlay.md)。

## 主题信号

`ThyThemeStore` 是 `providedIn: 'root'` 的信号存储，默认 `ThyTheme.light`。`setTheme` 写入 `light`、`dark` 或 `system`。`isDark` 在 `dark` 时为真；`system` 时读取 `prefers-color-scheme: dark`，没有 `matchMedia` 时为假。

`normalizeColor` 接受一个颜色或一对颜色。字符串原样返回；只有一个元素的数组返回那一个；两个及以上时，暗色用第二个，亮色用第一个。空数组返回 `undefined`。`injectPanelEmptyIcon()` 据此在暗色下给出 `preset-light`，亮色下给出空字符串。水印指令和文档站初始化也会注入这个 store。样式变量本身不在这里切换，见[主题与样式](theming.md)。

## 表单控件尺寸

`ThyFormControlSize` 是 `'xs' | 'sm' | 'md' | 'lg'`。输入框、搜索框、原生选择、自定义选择、树选择和时间选择都把 `thySize` 的默认值写成 `md`，空值也折回 `md`。这只是共享类型，不负责校验或布局。

## 宿主类、焦点和滚动

组件改宿主类有两条路。较新的调用走 `@tethys/cdk/dom` 的 `useHostRenderer()`。`UpdateHostClassService` 做同样的类名差量，但没有 `providedIn`，调用方必须自己提供并先 `initializeElement`。表格在组件 `providers` 里提供它。

`mixinTabIndex` 在 `thyDisabled` 时把 `tabIndex` 读成 `-1`。`TabIndexDisabledControlValueAccessorMixin` 把禁用和 tabIndex 叠到 `ControlValueAccessor` 基类上，原生选择和数字输入使用这份 mixin。`useHostFocusControl` 管理宿主焦点，搜索框和数字输入会调用。

`ThyScrollService` 是根服务。对 `window` 它同时写 `body` 和 `documentElement` 的 `scrollTop`，对普通元素只写该元素。锚点测试通过它断言滚动位置。

这些 mixin 和 CDK 的 `actionBehavior` 不是一层。core 的 `behaviors` 是构造器混入；异步动作在 `@tethys/cdk/behaviors`。

## MiniStore

`MiniStore` 用 `BehaviorSubject` 保存状态，`dispatch(type)` 按类上的 action 元数据调用处理函数。开发模式下找不到元数据或找不到 action 名会抛错：`current store has not action` 或 `` `${action.type} is not found` ``。`select` 对切片做 `distinctUntilChanged`。

产品代码里只有时间选择的 `ThyTimePickerStore` 继承它。其余组件不走这套 dispatch。主题状态用的是上面的信号 store，不是 `MiniStore`。

## 相关页面

- [包与入口](../architecture/packages.md)说明根入口为什么只导出配置和 `provideTethys`。
- [浮层体系](overlay.md)说明 overlay 全局开关如何进入定位。
- [表单与校验](forms.md)说明尺寸类型之外的表单指令和校验。
- [主题与样式](theming.md)说明 Sass 变量和运行时主题如何配合。
