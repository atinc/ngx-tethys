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

    private highLightDefaultPosition: GuiderPlacement;

    private hintDefaultPosition: GuiderPlacement;

    private currentStepIndex: number;

    public option: ThyGuiderConfig;

    constructor(option: ThyGuiderConfig, private stepRef: ThyGuiderStepRef) {
        if (!option || !option?.steps || !helpers.isArray(option?.steps)) {
            throw new Error('’option.steps’ must be an array of length greater than 0');
        }
        this.option = option;
        this.steps = this.adapterSteps(option.steps);
        this.highLightDefaultPosition = option.pointDefaultPosition;
        this.hintDefaultPosition = option.tooltipDefaultPosition;
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
        this.stepRef.dispose(this.currentStep);
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
        // this.currentStepIndex++;
    }

    private drawStep(step: StepInfo) {
        this.drawHighlight(step);
        this.stepRef.attach(step, this);
    }

    private drawHighlight(step: StepInfo) {
        step.pointPosition = step.pointPosition === NOT_SET_POSITION ? this.getHighLightDefaultPosition() : step.pointPosition;
    }

    private getHintDefaultPosition(): GuiderPlacement {
        return this.hintDefaultPosition ? this.hintDefaultPosition : [100, -100];
    }

    private getHighLightDefaultPosition(): GuiderPlacement {
        return this.highLightDefaultPosition ? this.highLightDefaultPosition : ('bottomRight' as ThyPlacement);
    }

    private adapterSteps(steps: StepInfo[]): StepInfo[] {
        return steps.map(step => {
            const tempStep = { ...step };

            tempStep.tooltipPosition = tempStep.tooltipPosition ? tempStep.tooltipPosition : NOT_SET_POSITION;

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
        this.stepRef.dispose(this.currentStep);
    }
}
