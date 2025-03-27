import { Component, OnInit, inject } from '@angular/core';
import { ThyGuider, ThyGuiderConfig, ThyGuiderRef, ThyGuiderStep } from 'ngx-tethys/guider';

@Component({
    selector: 'thy-guider-multi-target-example',
    templateUrl: 'multi-target.component.html',
    standalone: false
})
export class ThyGuiderMultiTargetExampleComponent implements OnInit {
    private thyGuider = inject(ThyGuider);

    public targetConfig = {
        target0: true,
        target1: true,
        target2: true
    };

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
                    key: 'target-0',
                    target: ['.target-2', '.target-1', '.target-0'],
                    data: {
                        image: 'assets/images/guider/start.png',
                        title: '多 target 情况下的提示展示',
                        description: '通过 switch 控制 targets 的显示,并开始新手引导'
                    }
                }
            ] as ThyGuiderStep[]
        };
    }

    public startTour() {
        this.guiderRef.start();
    }
}
