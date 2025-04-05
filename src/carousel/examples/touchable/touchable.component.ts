import { Component, OnInit } from '@angular/core';
import { ThyCarouselItemDirective } from 'ngx-tethys/carousel';
import { ThyCarousel } from 'ngx-tethys/carousel';
import { ThyButtonGroup } from 'ngx-tethys/button';

@Component({
    selector: 'thy-carousel-basic-example',
    templateUrl: './touchable.component.html',
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
    imports: [ThyCarousel, ThyCarouselItemDirective, ThyButtonGroup]
})
export class ThyCarouselTouchableExampleComponent implements OnInit {
    constructor() {}

    array: string[] = [];

    enable = true;

    ngOnInit(): void {
        for (let i = 0; i < 6; ) {
            this.array.push(`Slide ${i++}`);
        }
    }
}
