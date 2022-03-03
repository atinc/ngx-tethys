import { Component, OnInit } from '@angular/core';
import { ThyGuiderConfig, ThyGuiderRef, ThyGuiderStep, ThyGuider } from 'ngx-tethys';

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
                    key: 'basic-hint-target',
                    target: '.basic-hint-target',
                    data: {
                        image: '/assets/images/guider/start.png',
                        title: '基础新手引导的使用',
                        description: '设置相关的信息即可使用'
                    }
                }
            ] as ThyGuiderStep[]
        };
    }

    public startTour() {
        this.guiderRef.start();
    }
}
