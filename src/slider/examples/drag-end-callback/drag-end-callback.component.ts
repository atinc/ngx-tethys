import { Component, OnInit } from '@angular/core';
import { ThySlider } from 'ngx-tethys/slider';

@Component({
    selector: 'thy-slider-drag-end-callback-example',
    template: `
        <p>当前值为：{{ value }}</p>
        <thy-slider class="mt-2" (thyAfterChange)="value = $event.value"></thy-slider>
    `,
    imports: [ThySlider]
})
export class ThySliderDragEndCallbackExampleComponent implements OnInit {
    constructor() {}

    ngOnInit() {}

    public value = 0;
}
