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
            tipPosition: [100, 100],
            pointOffset: [20, 20],
            steps: [
                {
                    key: 'custom-point-position-default',
                    target: '.custom-point-position-default',
                    data: {
                        image: '',
                        title: 'custom-position-by-offset',
                        description: '默认位置'
                    },
                    pointOffset: [0, 0] // 非必选项，默认值 [0,0]
                },
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
                    key: 'custom-point-position-config-offset',
                    target: '.custom-point-position-config-offset',
                    data: {
                        image: '',
                        title: 'custom-position-by-offset',
                        description: '通过 config 中 pointOffset 设置 point 的偏移量，从默认位置偏移[20,20]达到此位置'
                    }
                },
                {
                    key: 'custom-tip-position',
                    target: '.custom-tip-position',
                    data: {
                        image: '',
                        title: 'custom-tip-by-default',
                        description: '通过 placement 设置 tip 的位置从默认设置为 topRight'
                    },
                    tipPlacement: 'topRight'
                },
                {
                    key: 'custom-tip-position-2',
                    target: '.custom-tip-position-2',
                    data: {
                        image: '',
                        title: 'custom-tip-by-Offset',
                        description: '设置 tip 相对于默认位置的偏移量为 40'
                    },
                    tipPlacement: 'bottomRight',
                    tipOffset: 40
                },
                {
                    key: 'custom-tip-position-3',
                    target: '.custom-tip-position-3',
                    data: {
                        image: '',
                        title: 'custom-tip-by-position',
                        description: '通过 tipPosition 控制位置,因为有 target 所有通过 position 配置的位置不起作用，与 popover 相同'
                    }
                }
            ] as StepInfo[]
        };
    }

    public startTour() {
        this.guiderRef.start();
    }
}
