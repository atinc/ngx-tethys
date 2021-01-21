import { Component, OnInit } from '@angular/core';
import { ThyGuiderConfig, ThyGuiderRef, StepInfo, ThyGuider, ThyGuiderTipComponent } from 'ngx-tethys';

@Component({
    selector: 'thy-guider-tip-without-target-example',
    templateUrl: 'tip-without-target.component.html'
})
export class ThyGuiderTipWithoutTargetExampleComponent implements OnInit {
    private option: ThyGuiderConfig;

    private guiderRef: ThyGuiderRef;

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
            component: ThyGuiderTipComponent,
            steps: [
                {
                    key: 'tip-without-target',
                    target: '',
                    data: {
                        cover: '',
                        title: 'TipWithoutTarget',
                        description: '没有具体 target 的提示框。'
                    }
                }
            ] as StepInfo[],
            defaultTipPosition: [100, 100]
        };
    }

    public startTour() {
        this.guiderRef.start();
    }
}
