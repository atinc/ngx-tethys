import { Component, OnInit } from '@angular/core';
import { ThyCarousel, ThyCarouselItemDirective, ThyCarouselTrigger } from 'ngx-tethys/carousel';
import { ThyButton, ThyButtonGroup } from 'ngx-tethys/button';

@Component({
    selector: 'thy-carousel-basic-example',
    templateUrl: './trigger.component.html',
    styles: [
        `
            .custom-carousel-item {
                height: 300px;
                text-align: center;
                font-size: 18px;
                display: flex;
                color: #fff;
                justify-content: center;
                align-items: center;
                background: #6698ff;
            }
        `
    ],
    imports: [ThyCarousel, ThyCarouselItemDirective, ThyButtonGroup, ThyButton]
})
export class ThyCarouselTriggerExampleComponent implements OnInit {
    constructor() {}

    array: string[] = [];

    trigger: ThyCarouselTrigger = 'click';

    ngOnInit(): void {
        for (let i = 0; i < 6; ) {
            this.array.push(`Slide ${i++}`);
        }
    }
}
