---
category: feedback
title: Slide
subtitle: 滑动弹出框
description: 从父窗体边缘滑入，覆盖住部分父窗体内容。
order: 30
---

<alert>从父窗体边缘滑入，覆盖住部分父窗体内容</alert>

## 何时使用

- 当需要一个附加的面板来控制父窗体内容，这个面板在需要时呼出。比如，设置筛选条件。
- 当需要预览附加内容。比如展示消息列表、查看更新日志。

## 模块导入
```ts
import { ThySlideModule } from "ngx-tethys/slide";
```

## 如何使用

`Slide`主要提供了一个`ThySlideService`服务，用于打开滑动弹出框，通过调用`open`方法打开弹出框。

### 打开组件
通过调用`open`方法，传入要加载的组件和可选的配置对象打开弹出框。

```ts
this.thySlideService.open(ThySlideContentComponent, {
    hasBackdrop: true,
    mode: 'over',
    from: 'right',
});
```

### 打开模版

通过调用`open`方法，传入要加载的模板`TemplateRef<T>`和可选的配置对象打开弹出框。

```ts
openSlide(template: TemplateRef<any>) {
    this.thySlideService.open(template, {
        hasBackdrop: true,
        mode: 'over',
        from: 'right',
    });
}
```

展示效果如下：
<example name="thy-slide-basic-example" />

### 设置全局默认值

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

### 弹出框组件共享数据
如果要和弹出框共享数据，可以通过`initialState`参数把信息传给该组件。

```ts
this.thySlideService.open(YourSlideComponent, {
  initialState: { name: 'slide'},
});

@Component({/* */})
class YourslideComponent {
    name: string;
}
```

## 弹出框布局组件

`slide`内置了以下几个布局组件，轻松的定义弹出框内容的结构。
- `thy-slide-header`：弹出框头部 
- `thy-slide-body`：弹出框主体内容
- `thy-slide-body-section`：弹出框内容块区域组件
- `thy-slide-footer`：弹出框底部

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



