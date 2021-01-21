import { helpers } from 'ngx-tethys/util';
import { ThyGuiderStepRef } from './guider-step-ref';
import { Observable, ReplaySubject, Subject } from 'rxjs';
import { ThyGuiderConfig, StepInfo } from './guider.class';

export class ThyGuiderRef {
    private stepChange$: ReplaySubject<StepInfo> = new ReplaySubject<StepInfo>();

    private guiderEnded$ = new Subject();

    private guiderClosed$ = new Subject<StepInfo>();

    private steps: StepInfo[];

    private currentStep: StepInfo;

    private currentStepIndex: number;

    public config: ThyGuiderConfig;

    constructor(config: ThyGuiderConfig, private stepsRef: ThyGuiderStepRef[]) {
        if (!config || !config?.steps || !helpers.isArray(config?.steps)) {
            throw new Error('’config.steps’ must be an array of length greater than 0');
        }
        this.config = config;
        this.steps = config.steps;
    }

    public stepChange(): Observable<StepInfo> {
        return this.stepChange$.asObservable();
    }

    public guiderEnded() {
        return this.guiderEnded$;
    }

    public guiderClosed() {
        return this.guiderClosed$;
    }

    public start(startWith?: number) {
        this.currentStepIndex = startWith >= 0 ? startWith : 0;
        this.to(this.currentStepIndex);

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

        if (!helpers.isNumber(index)) {
            index = 0;
        }
        this.currentStep = this.steps[index];
        this.currentStepIndex = index;
        if (!this.currentStep) {
            throw new Error('step not exist');
        }
        this.drawStep();
        this.notifyStepClicked();
    }

    public close() {
        this.stepsRef[this.currentStepIndex].dispose();
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
        this.currentStepIndex = 0;
    }

    private removeExistedStep() {
        this.stepsRef[this.currentStepIndex].dispose();
    }
}
