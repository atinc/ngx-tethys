---
category: display
title: Strength
subtitle: 程度展示
---
  
常用来展示密码强度。  

`注意`: 由于使用方式受限，暂时不可用。  

## 基础使用
为组件的 `ngModel` 属性添加一个 1～4 的值，即可以展示：
```html
<thy-strength [(ngModel)]="strength"></thy-strength>
```
<example name="thy-strength-basic-example" />

## 自定义文本
也可以添加标题文本以及更改程度展示的文本：
```html
<thy-strength [(ngModel)]="strength" [titleKey]="'评分'" [highestKey]="'🌟🌟🌟🌟'" [highKey]="'🌟🌟🌟'" [averageKey]="'🌟🌟'" [lowKey]="'🌟'"></thy-strength>
```  
<example name="thy-strength-custom-example" />