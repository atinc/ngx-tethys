import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'thy-slider-drag-end-callback-example',
    template: `
        <thy-slider (thyAfterChange)="dragEnded($event)"></thy-slider>
    `
})
export class ThySliderDragEndCallbackExampleComponent implements OnInit {
    constructor() {}

    ngOnInit() {}

    dragEnded({ value }: { value: number }) {
        window.alert('当前值为：' + value);
    }
}
