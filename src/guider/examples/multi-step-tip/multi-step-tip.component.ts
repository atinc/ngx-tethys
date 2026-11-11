import { Component, OnInit, inject } from '@angular/core';
import { ThyButton } from 'ngx-tethys/button';
import { ThyGuider, ThyGuiderConfig, ThyGuiderRef, ThyGuiderStep } from 'ngx-tethys/guider';

@Component({
    selector: 'thy-guider-multi-step-tip-example',
    templateUrl: 'multi-step-tip.component.html',
    imports: [ThyButton]
})
export class ThyGuiderMultiStepTipExampleComponent implements OnInit {
    private thyGuider = inject(ThyGuider);

    private option: ThyGuiderConfig;

    private guiderRef: ThyGuiderRef;

    public text: string;

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
                        image: 'assets/images/guider/start.png',
                        title: 'step 1/4',
                        description: '本次多步骤新手引导总共四步，第一步：target 属性为空，位置由 defaultPosition 决定。'
                    }
                },
                {
                    key: 'multi-steps-tip-1',
                    target: '.step2',
                    data: {
                        image: 'assets/images/guider/start.png',
                        title: 'step 2/4',
                        description: '多步骤新手引导四步中的第二步'
                    },
                    hintPlacement: 'right'
                },
                {
                    key: 'multi-steps-tip-2',
                    target: '#step3',
                    data: {
                        image: 'assets/images/guider/start.png',
                        title: 'step 3/4',
                        description: '多步骤新手引导四步中的第三步，target 为 "#step3"'
                    },
                    hintPlacement: 'right'
                },
                {
                    key: 'multi-steps-tip-end',
                    target: [500, 500],
                    data: {
                        image: 'assets/images/guider/start.png',
                        title: 'step 4/4',
                        description: '多步骤新手引导的最后一步，位置由 target: [number, number] 决定。'
                    }
                }
            ] as ThyGuiderStep[],
            defaultPosition: { x: 100, y: 100 }
        };
    }

    public startTour() {
        this.guiderRef.start();
    }

    public endTour() {
        this.guiderRef.end();
    }
}
