import { Component, OnInit } from '@angular/core';
import { ThyGuiderStep, ThyGuider, ThyGuiderConfig, ThyGuiderRef } from 'ngx-tethys/guider';

@Component({
    selector: 'thy-guider-directive-hint-example',
    templateUrl: 'directive-hint.component.html'
})
export class ThyGuiderDirectiveHintExampleComponent implements OnInit {
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
                    key: 'directive-tip-target',
                    data: {
                        cover: '',
                        title: '指令型新手引导',
                        description: 'DOM已经显示的指令型新手引导'
                    }
                },
                {
                    key: 'directive-tip-target-second',
                    route: '/components/guider/examples',
                    data: {
                        cover: '',
                        title: '同页面的第二个指令型新手引导',
                        description: '同页面中的第二个通过指令设置的新手引导，'
                    }
                },
                // 为其他页面添加此 directive 即可
                // {
                //     key: 'other-page-tip',
                //     route: '/components/progress/examples',
                //     data: {
                //         cover: '',
                //         title: '非 guider 页面的新手引导',
                //         description: '通过自动跳转，在 directive 指定的 DOM 加载完毕后，立即显示相关的新手引导'
                //     },
                //     hintPlacement: 'top'
                // },
                {
                    key: 'back-to-guider-tip',
                    route: '/components/guider/examples',
                    data: {
                        cover: '',
                        title: '回到 guider 页面的新手引导',
                        description: '通过配置 route ，将新手引导跳转回 guider 页面。'
                    },
                    hintPlacement: 'right'
                }
            ] as ThyGuiderStep[]
        };
    }

    public startTour() {
        this.guiderRef.start();
    }
}
