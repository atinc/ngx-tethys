import { Component, OnInit } from '@angular/core';
import { ThyGuiderConfig, GuiderRef, StepInfo } from 'ngx-tethys';
import { ThyGuiderHintComponent } from 'ngx-tethys/guider/guider-hint/guider-hint.component';
import { ThyGuider } from 'ngx-tethys/guider/guider.service';

@Component({
    selector: 'thy-guider-multi-step-hint-example',
    templateUrl: 'multi-step-hint.component.html'
})
export class ThyGuiderMultiStepHintExampleComponent implements OnInit {
    private option: ThyGuiderConfig;

    private guiderRef: GuiderRef;

    public text: string;

    constructor(private thyGuider: ThyGuider) {}

    ngOnInit() {
        this.option = this.setDefaultGuiderOption();
        this.guiderRef = this.thyGuider.create(this.option);
    }
    private setDefaultGuiderOption(): ThyGuiderConfig {
        return {
            component: ThyGuiderHintComponent,
            steps: [
                {
                    key: 'custom-hint-target',
                    target: '',
                    data: {
                        cover: '',
                        title: 'withoutTarget',
                        description: '欢迎使用 PingCode 开启高效研发，我们将通过简单的指引，帮助你快速熟悉产品，让你更便捷的开始工作'
                    }
                    // pointPosition: [40,100],
                    // tooltipPosition?: GuiderPlacement
                },
                {
                    key: 'custom-hint-target-1',
                    target: '.step1',
                    data: {
                        cover: '',
                        title: 'withoutTarget-Step1',
                        description: '点击      ，查看团队当前版本及用量，掌握团队资产，还可以进入团队后台管理组织架构、成员、安全等内容'
                    },
                    // pointPosition: [40,100],
                    tooltipPosition: 'right'
                },
                {
                    key: 'custom-hint-target2',
                    target: '.step2',
                    data: {
                        cover: '',
                        title: 'withoutTarget-Step2',
                        description:
                            '点击      ，无论是个人工作台还是团队公共工作台，都显而易见，在这里，可以随时定义关注的工作内容，实时掌握工作动态'
                    },
                    // pointPosition: [40,100],
                    tooltipPosition: 'topRight'
                },
                {
                    key: 'custom-hint-target3',
                    target: '.step3',
                    data: {
                        cover: '',
                        title: 'withoutTarget-Step3',
                        description: '点击      ，查看当前团队使用的产品，还可进入全部产品了解 PingCode 产品矩阵'
                    },
                    pointPosition: [40, 10],
                    tooltipPosition: 'bottomRight'
                },
                {
                    key: 'custom-hint-target-end',
                    target: '',
                    data: {
                        cover: '',
                        title: 'withoutTarget-Step-end',
                        description: '开启 PingCode 高效研发之旅'
                    }
                    // pointPosition: [40, 100],
                }
            ] as StepInfo[],
            // startWith: '',
            pointDefaultPosition: [10, 10],
            tooltipDefaultPosition: [100, -100]
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
