import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'thy-slider-drag-end-callback-example',
    template: `
        <p>当前值为：{{ value }}</p>
        <thy-slider class="mt-2" (thyAfterChange)="value = $event.value"></thy-slider>
    `,
    standalone: false
})
export class ThySliderDragEndCallbackExampleComponent implements OnInit {
    constructor() {}

    ngOnInit() {}

    public value = 0;
}
