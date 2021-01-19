import { Component, OnInit } from '@angular/core';
import { GuiderOptionInfo, GuiderRef, StepInfo } from 'ngx-tethys';
import { ThyGuiderHintComponent } from 'ngx-tethys/guider/guider-hint/guider-hint.component';
import { ThyGuider } from 'ngx-tethys/guider/guider.service';

@Component({
    selector: 'thy-guider-multi-step-hint-example',
    templateUrl: 'multi-step-hint.component.html'
})
export class ThyGuiderMultiStepHintExampleComponent implements OnInit {
    private option: GuiderOptionInfo;

    private guiderRef: GuiderRef;

    public text: string;

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
                    key: 'custom-hint-target',
                    target: '',
                    data: {
                        cover: '',
                        title: 'withoutTarget',
                        description: '欢迎使用 PingCode 开启高效研发，我们将通过简单的指引，帮助你快速熟悉产品，让你更便捷的开始工作'
                    }
                    // highLightPosition: [40,100],
                    // hintPosition?: GuiderPosition
                },
                {
                    key: 'custom-hint-target-1',
                    target: '.step1',
                    data: {
                        cover: '',
                        title: 'withoutTarget-Step1',
                        description: '点击      ，查看团队当前版本及用量，掌握团队资产，还可以进入团队后台管理组织架构、成员、安全等内容'
                    },
                    // highLightPosition: [40,100],
                    hintPosition: 'right'
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
                    // highLightPosition: [40,100],
                    hintPosition: 'bottomRight'
                },
                {
                    key: 'custom-hint-target3',
                    target: '.step3',
                    data: {
                        cover: '',
                        title: 'withoutTarget-Step3',
                        description: '点击      ，查看当前团队使用的产品，还可进入全部产品了解 PingCode 产品矩阵'
                    },
                    highLightPosition: [40, 10],
                    hintPosition: 'bottomRight'
                },
                {
                    key: 'custom-hint-target-end',
                    target: '',
                    data: {
                        cover: '',
                        title: 'withoutTarget-Step-end',
                        description: '开启 PingCode 高效研发之旅'
                    },
                    // highLightPosition: [40, 100],
                    hintPosition: 'left'
                }
            ] as StepInfo[],
            // startWith: '',
            highLightDefaultPosition: [10, 10],
            hintDefaultPosition: [100, -100]
        };
    }

    public startTour() {
        this.guiderRef.start();
    }

    public showText() {
        this.text = 'show text';
    }
}
