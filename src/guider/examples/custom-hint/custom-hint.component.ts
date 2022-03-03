import { Component, HostBinding, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ThyGuiderConfig, ThyGuiderRef, ThyGuiderStep, ThyGuider } from 'ngx-tethys';
import { ThyGuiderStepRef } from 'ngx-tethys/guider/guider-step-ref';

@Component({
    selector: 'thy-guider-custom-hint-example',
    templateUrl: 'custom-hint.component.html'
})
export class ThyGuiderCustomHintExampleComponent implements OnInit, OnDestroy {
    private option: ThyGuiderConfig;

    private guiderRef: ThyGuiderRef;

    @ViewChild('descTemplate', { static: true }) descTemplate: TemplateRef<any>;

    constructor(private thyGuider: ThyGuider) {}

    ngOnInit() {
        this.option = this.setDefaultGuiderOption();
        this.guiderRef = this.thyGuider.create(this.option);
    }

    ngOnDestroy() {
        this.guiderRef.end();
    }

    private setDefaultGuiderOption(): ThyGuiderConfig {
        return {
            hintComponent: CustomTipComponent,
            steps: [
                {
                    key: 'custom-tip-target',
                    target: '.custom-tip-target',
                    data: {
                        descTemplate: this.descTemplate,
                        descString: 'Hello World'
                    },
                    hintPlacement: 'bottom',
                    hintOffset: 40
                }
            ] as ThyGuiderStep[]
        };
    }

    public startTour() {
        this.guiderRef.start();
    }

    public endTour() {
        this.guiderRef.end();
    }
}

@Component({
    selector: 'custom-tip',
    template: `
        <p class="m-0 px-2 text-white bg-primary rounded text-center">
            <span class="d-block">{{ stepRef.step.data.descString }}</span>
            <ng-template [ngTemplateOutlet]="stepRef.step.data.descTemplate"></ng-template>
        </p>
    `,
    styles: ['p {font-size: 24px}']
})
export class CustomTipComponent implements OnInit {
    @HostBinding('class.tip-blue') className = true;

    public guiderRef: ThyGuiderRef;

    public stepRef: ThyGuiderStepRef;

    public descTemplate: TemplateRef<any>;

    public descString: string;

    constructor() {}

    ngOnInit() {}
}
