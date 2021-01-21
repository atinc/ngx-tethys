import { Component, OnInit } from '@angular/core';
import { StepInfo, ThyGuider, ThyGuiderConfig, ThyGuiderRef } from 'ngx-tethys/guider';

@Component({
    selector: 'thy-guider-custom-position-example',
    templateUrl: 'custom-position.component.html'
})
export class ThyGuiderCustomPositionExampleComponent implements OnInit {
    private option: ThyGuiderConfig;

    private guiderRef: ThyGuiderRef;

    constructor(private thyGuider: ThyGuider) {}

    ngOnInit() {
        this.option = this.setDefaultGuiderOption();
        this.guiderRef = this.thyGuider.create(this.option);
        this.guiderRef.stepChange().subscribe(step => {
            console.log(step);
        });
    }

    private setDefaultGuiderOption(): ThyGuiderConfig {
        return {
            steps: [
                {
                    key: 'custom-point-position',
                    target: '.custom-point-position',
                    data: {
                        image: '',
                        title: 'custom-position-by-offset',
                        description: '设置 point 的偏移量，从默认位置偏移[-10,-10]达到此位置'
                    },
                    pointOffset: [-10, -10]
                },
                {
                    key: 'custom-point-position-2',
                    target: '.custom-point-position-2',
                    data: {
                        image: '',
                        title: 'custom-position-by-coordinates',
                        description: '设置 point 的相对 target 左上角的位置，设置相对于目标[10,10]的位置'
                    },
                    pointPosition: [10, 10]
                },
                {
                    key: 'custom-tip-position',
                    target: '.custom-tip-position',
                    data: {
                        image: '',
                        title: 'custom-tip-by-default',
                        description: '通过 placement 设置 tip 的位置从默认设置为 topRight'
                    },
                    tipPosition: 'topRight'
                },
                {
                    key: 'custom-tip-position-2',
                    target: '.custom-tip-position-2',
                    data: {
                        image: '',
                        title: 'custom-tip-by-default',
                        description: '设置 tip 相对于默认位置的偏移量为 40'
                    },
                    tipOffset: 40
                }
            ] as StepInfo[]
        };
    }

    public startTour() {
        this.guiderRef.start();
    }
}
