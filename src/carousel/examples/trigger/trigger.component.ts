import { Component, OnInit } from '@angular/core';
import { thyTriggerType } from 'ngx-tethys/carousel';

@Component({
    selector: 'thy-carousel-basic-example',
    templateUrl: './trigger.component.html',
    styleUrls: ['./trigger.component.scss']
})
export class ThyCarouselTriggerExampleComponent implements OnInit {
    constructor() {}

    array: string[] = [];

    trigger: thyTriggerType = 'click';

    ngOnInit(): void {
        for (let i = 0; i < 8; i++) {
            this.array.push(`Slide ${i}`);
        }
    }
}
