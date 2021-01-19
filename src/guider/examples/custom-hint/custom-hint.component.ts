import { Component, HostBinding, Input, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ThyGuiderConfig, GuiderRef, StepInfo, ThyGuider } from 'ngx-tethys';
import { ThyGuiderTooltipBaseComponent } from 'ngx-tethys/guider/guider-hint/guider-hint.component';

@Component({
    selector: 'custom-hint',
    template: `
        <p class="m-0 text-white bg-primary rounded">
            <ng-template [ngTemplateOutlet]="descTemplate"></ng-template>
        </p>
    `,
    styles: ['p {font-size: 24px}']
})
export class CustomHintComponent extends ThyGuiderTooltipBaseComponent {
    @HostBinding('class.hint-blue') className = true;

    @Input() set stepHintData(value: any) {
        this.descString = value.descString;
        this.descTemplate = value.descTemplate;
    }
    public descTemplate: TemplateRef<any>;

    public descString: string;

    constructor() {
        super();
    }

    ngOnInit() {}
}

@Component({
    selector: 'thy-guider-custom-hint-example',
    templateUrl: 'custom-hint.component.html'
})
export class ThyGuiderCustomHintExampleComponent implements OnInit, OnDestroy {
    private option: ThyGuiderConfig;

    private guiderRef: GuiderRef;

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
            component: CustomHintComponent,
            steps: [
                {
                    key: 'custom-hint-target',
                    target: '.custom-hint-target',
                    data: {
                        descTemplate: this.descTemplate,
                        descString: 'hello world'
                    }
                    // highLightPosition: [40,100];
                    // hintPosition?: GuiderPlacement;
                }
            ] as StepInfo[],
            pointDefaultPosition: [40, 40],
            tooltipDefaultPosition: [100, -100]
        };
    }

    public startTour() {
        this.guiderRef.start();
    }

    public endTour() {
        this.guiderRef.end();
    }
}
