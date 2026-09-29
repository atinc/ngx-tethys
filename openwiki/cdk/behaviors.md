---
type: concept
title: CDK 行为
description: actionBehavior 与 asyncBehavior 如何把 Observable 动作包成可执行对象，合并成功失败回调，并在没有调用方错误处理时落到全局默认处理器。
tags: [cdk, behavior, observable, error-handling]
verified:
  - by: openwiki/0.6.0
    at: 2026-09-28T07:54:10.806Z
sources:
  - id: openwiki-source-7f9d754e8be12174ddd7e25d
    resource: repo://cdk/behaviors/action-behavior.ts
  - id: openwiki-source-d966b4c54f5fe953c2f051ec
    resource: repo://cdk/behaviors/async-behavior.ts
  - id: openwiki-source-9341c4c3135d078bbf55857e
    resource: repo://cdk/behaviors/behavior.ts
  - id: openwiki-source-8992a5766a97b114d5f4c299
    resource: repo://cdk/behaviors/error-handler.ts
  - id: openwiki-source-43450422f3cba5a8fe10c1c8
    resource: repo://cdk/behaviors/examples/action/action.component.ts
  - id: openwiki-source-3d7db881973c10ed3289d13e
    resource: repo://cdk/behaviors/run-in-zone.ts
  - id: openwiki-source-329c481fd6f4cc59ed5df7ef
    resource: repo://cdk/behaviors/test/action-behavior.spec.ts
  - id: openwiki-source-efec9fb1a0559ba5685ed605
    resource: repo://cdk/behaviors/test/async-behavior.spec.ts
  - id: openwiki-source-3314ab521ff114a2432d435f
    resource: repo://cdk/hotkey/hotkey-dispatcher.ts
generated: { by: "cursor", at: "2026-09-28T07:54:10.806Z" }
---

`@tethys/cdk/behaviors` 把一次返回 `Observable` 的动作包成带状态的可执行对象。仓库里的调用方是 CDK 示例和对应测试。热键分发器有自己的 zone 包装，不引用这里的 `runInZone`。

创建必须发生在注入上下文里。`ActionBehaviorImpl` 和 `AsyncBehaviorImpl` 在构造时调用 `takeUntilDestroyed()`，示例把 behavior 写成类字段，测试用 `runInInjectionContext` 包住。

## 调用形状

`createBehaviorFromFunction` 给函数打上内部 `BEHAVIOR` 标记，并把 `execute`、状态 signal 挂到函数上。两种工厂都先返回一个函数：调用它只是把参数记到 `executeParams` 并返回自身，真正发请求的是随后的 `execute`。

```ts
this.addBehavior({ name: 'Pet' }).execute(data => { /* success */ });
```

`execute` 的回调有两种写法：两个函数 `(success, error)`，或一个 `{ success, error }` 上下文。`pickBehaviorCallbacks` 先取这次调用传入的回调；某个回调缺省时，回落到创建 behavior 时传入的 `BehaviorContext`。

## actionBehavior

面向会改数据的动作。它暴露 `saving` signal，并让 `execute` 返回 `shareReplay(1)` 之后的 `Observable`，调用方还可以再订阅这一次的结果。

`saving()` 已经为真时，再次 `execute` 直接返回 `undefined`，不会第二次调用 action。测试覆盖了这一点：第一次还没结束时第二次 `execute` 的成功回调不会跑。

开始时 `saving` 设为真。`finalize` 和成功的 `tap` 都会把它设回假并清掉参数。Observable 报错时，订阅的 `error` 同样把 `saving` 设回假，然后交给 `handleBehaviorError`。action 同步抛错时走 `catch`：清掉 `saving`、处理错误，并 `return throwError(error)`。只 `complete`、没有 `next` 时，成功回调不会收到值，但 `finalize` 仍会结束 `saving`。

## asyncBehavior

面向读取。它没有重入锁。状态从 `pending` 开始，`execute` 后变为 `loading`，成功后 `value` 写入结果且状态变为 `success`，失败后 `error` signal 记下错误且状态变为 `error`。`loadingDone` 是 `loading` 的取反。`execute` 返回 `void`，不把 Observable 交还给调用方。

同步抛错与 Observable 报错都会进入 `error` 状态并调用 `handleBehaviorError`。`finalize` 负责把 `loading` 设回假。

## 错误落到哪里

`handleBehaviorError` 只在这次合并后的 `error` 回调不存在时，才调用 `getDefaultErrorHandler()`。模块加载时的默认处理器是空函数，所以不设置、也不传 `error` 时，错误被吞掉。`setDefaultErrorHandler` 替换这个模块级函数，对之后所有 behavior 生效。示例在构造函数里把它接到 `ThyNotifyService.error`。调用方传入了 `error`，或者创建时的 context 里有 `error`，默认处理器都不会再被调用。

## runInZone

`runInZone(zone)` 是独立的 RxJS 操作符，把 `next`、`error` 和 `complete` 放进给定的 `NgZone.run`。action 和 async 不会自动套上它。热键分发器在同一文件里定义了另一个 `runInZone`，键盘事件流用的是那一份。

## 相关页面

- [CDK 工具](utilities.md)说明 `is` 等被 behavior 用来判断回调是不是函数的工具，以及热键自己的 zone 包装。
- [核心服务与全局配置](../concepts/core-services.md)说明组件库自己的共享服务，behavior 不在那一层。
- [测试](../operations/testing.md)说明 CDK 的 Karma 测试如何启动。
