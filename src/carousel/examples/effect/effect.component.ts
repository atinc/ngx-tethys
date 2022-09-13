import { Component, OnInit } from '@angular/core';
import { thyEffectType } from 'ngx-tethys/carousel';

@Component({
    selector: 'thy-carousel-basic-example',
    templateUrl: './effect.component.html',
    styleUrls: ['./effect.component.scss']
})
export class ThyCarouselEffectExampleComponent implements OnInit {
    constructor() {}

    array: string[] = [];

    effect: thyEffectType = 'slide';

    ngOnInit(): void {
        for (let i = 0; i < 8; i++) {
            this.array.push(`Slide ${i}`);
        }
    }
}
