---
category: feedback
title: Notify
subtitle: 通知
order: 10
---

## 概览
`Notify`主要提供了一个`ThyNotifyService`服务，用于打开提示框。 

通过调用`show`方法并传可选的配置对象可以打开想要的类型的提示框和内容：

```ts
notifyService.show({
   type: 'error',
   title: '错误',
   content: '获取数据失败！',
   detail: `chunk {main} main.js (main) 703 kB [initial] [rendered] ℹ ｢wdm｣: Compiled successfully.ℹ ｢wdm｣: Compiling...
        Date: 2018-04-20T08:57:23.362Z - Hash: d96e601a21c551b7c38a
        - Time: 11376ms 4 unchanged chunks chunk {main} main.js (main) 703 kB [initial]
        [rendered]ℹ ｢wdm｣: Compiled successfully.`,
   duration: 0
});
```

## 自定义模版

`ThyNotifyService`服务的`show`方法支持传参数`{html: ElementRef}`，支持打开自定义模版。

```ts
showWithHtml(htmlRef: ElementRef) {
    this.notifyService.show({
        type: 'success',
        title: '成功 ',
        html: htmlRef
    });
}
```

## 指定打开位置

`ThyNotifyService`服务的`show`方法支持传参数`{placement: NotifyPlacement}`（`NotifyPlacement`类型包括`topLeft`、`topRight`、`bottomLeft`和`bottomRight`，默认为`topRight`），支持自定义通知弹出的位置。

```ts
notifyService.show({
    placement: 'topRight'
});
```

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

## 指定打开类型

`ThyNotifyService`服务提供了`success`, `info`, `warning`,`error`四种指定类型的打开方法。

```ts
ThyNotifyService.success(title, content, detail)
ThyNotifyService.info(title, content, detail)
ThyNotifyService.warning(title, content, detail)
ThyNotifyService.error(title, content, detail)
```
