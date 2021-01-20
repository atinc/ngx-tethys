import { Component, HostBinding, Input, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ThyGuiderConfig, ThyGuiderRef, StepInfo, ThyGuider, ThyGuiderTipBaseComponent } from 'ngx-tethys';

@Component({
    selector: 'custom-tip',
    template: `
        <p class="m-0 text-white bg-primary rounded text-center">
            <span class="d-block">{{ descString }}</span>
            <ng-template [ngTemplateOutlet]="descTemplate"></ng-template>
        </p>
    `,
    styles: ['p {font-size: 24px}']
})
export class CustomTipComponent extends ThyGuiderTipBaseComponent {
    @HostBinding('class.tip-blue') className = true;

    @Input() set stepTipData(value: any) {
        this.descString = value.descString;
        this.descTemplate = value.descTemplate;
    }
    public descTemplate: TemplateRef<any>;

    public descString: string;

    constructor() {
        super();
    }

    ngOnInit() {
        super.ngOnInit();
    }
}

@Component({
    selector: 'thy-guider-custom-tip-example',
    templateUrl: 'custom-tip.component.html'
})
export class ThyGuiderCustomTipExampleComponent implements OnInit, OnDestroy {
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
            component: CustomTipComponent,
            steps: [
                {
                    key: 'custom-tip-target',
                    target: '.custom-tip-target',
                    data: {
                        descTemplate: this.descTemplate,
                        descString: 'hello world'
                    },
                    tipPosition: 'bottom',
                    tipOffset: 40
                }
            ] as StepInfo[],
            pointDefaultPosition: [40, 20]
        };
    }

    public startTour() {
        this.guiderRef.start();
    }

    public endTour() {
        this.guiderRef.end();
    }
}
