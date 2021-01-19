import { HostBinding, Component, Input, OnInit, TemplateRef, OnChanges, SimpleChanges } from '@angular/core';
import { GuiderRef } from '../guider-ref';
import { helpers } from 'ngx-tethys/util';
import { StepInfo } from '../guider.class';

export abstract class ThyGuiderTooltipBaseComponent implements OnInit, OnChanges {
    @Input() guiderRef: GuiderRef;

    @Input() set stepTooltipData(value: any) {}

    constructor() {}

    ngOnInit() {}

    ngOnChanges(changes: SimpleChanges) {
        if (changes.guiderRef) {
            this.guiderRef.stepChange().subscribe((step: StepInfo) => {
                console.log(step);
                console.log('====');
            });
        }
    }
}

@Component({
    selector: 'thy-guider-hint',
    templateUrl: 'guider-hint.component.html'
})
export class ThyGuiderHintComponent extends ThyGuiderTooltipBaseComponent {
    @HostBinding('class.thy-guider-hint-container') guiderHint = true;

    @Input()
    set stepTooltipData(value: any) {
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

    ngOnInit() {}

    private setDescription(value: string | TemplateRef<any>) {
        if (helpers.isString(value)) {
            this.descriptionString = value as string;
        } else {
            this.descriptionTemplateRef = value as TemplateRef<any>;
        }
    }

    jump() {
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
}
