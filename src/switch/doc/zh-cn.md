---
category: form
title: Switch
subtitle: 开关
---

<alert>开关切换器。</alert>

## 模块导入
```ts
import { ThySwitchModule } from "ngx-tethys/switch";
```

## 基本使用
```html
<thy-switch [(ngModel)]="isChecked" (ngModelChange)="switchChange()"></thy-switch>
```
显示效果：
<example inline name="thy-switch-basic-example" />  


