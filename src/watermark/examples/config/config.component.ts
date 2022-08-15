import { Component, OnInit, ElementRef } from '@angular/core';
import { ThyCanvasConfigType } from 'ngx-tethys/watermark';

@Component({
    selector: 'thy-watermark-textarea-example',
    templateUrl: './config.component.html'
})
export class ThyWatermarkCanvasConfigExampleComponent implements OnInit {
    thyCanvasConfig: ThyCanvasConfigType = {
        degree: 15, // 偏移角度
        fontSize: 12, // 字体大小
        color: 'pink', // 字体颜色
        distributeType: 'more',
        textLineHeight: 20 // 行高
    };
    constructor(private el: ElementRef<HTMLElement>) {}

    ngOnInit() {}
}
