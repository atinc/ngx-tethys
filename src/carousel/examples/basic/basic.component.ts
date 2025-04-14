import { Component, OnInit } from '@angular/core';
import { ThyCarousel, ThyCarouselItemDirective } from 'ngx-tethys/carousel';

@Component({
    selector: 'thy-carousel-basic-example',
    templateUrl: './basic.component.html',
    styles: [
        `
            [thycarouselitem] {
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
    imports: [ThyCarousel, ThyCarouselItemDirective]
})
export class ThyCarouselBasicExampleComponent implements OnInit {
    constructor() {}

    array: string[] = [];

    ngOnInit(): void {
        for (let i = 0; i < 6; ) {
            this.array.push(`Slide ${i++}`);
        }
    }
}
