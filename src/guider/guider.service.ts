import { GuiderRef } from './guider-ref';
import { ThyPopover } from 'ngx-tethys/popover';
import { ThyGuiderConfig } from './guider.class';
import { ThyGuiderStepRef } from './guider-step-ref';
import { ApplicationRef, ComponentFactoryResolver, Injectable, Injector, RendererFactory2 } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ThyGuider {
    private stepRef: ThyGuiderStepRef;

    constructor(
        private readonly rendererFactory: RendererFactory2,
        private readonly componentFactoryResolver: ComponentFactoryResolver,
        private appRef: ApplicationRef,
        private injector: Injector,
        private popover: ThyPopover
    ) {
        this.stepRef = new ThyGuiderStepRef(this.rendererFactory, this.componentFactoryResolver, this.appRef, this.injector, this.popover);
    }

    public create(option: ThyGuiderConfig): GuiderRef {
        return new GuiderRef(option, this.stepRef);
    }
}
