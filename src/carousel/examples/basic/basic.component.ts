import { Component, OnInit } from '@angular/core';
import { thyEffectType } from 'ngx-tethys/carousel';

@Component({
    selector: 'thy-carousel-basic-example',
    templateUrl: './basic.component.html',
    styleUrls: ['./basic.component.scss']
})
export class ThyCarouselBasicExampleComponent implements OnInit {
    constructor() {}

    array: string[] = [];

    autoPlay = false;

    effect: thyEffectType = 'slide';

    ngOnInit(): void {
        for (let i = 0; i < 8; i++) {
            this.array.push(`Slide ${i}`);
        }
    }
}
