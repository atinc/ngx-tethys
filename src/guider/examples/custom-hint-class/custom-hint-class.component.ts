import { Component, OnInit } from '@angular/core';
import { ThyGuider, ThyGuiderConfig, ThyGuiderRef, ThyGuiderStep } from 'ngx-tethys';

@Component({
    selector: 'thy-guider-custom-hint-class-example',
    template: `
        <button class="custom-hint-class-target" thyButton="primary" (click)="startTour()">开始</button>
    `
})
export class ThyGuiderCustomHintClassExampleComponent implements OnInit {
    private option: ThyGuiderConfig = {
        steps: [
            {
                key: 'custom-hint-class-target',
                target: '.custom-hint-class-target',
                data: {
                    cover: '',
                    title: '自定义弹出窗的类',
                    description: '通过 popoverConfig.panelClass 控制样式类,可以看到此弹出窗的包裹层有 custom-hint-class 类'
                }
            }
        ] as ThyGuiderStep[],
        hintClass: 'custom-hint-class'
    };

    private guiderRef: ThyGuiderRef;

    constructor(private thyGuider: ThyGuider) {}

    ngOnInit() {
        this.guiderRef = this.thyGuider.create(this.option);
    }

    public startTour() {
        this.guiderRef.start();
    }
}
