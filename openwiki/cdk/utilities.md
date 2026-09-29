---
type: "参考"
title: "Utilities"
openwiki_generated: true
verified:
  - by: openwiki/0.6.0
    at: 2026-09-28T07:54:10.806Z
sources:
  - id: openwiki-source-8f699e0f6737f6a88979930b
    resource: repo://cdk/dom/abstract-element-renderer.ts
  - id: openwiki-source-36a3d589a9f8ed5223fa4dc2
    resource: repo://cdk/dom/host-renderer.ts
  - id: openwiki-source-ae0368f059678f49f58beed1
    resource: repo://cdk/dom/ng-package.json
  - id: openwiki-source-d02fc0afbb3ef6c747263730
    resource: repo://cdk/dom/stealth-view-directive.ts
  - id: openwiki-source-e19ca76992b430b931d12080
    resource: repo://cdk/event/click-dispatcher.ts
  - id: openwiki-source-03162b3f20a3850a72a24ea2
    resource: repo://cdk/event/event-dispatcher.ts
  - id: openwiki-source-fd61f5be56946cf2d823e3c3
    resource: repo://cdk/event/keyboard-dispatcher.ts
  - id: openwiki-source-3314ab521ff114a2432d435f
    resource: repo://cdk/hotkey/hotkey-dispatcher.ts
  - id: openwiki-source-e68487aaa10327fca9f5067e
    resource: repo://cdk/hotkey/hotkey.directive.ts
  - id: openwiki-source-7d35bee41a9a0f901a146a8f
    resource: repo://cdk/hotkey/hotkey.ts
  - id: openwiki-source-44b38d9f3b9e60a2731554a7
    resource: repo://cdk/immutable/immutable.ts
  - id: openwiki-source-d1edaf15d0e0a9db51ea39d6
    resource: repo://cdk/immutable/object-producer.ts
  - id: openwiki-source-ff50d53de966f9a7c8a747bd
    resource: repo://cdk/is/utils.ts
  - id: openwiki-source-484d97d2309c5d3a721fe5f3
    resource: repo://cdk/logger/logger.ts
  - id: openwiki-source-03ac3b3d3876279d5b46f3a2
    resource: repo://cdk/public-api.ts
  - id: openwiki-source-b09dcc07427fddba146c1886
    resource: repo://src/core/event-dispatchers/index.ts
  - id: openwiki-source-b3bacbcee74d4730b562581a
    resource: repo://src/layout/sidebar.component.ts
  - id: openwiki-source-7fa97f5752425a4288f27401
    resource: repo://src/test.ts
  - id: openwiki-source-795e1a7dc3ec1be94d67ae7d
    resource: repo://src/types/common.ts
  - id: openwiki-source-c2bd9484b9e1fcd4b7a96094
    resource: repo://src/util/logger/logger.ts
generated: { by: "cursor", at: "2026-09-28T07:54:10.806Z" }
---



这些工具随 `@tethys/cdk` 单独发布，组件通过次级路径导入。根入口再导出 `is`、`logger`、`immutable`、`event`、`hotkey` 和 `behaviors`。`dom` 不在这个桶里，调用方写 `@tethys/cdk/dom`。

## is

`@tethys/cdk/is` 是一组类型判断。空值、数组、空集合、字符串和函数判断被 behavior、热键和布局共用。例如热键分发器用 `isFormElement` 判断当前焦点是不是表单控件，布局侧栏用 `isMacPlatform` 区分平台快捷键。

## dom

`useHostRenderer()` 在当前注入上下文里 `new HostRenderer()`。`HostRenderer` 用 `inject(ElementRef)` 拿到宿主元素，再通过 `Renderer2` 做类名差量：`updateClass` 去掉不再需要的类，只给新出现的类调用 `addClass`。按钮、输入框、树、选择控件等大量组件在字段初始化时调用它，从而不必自己保存上一次的类名列表。

同一入口还有 `thyStealthView`。它把 `ng-template` 渲染出来但保持隐蔽，调用方通过 `rootNodes` 取节点。因为 `dom` 不在 CDK 根桶中，这些符号只能从 `@tethys/cdk/dom` 导入。

元素为空时 `AbstractElementRenderer` 抛出 `Element is null, should call setElement method...`。`HostRenderer` 自己提供元素，这条失败路径留给尚未 `setElement` 的 `ElementRenderer`。

## event

`ThyEventDispatcher` 在 `NgZone.runOutsideAngular` 里监听 `document` 上的一种事件，避免每次原生事件都触发变更检测。第一个订阅者装上全局监听，订阅数回到 0 时卸掉。`subscribe` 默认 `auditTime(100)`；传入 `0` 则不做节流。`ThyClickDispatcher` 和键盘分发器是 `providedIn: 'root'` 的具体类。`ngx-tethys/core` 把整个 `@tethys/cdk/event` 再导出，组件可以从 core 拿到同一套分发器。

## hotkey

`hotkey(event)` 把 Ctrl、Alt、Meta、Shift 和主键拼成 `Control+K` 这种字符串。Shift 加字母键且 `key` 已是大写时不再单独写出 `Shift`。`isHotkey` 对两边做大小写不敏感比较。

`ThyHotkeyDispatcher` 继承事件分发器，事件名是 `keydown`。作用域是 `document` 时复用那条带引用计数的监听；作用域是某个元素时改为 `fromEvent`。焦点在表单元素上、且该元素不是绑定范围时，快捷键被忽略。匹配成功后，分发器用文件内自己的 `runInZone` 把事件送回 Angular 区域，它不引用 behaviors 里的同名操作符。

`[thyHotkey]` 指令订阅分发器，触发时 `preventDefault` 并 `stopPropagation`，再发出 `thyHotkeyListener`。布局侧栏直接注入 `ThyHotkeyDispatcher`。

## immutable

`produce` 看参数类型分流。数组得到 `Producer`，默认用 `_id` 当主键，可用 `idKey` 改掉。`add` 返回新数组：普通追加、`prepend` 或按 `afterId` 插入都用展开拷贝，不改调用方原来的数组引用。非数组得到 `ObjectProducer`。`ngx-tethys/types` 从这里再导出 `Id`、`Ids` 和 `IdOrIds`，级联选择服务使用这些类型。

## logger

`@tethys/cdk/logger` 的 `warn` 只在开发模式打印，同一组参数只打印一次，前缀是 `[TETHYS-CDK]:`。`log` 也只在开发模式打印，但不做去重。

组件库的废弃警告不走这个 logger。`ngx-tethys/util` 里有一份平行实现，前缀是 `[NGX-TETHYS]:`，并且 `setWarnDeprecation(false)` 可以关掉废弃警告。组件测试的全局入口会关掉它，避免废弃 API 刷屏。

## 相关页面

- [包与入口](../architecture/packages.md)说明 CDK 为何单独发布、`dom` 为何不在根桶。
- [组件包结构](../architecture/component-package.md)说明组件如何在字段里使用 `useHostRenderer`。
- [CDK 行为](behaviors.md)说明 `isFunction` 如何参与回调合并；热键的 zone 包装是另一份实现。
