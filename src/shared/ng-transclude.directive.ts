import { Directive, Input, TemplateRef, ViewContainerRef, effect, inject, input } from '@angular/core';

/**
 * @private
 */
@Directive({
    selector: '[thyTransclude]'
})
export class ThyTranscludeDirective {
    viewRef: ViewContainerRef;

    protected _viewRef: ViewContainerRef;
    protected _ngTransclude: TemplateRef<any>;

    readonly thyTransclude = input<TemplateRef<any>>();

    constructor() {
        const viewRef = inject(ViewContainerRef);

        this.viewRef = viewRef;

        effect(() => {
            const transclude = this.thyTransclude();
            if (transclude) {
                this.viewRef.createEmbeddedView(transclude);
            }
        });
    }
}
