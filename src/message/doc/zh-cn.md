---
category: feedback
title: Message
subtitle: 全局提示
order: 10
---

<alert>由用户的操作触发的轻量级全局反馈。</alert>

## 何时使用
- 可提供成功、警告、错误和加载中等反馈信息
- 不打断用户操作的轻量级提示方式。

## 模块导入
```ts
import { ThyMessageModule } from "ngx-tethys/message";
```

## 通知类型

- success：用于显示「成功」类的系统消息
- warning：用于显示「警告」类的系统消息
- error：用于显示「错误」类的系统消息
- info： 用于显示「消息」类的系统消息
- loading：用于显示「加载中」类的系统消息

## 设置全局默认值

对话框的默认选项可以通过在应用根模块中为`THY_MESSAGE_DEFAULT_CONFIG`令牌提供一个`ThyGlobalMessageConfig`实例来指定。

```ts
@NgModule({
    providers: [
        { 
            provide: THY_MESSAGE_DEFAULT_CONFIG,
            useValue: {
                pauseOnHover: true,
                duration: 4500,
                maxStack: 8,
                offset: '20',
                showClose: false
            }
        }
    ]
})
```

默认的配置如下：
```ts
const THY_MESSAGE_DEFAULT_CONFIG_VALUE = {
    pauseOnHover: true,
    duration: 4500,
    maxStack: 8,
    offset: '20',
    showClose: false
};
```

## 基本使用
```ts
messageService.success('创建项目成功！', {
    pauseOnHover: false,
    showClose: true
});
messageService.success('创建项目成功！');
```
<example name="thy-message-basic-example"></example>

<example name="thy-message-hover-example"></example>