---
category: display
title: Comment
subtitle: 评论
label: New
---
<div class="dg-alert dg-alert-info">用于内容的评论、反馈。</div>

## 何时使用

评论组件用于对于话题下的讨论，反馈等。

## 模块导入

``` ts
import { ThyCommentModule } from 'ngx-tethys/comment';
```

## 基本使用

``` ts
<thy-comment [thyAuthor]="'章三'" [ThyDatetime]="time">
  <div thyCommentContent>
   Content
  </div>
</thy-comment>
```

展示效果: 

<example name="thy-comment-basic-example" />

## 嵌套评论

适用于多级评论

展示效果: 
<example name="thy-comment-nest-example" />

## 更多动作

适用于对当前评论有操作的行为, 当用户 hover 到该条评论时展示

<example name="thy-comment-actions-example">
