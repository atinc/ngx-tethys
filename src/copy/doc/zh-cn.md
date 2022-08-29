---
category: other
title: Copy
subtitle: 复制
order: 60
---

<alert>用于复制页面中的内容</alert>

## 何时使用

- 当需要实现内容拷贝时
  
## 模块导入
```ts
import { ThyCopyModule } from "ngx-tethys/copy";
```

## 基本使用
通过给标签增加thyCopy指令，点击触发，实现复制标签中的文本：

```ts
<section class="mb-3">
  <p thyCopy thyCopySuccessText="复制文字复制成功"><span>文本：</span> 我是带有thyCopy的p标签，点击我，复制这段文字</p>
</section>
```

展示效果：
<example name="thy-copy-basic-example"/>



## 自定义内容
通过`thyCopyContent`传入要复制的内容：
```ts
<section class="mb-3">
  <button thyButton="primary-square" (thyCopy)="copy($event)" thyCopyContent="复制的文本">
    复制
  </button>
</section>
<hr />
<section class="mb-3">
  <button thyButton="primary-square" (thyCopy)="copy($event)" [thyCopyContent]="target1">复制</button>
  <p #target1>我是p标签，点击button复制的是我的文本</p>
</section>
<hr />

<section class="mb-3">
  <h5>复制input输入的文字</h5>
  <input #target2 style="margin-right: 15px;" />
  <button thyButton="primary-square" (thyCopy)="copy($event)" [thyCopyContent]="target2" thySize="md">复制</button>
</section>
```

展示效果：
<example name="thy-copy-copy-content-example"/>


## 是否展示通知
```ts
<section class="mb-3">
  <button thyButton="primary-square" (thyCopy)="copy($event)" [thyShowNotify]="false">
    复制不通知
  </button>
</section>
<section class="mb-3">
  <button thyButton="primary-square" (thyCopy)="copy1($event)" [thyShowNotify]="false">
    复制自定义通知
  </button>
</section>
```

展示效果：
<example name="thy-copy-notify-example"/>
