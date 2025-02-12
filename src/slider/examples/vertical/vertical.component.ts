import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'thy-slider-vertical-example',
    template: `
        <div class="vertical-slider-container">
            <thy-slider [thyVertical]="true"></thy-slider>
        </div>
    `,
    styles: [
        `
            .vertical-slider-container {
                height: 200px;
            }
        `
    ],
    standalone: false
})
export class ThySliderVerticalExampleComponent implements OnInit {
    constructor() {}

    ngOnInit() {}
}
