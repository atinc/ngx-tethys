---
type: concept
title: 瞬时反馈
description: notify 与 message 共用一套消息队列和 CDK Overlay 容器，按最大条数淘汰最旧提示，并且不继承对话框那套抽象浮层。
tags: [notify, message, queue, overlay]
verified:
  - by: openwiki/0.6.0
    at: 2026-09-28T07:54:10.806Z
sources:
  - id: openwiki-source-63eea15a736dec662c68833e
    resource: repo://src/message/abstract/abstract-message-queue.service.ts
  - id: openwiki-source-242e1fd39e916d10c349211a
    resource: repo://src/message/abstract/abstract-message-ref.ts
  - id: openwiki-source-005b64267dd777ab5074d491
    resource: repo://src/message/abstract/abstract-message.service.ts
  - id: openwiki-source-891f50d67ce2c83d1a12ae46
    resource: repo://src/message/message.config.ts
  - id: openwiki-source-2397e03ad30042cad8d4e034
    resource: repo://src/message/message.service.ts
  - id: openwiki-source-79e71359bd025916b04fcb2a
    resource: repo://src/notify/notify-queue.service.ts
  - id: openwiki-source-4113e05d628d3d0109b3dc71
    resource: repo://src/notify/notify.config.ts
  - id: openwiki-source-260995a1eafecb0bd92404ed
    resource: repo://src/notify/notify.service.ts
generated: { by: "cursor", at: "2026-09-28T07:54:10.806Z" }
---

通知和全局消息是短时提示。它们使用 CDK `Overlay`，但基类是 `ThyAbstractMessageService`，不是 `ThyAbstractOverlayService`。没有幕布，滚动策略是 `noop`，定位是全局。容器只创建一次；之后再 `show` 会把已有容器 `toOverlayTop`，而不是再叠一个 dialog。

## 队列

`ThyAbstractMessageQueue` 用信号保存引用。`add` 时如果条数已经达到 `maxStack`，先 `close` 最旧的一条，再把新引用追加进去。默认 `maxStack` 是 8。`remove()` 不传 id 会关掉全部并清空；传入 id 只关那一条。引用自己的 `close()` 按 id 从信号里滤掉自己，发出并完成 `afterClosed`。这里没有 `canClose`，也没有关闭动画门闩。

notify 和 message 各有自己的根服务、队列和 overlay，互不占用对方的 8 条上限。

## notify

`ThyNotifyService` 是根服务，继承消息抽象服务，并注入 notify 队列。`show` 返回 `ThyNotifyRef`。`success`、`info`、`warning`、`error` 在没写标题时使用 `injectLocale('notify')` 里的对应文案。

默认配置是右上角 `topRight`、偏移 `20`、持续 `4500` 毫秒、`pauseOnHover` 为真、最多 8 条。队列再按 `topLeft`、`topRight`、`bottomLeft`、`bottomRight` 分成四份计算信号，容器按方位渲染。`THY_NOTIFY_DEFAULT_CONFIG` 可以整份替换这些默认值。

## message

`ThyMessageService.show` 同样创建或复用容器、合并默认配置并入队。除成功、信息、警告、错误外，还有 `loading`。默认同样是 4500 毫秒、悬停暂停、最多 8 条，另外 `showClose` 默认真。它没有 notify 那种四角计算属性，队列是一整列。

两条服务都在构造时把令牌配置盖到内置默认值上。调用时传入的 config 再盖一次，并分配递增的字符串 id。

## 相关页面

- [浮层体系](overlay.md)说明对话框的打开、幕布和 `canClose`，这套规则不适用于通知。
- [国际化](i18n.md)说明 notify 标题的语言包。
- [核心服务与全局配置](core-services.md)说明全局配置令牌的提供方式；通知使用自己的默认配置令牌。
