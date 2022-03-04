---
category: nav
title: Stepper
subtitle: 步骤条
---

<alert>引导用户按照流程完成任务的导航条。</alert>

## 何时使用

  当任务复杂或者存在先后顺序，使用步骤条组件简化任务。


## 模块导入
```ts
import { ThyStepperModule } from "ngx-tethys/stepper";
```


## 基本使用

```html
<thy-stepper thySelectedIndex="1">
    <thy-step label="第一步">
        <div class="demo-stepper-body">
            <button thyButton="primary" thyStepperNext>下一步</button>
            <p>This is a description.</p>
        </div>
    </thy-step>
    <thy-step label="第二步">
        <div class="demo-stepper-body">
            <button thyButton="primary" thyStepperNext>下一步</button>
            <a thyButton="link-secondary" thyStepperPrevious>上一步</a>
            <p>This is a description.</p>
        </div>
    </thy-step>
    <thy-step label="第三步">
        <div class="demo-stepper-body">
            <a thyButton="link-secondary" thyStepperPrevious>上一步</a>
            <p>This is a description.</p>
        </div>
    </thy-step>
</thy-stepper>
```

展示效果：

<example name="thy-stepper-basic-example" inline/>