import { Component, OnInit } from '@angular/core';
@Component({
    selector: 'thy-watermark-basic-example',
    templateUrl: './basic.component.html'
})
export class ThyWatermarkBasicExampleComponent implements OnInit {
    thyDisabled: boolean = false;
    get thyCanvasStyles() {
        return {
            rotate: 15, // 偏移角度
            textLineHeight: 20, // 行高
            xSpace: 20, // 水印x轴间隔
            ySpace: 160, // 水印y轴间隔
            fontsize: '12px', // 水印字体大小
            color: 'pink', // 字体颜色
            textAlign: 'left',
            textBaseline: 'middle'
        };
    }
    isChecked: boolean = false;
    constructor() {}

    ngOnInit() {}
}
