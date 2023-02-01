---
category: form
title: Mention
subtitle: 提及
---

<alert>提及组件。</alert>


## 何时使用
用于在输入中提及某人或某事，常用于评论或者聊天。

## 模块导入
```ts
import { ThyMentionModule } from "ngx-tethys/mention";
```

## 如何使用
提及组件一般需要与`input`或者`textarea`配合使用，且同一个输入框可以配置多个提及规则，提及指令必须要传入`Mention[]`，且每一个`Mention`需要传入数据源`data`和触发器`trigger`（触发器就是输入的触发弹选择框字符，可以是`@`、`#`、`/`）

```html
<input
    placeholder="Mention people using @"
    thyInput
    [thyMention]="mentions"
    [(ngModel)]="value"
  />
```

```ts
export class ThyMentionBasicExampleComponent implements OnInit {
    ...
    mentions: Mention[] = [
        {
            trigger: '@',
            data: mockUsers as Array<{ name: string; display_name: string }>,
        }
    ];
}
```

<examples />
