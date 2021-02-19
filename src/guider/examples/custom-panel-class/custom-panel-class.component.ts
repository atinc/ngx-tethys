import { Component, OnInit } from '@angular/core';
import { ThyGuider, ThyGuiderConfig, ThyGuiderRef, ThyGuiderStep } from 'ngx-tethys';

@Component({
    selector: 'thy-guider-custom-panel-class-example',
    template: `
        <button class="custom-panel-class-target" thyButton="primary" (click)="startTour()">开始</button>
    `
})
export class ThyGuiderCustomPanelClassExampleComponent implements OnInit {
    private option: ThyGuiderConfig = {
        steps: [
            {
                key: 'custom-panel-class-target',
                target: '.custom-panel-class-target',
                data: {
                    cover: '',
                    title: '自定义弹出窗的类',
                    description: '通过 popoverConfig.panelClass 控制样式类,可以看到此弹出窗的包裹层有 custom-panel-class 类'
                },
                panelClass: 'custom-panel-class'
            }
        ] as ThyGuiderStep[]
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
