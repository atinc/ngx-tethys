import { Component, Type } from '@angular/core';
import { ThyPlacement } from 'ngx-tethys/core';
import { helpers } from 'ngx-tethys/util';
import { Observable, ReplaySubject } from 'rxjs';
import { GuiderDrawHighlightService } from './guider-highlight-draw';
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

    private stepsContainer: ThyGuiderStepsContainer;

    constructor(option: GuiderOptionInfo, private highlightDraw: GuiderDrawHighlightService) {
        if (!option || !option?.steps || !helpers.isArray(option?.steps)) {
            throw new Error('’option.steps’ must be an array of length greater than 0');
        }
        this.steps = this.adapterSteps(option.steps);
        this.startWidth = option.startWith;
        this.highLightDefaultPosition = option.highLightDefaultPosition;
        this.hintDefaultPosition = option.hintDefaultPosition;
        this.hintComponent = option.component;
    }

    stepChange(): Observable<StepInfo> {
        return this.stepsObserver$;
    }

    public start(startWith?: string) {
        this.stepsObserver$ = new ReplaySubject<StepInfo>();
        this.stepsContainer = new ThyGuiderStepsContainer(this.steps, startWith);
        // this.documentService.setDocumentHeight();

        // this.eventListener.startListeningResizeEvents();
        // this.subscribeToStepsUpdates();
        this.showStep(StepActionType.NEXT);
        return this.stepsObserver$.asObservable();
    }

    public next() {}

    public prev() {}

    public go(stepName: string) {}

    public end() {}

    private showStep(actionType: StepActionType) {
        this.currentStep = this.stepsContainer.getStep(actionType);

        if (this.currentStep == null) throw new Error('step no exit');
        // Scroll the element to get it visible if it's in a scrollable element
        // this.scrollIfElementBeyondOtherElements();
        // this.backDropService.draw(this.currentStep);
        this.drawStep(this.currentStep);
        // this.scrollIfStepAndTargetAreNotVisible();
        this.notifyStepClicked(actionType);
    }

    private subscribeToStepsUpdates() {
        this.stepsContainer.stepHasBeenModified.subscribe(updatedStep => {
            if (this.currentStep && this.currentStep.key === updatedStep.key) {
                this.currentStep = updatedStep;
            }
        });
    }

    private notifyStepClicked(actionType: StepActionType) {
        this.stepsObserver$.next(this.currentStep);
    }

    private drawStep(step: StepInfo) {
        this.drawHighLight(step);
        // this.drawHint(step);
    }

    private drawHighLight(step: StepInfo) {
        step.highLightPosition = step.highLightPosition === NOT_SET_POSITION ? this.getHighLightDefaultPosition() : step.hintPosition;
        this.highlightDraw.draw(step);
    }

    private drawHint(step: StepInfo) {
        step.hintPosition = step.hintPosition === NOT_SET_POSITION ? this.getHintDefaultPosition() : step.hintPosition;
        // this.stepDrawerService.draw(step);
    }

    private getHintDefaultPosition(): GuiderPosition {
        return this.hintDefaultPosition ? this.hintDefaultPosition : ('right' as ThyPlacement);
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
}
