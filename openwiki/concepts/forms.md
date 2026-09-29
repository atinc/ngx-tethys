---
type: concept
title: 表单与校验
description: thyForm 如何在提交、变更或失焦时校验 Angular 控件，动态表单如何按 schema 建控件，以及多个控件如何共用尺寸和外观。
tags: [form, validation, i18n, form-control]
sources:
  - id: openwiki-source-e4e50b5da1173fbc63131e06
    resource: repo://src/core/form-control.ts
  - id: openwiki-source-7a991b592ed4fb79b539505b
    resource: repo://src/form/dynamic-form/dynamic-form.component.html
  - id: openwiki-source-4473ca9466b1ac1ab849076e
    resource: repo://src/form/dynamic-form/dynamic-form.component.ts
  - id: openwiki-source-3d1d7d81241d81845236a9c7
    resource: repo://src/form/dynamic-form/dynamic-form.pipe.ts
  - id: openwiki-source-3126b269f7255d0b750d6912
    resource: repo://src/form/dynamic-form/types.ts
  - id: openwiki-source-9eecfb6e04b0f8606db30da4
    resource: repo://src/form/form-group-error/form-group-error.component.ts
  - id: openwiki-source-fb8de40a07c8673056647a3f
    resource: repo://src/form/form-validator-loader.ts
  - id: openwiki-source-ec97aaac2b05ce236388e546
    resource: repo://src/form/form-validator.service.ts
  - id: openwiki-source-e938ddfcc829472affa5bab9
    resource: repo://src/form/form.class.ts
  - id: openwiki-source-08e99bcc667e861f9aaa069e
    resource: repo://src/form/form.directive.ts
  - id: openwiki-source-d840814a5b17b523f584f619
    resource: repo://src/i18n/locales/zh-hans.ts
  - id: openwiki-source-59764ff4139b5f14fa647ac0
    resource: repo://src/input/input.component.ts
  - id: openwiki-source-7c45def29acf9392a068161c
    resource: repo://src/shared/base-form-check.component.ts
generated: { by: "cursor", at: "2026-09-29T01:54:27.255Z" }
verified:
  - by: openwiki/0.6.0
    at: 2026-09-29T01:54:27.255Z
---

`thyForm` 挂在 Angular 的 `NgForm` 或 `FormGroupDirective` 上。指令自己提供一份 `ThyFormValidatorService`，所以每张表单的错误列表互不影响。布局类名来自 `thyLayout`，缺省用 `THY_FORM_CONFIG.layout`，宿主上会加上 `thy-form-<layout>`。

## 何时校验

加载器的默认 `validateOn` 是 `submit`。表单配置或全局 `THY_VALIDATOR_CONFIG` 可以改成 `change` 或 `blur`。

- `submit`：`submit()` 调用 `NgForm.onSubmit`，再逐个控件校验。无效时聚焦 `invalidControls` 的第一个元素，不会调用 `onSubmitSuccess`。
- `change`：订阅 `valueChanges`，`debounceTime(100)` 且 `distinctUntilChanged` 之后，过滤掉假值再校验。空字符串不会走进这次校验。
- `blur`：优先调用控件 value accessor 上的 `__onBlurValidation`；没有则直接写元素的 `onblur`。

除 `change` 以外，控件值一变就会清掉该控件的 DOM 错误和表单级 `errors`。`reset()` 同时重置 `NgForm` 并清掉已记录的元素错误。

键盘监听在 `NgZone` 外。默认 `submit` 模式下，普通控件按 Enter 会阻止默认行为并回到区域内提交；`textarea` 和 `contenteditable` 需要 Ctrl 或 Meta 加 Enter。`alwaysSubmit` 对任何元素都提交。`forbidSubmit` 不处理 Enter。

## 错误怎么出现

字段文案优先用该控件名下的 `validationMessages`，否则用全局 `globalValidationMessages`，再否则用 `injectLocale('form')`。简体中文的 `required` 是“该选项不能为空”，`maxlength` 含 `{maxlength}` 占位符。占位符用控件 `errors` 里的同名属性替换；没有该属性时用 `requiredLength`。

`showError` 给控件加上 `is-invalid`。控件的父元素是 `THY-INPUT-GROUP` 时，类和提示加在分组上，而不是内部 input。默认提示是父元素末尾的一个 `div.invalid-feedback`，只写入第一条消息。把 `showElementError` 设成函数就替换这套 DOM；设成 `false` 则只加类、不插入提示。`removeElementError` 可以同样替换清除逻辑。

`thy-form-group-error` 可选注入父级 `thyForm`，展示 `validator.errors`。`thyShowFirst` 默认为真，只渲染第一条。这是表单级错误，和控件旁边的 `invalid-feedback` 分开。

`ThyFormModule` 导出分组、提交指令、`thy-form-group-error`，以及 min、max、确认和唯一性校验指令。

## 尺寸与外观

`ThyFormControlSize` 和 `ThyFormControlAppearance` 定义在 `src/core/form-control.ts`，不属于表单指令。尺寸是 `'xs' | 'sm' | 'md' | 'lg'`。外观是 `'outline' | 'subtle' | 'ghost'`。输入框的 `thySize` 默认 `md`，空值折回 `md`；`thyAppearance` 默认 `outline`，空值折回 `outline`。改尺寸或外观不会触发上面的校验。

复选框和单选的基类 `ThyFormCheckBaseComponent` 继承 core 的禁用与 tabIndex mixin，并实现 `ControlValueAccessor`。`thyLabelTextTranslateKey` 经 `ThyTranslate` 取文案。禁用时 mixin 把 `tabIndex` 读成 `-1`。

## 动态表单

`thy-dynamic-form` 按 `thyFields` 自己建 `FormGroup`，不走 `thyForm` 的 `validateOn`。字段 `kind` 只支持 `input`、`textarea` 和 `select`。其他 kind 渲染一行 `Unsupported field kind.`。

控件的 `updateOn` 缺省是 `change`。错误默认要等提交后才显示：`updateOn` 为 `blur` 时，触碰后即可显示；为 `change` 时，变脏后即可显示；没写 `updateOn` 时，只有 `submitted` 为真才显示。提交且整表有效才发出 `thySubmit`。无效时不发。`reset()` 把各字段恢复成 `defaultValue`（选择的空值是 `null`，多选是 `[]`，文本是空字符串），并清掉已显示的错误。

`props.required`、长度、`pattern`，以及 input 的 `min` / `max`，会变成 Angular 内置校验。自定义 `validators` 一律当成异步校验，返回错误对象或 `null`。文案先用字段自己的 `errorMessages`，再用校验加载器按字段名取，最后才用错误值里的字符串。

布局固定为非横向：组件把 `isHorizontal` 设为 `false`，并把自己提供成 `ThyFormDirective`，让 `thy-form-group` 读到这个值。`col` 按 12 列理解，管道乘 2 映射到 24 列栅格；不写时按 12，也就是整行。选择字段使用 `thyMultiple`、`thySearchable` 和 `thyClearable`。动态表单不设置 `thyAppearance`。

## 相关页面

- [核心服务与全局配置](core-services.md)说明尺寸、外观类型和 tabIndex mixin 的定义。
- [国际化](i18n.md)说明 `form` 语言包如何切换。
- [选择控件](selection.md)说明选择类控件如何作为表单控件。
- [脚手架与版本迁移](../integrations/schematics.md)说明 v22 对表单控件尺寸类型的迁移。
