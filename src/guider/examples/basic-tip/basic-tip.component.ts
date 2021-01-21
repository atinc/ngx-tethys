import { Component, OnInit } from '@angular/core';
import { ThyGuiderConfig, ThyGuiderRef, StepInfo, ThyGuider } from 'ngx-tethys';

@Component({
    selector: 'thy-guider-basic-tip-example',
    templateUrl: 'basic-tip.component.html'
})
export class ThyGuiderBasicTipExampleComponent implements OnInit {
    private option: ThyGuiderConfig;

    private guiderRef: ThyGuiderRef;

    constructor(private thyGuider: ThyGuider) {}

    ngOnInit() {
        this.option = this.setDefaultGuiderOption();
        this.guiderRef = this.thyGuider.create(this.option);
    }

    private setDefaultGuiderOption(): ThyGuiderConfig {
        return {
            steps: [
                {
                    key: 'basic-tip-target',
                    target: '.basic-tip-target',
                    data: {
                        cover: '',
                        title: 'basic-tip-title',
                        description: 'description for basic tip'
                    }
                }
            ] as StepInfo[]
        };
    }

    public startTour() {
        this.guiderRef.start();
    }
}
