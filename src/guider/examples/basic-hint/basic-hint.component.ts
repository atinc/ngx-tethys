import { Component, OnInit } from '@angular/core';
import { GuiderOptionInfo, GuiderRef, StepInfo, ThyGuider } from 'ngx-tethys';
import { ThyGuiderHintComponent } from 'ngx-tethys/guider/guider-hint/guider-hint.component';

@Component({
    selector: 'thy-guider-basic-hint-example',
    templateUrl: 'basic-hint.component.html'
})
export class ThyGuiderBasicHintExampleComponent implements OnInit {
    private option: GuiderOptionInfo;

    private guiderRef: GuiderRef;

    constructor(private thyGuider: ThyGuider) {}

    ngOnInit() {
        this.option = this.setDefaultGuiderOption();
        this.guiderRef = this.thyGuider.create(this.option);
    }

    private setDefaultGuiderOption(): GuiderOptionInfo {
        return {
            component: ThyGuiderHintComponent,
            steps: [
                {
                    key: 'basic-hint-target',
                    target: '.basic-hint-target',
                    data: {
                        cover: '',
                        title: 'basic-hint-title',
                        description: 'description for basic hint'
                    }
                    // highLightPosition: [40,100];
                    // hintPosition?: GuiderPosition;
                }
            ] as StepInfo[],
            // startWith: '',
            highLightDefaultPosition: [20, 20]
        };
    }

    public startTour() {
        this.guiderRef.start();
    }
}
