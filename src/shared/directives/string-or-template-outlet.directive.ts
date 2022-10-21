import { Directive, EmbeddedViewRef, Input, OnChanges, SimpleChanges, TemplateRef, ViewContainerRef } from '@angular/core';
import { isTemplateRef } from 'ngx-tethys/util';

@Directive({
    selector: '[thyStringOrTemplateOutlet]',
    exportAs: 'thyStringOrTemplateOutlet'
})
export class ThyStringOrTemplateOutletDirective implements OnChanges {
    private _viewRef: EmbeddedViewRef<any>;

    @Input() thyStringOrTemplateOutletContext: any;

    @Input() thyStringOrTemplateOutlet: any | TemplateRef<any>;

    constructor(private viewContainerRef: ViewContainerRef, private templateRef: TemplateRef<any>) {}

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['thyStringOrTemplateOutlet']) {
            const viewContainerRef = this.viewContainerRef;

            if (this._viewRef) {
                viewContainerRef.remove(viewContainerRef.indexOf(this._viewRef));
            }

            if (this.thyStringOrTemplateOutlet) {
                const templateRef = isTemplateRef(this.thyStringOrTemplateOutlet) ? this.thyStringOrTemplateOutlet : this.templateRef;
                this._viewRef = viewContainerRef.createEmbeddedView(templateRef, this.thyStringOrTemplateOutletContext);
            } else {
                this._viewRef = null;
            }
        } else if (this._viewRef && changes['thyStringOrTemplateOutletContext'] && this.thyStringOrTemplateOutletContext) {
            this._viewRef.context = this.thyStringOrTemplateOutletContext;
        }
    }
}
