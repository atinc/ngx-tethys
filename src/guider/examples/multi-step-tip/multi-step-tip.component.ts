import { Component, OnInit } from '@angular/core';
import { ThyGuiderConfig, ThyGuiderRef, ThyGuiderStep, ThyGuider } from 'ngx-tethys';

@Component({
    selector: 'thy-guider-multi-step-tip-example',
    templateUrl: 'multi-step-tip.component.html'
})
export class ThyGuiderMultiStepTipExampleComponent implements OnInit {
    private option: ThyGuiderConfig;

    private guiderRef: ThyGuiderRef;

    public text: string;

    constructor(private thyGuider: ThyGuider) {}

    ngOnInit() {
        this.option = this.setDefaultGuiderOption();
        this.guiderRef = this.thyGuider.create(this.option);
        this.guiderRef.targetClicked().subscribe(step => {
            console.log(step);
        });
    }

    private setDefaultGuiderOption(): ThyGuiderConfig {
        return {
            steps: [
                {
                    key: 'multi-steps-tip-start',
                    target: '',
                    data: {
                        cover: '',
                        title: 'step 1/5',
                        description: '本次新手引导总共五步，第一步：无目标'
                    }
                },
                {
                    key: 'multi-steps-tip-1',
                    target: '.step1',
                    data: {
                        cover: '',
                        title: 'step 2/5',
                        description: '新手引导五步中的第二步'
                    },
                    tipPlacement: 'right'
                },
                {
                    key: 'multi-steps-tip-2',
                    target: '.step2',
                    data: {
                        cover: '',
                        title: 'step 3/5',
                        description: '新手引导五步中的第三步'
                    },
                    tipPlacement: 'topRight'
                },
                {
                    key: 'multi-steps-tip-3',
                    target: '.step3',
                    data: {
                        cover: '',
                        title: 'step 4/5',
                        description: '新手引导五步中的第四步'
                    },
                    tipPlacement: 'bottomRight'
                },
                {
                    key: 'multi-steps-tip-end',
                    target: '',
                    data: {
                        cover: '',
                        title: 'step 5/5',
                        description: '新手引导的最后一步'
                    }
                }
            ] as ThyGuiderStep[],
            defaultPosition: [100, 50]
        };
    }

    public startTour() {
        this.guiderRef.start();
    }
}
