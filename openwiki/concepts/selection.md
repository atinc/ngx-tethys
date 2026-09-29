---
type: concept
title: 选择控件
description: thy-option 与 thy-select-control 被哪些选择器共用，以及自定义选择、树选择、级联和自动完成如何打开面板。
tags: [select, option, overlay, forms]
verified:
  - by: openwiki/0.6.0
    at: 2026-09-28T07:54:10.806Z
sources:
  - id: openwiki-source-02e6a6422513a3518b23536b
    resource: repo://src/autocomplete/autocomplete.component.ts
  - id: openwiki-source-7cf747ea0bd63236bd4a12ad
    resource: repo://src/autocomplete/overlay/autocomplete.service.ts
  - id: openwiki-source-c011a426e49234274b7edb48
    resource: repo://src/cascader/cascader.component.ts
  - id: openwiki-source-f1900e8249900a4cc0d49a1f
    resource: repo://src/select/custom-select/custom-select.component.html
  - id: openwiki-source-b55aefb1cae8f30b01457d84
    resource: repo://src/select/custom-select/custom-select.component.ts
  - id: openwiki-source-61caf6b8f6afee595cc6dc29
    resource: repo://src/select/custom-select/custom-select.spec.ts
  - id: openwiki-source-c3176685e8d9360717685939
    resource: repo://src/shared/option/option.component.ts
  - id: openwiki-source-6d8e39bf213a3bb4fbc32003
    resource: repo://src/shared/option/select-option-base.ts
  - id: openwiki-source-ed336f05b49c5d8bace68780
    resource: repo://src/shared/select/select-control/select-control.component.ts
  - id: openwiki-source-1115f1d8dd319b99ae109eb4
    resource: repo://src/tree-select/tree-select.component.ts
generated: { by: "cursor", at: "2026-09-28T07:54:10.806Z" }
---

选择器没有一个共同的服务。能共用的是 `ngx-tethys/shared` 里的选项和输入框外观；面板则各自接 CDK 连接层或自动完成自己的 overlay 服务。

## 选项与输入框

`thy-option` 的模板只是一块 `ng-template`，本身不画出选项。它保存 `thyValue`、`thyRawValue` 和 `thyLabelText`，并用 `ThyOptionSelectionChangeEvent` 报告选中。真正画在面板里的是 `ThyOptionRender`。

`thy-select-control` 是输入框外观：尺寸默认 `md`，空值折回 `md`，占位和已选标签由它渲染。文案走 `injectLocale('shared')`。它接收 `SelectOptionBase`，那是只有标签、原始值和值的抽象形状，不是 `thy-option` 组件。

## 自定义选择

`thy-custom-select` 用 `contentChildren(ThyOption)` 收集选项，用 `ThyOptionRender` 画出来，用 `ThySelectControl` 显示已选值。`open()` 在禁用或面板已经打开时直接返回；否则记下触发器宽度并把 `panelOpen` 设为真。模板上的 `cdkConnectedOverlay` 绑定这个标志。

位置来自 `getFlexiblePositions`。`flexiblePosition` 读取全局 overlay 配置，只有显式 `false` 才关闭备选位置，测试确认缺省为真。单选把模型写成第一个选中值或 `null`，多选写成数组。`close()` 会调用 `onTouched`。

## 树选择和级联

两者都使用 `ThySelectControl` 和 `CdkConnectedOverlay`，都不用 `thy-option` 当内容子节点。树选择的面板是树。级联把已选项收成 `SelectOptionBase`，移除已选项时也按这个形状回调。宽度会在打开时按触发器重新量，并调用 `overlayRef.updatePosition()`。

## 自动完成

自动完成同样收集 `ThyOption`，并用 `ThyOptionRender` 加 `ActiveDescendantKeyManager` 做键盘换项。点击选项时按 `thyValue` 找回对应 `ThyOption`，发出 `selectionChange` 和 `thyOptionSelected`，再把选中值写成只含这一项的数组。它的浮层服务继承 `ThyAbstractOverlayService`，不是选择器模板上的 `cdkConnectedOverlay`。

## 相关页面

- [表单与校验](forms.md)说明这些控件作为表单控件时的尺寸和校验。
- [浮层体系](overlay.md)说明抽象 overlay 与 `getFlexiblePositions`。
- [国际化](i18n.md)说明 `shared` 和 `select` 语言包。
