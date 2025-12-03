import { Directive, EmbeddedViewRef, Renderer2, TemplateRef, ViewContainerRef, effect, inject, input } from '@angular/core';
import { isTemplateRef } from 'ngx-tethys/util';

/**
 * @name thyStringOrTemplateOutlet
 */
@Directive({
    selector: '[thyStringOrTemplateOutlet]',
    exportAs: 'thyStringOrTemplateOutlet'
})
export class ThyStringOrTemplateOutletDirective {
    private viewContainerRef = inject(ViewContainerRef);
    private renderer = inject(Renderer2);

    private viewRef: EmbeddedViewRef<any>;

    private textNode: Text;

    readonly thyStringOrTemplateOutletContext = input<any>();

    readonly thyStringOrTemplateOutlet = input<any | TemplateRef<any>>();

    constructor() {
        effect(() => {
            this.updateView();
        });

        effect(() => {
            if (this.viewRef && this.thyStringOrTemplateOutletContext()) {
                this.viewRef.context = this.thyStringOrTemplateOutletContext();
            }
        });
    }

    private updateView() {
        const thyStringOrTemplateOutlet = this.thyStringOrTemplateOutlet();
        this.clear();
        if (thyStringOrTemplateOutlet) {
            if (isTemplateRef(thyStringOrTemplateOutlet)) {
                this.viewRef = this.viewContainerRef.createEmbeddedView(thyStringOrTemplateOutlet, this.thyStringOrTemplateOutletContext());
            } else {
                this.textNode = this.renderer.createText(`${thyStringOrTemplateOutlet  }`);
                const element = this.viewContainerRef.element.nativeElement as HTMLElement;
                this.renderer.insertBefore(element.parentNode, this.textNode, element);
            }
        } else {
            this.viewRef = null;
        }
    }

    private clear() {
        this.viewContainerRef.clear();
        if (this.textNode) {
            this.renderer.removeChild(this.textNode.parentNode, this.textNode);
        }
    }
}
