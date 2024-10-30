import { Directive, Input, TemplateRef, ViewContainerRef, inject } from '@angular/core';

/**
 * @private
 */
@Directive({
    selector: '[thyTransclude]',
    standalone: true
})
export class ThyTranscludeDirective {
    viewRef: ViewContainerRef;

    protected _viewRef: ViewContainerRef;
    protected _ngTransclude: TemplateRef<any>;

    @Input()
    set thyTransclude(templateRef: TemplateRef<any>) {
        this._ngTransclude = templateRef;
        if (templateRef) {
            this.viewRef.createEmbeddedView(templateRef);
        }
    }

    get thyTransclude(): TemplateRef<any> {
        return this._ngTransclude;
    }

    constructor() {
        const viewRef = inject(ViewContainerRef);

        this.viewRef = viewRef;
    }
}
