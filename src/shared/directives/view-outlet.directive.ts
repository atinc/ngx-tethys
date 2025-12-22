import {
    ComponentRef,
    Directive,
    ChangeDetectorRef,
    EmbeddedViewRef,
    Type,
    ViewContainerRef,
    TemplateRef,
    KeyValueDiffer,
    KeyValueDiffers,
    inject,
    input,
    effect,
    linkedSignal,
    untracked
} from '@angular/core';
import { SafeAny } from 'ngx-tethys/types';

function hasInput(componentRef: ComponentRef<unknown>, inputKey: string) {
    // @ts-ignore
    return componentRef['_tNode'].inputs?.[inputKey];
}

/**
 * 视图 Outlet 组件，取代 NgComponentOutlet 和 NgTemplateOutlet
 * @name thyViewOutlet
 * @order 10
 */
@Directive({
    selector: '[thyViewOutlet]'
})
export class ThyViewOutletDirective {
    private viewContainerRef = inject(ViewContainerRef);
    private keyValueDiffers = inject(KeyValueDiffers);

    private componentRef: ComponentRef<SafeAny> | undefined;

    private embeddedViewRef: EmbeddedViewRef<SafeAny> | undefined;

    /**
     * 组件或者模板 TemplateRef
     */
    readonly thyViewOutlet = input<Type<SafeAny> | TemplateRef<SafeAny> | null>(null);

    /**
     * 组件和模板上下文传递数据
     */
    readonly thyViewOutletContext = input<SafeAny>();

    private keyValueDiffer?: KeyValueDiffer<SafeAny, SafeAny>;

    private readonly isViewOutletChanged = linkedSignal({
        source: () => this.thyViewOutlet(),
        computation: (source, previous) => {
            return !!(source && previous?.source && source !== previous?.source);
        }
    });

    constructor() {
        effect(() => {
            const thyViewOutlet = this.thyViewOutlet();
            const { viewContainerRef: viewContainerRef } = this;
            viewContainerRef.clear();
            this.componentRef = undefined;
            this.embeddedViewRef = undefined;

            if (thyViewOutlet) {
                if (thyViewOutlet instanceof TemplateRef) {
                    this.embeddedViewRef = viewContainerRef.createEmbeddedView(thyViewOutlet, this.thyViewOutletContext());
                } else {
                    this.componentRef = viewContainerRef.createComponent(thyViewOutlet, {
                        index: viewContainerRef.length
                    });
                }
            }
        });

        effect(() => {
            const thyViewOutletContext = this.thyViewOutletContext();
            let updatedKeys: string[] = [];
            const isViewOutletChanged = untracked(this.isViewOutletChanged);
            if (thyViewOutletContext) {
                if (!this.keyValueDiffer || isViewOutletChanged) {
                    if (!this.keyValueDiffer) {
                        this.keyValueDiffer = this.keyValueDiffers.find(thyViewOutletContext).create();
                    }
                    this.keyValueDiffer.diff(thyViewOutletContext);
                    updatedKeys = Object.keys(thyViewOutletContext);
                    this.isViewOutletChanged.set(false);
                } else {
                    const diffChanges = this.keyValueDiffer.diff(thyViewOutletContext);
                    diffChanges?.forEachChangedItem(item => {
                        updatedKeys.push(item.key);
                    });
                }
            }
            if (this.componentRef) {
                this.updateContext(this.componentRef.instance, updatedKeys);
                this.componentRef.injector.get(ChangeDetectorRef).markForCheck();
            } else if (this.embeddedViewRef) {
                this.updateContext(this.embeddedViewRef.context, updatedKeys);
                this.embeddedViewRef.markForCheck();
            }
        });
    }

    private updateContext(context: SafeAny, updatedKeys: string[]) {
        updatedKeys.forEach(key => {
            // 兼容组件输入属性没有通过 @Input，设置了 @Input 采用 setInput，否则直接赋值，setInput 会触发 Angular 组件的 onChanges
            if (this.componentRef && hasInput(this.componentRef, key)) {
                this.componentRef.setInput(key, this.thyViewOutletContext()[key]);
            } else {
                context[key] = this.thyViewOutletContext()[key];
            }
        });
    }
}
