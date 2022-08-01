import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'thy-watermark-textarea-example',
    templateUrl: './textarea.component.html'
})
export class ThyWatermarkTextareaExampleComponent implements OnInit {
    value: string;
    get getValue() {
        return JSON.stringify(this.value);
    }
    constructor() {}

    ngOnInit() {}
}
