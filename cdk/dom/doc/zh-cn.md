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

## thyStealthView
获取 template 中的所有 Node， 指令实例可获取 rootNodes: Node[]。

## 导入

```ts
import { StealthViewRenderer, useStealthViewRenderer, ThyStealthViewDirective } from "@tethys/cdk/dom";

```

```ts
@Component({
    selector: 'thy-stealth-view',
    template:  `
        <ng-template thyStealthView>
            <span>directive test</span>
            <button thyButton="primary" disabled="disabled">Primary</button>
        </ng-template>
    `
})
export class ThyStealthViewTestComponent implements OnInit {
    @ViewChild(ThyStealthViewDirective) thyStealthView: ThyStealthViewDirective;

    constructor() {}

    ngOnInit(): void {
        this.thyStealthView.rootNodes;
    }
}
```

也可以直接通过 useStealthViewRenderer(templateRefInput: Signal<TemplateRef<SafeAny>> | TemplateRef<SafeAny>) 方法获取 Node

```ts
@Component({
    selector: 'thy-stealth-view',
    template:  `
        <ng-template #testStealth>
            <span>function test</span>
            <button thyButton="primary" disabled="disabled">Primary</button>
        </ng-template>
    `
})
export class ThyStealthViewTestComponent implements OnInit {
    templateRef = viewChild('testStealth', { read: TemplateRef });

    constructor() {}

    ngOnInit(): void {
         runInInjectionContext(this.injector, () => {
            useStealthViewRenderer(this.templateRef).rootNodes;
        });
    }
}
```

