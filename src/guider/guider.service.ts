import { Router } from '@angular/router';
import { helpers } from 'ngx-tethys/util';
import { DOCUMENT } from '@angular/common';
import { ThyGuiderRef } from './guider-ref';
import { NgZone, inject } from '@angular/core';
import { ThyPopover } from 'ngx-tethys/popover';
import { ThyGuiderManager } from './guider-manager';
import { Injectable, RendererFactory2 } from '@angular/core';
import { ThyGuiderStep, ThyGuiderConfig, defaultGuiderPositionConfig } from './guider.class';
import { Overlay } from '@angular/cdk/overlay';

/**
 * 新手引导服务
 * @public
 * @order 10
 */
@Injectable({
    providedIn: 'root'
})
export class ThyGuider {
    private readonly rendererFactory = inject(RendererFactory2);
    private popover = inject(ThyPopover);
    private router = inject(Router);
    private guiderManager = inject(ThyGuiderManager);
    private ngZone = inject(NgZone);
    private overlay = inject(Overlay);
    private document = inject(DOCUMENT);

    private guiderRef: ThyGuiderRef;

    private guiderRefs: ThyGuiderRef[] = [];

    public create(config: ThyGuiderConfig): ThyGuiderRef {
        if (typeof ngDevMode === 'undefined' || ngDevMode) {
            if (!config || !config?.steps || !helpers.isArray(config?.steps)) {
                throw new Error(`'config.steps' must be an array of length greater than 0`);
            }
        }
        const normalizeConfig = this.normalizeConfig(config);
        this.guiderRef = new ThyGuiderRef(
            normalizeConfig,
            this.rendererFactory,
            this.popover,
            this.router,
            this.guiderManager,
            this.ngZone,
            this.overlay,
            this.document
        );
        this.guiderRef.closed().subscribe(() => {
            const index = this.guiderRefs.findIndex(guiderRef => guiderRef === this.guiderRef);
            this.guiderRefs.splice(index, 1);
        });
        this.guiderRefs.push(this.guiderRef);
        return this.guiderRef;
    }

    private normalizeConfig(config: ThyGuiderConfig): ThyGuiderConfig {
        const normalizeConfig = Object.assign({}, defaultGuiderPositionConfig, config);
        normalizeConfig.steps = normalizeConfig.steps.map(step => {
            return this.normalizeStep(step, normalizeConfig);
        });
        return normalizeConfig;
    }

    private normalizeStep(step: ThyGuiderStep, config: ThyGuiderConfig): ThyGuiderStep {
        const tempStep = Object.assign(
            {
                hintPlacement: config.hintPlacement,
                hintOffset: config.hintOffset,
                pointOffset: config.pointOffset
            },
            step
        );

        return tempStep;
    }

    close() {
        if (this.guiderRefs.length > 0) {
            const lasGuiderRef = this.guiderRefs[this.guiderRefs.length - 1];
            if (lasGuiderRef) {
                lasGuiderRef.close();
                this.guiderRefs.pop();
            }
        }
    }
}
