---
title: Hotkey
subtitle: 热键
label: new
---

<alert>键盘热键组件</alert>

## 何时使用

当需要配置全局快捷键操或指定区域快捷键操作时使用。

## 模块导入
```ts
import { ThyHotkeyModule } from "@tethys/cdk/hotkey";
```

## 组件概述
当在键盘上按下热键（键或键序列）时触发目标元素操作，默认情况下触发元素为表单元素时触发 focus 事件，其他则触发 click 事件 

## 基本使用
将热键对应的 Code 传入指令
```html
 <input thyHotkey="Control+m" thyInput />
```
<example name="thy-hotkey-basic-example" />

若不清楚热键对应的Code，可通过下面输入框查询
<example name="thy-hotkey-query-example" />

## 服务使用 ThyHotkeyDispatcher

```typescript
export class ExampleComponent implements OnInit {
    constructor(private hotkeyDispatcher: ThyHotkeyDispatcher) {}

    ngOnInit(): void {
        this.hotkeyDispatcher.keydown(this.thyHotkey, scope).subscribe((event: KeyboardEvent) => {
            // do something
        });
    }
}
```

