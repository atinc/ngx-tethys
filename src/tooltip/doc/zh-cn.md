---
category: display
title: Tooltip
subtitle: 文字提示
---

<alert>简单的文字提示框。</alert>

## 何时使用
- 鼠标移入时显示提示，移出消失。
- 用来代替系统默认的`title`提示，提供一个`文字/按钮/操作`的文案解释。

## 模块导入
```ts
import { ThyTooltipModule } from "ngx-tethys/tooltip";
```

## 基本使用
``` html
 <button thyTooltip="Hello, welcome to PingCode"> 展示tooltip </button>
```

## 全局配置
Tooltip 的默认选项可以通过在应用根模块中为 THY_TOOLTIP_DEFAULT_CONFIG_TOKEN 令牌提供一个 ThyGlobalTooltipConfig 实例来指定。
```
@NgModule({
  providers: [
    { 
        provide: THY_TOOLTIP_DEFAULT_CONFIG_TOKEN, 
        useValue: {
           offset: 4,
           panelClass: 'thy-tooltip-panel'
        }
    }
  ]
})
```
默认的配置如下：
```
export const thyTooltipDefaultConfig: ThyGlobalTooltipConfig = {
    showDelay: 200,
    hideDelay: 100,
    touchendHideDelay: 1500,
    offset: 4,
    panelClass: 'thy-tooltip-panel',
    tooltipPin: false,
    scrollThrottleSeconds: 20
};

```

## 非 body 滚轴事件需要更新 CDK 的位置
在 tooltip 相关的组件使用中，body 的滚轴事件会刷新 tooltip 的位置。如果是自定义容器的滚轴事件则不会刷新，你可以在自定义容器上添加 `cdkScrollable` 指令以达到该目的。注意，这里需要导入相关的包 `import {ScrollingModule} from '@angular/cdk/scrolling';`，更多信息请参考 [scrolling/api](https://material.angular.io/cdk/scrolling/api)。

## 服务动态创建
一般情况下通过 Tooltip 指令都基本可以满足我们的使用场景，如果在某些特殊情况我们没有办法使用指令都方式，那么也可以通过 ThyTooltipService 来创建一个 Tooltip 灵活的控制它 。
``` ts
export class ExampleComponent implements OnInit {
    @ViewChild('tooltipHost', { static: true , read: ElementRef<HTMLElement>}) tooltipHostElementRef: ElementRef<HTMLElement>;

    private tooltipRef: ThyTooltipRef;

    constructor(private tooltipService: ThyTooltipService) {}

    ngOnInit(): void {
        this.tooltipRef = this.tooltipService.create(this.tooltipHostElementRef, {
            placement: 'top'
        });
        // 展示 Tooltip
        this.tooltipRef.show('Hello, welcome to PingCode', 200);
        // 隐藏 Tooltip 
        this.tooltipRef.hide(200);
        // 销毁 tooltipRef
        this.tooltipRef.dispose();
    }
}

```


<examples />
