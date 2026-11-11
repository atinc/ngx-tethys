import { Component, OnInit } from '@angular/core';
import { ThyCarousel, ThyCarouselItemDirective } from 'ngx-tethys/carousel';
import { ThyButton, ThyButtonGroup } from 'ngx-tethys/button';
import { ThyIcon } from 'ngx-tethys/icon';

@Component({
    selector: 'thy-carousel-basic-example',
    templateUrl: './controls.component.html',
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
    imports: [ThyCarousel, ThyCarouselItemDirective, ThyButton, ThyIcon, ThyButtonGroup]
})
export class ThyCarouselControlsExampleComponent implements OnInit {
    constructor() {}

    array: string[] = [];

    isShow = true;

    ngOnInit(): void {
        for (let i = 0; i < 6; ) {
            this.array.push(`Slide ${i++}`);
        }
    }
}
