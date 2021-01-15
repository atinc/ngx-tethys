import { Subject } from 'rxjs';
import { ThyPlacement } from 'ngx-tethys';
import { StepInfo, StepActionType } from './guider.class';

export class ThyGuiderStepsContainer {
    private steps: StepInfo[];
    private currentStepIndex = -2;
    stepHasBeenModified: Subject<StepInfo> = new Subject<StepInfo>();

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

    // addStep(stepToAdd: JoyrideStep) {
    //     let stepExist = this.tempSteps.filter(step => step.name === stepToAdd.name).length > 0;
    //     if (!stepExist) {
    //         this.logger.info(`Adding step ${stepToAdd.name} to the steps list.`);
    //         this.tempSteps.push(stepToAdd);
    //     } else {
    //         let stepIndexToReplace = this.tempSteps.findIndex(step => step.name === stepToAdd.name);
    //         this.tempSteps[stepIndexToReplace] = stepToAdd;
    //     }
    // }

    getStep(actionType: StepActionType): StepInfo {
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

    // getStepRoute(action: StepActionType) {
    //     let stepID: string;
    //     if (action === StepActionType.NEXT) {
    //         stepID = this.steps[this.currentStepIndex + 1] ? this.steps[this.currentStepIndex + 1].id : null;
    //     } else {
    //         stepID = this.steps[this.currentStepIndex - 1] ? this.steps[this.currentStepIndex - 1].id : null;
    //     }
    //     let stepRoute = stepID && stepID.includes(ROUTE_SEPARATOR) ? stepID.split(ROUTE_SEPARATOR)[1] : '';

    //     return stepRoute;
    // }

    updateHintPosition(stepKey: string, position: ThyPlacement | string[]) {
        this.updatePosition(stepKey, position, 'hintPosition');
    }

    updateHighLightPosition(stepKey: string, position: ThyPlacement | string[]) {
        this.updatePosition(stepKey, position, 'highLightPosition');
    }

    private updatePosition(stepKey: string, position: ThyPlacement | string[], type: string) {
        let index = this.getStepIndex(stepKey);
        if (this.steps[index]) {
            this.steps[index][type] = position;
            this.stepHasBeenModified.next(this.steps[index]);
        } else {
            // throw new Error(
            //     `Trying to modify the position of ${stepName} to ${position}. Step not found!Is this step located in a different route?`
            // );
        }
    }

    getStepNumber(stepKey: string): number {
        return this.getStepIndex(stepKey) + 1;
    }

    getStepsCount() {
        return this.steps.length;
    }

    private getStepIndex(stepKey: string): number {
        const index = this.steps.map(step => step.key).findIndex(key => stepKey === key);
        if (index === -1) throw new Error(`The step with key: ${stepKey} does not exist in the step list.`);
        return index;
    }
}
