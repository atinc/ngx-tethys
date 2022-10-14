---
category: layout
title: Skeleton
subtitle: 骨架屏
label: experimental
---
<div class="dg-alert dg-alert-info"> 在需要等待加载内容的位置提供一个占位图形组合。</div>

## 何时使用
* 网络较慢，需要长时间等待加载处理的情况下。
* 图文信息内容较多的列表/卡片中。
* 只在第一次加载数据的时候使用。

## 模块导入

``` ts
import { ThySkeletonModule } from 'ngx-tethys/skeleton';
```

## 基本使用
<example name="thy-skeleton-circle-example" />

<example name="thy-skeleton-rectangle-example" />

### 自定义组合
* 通过自定义模版个性化设置自己的骨架图形。

<example name="thy-skeleton-custom-example" />

## 全局配置
Skeleton 支持全局统一配置组件动画、动画速度、主色调、次色调等诸多配置，具体的配置如下:

```
@NgModule({
    ...,
    imports: [ThyPaginationModule],
    providers: [
           {
            provide: THY_SKELETON_CONFIG,
            useValue: {
                thyAnimatedInterval: 1.5,
                thyPrimaryColor: '#F7F7F7',
                thySecondaryColor: '#eeeeee',
                thyAnimated: true,
                thyListConfig: {
                    thyRowWidth: '100%',
                    thyRowHeight: '20px',
                    thyBorderRadius: 4,
                    thyRowsCount: 4
                },
                thyBulletListConfig: {
                    thySize: 20,
                    thyRowWidth: '80%',
                    thyRowHeight: '20px',
                    thyBorderRadius: '4px',
                    thyRowsCount: 5
                },
                thyParagraphConfig: {
                    thyFirstWidth: '33%',
                    thyLastWidth: '66%',
                    thyRowWidth: '100%',
                    thyRowHeight: '20px',
                    thyBorderRadius: '4',
                    thyRowsCount: 4
                }
            }
        }
    ]
})
```
配置优先级顺序为：
> 底层组件配置 > thy-skeleton组件配置 > 全局配置 > 默认配置