import { Component, OnInit } from '@angular/core';
import { GuiderOptionInfo, GuiderRef, StepInfo, ThyGuider } from 'ngx-tethys';
import { ThyGuiderHintComponent } from 'ngx-tethys/guider/guider-hint/guider-hint.component';

@Component({
    selector: 'thy-guider-hint-without-target-example',
    templateUrl: 'hint-without-target.component.html'
})
export class ThyGuiderHintWithoutTargetExampleComponent implements OnInit {
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
            component: ThyGuiderHintComponent,
            steps: [
                {
                    key: 'hint-without-target',
                    target: '',
                    data: {
                        cover: '',
                        title: 'HintWithoutTarget',
                        description: '没有具体 target 的提示框。'
                    }
                }
            ] as StepInfo[],
            // startWith: '',
            hintDefaultPosition: [100, -100]
        };
    }

    public startTour() {
        this.guiderRef.start();
    }
}
