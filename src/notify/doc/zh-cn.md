---
category: feedback
title: Notify
subtitle: 通知
order: 10
---

<alert>用于展示通知提醒信息。</alert>

## 何时使用
悬浮出现在页面角落，显示全局的通知提醒消息。

## 模块导入
```ts
import { ThyNotifyModule } from "ngx-tethys/notify";
```

## 通知类型

- success：用于显示「成功」类的系统消息
- warning：用于显示「警告」类的系统消息
- error：用于显示「错误」类的系统消息
- info： 用于显示「消息」类的系统消息

## 通知弹出位置

- bottomLeft：通知从左上角弹出。
- bottomRight：通知从右下角弹出。
- topLeft：通知从左上角弹出。
- topRight：通知从右上角弹出。

## 设置全局默认值

对话框的默认选项可以通过在应用根模块中为`THY_NOTIFY_DEFAULT_OPTIONS`令牌提供一个`ThyDialogConfig`实例来指定。

```ts
@NgModule({
  providers: [
    { provide: THY_NOTIFY_DEFAULT_OPTIONS, useValue: { placement: 'topRight' }}
  ]
})
```

默认的配置如下：
```ts
const DEFAULT_OPTIONS = {
    type: 'blank',
    pauseOnHover: true,
    duration: 4500,
    maxStack: 8,
    placement: 'topRight'
};
```

## 基本使用
按钮组件支持组件和指令两种使用方式
```ts
notifyService.show({ type: 'success', title: '成功 ' });

notifyService.success(null, '创建项目成功！');
```
<example name="thy-notify-basic-example"></example>

<example name="thy-notify-type-example"></example>

<example name="thy-notify-custom-html-example"></example>

<example name="thy-notify-hover-example"></example>

<example name="thy-notify-detail-example"></example>

<example name="thy-notify-detail-operation-example"></example>

<example name="thy-notify-placement-example"></example>

