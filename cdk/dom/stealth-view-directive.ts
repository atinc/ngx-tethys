import { Directive, inject, TemplateRef } from '@angular/core';
import { useStealthViewRenderer } from './stealth-view-renderer';

// eslint-disable-next-line @angular-eslint/directive-class-suffix
export class ThyStealthView {
    private templateRef = inject(TemplateRef<any>);

    private stealthViewBehavior = useStealthViewRenderer(this.templateRef);

    get rootNodes() {
        return this.stealthViewBehavior.rootNodes;
    }

    constructor() {}
}
