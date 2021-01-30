import { HostBinding, Component, Input, OnInit, TemplateRef } from '@angular/core';
import { ThyGuiderRef } from '../guider-ref';
import { helpers } from 'ngx-tethys/util';
import { StepInfo, StepTipData } from '../guider.class';

export abstract class ThyGuiderTipBaseComponent implements OnInit {
    @Input() guiderRef: ThyGuiderRef;

    @Input() set step(value: StepInfo) {
        this.stepTipData = value.data;
        this.currentStep = value;
    }

    set stepTipData(value: any) {}

    public steps: StepInfo[] = [];

    public currentStep: StepInfo;

    public currentStepIndex: number = 0;

    constructor() {}

    ngOnInit() {
        if (this.guiderRef) {
            this.steps = this.guiderRef.config.steps;
            this.guiderRef.stepChange().subscribe(step => {
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
    @HostBinding('class.thy-guider-tip-container') guiderHint = true;

    set stepTipData(value: StepTipData) {
        this.title = value.title;
        this.setDescription(value.description);
        this.image = value.image;
    }

    public title: string;

    public image: string;

    public descriptionString: string;

    public descriptionTemplateRef: TemplateRef<any>;

    public currentStepIndex: number;

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
