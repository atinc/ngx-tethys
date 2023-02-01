---
title: Dom
subtitle: Dom 操作
---

<alert>Dom 操作工具。</alert>

## 何时使用

当需要操作 Dom 时。

## 模块导入
```ts
import { useHostRenderer } from "@tethys/cdk/dom";
```

## useHostRenderer
操作 Host Dom 元素，`useHostRenderer` 函数内部会自动注入`ElementRef`获取 Host Element，相关函数直接操作 Host 元素。
```ts
@Component({
    selector: 'thy-dom-use-host-renderer-test',
    template: 'Content'
})
export class ThyDomUseHostRendererTestComponent implements OnInit {
    hostRenderer = useHostRenderer();

    constructor() {}

    ngOnInit(): void {
        this.hostRenderer.updateClass(['thy-button', 'thy-button-primary']);
        this.hostRenderer.setStyle('color', '#000');
    }
}
```

## inject(HostRenderer)
在使用`inject`函数注入`HostRenderer`时需要在组件级别提供`providers: [HostRenderer]`。
```ts
@Component({
    selector: 'thy-dom-host-renderer-test',
    template: 'Content',
    providers: [HostRenderer]
})
export class ThyDomHostRendererTestComponent implements OnInit {
    hostRenderer = inject(HostRenderer);

    constructor() {}

    ngOnInit(): void {
        this.hostRenderer.updateClass(['thy-button', 'thy-button-primary']);
        this.hostRenderer.setStyle('color', '#000');
    }
}
```

## useElementRenderer
```ts
@Component({
    selector: 'thy-dom-use-element-renderer-test',
    template: '<div #container></div>'
})
export class ThyDomUseElementRendererTestComponent implements OnInit {
    @ViewChild('container', { read: ElementRef, static: true }) container: ElementRef;

    containerRenderer = useElementRenderer();

    constructor() {}

    ngOnInit(): void {
        this.containerRenderer.setElement(this.container.nativeElement);
        // 必须在之前调用 setElement 设置 Element 元素
        this.containerRenderer.updateClass(['thy-button', 'thy-button-primary']);
        this.containerRenderer.setStyle('color', '#000');
    }
}
```


