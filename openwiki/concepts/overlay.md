---
type: concept
title: 浮层体系
description: ThyAbstractOverlayService 如何用 CDK Overlay 打开和关闭 dialog，以及 popover、slide、autocomplete 与指令型浮层各自复用哪一层。
tags: [overlay, dialog, popover, cdk]
verified:
  - by: openwiki/0.6.0
    at: 2026-09-28T07:54:10.806Z
sources:
  - id: openwiki-source-7cf747ea0bd63236bd4a12ad
    resource: repo://src/autocomplete/overlay/autocomplete.service.ts
  - id: openwiki-source-e1fe0718978a51af85701d7a
    resource: repo://src/core/overlay/abstract-overlay-ref.ts
  - id: openwiki-source-9a2d2ab4bd28b11886fd90a2
    resource: repo://src/core/overlay/abstract-overlay.config.ts
  - id: openwiki-source-2c79fb0df7a93ab0c1055f31
    resource: repo://src/core/overlay/abstract-overlay.service.ts
  - id: openwiki-source-01d39586ea44266fc1f5ff99
    resource: repo://src/core/overlay/overlay.directive.ts
  - id: openwiki-source-65a82e002d2560c5bba8cf40
    resource: repo://src/core/overlay/utils.ts
  - id: openwiki-source-494e24546fdf5232c0284d14
    resource: repo://src/dialog/dialog.options.ts
  - id: openwiki-source-77d2259fa3cc9b9d2ae1b541
    resource: repo://src/dialog/dialog.service.ts
  - id: openwiki-source-24fe863ff9654026fd70222f
    resource: repo://src/dropdown/dropdown.directive.ts
  - id: openwiki-source-02777d089110148feaa7b05f
    resource: repo://src/popover/popover.service.ts
  - id: openwiki-source-00b540f15a0b8c55fcb24dd7
    resource: repo://src/slide/slide.service.ts
  - id: openwiki-source-b774088aa0b2f5dd59b7b1dc
    resource: repo://src/tooltip/tooltip.directive.ts
generated: { by: "cursor", at: "2026-09-28T07:54:10.806Z" }
---

模态和定位浮层都建在 Angular CDK 的 `Overlay` 上。命令式打开的组件继承 `ThyAbstractOverlayService`；跟着宿主悬停或点击出现的组件继承 `ThyOverlayDirectiveBase`。通知和消息不走这套基类，见[瞬时反馈](transient-feedback.md)。

## 从 open 到关闭

`ThyDialog.open` 把调用配置盖在 `THY_DIALOG_DEFAULT_OPTIONS` 上，然后进入 `openOverlay`。同一 `id` 已经打开时抛出 `dialog with id ... exists already`。id 缺省时生成 `thy-dialog-<序号>`。

对话框的 CDK 配置使用全局定位，滚动策略默认 `block`，面板类名带上尺寸，缺省是 `dialog-md`。服务把 `ThyDialogContainer` 贴到 overlay 上，再把组件或模板贴进容器。

- 模板门户的上下文包含 `$implicit: initialState` 和 `dialogRef`。
- 组件门户会按输入名调用 `setInput`；对不上输入名的字段直接写到实例上。`hostClass` 加到宿主元素。
- 内容注入器的父级优先用 `viewContainerRef.injector`，并提供 `ThyDialogRef` 和容器。`config.providers` 插在最前。

打开后的引用放进 `openedOverlays`。`afterOpened` 要等容器的开场动画结束。

关闭有三条入口。服务的 `close()` 只关栈顶那一个；`closeAll()` 从栈顶往下关，每个 `close` 的 `afterClosed` 会自己把引用移出数组，数组空了才发出 `afterAllClosed`。点击幕布或按 Esc 时，若 `disableClose` 不为真，或者 `backdropClosable` 为真，就关栈顶。默认两者分别是 `false` 和 `true`，所以默认可关。

单次 `close(result, force)` 在 `force` 为假且 `canClose(result)` 返回假时什么都不做。通过后先发 `beforeClosed`，卸下幕布，再 `startExitAnimation`。`dialog` 的选项 `disposeWhenClose` 为真，动画结束或容器销毁后 `overlayRef.dispose()`。CDK detachment 再补发 `beforeClosed` 和 `afterClosed`，并清空组件实例。

`confirm()` 只是用确认组件类型调用同一次 `open`，把选项放进 `initialState`。

## 谁继承服务

`ThyPopover`、`ThySlideService` 和自动完成的 overlay 服务都继承 `ThyAbstractOverlayService`，各自实现容器、定位和 ref。对话框用全局定位；贴着元素的浮层用连接定位。`getFlexiblePositions` 在 `flexiblePosition` 为真时返回首选位置和备选位置，为假时只返回当前位置。抽象配置里 `canPush` 默认真，表示位置都不合适时仍可把层推进视口。全局 `THY_GLOBAL_CONFIG.overlay` 是这些开关的应用级入口，选择控件会读取它。

## 指令型浮层

`ThyOverlayDirectiveBase` 监听宿主的 `click`、`hover` 或 `focus`，显示和隐藏延迟默认都是 100 毫秒。触发方式在初始化之后改变时，会拆掉旧监听再绑一次。

`thyDropdown`、`thyPopover` 指令、`thyTooltip` 和取色器都继承这个基类。下拉菜单自己不创建 overlay 服务，而是调用 `ThyPopover.open`。因此下拉的生命周期仍是 popover 那条打开和关闭路径。

## 相关页面

- [核心服务与全局配置](core-services.md)说明 `provideTethys` 和 overlay 全局开关。
- [瞬时反馈](transient-feedback.md)说明 notify 与 message 的队列，它们不是这套 ref。
- [选择控件](selection.md)说明选择面板如何使用灵活定位。
- [国际化](i18n.md)说明浮层文案所在的语言包。
