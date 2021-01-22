import { Component, OnInit } from '@angular/core';
import { ThyGuiderConfig, ThyGuiderRef, StepInfo, ThyGuiderTipComponent, ThyGuider } from 'ngx-tethys';

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
            component: ThyGuiderTipComponent,
            steps: [
                {
                    key: 'multi-steps-tip-start',
                    target: '',
                    data: {
                        cover: '',
                        title: 'withoutTarget',
                        description: '欢迎使用 PingCode 开启高效研发，我们将通过简单的指引，帮助你快速熟悉产品，让你更便捷的开始工作'
                    }
                },
                {
                    key: 'multi-steps-tip-1',
                    target: '.step1',
                    data: {
                        cover: '',
                        title: 'withoutTarget-Step1',
                        description: '点击      ，查看团队当前版本及用量，掌握团队资产，还可以进入团队后台管理组织架构、成员、安全等内容'
                    },
                    tipPlacement: 'right'
                },
                {
                    key: 'multi-steps-tip-2',
                    target: '.step2',
                    data: {
                        cover: '',
                        title: 'withoutTarget-Step2',
                        description:
                            '点击      ，无论是个人工作台还是团队公共工作台，都显而易见，在这里，可以随时定义关注的工作内容，实时掌握工作动态'
                    },
                    tipPlacement: 'topRight'
                },
                {
                    key: 'multi-steps-tip-3',
                    target: '.step3',
                    data: {
                        cover: '',
                        title: 'withoutTarget-Step3',
                        description: '点击      ，查看当前团队使用的产品，还可进入全部产品了解 PingCode 产品矩阵'
                    },
                    tipPlacement: 'bottomRight'
                },
                {
                    key: 'multi-steps-tip-end',
                    target: '',
                    data: {
                        cover: '',
                        title: 'withoutTarget-Step-end',
                        description: '开启 PingCode 高效研发之旅'
                    }
                }
            ] as StepInfo[],
            tipPosition: [100, 50]
        };
    }

    public startTour() {
        this.guiderRef.start();
    }

    public showText() {
        if (this.text) {
            this.text = '';
        } else {
            this.text = 'show text';
        }
    }
}
