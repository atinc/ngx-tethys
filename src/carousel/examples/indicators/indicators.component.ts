import { Component, OnInit } from '@angular/core';
import { ThyCarousel, ThyCarouselItemDirective } from 'ngx-tethys/carousel';
import { ThyButton, ThyButtonGroup } from 'ngx-tethys/button';

@Component({
    selector: 'thy-carousel-basic-example',
    templateUrl: './indicators.component.html',
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

            .custom-indicator {
                display: block;
                width: 16px;
                height: 4px;
                background: #fff;
                opacity: 0.3;
                transition:
                    opacity 500ms linear,
                    width 300ms linear;
                border-radius: 2px;
            }

            .custom-indicator:hover {
                opacity: 0.75;
            }

            .custom-indicator.active {
                width: 24px;
                opacity: 1;
            }
        `
    ],
    imports: [ThyCarousel, ThyCarouselItemDirective, ThyButtonGroup, ThyButton]
})
export class ThyCarouselIndicatorExampleComponent implements OnInit {
    constructor() {}

    array: string[] = [];

    isShow = true;

    ngOnInit(): void {
        for (let i = 0; i < 6; ) {
            this.array.push(`Slide ${i++}`);
        }
    }
}
