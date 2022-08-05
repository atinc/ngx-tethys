import { Component, OnInit } from '@angular/core';
@Component({
    selector: 'thy-watermark-basic-example',
    templateUrl: './basic.component.html'
})
export class ThyWatermarkBasicExampleComponent implements OnInit {
    thyDisabled: boolean = false;
    get thyCanvasConfig() {
        return {
            styles: {
                rotate: 15, // 偏移角度
                fillStyle: 'rgba(184, 184, 184, 1)',
                fontsize: '14px', // 水印字体大小
                color: 'pink', // 字体颜色
                textAlign: 'left',
                textBaseline: 'middle'
            },
            xSpace: 20, // 水印x轴间隔
            ySpace: 60, // 水印y轴间隔
            textLineHeight: 20 // 行高
        };
    }
    isChecked: boolean = false;
    constructor() {}

    ngOnInit() {}
}
