---
category: display
title: Property
subtitle: 属性
description: 属性列表
label: new
---

<!-- <alert>属性列表展示组件。</alert>

## 何时使用

- 用于详情类信息的展示


## 模块导入
```ts
import { ThyPropertyModule } from "ngx-tethys/property";
```

## 基本使用
<example name="thy-property-basic-example"/>

## 展示模式
有两种展示模式，默认为水平展示，同时支持垂直展示，设置 `thyLayout="vertical"` 来改变展示模式
 
<example name="thy-property-vertical-example"/>

## 设置每行显示属性的个数

<example name="thy-property-column-example"/>

## 支持编辑模式
``` html
<thy-properties #properties thyEditTrigger="hover">
  <thy-property-item thyLabelText="姓名" thyEditable="true">
    {{ user.name }}
    <ng-template #editor>
      <input thyInput thySize="xs" placeholder="" [(ngModel)]="user.name" />
    </ng-template>
  </thy-property-item>
</thy-properties>

``` -->

<example name="thy-property-editable-example"/>
