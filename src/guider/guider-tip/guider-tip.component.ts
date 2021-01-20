import { HostBinding, Component, Input, OnInit, TemplateRef } from '@angular/core';
import { GuiderRef } from '../guider-ref';
import { helpers } from 'ngx-tethys/util';
import { StepInfo } from '../guider.class';

export abstract class ThyGuiderTipBaseComponent implements OnInit {
    @Input() guiderRef: GuiderRef;

    @Input() set stepTipData(value: any) {}

    public steps: StepInfo[] = [];

    public currentStep: StepInfo;

    public currentStepIndex: number = 0;

    constructor() {}

    ngOnInit() {
        if (this.guiderRef) {
            this.steps = this.guiderRef.config.steps;
            this.guiderRef.stepChange().subscribe(step => {
                this.currentStep = step;
                this.currentStepIndex = this.steps.findIndex(item => item.key === step.key);
            });
        }
    }
}

@Component({
    selector: 'thy-guider-tip',
    templateUrl: 'guider-tip.component.html'
})
export class ThyGuiderTipComponent extends ThyGuiderTipBaseComponent {
    @HostBinding('class.thy-guider-hint-container') guiderHint = true;

    @Input()
    set stepTipData(value: any) {
        this.title = value.title;
        this.setDescription(value.description);
        this.cover = value.cover;
    }

    @Input() current: number;

    public title: string;

    public cover: string;

    public descriptionString: string;

    public descriptionTemplateRef: TemplateRef<any>;

    public currentStepIndex: number;

    public totalStepsCount: number;

    constructor() {
        super();
    }

    ngOnInit() {
        super.ngOnInit();
    }

    private setDescription(value: string | TemplateRef<any>) {
        if (helpers.isString(value)) {
            this.descriptionString = value as string;
        } else {
            this.descriptionTemplateRef = value as TemplateRef<any>;
        }
    }

    public jump() {
        this.guiderRef.end();
    }

    public prev() {
        this.guiderRef.previous();
    }

    public next() {
        this.guiderRef.next();
    }

    public end() {
        this.guiderRef.end();
    }

    public trackByFn(index: number, step: StepInfo) {
        return step.key || index;
    }
}
