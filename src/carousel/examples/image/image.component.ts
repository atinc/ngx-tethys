import { Component, OnInit } from '@angular/core';
import { ThyCarousel, ThyCarouselItemDirective } from 'ngx-tethys/carousel';

@Component({
    selector: 'thy-carousel-basic-example',
    templateUrl: './image.component.html',
    styles: [
        `
            [thycarouselitem] {
                height: 400px;
                display: flex;
                color: #fff;
                justify-content: center;
                align-items: center;
            }
        `
    ],
    imports: [ThyCarousel, ThyCarouselItemDirective]
})
export class ThyCarouselImageExampleComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {}
}
