import { Directive, inject, TemplateRef } from "@angular/core";
import { stealthViewBehavior } from "./stealth-view";

@Directive({ selector: 'ng-template[thyStealthView]', standalone: true, exportAs: 'thyStealthView' })
export class ThyStealthViewDirective {
    private templateRef = inject(TemplateRef<any>);

    private stealthViewBehavior = stealthViewBehavior(this.templateRef);

    getNodes(): Node[] {
        return this.stealthViewBehavior.getNodes();
    }

    constructor() { }
}