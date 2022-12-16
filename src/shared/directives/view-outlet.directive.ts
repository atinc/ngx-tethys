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
    TemplateRef
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

    constructor(private viewContainerRef: ViewContainerRef) {}

    ngOnChanges(changes: SimpleChanges) {
        const { viewContainerRef: viewContainerRef } = this;
        if (changes['thyViewOutlet']) {
            viewContainerRef.clear();
            this.componentRef = undefined;

            if (this.thyViewOutlet) {
                if (this.thyViewOutlet instanceof TemplateRef) {
                    this.embeddedViewRef = viewContainerRef.createEmbeddedView(this.thyViewOutlet, this.thyViewOutletContext);
                } else {
                    this.componentRef = viewContainerRef.createComponent(this.thyViewOutlet, {
                        index: viewContainerRef.length
                    });
                    Object.assign(this.componentRef.instance, this.thyViewOutletContext);
                }
            }
        }

        if (changes['thyViewOutletContext']) {
            if (this.componentRef) {
                Object.assign(this.componentRef.instance, this.thyViewOutletContext);
                this.componentRef.injector.get(ChangeDetectorRef).markForCheck();
            } else if (this.embeddedViewRef) {
                Object.assign(this.embeddedViewRef.context, this.thyViewOutletContext);
                this.embeddedViewRef.markForCheck();
            }
        }
    }
}
