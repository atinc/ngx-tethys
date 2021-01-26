import { ThyGuiderRef } from './guider-ref';
import { ThyPopover } from 'ngx-tethys/popover';
import { StepInfo, ThyGuiderConfig, defaultTipPlacement, GuiderOffset, pointOffset } from './guider.class';
import { ThyGuiderStepRef } from './guider-step-ref';
import { Injectable, RendererFactory2 } from '@angular/core';
import { Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ThyPlacement } from 'ngx-tethys/core';

@Injectable({
    providedIn: 'root'
})
export class ThyGuider {
    private stepsRef: ThyGuiderStepRef[];

    private defaultTipPlacement: ThyPlacement;

    private tipDefaultOffset: number;

    private pointOffset: GuiderOffset;

    constructor(private readonly rendererFactory: RendererFactory2, private popover: ThyPopover, @Inject(DOCUMENT) private document: any) {}

    public create(config: ThyGuiderConfig): ThyGuiderRef {
        this.adapterConfig(config);
        this.stepsRef = config.steps.map(step => {
            return new ThyGuiderStepRef(step, this.rendererFactory, this.popover, this.document);
        });

        return new ThyGuiderRef(config, this.stepsRef);
    }
    private adapterConfig(config: ThyGuiderConfig) {
        this.defaultTipPlacement = config.tipPlacement || defaultTipPlacement;
        this.tipDefaultOffset = config.tipOffset || 0;
        this.pointOffset = config.pointOffset || pointOffset;

        config.steps = config.steps.map(step => {
            return this.adapterStep(step);
        });
    }

    private adapterStep(step: StepInfo): StepInfo {
        const tempStep = Object.assign(
            {
                tipPlacement: this.defaultTipPlacement,
                tipOffset: this.tipDefaultOffset,
                pointOffset: this.pointOffset
            },
            step
        );

        return tempStep;
    }
}
