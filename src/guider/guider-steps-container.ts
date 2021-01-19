import { Subject } from 'rxjs';
// import { ThyPlacement } from 'ngx-tethys';
import { StepInfo, StepActionType } from './guider.class';

export class ThyGuiderStepsContainer {
    private steps: StepInfo[];
    private currentStepIndex = -2;
    public stepHasBeenModified: Subject<StepInfo> = new Subject<StepInfo>();

    constructor(steps: StepInfo[], startWith?: string) {
        this.steps = steps;
        this.currentStepIndex = this.getFirstStepIndex(startWith) - 1;
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

    public getStep(actionType: StepActionType): StepInfo {
        if (actionType === StepActionType.NEXT) this.currentStepIndex++;
        else this.currentStepIndex--;

        if (this.currentStepIndex < 0 || this.currentStepIndex >= this.steps.length)
            throw new Error('The first or last step of the step list cannot be found!');

        const currentStep = this.steps[this.currentStepIndex];

        if (currentStep == null) {
            throw new Error(`Step ${this.steps[this.currentStepIndex].key} not found in the DOM.`);
        }

        return currentStep;
    }

    // private updateHintPosition(stepKey: string, position: ThyPlacement | string[]) {
    //     this.updatePosition(stepKey, position, 'hintPosition');
    // }

    // private updateHighLightPosition(stepKey: string, position: ThyPlacement | string[]) {
    //     this.updatePosition(stepKey, position, 'highLightPosition');
    // }

    // private updatePosition(stepKey: string, position: ThyPlacement | string[], type: string) {
    //     let index = this.getStepIndex(stepKey);
    //     if (this.steps[index]) {
    //         this.steps[index][type] = position;
    //         this.stepHasBeenModified.next(this.steps[index]);
    //     } else {
    //         throw new Error(`Trying to modify the position of ${stepKey} to ${position}. Step not found!`);
    //     }
    // }

    public getStepNumber(stepKey: string): number {
        return this.getStepIndex(stepKey) + 1;
    }

    public getStepsCount() {
        return this.steps.length;
    }

    private getStepIndex(stepKey: string): number {
        const index = this.steps.map(step => step.key).findIndex(key => stepKey === key);
        if (index === -1) throw new Error(`The step with key: ${stepKey} does not exist in the step list.`);
        return index;
    }
}
