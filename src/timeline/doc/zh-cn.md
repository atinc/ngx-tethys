---
category: display
title: Timeline
subtitle: 时间轴
---

<alert>展示时间流转信息。</alert>

## 模块导入
```ts
import { ThyTimelineModule } from "ngx-tethys/timeline";
```

## 特性
 - 支持自定义timeline的排序，可正序和倒序
 - 支持自定义timeline的位置，left、right、center
 - 支持自定义timeline-item的位置，left、right
 - 支持自定义timeline-item的时间轴点，可定义各种图标
 - 支持自定义timeline-item的另一侧的模板

## 位置显示
- `timeline`的位置可控制整体时间轴的位置，`left`则时间轴居左，内容显示在右侧，`right`则时间轴在右侧，内容显示在左侧，`center`则时间轴居中内容交叉显示
- 但如果`timeline-item`有模板插入或者自定义节点位置则`timeline`时间轴居中显示，内容同上显示，模板显示在另一侧


<examples />



