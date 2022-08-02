import { Component, OnInit } from '@angular/core';

interface CanvasConfig {
    width?: string;
    height?: string;
    font?: string;
    fillStyle?: string;
    rotate?: number;
    textLineHeight?: number;
}
@Component({
    selector: 'thy-watermark-basic-example',
    templateUrl: './basic.component.html'
})
export class ThyWatermarkBasicExampleComponent implements OnInit {
    thyDisabled: boolean = false;
    get thyCanvasStyles(): CanvasConfig {
        return {
            width: '100px',
            height: '0px'
        };
    }
    constructor() {}

    ngOnInit() {}
}
