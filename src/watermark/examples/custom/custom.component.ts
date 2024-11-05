import { Component, OnInit, ElementRef } from '@angular/core';
import { ThyCanvasConfigType } from 'ngx-tethys/watermark';

@Component({
    selector: 'thy-watermark-custom-example',
    templateUrl: './custom.component.html',
    styleUrls: ['./custom.component.scss']
})
export class ThyWatermarkCanvasCustomExampleComponent implements OnInit {
    thyCanvasConfig: ThyCanvasConfigType = {
        degree: 30, // 偏移角度
        fontSize: 13, // 字体大小
        color: ['rgb(255, 192, 203, 0.7)', 'rgb(255, 192, 203, 0.3)'], // 字体颜色
        textLineHeight: 25, // 行高
        gutter: [5, 5] // 横纵间距
    };

    constructor(private el: ElementRef<HTMLElement>) {}

    ngOnInit() {}
}
