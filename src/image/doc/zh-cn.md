---
category: display
title: Image
subtitle: 图片
---

<alert>可预览的图片。</alert>


## 何时使用
+ 需要展示图片时使用。


## 模块导入
```ts
import { ThyImageModule } from "ngx-tethys/image";
```

<examples />

## 通过服务打开
通过服务可以自定义配置弹出框打开的设置，包含 `ThyImagePreviewOptions` 中的配置项以及指定索引的 `startIndex`。

`ThyImagePreviewOptions` 配置项如下：
```
export interface ThyImagePreviewOptions {
    closeOnNavigation?: boolean;
    disableClose?: boolean;
    disableKeyboardSelectable?: boolean;
    zoom?: number;
    rotate?: number;
    operations?: ThyImagePreviewOperationType[];
}
```

其中，通过配置 `operations` 可以自定义下方操作， `ThyImagePreviewOperationType` 包含下列以下类型：
```
'zoom-out' | 'zoom-in' |  'rotate-right' | 'download' ｜'original-scale' | 'fit-screen' | 'copyLink' | 'view-original' | 'full-screen'
```

<example name="thy-image-service-example" />

## 全局配置
可以通过注入 `THY_IMAGE_DEFAULT_PREVIEW_OPTIONS` 全局配置图片预览，默认配置如下：
```
export const THY_IMAGE_DEFAULT_PREVIEW_OPTIONS_PROVIDER = {
    provide: THY_IMAGE_DEFAULT_PREVIEW_OPTIONS,
    useValue: {
        hasBackdrop: true,
        closeOnNavigation: true,
        disableClose: false,
        disableKeyboardSelectable: false
    }
};
```


