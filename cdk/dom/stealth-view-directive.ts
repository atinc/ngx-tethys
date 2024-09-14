import { Directive, inject, TemplateRef } from '@angular/core';
import { useStealthViewRenderer } from './stealth-view-renderer';

@Directive({ selector: 'ng-template[thyStealthView]', standalone: true, exportAs: 'thyStealthView' })
export class ThyStealthViewDirective {
    private templateRef = inject(TemplateRef<any>);

    private stealthViewBehavior = useStealthViewRenderer(this.templateRef);

    get rootNodes() {
        return this.stealthViewBehavior.rootNodes;
    }

    constructor() {}
}
