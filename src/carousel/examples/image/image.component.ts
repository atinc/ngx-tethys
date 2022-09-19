import { Component, OnInit } from '@angular/core';
import { ThyCarouselTrigger } from 'ngx-tethys/carousel';

@Component({
    selector: 'thy-carousel-basic-example',
    templateUrl: './image.component.html',
    styles: [
        `
            .custom-carousel-item {
                height: 400px !important;
                display: flex;
                color: #fff;
                justify-content: center;
                align-items: center;
            }
        `
    ]
})
export class ThyCarouselImageExampleComponent implements OnInit {
    constructor() {}

    array: string[] = [];

    trigger: ThyCarouselTrigger = 'click';

    ngOnInit(): void {
        for (let i = 0; i < 6; ) {
            this.array.push(`Slide ${i++}`);
        }
    }
}
