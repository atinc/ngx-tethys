import { Component, OnInit, inject } from '@angular/core';
import { ThyGuiderConfig, ThyGuiderRef, ThyGuiderStep, ThyGuider } from 'ngx-tethys/guider';

@Component({
    selector: 'thy-guider-basic-tip-example',
    templateUrl: 'basic-tip.component.html'
})
export class ThyGuiderBasicTipExampleComponent implements OnInit {
    private thyGuider = inject(ThyGuider);

    private option: ThyGuiderConfig;

    private guiderRef: ThyGuiderRef;

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
                        image: 'assets/images/guider/start.png',
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
