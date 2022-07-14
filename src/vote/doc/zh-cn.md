---
category: display
title: Vote
subtitle: 投票
label: New
---
<div class="dg-alert dg-alert-info">用于点赞和收藏等的投票组件。</div>

## 何时使用

对事物进行快速点击交互反馈，且需要对总量进行展示

## 模块导入

``` ts
import { ThyVoteModule } from 'ngx-tethys/vote';
```

## 基本使用

``` ts
<thy-vote [thyVoteCount]="5" [thyHasVoted]="true"></thy-vote>
```

展示效果: 

<example name="thy-vote-basic-example" />

## 禁用状态
当不允许用户操作时。

展示效果: 
<example name="thy-vote-disabled-example" />

## 自定义图标

描述收藏、喜欢等操作时, 可以使用 `thyIcon` 属性自定义图标, 在图标章节中可供选择。

展示效果: 
<example name="thy-vote-icon-example" />


## 弱状态

当前操作并非主要操作时。

展示效果: 
<example name="thy-vote-weak-example" />

## 使用外部图标

可以使用外部自定义的 Icon。

展示效果:

<example name="thy-vote-custom-icon-example" />
