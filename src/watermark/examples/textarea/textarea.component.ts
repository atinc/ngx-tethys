import { Component, OnInit, ElementRef } from '@angular/core';

@Component({
    selector: 'thy-watermark-textarea-example',
    templateUrl: './textarea.component.html'
})
export class ThyWatermarkTextareaExampleComponent implements OnInit {
    value: string = '名字可以有十五个字这么长长长长';
    get getValue() {
        return JSON.stringify(this.value);
    }
    constructor(private el: ElementRef<HTMLElement>) {}

    ngOnInit() {}
}
