import { Component, HostBinding, Input, OnDestroy, OnInit } from '@angular/core';
import { GuiderOptionInfo, GuiderRef, StepInfo, ThyGuider } from 'ngx-tethys';

@Component({
    selector: 'custom-hint',
    template: `
        <p class="m-0 text-white bg-primary rounded">{{ stepHintData.desc }}</p>
    `,
    styles: ['p {font-size: 24px}']
})
export class CustomHintComponent implements OnInit {
    @HostBinding('class.hint-blue') className = true;

    @Input()
    stepHintData: any;

    constructor() {}

    ngOnInit() {}
}

@Component({
    selector: 'thy-guider-custom-hint-example',
    templateUrl: 'custom-hint.component.html'
})
export class ThyGuiderCustomHintExampleComponent implements OnInit, OnDestroy {
    private option: GuiderOptionInfo;

    private guiderRef: GuiderRef;

    constructor(private thyGuider: ThyGuider) {}

    ngOnInit() {
        this.option = this.setDefaultGuiderOption();
        this.guiderRef = this.thyGuider.create(this.option);
    }

    ngOnDestroy() {
        this.guiderRef.end();
    }

    private setDefaultGuiderOption(): GuiderOptionInfo {
        return {
            component: CustomHintComponent,
            steps: [
                {
                    key: 'custom-hint-target',
                    target: '.custom-hint-target',
                    data: {
                        desc: 'custom hint is a long text,and background color is blue,and text is white'
                    }
                    // highLightPosition: [40,100];
                    // hintPosition?: GuiderPosition;
                }
            ] as StepInfo[],
            // startWith: '',
            highLightDefaultPosition: [40, 40],
            hintDefaultPosition: [100, -100]
        };
    }

    public startTour() {
        this.guiderRef.start();
    }

    public endTour() {
        this.guiderRef.end();
    }
}
