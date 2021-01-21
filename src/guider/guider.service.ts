import { ThyGuiderRef } from './guider-ref';
import { ThyPopover } from 'ngx-tethys/popover';
import { GuiderPlacement, StepInfo, ThyGuiderConfig, defaultTipPlacement } from './guider.class';
import { ThyGuiderStepRef } from './guider-step-ref';
import { Injectable, RendererFactory2 } from '@angular/core';
import { Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({
    providedIn: 'root'
})
export class ThyGuider {
    private stepsRef: ThyGuiderStepRef[];

    private defaultTipPlacement: GuiderPlacement;

    private tipDefaultOffset: number;

    constructor(private readonly rendererFactory: RendererFactory2, private popover: ThyPopover, @Inject(DOCUMENT) private document: any) {}

    public create(config: ThyGuiderConfig): ThyGuiderRef {
        this.adapterConfig(config);
        this.stepsRef = config.steps.map(step => {
            return new ThyGuiderStepRef(step, this.rendererFactory, this.popover, this.document);
        });

        return new ThyGuiderRef(config, this.stepsRef);
    }
    private adapterConfig(config: ThyGuiderConfig) {
        this.defaultTipPlacement = config.defaultTipPlacement || defaultTipPlacement;
        this.tipDefaultOffset = config.tipDefaultOffset || 0;
        config.steps = config.steps.map(step => {
            return this.adapterStep(step);
        });
    }

    private adapterStep(step: StepInfo): StepInfo {
        const tempStep = { ...step };
        tempStep.tipPlacement = tempStep.tipPlacement ? tempStep.tipPlacement : this.defaultTipPlacement;

        tempStep.tipOffset = tempStep.tipOffset ? tempStep.tipOffset : this.tipDefaultOffset;

        return tempStep;
    }
}
