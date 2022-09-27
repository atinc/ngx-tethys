import { Component, OnInit } from '@angular/core';
import { ThyCarouselEffect } from 'ngx-tethys/carousel';

@Component({
    selector: 'thy-carousel-basic-example',
    templateUrl: './effect.component.html',
    styles: [
        `
            .custom-carousel-item {
                height: 300px !important;
                text-align: center;
                font-size: 18px;
                display: flex;
                color: #fff;
                justify-content: center;
                align-items: center;
                background: #6698ff;
            }
            .active {
                color: #6698ff;
            }
        `
    ]
})
export class ThyCarouselEffectExampleComponent implements OnInit {
    constructor() {}

    array: string[] = [];

    effect: ThyCarouselEffect = 'slide';

    ngOnInit(): void {
        for (let i = 0; i < 6; ) {
            this.array.push(`Slide ${i++}`);
        }
    }
}
