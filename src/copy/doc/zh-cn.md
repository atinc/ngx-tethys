---
category: other
title: Copy
subtitle: 复制
order: 60
---
  
通过给标签增加thyCopy指令，点击触发，实现复制标签中的文本：

```ts
 <p thyCopy thyCopySuccessText="复制文字复制成功"> <span>我是标签中的文字</span>  我是带有thyCopy的p标签，点击我，复制这段文字</p>

 // 复制得到的文本为： ‘我是标签中的文字 我是带有thyCopy的p标签，点击我，复制这段文字’
```



或者通过`thyCopyContent`传入要复制的内容：

```ts
<button thyButton="primary-square" (thyCopy)="copy($event)" [thyCopyContent]="'我是复制得到的文本'">
    复制
</button>

//   复制得到的文本为： ‘我是复制得到的文本’
```
