---
category: feedback
title: Slide
subtitle: 滑动弹出框
---

滑入侧边栏，来展示附加内容或更多的操作项。

## 打开组件

`Slide`主要提供了一个`ThySlideService`服务，用于打开滑动弹出框。 

通过调用`open`方法并传要加载的组件和可选的配置对象可以打开弹出框：

```ts
this.thySlideService.open(ThySlideContentComponent, {
    hasBackdrop: true,
    mode: 'over',
    from: 'right',
});
```

## 打开模版

`ThySlideService`服务的`open`方法不仅支持组件，也支持打开模版`TemplateRef<T>`，模版可以通过参数传递。

```ts
openSlide(template: TemplateRef<any>) {
    this.thySlideService.open(template, {
        hasBackdrop: true,
        mode: 'over',
        from: 'right',
    });
}
```

## 设置默认值

弹出框的默认选项可以通过在模块中为`THY_SLIDE_DEFAULT_CONFIG`令牌提供一个`ThySlideConfig`实例来指定。

```ts
@NgModule({
  providers: [
    { provide: THY_SLIDE_DEFAULT_CONFIG, useValue: { hasBackdrop: false }}
  ]
})
```
默认的配置如下：
```ts
const DEFAULT_OPTIONS = {
    hasBackdrop: true,
    backdropClass: 'thy-slide-backdrop',
    backdropClosable: true,
    closeOnNavigation: true,
    autoFocus: true,
    restoreFocus: true,
    from: 'right',
    panelClass: 'thy-slide',
    containerClass: '',
    role: 'slide',
    offset: 0,
    originActiveClass: 'thy-slide-origin-active',
    mode: 'over',mode: 'over',,
    drawerContainer: ''
};
```

## 弹出框组件共享数据
如果要和弹出框共享数据，可以通过`initialState`参数把信息传给该组件。

```ts
this.thySlideService.open(YourslideComponent, {
  initialState: { name: 'slide'},
});

@Component({/* */})
class YourslideComponent {
    name: string;
}
```

## 弹出框内容

`slide`内置了以下几个布局组件，轻松的定义弹出框内容的结构。

| 组件               | 说明           |
| ------------------ | -------------- |
| `thy-slide-header` | 弹出框头部     |
| `thy-slide-footer` | 弹出框底部     |
| `thy-slide-body`   | 弹出框主体内容 |

```html
<thy-slide-header thyTitle="slide Title"></thy-slide-header>
<thy-slide-body>
    <thy-slide-body-section>
        slide body
    </thy-slide-body-section>
</thy-slide-body>
<thy-slide-footer>
</thy-slide-footer>
```



