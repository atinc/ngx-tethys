import { HostBinding, AfterViewInit, Component, Input, OnInit, TemplateRef } from '@angular/core';
import { GuiderRef } from '../guider-ref';
import { helpers } from 'ngx-tethys/util';

export abstract class ThyGuiderHintBaseComponent implements OnInit, AfterViewInit {
    @Input() guiderRef: GuiderRef;

    @Input() set stepHintData(value: any) {}

    constructor() {}

    ngOnInit() {}

    ngAfterViewInit() {}
}

@Component({
    selector: 'thy-guider-hint',
    templateUrl: 'guider-hint.component.html'
})
export class ThyGuiderHintComponent extends ThyGuiderHintBaseComponent {
    @HostBinding('class.thy-guider-hint-container') guiderHint = true;

    @Input()
    set stepHintData(value: any) {
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

    ngAfterViewInit() {}

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
        this.guiderRef.prev();
    }

    public next() {
        this.guiderRef.next();
        console.log(this.guiderRef.stepsContainer);
    }

    public end() {
        this.guiderRef.end();
    }
}
