---
type: concept
title: 日期与时间
description: 日期、范围、时间和日历如何共用 TinyDate，把 date-fns 与 @date-fns/tz 锁在 peer 版本上，并从 i18n 语言包取文案。
tags: [date, time, i18n, date-fns]
sources:
  - id: openwiki-source-e8a11048b51551245c7ff948
    resource: repo://src/calendar/calendar-header.component.ts
  - id: openwiki-source-549bfd3f399c570029c254e9
    resource: repo://src/calendar/calendar.component.ts
  - id: openwiki-source-6a1a96d402e2032304d20742
    resource: repo://src/date-picker/abstract-picker.component.ts
  - id: openwiki-source-acc6ab9603d3840a01bfde42
    resource: repo://src/date-picker/abstract-picker.directive.ts
  - id: openwiki-source-23edb6d5da98cd16b482e793
    resource: repo://src/date-picker/base-picker.component.html
  - id: openwiki-source-c1ab6ac1cac6f903f1e849fe
    resource: repo://src/date-picker/date-picker.config.ts
  - id: openwiki-source-2f26dc445c86a085013e4db6
    resource: repo://src/date-picker/picker.component.html
  - id: openwiki-source-7adb3002d587de238fd18461
    resource: repo://src/date-range/date-range.component.ts
  - id: openwiki-source-d840814a5b17b523f584f619
    resource: repo://src/i18n/locales/zh-hans.ts
  - id: openwiki-source-a2c92554b62aced54e9db682
    resource: repo://src/package.json
  - id: openwiki-source-ff11a5ee01ab678240f532d2
    resource: repo://src/time-picker/time-picker.component.html
  - id: openwiki-source-1d2d2634b153d0278628d941
    resource: repo://src/time-picker/time-picker.component.ts
  - id: openwiki-source-e0373beda7e553e7362bad19
    resource: repo://src/util/date/functions.ts
  - id: openwiki-source-ded589f507cb91f376830941
    resource: repo://src/util/date/tiny-date.ts
generated: { by: "cursor", at: "2026-09-29T01:54:27.255Z" }
verified:
  - by: openwiki/0.6.0
    at: 2026-09-29T01:54:27.255Z
---

日期选择、日期范围、时间选择和日历不各自实现日历算法。它们都经过 `ngx-tethys/util` 的 `TinyDate`。`date-fns` 和时区库是组件包的 peer，版本锁死，不会被打进 `ngx-tethys` 的 dependencies。

## 依赖边界

`src/package.json` 要求使用方安装 `date-fns@4.1.0` 和 `@date-fns/tz@1.2.0`。`src/util/date/functions.ts` 从 `date-fns` 再导出加减、起止、比较和 `format`。时区转换使用 `TZDate`。组件和日历测试应走这些封装；个别规格文件会直接 import `date-fns`，那只覆盖测试，不是产品入口。

## TinyDate

默认时区是 `Asia/Shanghai`。`setDefaultTimeZone` 改静态默认值，构造函数的第二个参数可以覆盖单次实例。

构造时按输入类型分支：

- `Date` 经 `TZDate.tz` 转成目标时区。
- 字符串按固定格式解析成年月日时分秒，再用该时区构造 `TZDate`。解析失败时 `nativeDate` 变成 `new Date(NaN)`，不抛错。
- 数字交给 `TZDate`。
- 没有输入时用 `Date.now()` 和当前时区。
- 其他类型只在开发模式抛错，错误信息写明只接受 `Date`、字符串或数字。

静态语言初始值来自 `getDefaultLocaleId()`。`getDateFnsLocale` 把 `zh-hans`、`zh-hant`、`en-us`、`ja-jp`、`de-de` 映射到 date-fns 的 `zhCN`、`zhTW`、`enUS`、`ja`、`de`，其余回落到 `zhCN`。每次 `new TinyDate()` 和 `setDefaultLocale` 都会调用 date-fns 的 `setDefaultOptions`，所以语言是进程级的，不是某个选择器实例私有的。

## 四个组件怎么接

日期选择的面板由 `PickerDirective` 注入 `ThyPopover` 打开，默认位置 `bottom`。`useDatePickerDefaultConfig()` 读取 `injectLocale('datePicker')`，快捷项标题用语言包里的 `today`、`tomorrow`、`nextWeek`，默认一周从周一开始，时间戳精度是秒。组件上的 `timeZone` 输入会传进 `TinyDate`。

日期范围是自己的 `ControlValueAccessor`，同样用 `ThyPopover` 弹出，并从 `ngx-tethys/date-picker` 借用配置服务和格式化管道。预设文案走 `injectLocale('dateRange')`，起止计算用 `TinyDate` 以及 `startOfDay`、`endOfMonth` 这类封装。

时间选择的面板文案是 `injectLocale('timePicker')`。展示字符串用 `TinyDate.format`。时、分、秒能不能增减由 `ThyTimePickerStore` 保存，它是 core `MiniStore` 的唯一产品子类，和日期值本身不是同一份状态。

日历用 `TinyDate` 保存 `currentDate`。头部通过 `injectLocale('calendar')` 取 `today` 和 `yearMonthFormat`。它不打开 popover。

语言包里这四段文案是分开的。简体中文里日期选择有年月日格式和“今天”，日期范围只有“自定义 / 本周 / 本月”，时间选择是“此刻 / 确定”，日历是“今天”和年月格式。换语言要同时更新 i18n 信号和 `TinyDate.setDefaultLocale`，前者管按钮和占位符，后者管 date-fns 的星期和月份格式。

## 输入框外观

日期选择、范围选择（`thy-range-picker`）和时间选择的触发框使用 `ThyFormControlAppearance`。`thyAppearance` 默认 `outline`，`null` 或 `undefined` 折回 `outline`。值传到内部的 `thyInput`，所以 `subtle` 和 `ghost` 的边框类由输入框加上。日历和 `thy-date-range` 没有这个输入。

## 相关页面

- [国际化](i18n.md)说明 `injectLocale` 和语言包如何切换。
- [浮层体系](overlay.md)说明日期面板使用的 popover。
- [表单与校验](forms.md)说明这些选择器作为表单控件时的接入。
- [核心服务与全局配置](core-services.md)说明 `ThyFormControlAppearance` 和 `ThyTimePickerStore` 继承的 `MiniStore`。
