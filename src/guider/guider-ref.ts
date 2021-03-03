import { Router } from '@angular/router';
import { helpers } from 'ngx-tethys/util';
import { DOCUMENT } from '@angular/common';
import { ThyPopover } from 'ngx-tethys/popover';
import { ThyGuiderManager } from './guider-manager';
import { ThyGuiderStepRef } from './guider-step-ref';
import { Observable, ReplaySubject, Subject } from 'rxjs';
import { ThyGuiderConfig, ThyGuiderStep } from './guider.class';
import { Inject, NgZone, RendererFactory2 } from '@angular/core';

export class ThyGuiderRef {
    public steps: ThyGuiderStep[];

    private stepChange$: ReplaySubject<ThyGuiderStep> = new ReplaySubject<ThyGuiderStep>();

    private guiderEnded$ = new Subject();

    private closed$ = new Subject<ThyGuiderStep>();

    private targetClicked$ = new Subject<ThyGuiderStep>();

    private currentStep: ThyGuiderStep;

    private currentStepIndex: number;

    private stepsRef: ThyGuiderStepRef[];

    constructor(
        public config: ThyGuiderConfig,
        private rendererFactory: RendererFactory2,
        private popover: ThyPopover,
        private router: Router,
        private guiderManager: ThyGuiderManager,
        private ngZone: NgZone,
        @Inject(DOCUMENT) private document: any
    ) {
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
        return this.closed$;
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

    public active(indexOrKey: number | string): void {
        if (helpers.isNumber(indexOrKey)) {
            this.to(indexOrKey as number);
            return;
        }
        if (helpers.isString(indexOrKey)) {
            const index = this.steps.findIndex(step => step.key === (indexOrKey as string));
            this.to(index);
            return;
        }
    }

    private to(index: number): void {
        this.removeExistedStep();

        if (!helpers.isNumber(index) || index >= this.steps.length || index < 0 || Number.isNaN(index)) {
            index = 0;
        }
        this.currentStep = this.steps[index];
        this.currentStepIndex = index;

        // update guiderManager
        this.guiderManager.updateActive(this.currentStep.key, this);
        if (this.currentStep.route && this.currentStep.route !== this.router.url) {
            this.ngZone.run(() => {
                this.router.navigateByUrl(this.currentStep.route);
            });
            return;
        }
        setTimeout(() => {
            this.drawStep();
            this.notifyStepClicked();
        }, 0);
    }

    public close() {
        this.removeManagerActiveKey();
        this.stepsRef[this.currentStepIndex]?.dispose();
        this.closed$.next(this.currentStep);
    }

    public end() {
        this.close();
        this.guiderEnded$.next(this.currentStep);
        this.notifyGuiderIsFinished();
    }

    private removeManagerActiveKey() {
        const activeKey = this.guiderManager.getActive().key;
        if (activeKey && this.steps.map(step => step.key).includes(activeKey)) {
            this.guiderManager.removeActiveKey();
        }
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
