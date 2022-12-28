import {
    ComponentRef,
    Directive,
    Input,
    ChangeDetectorRef,
    EmbeddedViewRef,
    OnChanges,
    SimpleChanges,
    Type,
    ViewContainerRef,
    TemplateRef,
    KeyValueDiffer,
    KeyValueDiffers
} from '@angular/core';
import { SafeAny } from 'ngx-tethys/types';

/**
 * 视图 Outlet 组件，取代 NgComponentOutlet 和 NgTemplateOutlet
 * @name thyViewOutlet
 * @order 10
 */
@Directive({
    selector: '[thyViewOutlet]',
    standalone: true
})
export class ThyViewOutletDirective implements OnChanges {
    private componentRef: ComponentRef<SafeAny> | undefined;

    private embeddedViewRef: EmbeddedViewRef<SafeAny> | undefined;

    /**
     * 组件或者模板 TemplateRef
     */
    @Input() thyViewOutlet: Type<SafeAny> | TemplateRef<SafeAny> | null = null;

    /**
     * 组件和模板上下文传递数据
     */
    @Input() thyViewOutletContext?: SafeAny;

    private keyValueDiffer: KeyValueDiffer<SafeAny, SafeAny>;

    constructor(private viewContainerRef: ViewContainerRef, private keyValueDiffers: KeyValueDiffers) {}

    ngOnChanges(changes: SimpleChanges) {
        const { viewContainerRef: viewContainerRef } = this;
        if (changes['thyViewOutlet']) {
            viewContainerRef.clear();
            this.componentRef = undefined;
            this.embeddedViewRef = undefined;

            if (this.thyViewOutlet) {
                if (this.thyViewOutlet instanceof TemplateRef) {
                    this.embeddedViewRef = viewContainerRef.createEmbeddedView(this.thyViewOutlet, this.thyViewOutletContext);
                } else {
                    this.componentRef = viewContainerRef.createComponent(this.thyViewOutlet, {
                        index: viewContainerRef.length
                    });
                }
            }
        }

        if (changes['thyViewOutletContext']) {
            let updatedKeys: string[] = [];
            if (changes['thyViewOutletContext'].isFirstChange()) {
                this.keyValueDiffer = this.keyValueDiffers.find(this.thyViewOutletContext).create();
                this.keyValueDiffer.diff(this.thyViewOutletContext);
                updatedKeys = Object.keys(this.thyViewOutletContext);
            } else {
                const changes = this.keyValueDiffer.diff(this.thyViewOutletContext);
                changes.forEachChangedItem(item => {
                    updatedKeys.push(item.key);
                });
            }
            if (this.componentRef) {
                this.updateContext(this.componentRef.instance, updatedKeys);
                this.componentRef.injector.get(ChangeDetectorRef).markForCheck();
            } else if (this.embeddedViewRef) {
                this.updateContext(this.embeddedViewRef.context, updatedKeys);
                this.embeddedViewRef.markForCheck();
            }
        }
    }

    private updateContext(context: SafeAny, updatedKeys: string[]) {
        updatedKeys.forEach(key => {
            context[key] = this.thyViewOutletContext[key];
        });
    }
}
