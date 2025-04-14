import { Component, OnInit, inject } from '@angular/core';
import { ThyGuider, ThyGuiderConfig, ThyGuiderRef, ThyGuiderStep } from 'ngx-tethys/guider';
import { ThyButton } from 'ngx-tethys/button';

@Component({
    selector: 'thy-guider-custom-hint-class-example',
    template: ` <button class="custom-hint-class-target" thyButton="info" (click)="startTour()">开始</button> `,
    imports: [ThyButton]
})
export class ThyGuiderCustomHintClassExampleComponent implements OnInit {
    private thyGuider = inject(ThyGuider);

    private option: ThyGuiderConfig = {
        steps: [
            {
                key: 'custom-hint-class-target',
                target: '.custom-hint-class-target',
                data: {
                    image: 'assets/images/guider/start.png',
                    title: '自定义弹出窗的类',
                    description: `通过 hintClass 控制样式类，可以看到此弹出窗的包裹层有 custom-hint-class 类。
                        通过 pointClass 控制 point 的样式，可以看到此 point 有 custom-point-class 类。`
                }
            }
        ] as ThyGuiderStep[],
        hintClass: 'custom-hint-class',
        pointClass: 'custom-point-class'
    };

    private guiderRef: ThyGuiderRef;

    ngOnInit() {
        this.guiderRef = this.thyGuider.create(this.option);
    }

    public startTour() {
        this.guiderRef.start();
    }
}
