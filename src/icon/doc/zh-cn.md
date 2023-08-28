---
category: general
title: Icon
subtitle: 图标
order: 30
---

<alert>矢量图标。</alert>

`thy-icon`使得在应用程序中更容易使用基于矢量的图标，此组件支持图标字体和SVG图标，但不支持基于位图的格式（png、jpg等）

## 模块导入

```ts
import { ThyIconModule } from "ngx-tethys/icon";
```

## 注册图标库
ICON 依赖于图标库，tethys原生提供了两个标准图标库，注册方法如下：

```ts
import { ThyIconRegistry } from 'ngx-tethys/icon';
import { DomSanitizer } from '@angular/platform-browser';

export class AppModule {
    constructor(iconRegistry: ThyIconRegistry, sanitizer: DomSanitizer) {
        // 注册 defs SVG 雪碧图
        iconRegistry.addSvgIconSet(sanitizer.bypassSecurityTrustResourceUrl(`assets/icons/defs/svg/sprite.defs.svg`));
        // 注册 symbol SVG 雪碧图
        iconRegistry.addSvgIconSet(sanitizer.bypassSecurityTrustResourceUrl(`assets/icons/symbol/svg/sprite.defs.svg`));
    }
}
```

> 未注册图标库则将出现 `Error retrieving icon: Unable to find icon with the name ":icon-name"` 错误。

## 图标集合
<example name="thy-icon-all-example" inline />

## 注册第三方图标(库)
图标组件支持任何第三方的矢量图标库，在使用之前需要注册，支持单个 SVG 图标和图标集合注册。
`ThyIconRegistry`是一个可注入的服务，它允许你把图标名称和 SVG 的 URL、HTML 字符串关联起来。
第三方图标库注册可参考标准图标库注册方法：

```ts
// 注册一个 defs SVG 雪碧图
iconRegistry.addSvgIconSet(domSanitizer.bypassSecurityTrustResourceUrl(`assets/icons/defs/svg/sprite.defs.svg`));
// 注册一个 symbol SVG 雪碧图
iconRegistry.addSvgIconSet(domSanitizer.bypassSecurityTrustResourceUrl(`assets/icons/symbol/svg/sprite.symbol.svg`));
```

## 基本使用
图标组件支持 `outline`、`fill`和`twotone`三种类型的图标，可以使用`thyIconType`设置类型，也可以通过在`thyIconName`后加`-类型后缀`设置类型。
```html
<thy-icon thyIconName="bell"></thy-icon>
<thy-icon thyIconName="bell-fill"></thy-icon>
<thy-icon thyIconName="bell" thyIconType="fill"></thy-icon>

```
<example name="thy-icon-basic-example" />

## 双色图标 twotone
双色图标需要设置类型为`twotone`，同时设置`thyTwotoneColor`，对于双色图标的 SVG 来说需要包含id包含`secondary-color`的`path`，会填充该`path`的`fill`属性为传入的`thyTwotoneColor`
```html
<thy-icon class="text-info" 
   thyIconName="pause-circle" 
   thyIconType="twotone" 
   thyTwotoneColor="#52c41a">
</thy-icon>
```
<example name="thy-icon-twotone-example" />

## 自定义命名空间
默认图标会在默认的命名空间下根据图标名查找对应的SVG，当`thyIconName`设置为`mat:thumbs-up`，则会在`mat`命名空间下查找对应的图标，同时注册图标的时候需要使用传入的命名空间：
```ts
 iconRegistry.addSvgIconInNamespace(
            'mat',
            'thumbs-up',
            domSanitizer.bypassSecurityTrustResourceUrl(`assets/images/icons/thumbs-up.svg`)
```
<example name="thy-icon-namespace-example" />

## 旋转图标

<example name="thy-icon-rotate-example" />


## 开启打底色

<example name="thy-icon-legging-example" />
