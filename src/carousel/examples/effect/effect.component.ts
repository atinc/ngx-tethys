import { Component, OnInit } from '@angular/core';
import { ThyCarouselEffect } from 'ngx-tethys/carousel';

@Component({
    selector: 'thy-carousel-basic-example',
    templateUrl: './effect.component.html',
    styleUrls: ['./effect.component.scss']
})
export class ThyCarouselEffectExampleComponent implements OnInit {
    constructor() {}

    array: string[] = [];

    effect: ThyCarouselEffect = 'slide';

    ngOnInit(): void {
        for (let i = 0; i < 8; i++) {
            this.array.push(`Slide ${i}`);
        }
    }
}
