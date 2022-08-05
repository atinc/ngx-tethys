import { Component, OnInit } from '@angular/core';

// 默认样式
const DEFAULT_CANVAS_CONFIG = {
    styles: {
        rotate: 15,
        textAlign: 'center',
        textBaseline: 'middle',
        color: 'rgba(51, 51, 51, 0.12)',
        fontsize: '12px'
    },
    textLineHeight: 20,
    xSpace: 200, // x轴间隔
    ySpace: 200 // y轴间隔
};
type TheCanvasConfigType = typeof DEFAULT_CANVAS_CONFIG;
@Component({
    selector: 'thy-watermark-basic-example',
    templateUrl: './basic.component.html'
})
export class ThyWatermarkBasicExampleComponent implements OnInit {
    thyDisabled: boolean = false;
    thyCanvasConfig: TheCanvasConfigType;
    isChecked: boolean = false;
    constructor() {}

    ngOnInit() {
        this.thyCanvasConfig = {
            styles: {
                rotate: 15, // 偏移角度
                fontsize: '14px', // 水印字体大小
                color: 'pink', // 字体颜色
                textAlign: 'left',
                textBaseline: 'middle'
            },
            xSpace: 30, // 水印x轴间隔
            ySpace: 60, // 水印y轴间隔
            textLineHeight: 20 // 行高
        };
    }
}
