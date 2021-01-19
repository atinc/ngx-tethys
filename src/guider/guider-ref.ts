import { Type } from '@angular/core';
import { ThyPlacement } from 'ngx-tethys/core';
import { helpers } from 'ngx-tethys/util';
import { Observable, ReplaySubject } from 'rxjs';
import { GuiderDrawHighlightService } from './guider-highlight-draw';
import { GuiderDrawHintService } from './guider-hint-draw';
import { ThyGuiderStepsContainer } from './guider-steps-container';
import { NOT_SET_POSITION, StepActionType, GuiderOptionInfo, StepInfo, GuiderPosition } from './guider.class';

export class GuiderRef {
    private stepsObserver$: ReplaySubject<StepInfo> = new ReplaySubject<StepInfo>();

    private steps: StepInfo[];

    private currentStep: StepInfo;

    private highLightDefaultPosition: GuiderPosition;

    private hintDefaultPosition: GuiderPosition;

    private currentStepIndex: number;

    private startWidth: string;

    private hintComponent: Type<unknown>;

    public stepsContainer: ThyGuiderStepsContainer;

    public option: GuiderOptionInfo;

    constructor(option: GuiderOptionInfo, private highlightDraw: GuiderDrawHighlightService, private stepHintDraw: GuiderDrawHintService) {
        if (!option || !option?.steps || !helpers.isArray(option?.steps)) {
            throw new Error('’option.steps’ must be an array of length greater than 0');
        }
        this.option = option;
        this.steps = this.adapterSteps(option.steps);
        this.startWidth = option.startWith;
        this.highLightDefaultPosition = option.highLightDefaultPosition;
        this.hintDefaultPosition = option.hintDefaultPosition;
        this.hintComponent = option.component;
    }

    public stepChange(): Observable<StepInfo> {
        return this.stepsObserver$;
    }

    public start(startWith?: string) {
        this.stepsObserver$ = new ReplaySubject<StepInfo>();
        this.stepsContainer = new ThyGuiderStepsContainer(this.steps, startWith);
        this.showStep(StepActionType.NEXT);
        this.subscribeToStepsUpdates();
        return this.stepsObserver$.asObservable();
    }

    public next() {
        this.removeExistedStep();
        this.showStep(StepActionType.NEXT);
    }

    public prev() {
        this.removeExistedStep();
        this.showStep(StepActionType.PREV);
    }

    // TODO
    public go(stepName: string) {
        this.removeExistedStep();
    }

    public end() {
        this.removeExistedStep();
        this.highlightDraw.remove();
        this.notifyTourIsFinished();
    }

    private showStep(actionType: StepActionType) {
        this.currentStep = this.stepsContainer.getStep(actionType);

        if (this.currentStep == null) throw new Error('step no exit');
        this.drawStep(this.currentStep);
        this.notifyStepClicked();
    }

    private subscribeToStepsUpdates() {
        this.stepsContainer.stepHasBeenModified.subscribe(updatedStep => {
            if (this.currentStep && this.currentStep.key === updatedStep.key) {
                this.currentStep = updatedStep;
            }
        });
    }

    private notifyStepClicked() {
        this.stepsObserver$.next(this.currentStep);
    }

    private drawStep(step: StepInfo) {
        this.drawHighlight(step);
        this.drawHint(step);
    }

    private drawHighlight(step: StepInfo) {
        step.highLightPosition = step.highLightPosition === NOT_SET_POSITION ? this.getHighLightDefaultPosition() : step.highLightPosition;

        this.highlightDraw.draw(step);
    }

    private drawHint(step: StepInfo) {
        this.removeExistedStep();
        this.stepHintDraw.draw(step, this);
    }

    private getHintDefaultPosition(): GuiderPosition {
        return this.hintDefaultPosition ? this.hintDefaultPosition : [100, -100];
    }

    private getHighLightDefaultPosition(): GuiderPosition {
        return this.highLightDefaultPosition ? this.highLightDefaultPosition : ('bottomRight' as ThyPlacement);
    }

    private adapterSteps(steps: StepInfo[]): StepInfo[] {
        return steps.map(step => {
            const tempStep = { ...step };

            tempStep.hintPosition = tempStep.hintPosition ? tempStep.hintPosition : NOT_SET_POSITION;

            tempStep.highLightPosition = tempStep.highLightPosition ? tempStep.highLightPosition : NOT_SET_POSITION;
            return {
                ...tempStep
            };
        });
    }

    private notifyTourIsFinished() {
        this.stepsObserver$.complete();
    }

    private removeExistedStep() {
        this.stepHintDraw.remove(this.currentStep);
    }
}
