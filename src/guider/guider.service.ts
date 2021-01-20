import { GuiderRef } from './guider-ref';
import { ThyPopover } from 'ngx-tethys/popover';
import { ThyGuiderConfig } from './guider.class';
import { ThyGuiderStepRef } from './guider-step-ref';
import { Injectable, RendererFactory2 } from '@angular/core';
import { Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({
    providedIn: 'root'
})
export class ThyGuider {
    private stepsRef: ThyGuiderStepRef[];

    constructor(private readonly rendererFactory: RendererFactory2, private popover: ThyPopover, @Inject(DOCUMENT) private document: any) {}

    public create(config: ThyGuiderConfig): GuiderRef {
        this.stepsRef = config.steps.map(step => {
            return new ThyGuiderStepRef(step, this.rendererFactory, this.popover, this.document);
        });

        return new GuiderRef(config, this.stepsRef);
    }
}
