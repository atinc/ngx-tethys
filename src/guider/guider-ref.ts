import { ThyGuiderStepRef } from './guider-step-ref';
import { Observable, ReplaySubject, Subject } from 'rxjs';
import { ThyGuiderConfig, ThyGuiderStep } from './guider.class';
import { ThyPopover } from 'ngx-tethys/popover';
import { ThyGuiderManager } from './guider-manager';
import { Inject, RendererFactory2 } from '@angular/core';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { helpers } from 'ngx-tethys/util';

export class ThyGuiderRef {
    private stepChange$: ReplaySubject<ThyGuiderStep> = new ReplaySubject<ThyGuiderStep>();

    private guiderEnded$ = new Subject();

    private guiderClosed$ = new Subject<ThyGuiderStep>();

    private targetClicked$ = new Subject<ThyGuiderStep>();

    public steps: ThyGuiderStep[];

    private currentStep: ThyGuiderStep;

    private currentStepIndex: number;

    private stepsRef: ThyGuiderStepRef[];

    constructor(
        public config: ThyGuiderConfig,
        private rendererFactory: RendererFactory2,
        private popover: ThyPopover,
        private router: Router,
        private guiderManager: ThyGuiderManager,
        @Inject(DOCUMENT) private document: any
    ) {
        if (!config || !config?.steps || !helpers.isArray(config?.steps)) {
            throw new Error('’config.steps’ must be an array of length greater than 0');
        }
        this.stepsRef = config.steps.map((step, index) => {
            return new ThyGuiderStepRef(step, index, this.rendererFactory, this.popover, this.guiderManager, this.document);
        });
        this.steps = config.steps;
    }

    public stepChange(): Observable<ThyGuiderStep> {
        return this.stepChange$.asObservable();
    }

    public ended() {
        return this.guiderEnded$;
    }

    public closed() {
        return this.guiderClosed$;
    }

    public targetClicked() {
        return this.targetClicked$;
    }

    public start(startWith?: number) {
        this.to(startWith);

        return this.stepChange();
    }

    public next() {
        if (this.currentStepIndex + 1 > this.steps.length) {
            return;
        }
        this.to(this.currentStepIndex + 1);
    }

    public previous() {
        if (this.currentStepIndex - 1 < 0) {
            return;
        }

        this.to(this.currentStepIndex - 1);
    }

    public to(index: number): void {
        this.removeExistedStep();

        if (!helpers.isNumber(index) || index >= this.steps.length || index < 0 || Number.isNaN(index)) {
            index = 0;
        }
        this.currentStep = this.steps[index];
        this.currentStepIndex = index;
        if (!this.currentStep) {
            throw new Error('step not exist');
        }
        // update guiderManager
        this.guiderManager.activeStepKey$.next(this.currentStep.key);
        this.guiderManager.thyGuiderRef = this;

        if (this.currentStep.route && this.currentStep.route !== this.router.url) {
            this.router.navigateByUrl(this.currentStep.route);
            return;
        }
        setTimeout(() => {
            this.drawStep();
            this.notifyStepClicked();
        }, 0);
    }

    public close() {
        this.stepsRef[this.currentStepIndex]?.dispose();
        this.guiderClosed$.next(this.currentStep);
    }

    public end() {
        this.close();
        this.guiderEnded$.next(this.currentStep);
        this.notifyGuiderIsFinished();
    }

    private notifyStepClicked() {
        this.stepChange$.next(this.currentStep);
    }

    private drawStep() {
        this.stepsRef[this.currentStepIndex].show(this);
    }

    private notifyGuiderIsFinished() {
        this.stepChange$.complete();
        // this.targetClicked().unsubscribe();
        this.currentStepIndex = 0;
    }

    private removeExistedStep() {
        this.stepsRef[this.currentStepIndex]?.dispose();
    }
}
