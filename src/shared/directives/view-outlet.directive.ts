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
    OnInit,
    DestroyRef
} from '@angular/core';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { SafeAny } from 'ngx-tethys/types';
import { delay, map, pairwise } from 'rxjs/operators';

function hasInput(componentRef: ComponentRef<unknown>, inputKey: string) {
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
export class ThyViewOutletDirective implements OnInit {
    private viewContainerRef = inject(ViewContainerRef);
    private keyValueDiffers = inject(KeyValueDiffers);
    private destoryRef = inject(DestroyRef);

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

    private keyValueDiffer: KeyValueDiffer<SafeAny, SafeAny>;

    private viewOutlet$ = toObservable(this.thyViewOutlet).pipe(pairwise());

    private isViewOutletChanged = false;

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
            if (thyViewOutletContext) {
                if (!this.keyValueDiffer || this.isViewOutletChanged) {
                    if (!this.keyValueDiffer) {
                        this.keyValueDiffer = this.keyValueDiffers.find(this.thyViewOutletContext()).create();
                    }
                    this.keyValueDiffer.diff(thyViewOutletContext);
                    updatedKeys = Object.keys(thyViewOutletContext);
                    this.isViewOutletChanged = false;
                } else {
                    const diffChanges = this.keyValueDiffer.diff(this.thyViewOutletContext());
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

    ngOnInit(): void {
        this.viewOutlet$.pipe(takeUntilDestroyed(this.destoryRef)).subscribe(([oldVal, newVal]) => {
            this.isViewOutletChanged = oldVal && oldVal !== newVal;
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
