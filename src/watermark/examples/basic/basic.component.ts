import { Component, OnInit } from '@angular/core';
@Component({
    selector: 'thy-watermark-basic-example',
    templateUrl: './basic.component.html'
})
export class ThyWatermarkBasicExampleComponent implements OnInit {
    value: string = '名字可以有十五个字这么长长长长';
    get getValue() {
        return JSON.stringify(this.value);
    }
    constructor() {}
    ngOnInit() {}
}
