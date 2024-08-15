import { Directive, EmbeddedViewRef, Input, OnChanges, Renderer2, SimpleChanges, TemplateRef, ViewContainerRef } from '@angular/core';
import { isTemplateRef } from 'ngx-tethys/util';

/**
 * @name thyStringOrTemplateOutlet
 */
@Directive({
    selector: '[thyStringOrTemplateOutlet]',
    exportAs: 'thyStringOrTemplateOutlet',
    standalone: true
})
export class ThyStringOrTemplateOutletDirective implements OnChanges {
    private viewRef: EmbeddedViewRef<any>;

    private textNode: Text;

    @Input() thyStringOrTemplateOutletContext: any;

    @Input() thyStringOrTemplateOutlet: any | TemplateRef<any>;

    constructor(
        private viewContainerRef: ViewContainerRef,
        private renderer: Renderer2
    ) {}

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['thyStringOrTemplateOutlet']) {
            this.updateView();
        } else if (this.viewRef && changes['thyStringOrTemplateOutletContext'] && this.thyStringOrTemplateOutletContext) {
            this.viewRef.context = this.thyStringOrTemplateOutletContext;
        }
    }

    private updateView() {
        this.clear();

        if (this.thyStringOrTemplateOutlet) {
            if (isTemplateRef(this.thyStringOrTemplateOutlet)) {
                this.viewRef = this.viewContainerRef.createEmbeddedView(
                    this.thyStringOrTemplateOutlet,
                    this.thyStringOrTemplateOutletContext
                );
            } else {
                this.textNode = this.renderer.createText(this.thyStringOrTemplateOutlet + '');
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
