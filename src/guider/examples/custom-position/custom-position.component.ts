import { Component, OnInit, inject } from '@angular/core';
import { ThyPlacement } from 'ngx-tethys/core';
import { ThyGuider, ThyGuiderConfig, ThyGuiderRef } from 'ngx-tethys/guider';

@Component({
    selector: 'thy-guider-custom-position-example',
    templateUrl: 'custom-position.component.html'
})
export class ThyGuiderCustomPositionExampleComponent implements OnInit {
    private thyGuider = inject(ThyGuider);

    private option: ThyGuiderConfig;

    private guiderRef: ThyGuiderRef;

    public hintPlacement: ThyPlacement = 'rightBottom';

    public pointXOffset = 0;

    public pointYOffset = 0;

    public hintOffset = 0;

    ngOnInit() {}

    private updateGuiderConfig() {
        this.guiderRef?.end();
        this.thyGuider.close();

        const config = {
            defaultPosition: { x: 100, y: 100 },
            steps: [
                {
                    key: 'custom-guider-position',
                    target: '.custom-guider-position',
                    data: {
                        image: 'assets/images/guider/start.png',
                        title: '自定义新手引导位置',
                        description: `通过属性设置 point 以及内容组件的位置，其中 hintPlacement 的值为：${this.hintPlacement},
                            内容组件的偏移值为 ${this.hintOffset}，高亮点基于目标右下角的偏移量为 [${this.pointXOffset},${this.pointYOffset}]`
                    },
                    hintPlacement: this.hintPlacement,
                    hintOffset: this.hintOffset,
                    pointOffset: [this.pointXOffset, this.pointYOffset]
                }
            ]
        } as ThyGuiderConfig;

        this.guiderRef = this.thyGuider.create(config);
        this.guiderRef.start();
    }

    public updatePlacement(placement: ThyPlacement) {
        this.hintPlacement = placement;
        this.updateGuiderConfig();
    }

    updateHintOffset({ value }: { value: number }) {
        this.hintOffset = value;
        this.updateGuiderConfig();
    }
    updatePointXOffset({ value }: { value: number }) {
        this.pointXOffset = value;
        this.updateGuiderConfig();
    }
    updatePointYOffset({ value }: { value: number }) {
        this.pointYOffset = value;
        this.updateGuiderConfig();
    }
    public startTour() {
        this.updateGuiderConfig();
    }

    public baseOnDefaultPosition() {
        this.guiderRef?.end();
        this.thyGuider.close();

        const config = {
            defaultPosition: { x: 100, y: 100 },
            steps: [
                {
                    key: 'custom-guider-position',
                    target: '',
                    data: {
                        image: 'assets/images/guider/start.png',
                        title: '基于页面的新手引导位置',
                        description: `通过 defaultPosition 属性设置提示框位置`
                    },
                    hintPlacement: this.hintPlacement
                }
            ]
        } as ThyGuiderConfig;

        this.guiderRef = this.thyGuider.create(config);
        this.guiderRef.start();
    }

    public baseOnTargetPosition() {
        this.guiderRef?.end();
        this.thyGuider.close();

        const config = {
            steps: [
                {
                    key: 'custom-guider-position',
                    target: { x: 500, y: 520 },
                    data: {
                        image: 'assets/images/guider/start.png',
                        title: '基于页面的新手引导位置',
                        description: `通过设置 target 属性类型为 {x: number, y: number} 来变更提示框位置`
                    },
                    hintPlacement: this.hintPlacement
                }
            ]
        } as ThyGuiderConfig;

        this.guiderRef = this.thyGuider.create(config);
        this.guiderRef.start();
    }
}
