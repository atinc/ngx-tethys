import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'thy-watermark-basic-example',
    templateUrl: './basic.component.html'
})
export class ThyWatermarkBasicExampleComponent implements OnInit {
    thyDisabled: boolean = false;
    thyCanvasConfig = {
        styles: {
            degree: 15, // 偏移角度
            fontSize: 12,
            color: 'pink', // 字体颜色
            textAlign: 'center'
        },
        distributeType: 'more',
        textLineHeight: 20 // 行高
    };
    isChecked: boolean = false;
    constructor() {}

    ngOnInit() {}
}
