---
category: feedback
title: Popover
subtitle: 悬浮层
order: 1
---

<alert>弹出悬浮层。</alert>

## 模块导入
```ts
import { ThyPopoverModule } from "ngx-tethys/popover";
```

## 如何使用
`Popover`提供了`ThyPopover`服务和`thyPopover`指令两种方式打开弹出组件或者模板，`ThyPopover`打开悬浮层必须传入`origin`触发元素，悬浮层会通过`placement`针对`origin`位置的计算和维护弹出关系。

`thyPopover`指令相比较服务打开区别如下：
- 对指令 Host 元素绑定设置的触发事件(click/hover/focus)，并默认传入`origin`和`viewContainerRef`
- 除了常用的属性参数`thyPlacement`、`thyShowDelay`、`thyHideDelay`、`thyAutoAdaptive`、`thyDisabled`外其余属性通过`thyConfig`参数对象传递

### 打开组件
通过调用`open`方法并传要加载的组件或者模板以及配置对象可以打开悬浮层，`open`方法将返回一个`ThyPopoverRef`的实例：
```ts
const popoverRef = popover.open(ProfileComponent, {
  origin: event.currentTarget,
  placement: 'top'
});
```

`ThyPopoverRef`提供了已打开悬浮层的一个引用，可用它来关闭悬浮层和接受关闭悬浮层后的通知。
```ts
popoverRef.afterOpened().subscribe(result => {
  console.log(`Popover result: ${result}`); // Bar!
});
popoverRef.afterClosed().subscribe(result => {
  console.log(`Popover result: ${result}`); // Bar!
});

popoverRef.close('Bar!');
```

通过`ThyPopoverRef`创建的组件可以注入`ThyPopoverRef`，并用它来关闭包含该组件的悬浮层，当关闭时，可以提供一个可选的结果值，该结果值会作为结果转发给相关事件，比如`afterClosed`。

```ts
@Component({/* ... */})
export class YourPopover {
  constructor(public popoverRef: ThyPopoverRef<YourPopover>) { }

  closePopover() {
    this.popoverRef.close('Bar!');
  }
}
```

### 打开模版

`ThyPopover`服务的`open`方法不仅支持组件，也支持打开模版`TemplateRef<T>`，模版可以通过参数传递，也可以通过`@ViewChild()`方式从视图中获取。

```ts
openProfile(template: TemplateRef<any>) {
    const popoverRef = popover.open(template, {
       origin: event.currentTarget,
       placement: 'top'
    });
}
```

### 设置打开悬浮层的全局默认值

悬浮层的默认选项可以通过在应用根模块中为`THY_POPOVER_DEFAULT_CONFIG`令牌提供一个`ThyPopoverConfig`实例来指定。

```ts
@NgModule({
  providers: [
    { 
        provide: THY_POPOVER_DEFAULT_CONFIG, 
        useValue: {
            hasBackdrop: false,
            originActiveClass: 'active'
        }
    }
  ]
})
```
默认的配置如下：
```ts
export const THY_POPOVER_DEFAULT_CONFIG_VALUE = {
    hasBackdrop: true,
    backdropClass: 'thy-popover-backdrop',
    panelClass: '',
    offset: 0,
    backdropClosable: true,
    closeOnNavigation: true,
    placement: 'bottom' as ThyPlacement,
    insideClosable: false,
    manualClosure: false,
    originActiveClass: 'thy-popover-origin-active',
    autoAdaptive: false,
    minWidth: '240px'
};
```

### 悬浮层组件共享数据
如果要和悬浮层共享数据，可以通过`initialState`参数把信息传给该组件。

```ts
const popoverRef = popover.open(YourPopoverComponent, {
  initialState: { name: 'peter' },
});

@Component({/* */})
class YourPopoverComponent {
    name: string;
}
```

<examples />
