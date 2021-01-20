import { helpers } from 'ngx-tethys/util';
import { ThyPlacement } from 'ngx-tethys/core';
import { ThyGuiderStepRef } from './guider-step-ref';
import { Observable, ReplaySubject, Subject } from 'rxjs';
import { NOT_SET_POSITION, ThyGuiderConfig, StepInfo, GuiderPlacement } from './guider.class';

export class GuiderRef {
    private stepChange$: ReplaySubject<StepInfo> = new ReplaySubject<StepInfo>();

    private guiderEnded$ = new Subject();

    private steps: StepInfo[];

    private currentStep: StepInfo;

    private pointDefaultPosition: GuiderPlacement;

    // TODO
    private tipDefaultPosition: GuiderPlacement;

    private currentStepIndex: number;

    public config: ThyGuiderConfig;

    constructor(config: ThyGuiderConfig, private stepsRef: ThyGuiderStepRef[]) {
        if (!config || !config?.steps || !helpers.isArray(config?.steps)) {
            throw new Error('’config.steps’ must be an array of length greater than 0');
        }
        this.config = config;
        this.steps = this.adapterSteps(config.steps);
        this.pointDefaultPosition = config.pointDefaultPosition;
        this.tipDefaultPosition = config.tipDefaultPosition;
    }

    public stepChange(): Observable<StepInfo> {
        return this.stepChange$;
    }

    public start(startWith?: string) {
        this.stepChange$ = new ReplaySubject<StepInfo>();
        this.currentStepIndex = this.getFirstStepIndex(startWith);
        this.to(this.currentStepIndex);

        return this.stepChange$.asObservable();
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

        if (!helpers.isNumber(index)) {
            index = 0;
        }
        this.currentStep = this.steps[index];
        this.currentStepIndex = index;
        if (!this.currentStep) {
            throw new Error('step not exist');
        }
        this.drawStep(this.currentStep);
        this.notifyStepClicked();
    }

    public close() {
        this.stepsRef[this.currentStepIndex].dispose();
    }
    public end() {
        this.close();
        this.guiderEnded$.next(this.currentStep);
        this.notifyGuiderIsFinished();
    }

    private getFirstStepIndex(startWith: string): number {
        const firstStep = startWith;
        const stepIds = this.steps.map(step => step.key);

        let index = stepIds.indexOf(firstStep);
        if (index < 0) {
            index = 0;
            if (firstStep !== undefined) throw new Error(`The step ${firstStep} does not exist. `);
        }

        return index;
    }

    private notifyStepClicked() {
        this.stepChange$.next(this.currentStep);
    }

    private drawStep(step: StepInfo) {
        this.setPointPosition(step);
        this.stepsRef[this.currentStepIndex].show(this);
    }

    private setPointPosition(step: StepInfo) {
        step.pointPosition = step.pointPosition === NOT_SET_POSITION ? this.getPointDefaultPosition() : step.pointPosition;
    }

    private getPointDefaultPosition(): GuiderPlacement {
        return this.pointDefaultPosition ? this.pointDefaultPosition : ('bottomRight' as ThyPlacement);
    }

    private adapterSteps(steps: StepInfo[]): StepInfo[] {
        return steps.map(step => {
            const tempStep = { ...step };

            tempStep.tipPosition = tempStep.tipPosition ? tempStep.tipPosition : NOT_SET_POSITION;

            tempStep.pointPosition = tempStep.pointPosition ? tempStep.pointPosition : NOT_SET_POSITION;
            return {
                ...tempStep
            };
        });
    }

    private notifyGuiderIsFinished() {
        this.stepChange$.complete();
        this.currentStepIndex = 0;
    }

    private removeExistedStep() {
        this.stepsRef[this.currentStepIndex].dispose();
    }
}
